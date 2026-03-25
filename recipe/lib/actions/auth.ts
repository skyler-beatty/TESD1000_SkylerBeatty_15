"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";
import pool from "@/lib/db";
import type { AuthFormState } from "@/types";
import { AuthError } from "next-auth";

const RegisterSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export async function register(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
	const validated = RegisterSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validated.success) {
		return { errors: validated.error.flatten().fieldErrors };
	}

	const { name, email, password } = validated.data;

	try {
		const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
		if (existing.rows.length > 0) {
			return { errors: { general: ["Email already in use"] } };
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
	} catch {
		return { errors: { general: ["Something went wrong. Please try again."] } };
	}

	redirect("/auth/login");
}

export async function login(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
	const validated = LoginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validated.success) {
		return { errors: validated.error.flatten().fieldErrors };
	}

	try {
		await signIn("credentials", {
			email: validated.data.email,
			password: validated.data.password,
			redirectTo: "/recipes",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			return { errors: { general: ["Invalid email or password"] } };
		}
		throw error;
	}

	return {};
}

export async function logout() {
	await signOut({ redirectTo: "/" });
}
