import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "./db";
import { authConfig } from "@/auth.config";
import type { User } from "@/types";

export const { auth, signIn, signOut, handlers } = NextAuth({
	...authConfig,
	session: { strategy: "jwt" },
	providers: [
		Credentials({
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				const result = await pool.query<User>("SELECT * FROM users WHERE email = $1", [email]);
				const user = result.rows[0];

				if (!user) return null;

				const passwordsMatch = await bcrypt.compare(password, user.password);
				if (!passwordsMatch) return null;

				return { id: user.id, name: user.name, email: user.email };
			},
		}),
	],
});
