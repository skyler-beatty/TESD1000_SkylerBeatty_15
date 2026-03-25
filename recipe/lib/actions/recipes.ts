"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import type { Recipe, RecipeFormState } from "@/types";

const RecipeSchema = z.object({
	name: z.string().min(1, "Recipe name is required"),
	image_url: z.string().url("Must be a valid URL"),
	ingredients: z.string().min(1, "At least one ingredient is required"),
	steps: z.string().min(1, "At least one step is required"),
});

function parseLines(value: string): string[] {
	return value
		.split("\n")
		.map((s) => s.trim())
		.filter(Boolean);
}

export async function getRecipes(): Promise<Recipe[]> {
	const session = await auth();
	if (!session?.user?.id) return [];

	const result = await pool.query<Recipe>("SELECT * FROM recipes WHERE user_id = $1 ORDER BY created_at DESC", [
		session.user.id,
	]);
	return result.rows;
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
	const session = await auth();
	if (!session?.user?.id) return null;

	const result = await pool.query<Recipe>("SELECT * FROM recipes WHERE id = $1 AND user_id = $2", [
		id,
		session.user.id,
	]);
	return result.rows[0] ?? null;
}

export async function createRecipe(prevState: RecipeFormState, formData: FormData): Promise<RecipeFormState> {
	const session = await auth();
	if (!session?.user?.id) {
		return { errors: { general: ["You must be logged in"] } };
	}

	const validated = RecipeSchema.safeParse({
		name: formData.get("name"),
		image_url: formData.get("image_url"),
		ingredients: formData.get("ingredients"),
		steps: formData.get("steps"),
	});

	if (!validated.success) {
		return { errors: validated.error.flatten().fieldErrors };
	}

	const { name, image_url, ingredients, steps } = validated.data;

	try {
		await pool.query(
			`INSERT INTO recipes (user_id, name, image_url, ingredients, steps)
       VALUES ($1, $2, $3, $4, $5)`,
			[session.user.id, name, image_url, parseLines(ingredients), parseLines(steps)],
		);
	} catch {
		return { errors: { general: ["Failed to create recipe"] } };
	}

	revalidatePath("/recipes");
	redirect("/recipes");
}

export async function updateRecipe(
	id: string,
	prevState: RecipeFormState,
	formData: FormData,
): Promise<RecipeFormState> {
	const session = await auth();
	if (!session?.user?.id) {
		return { errors: { general: ["You must be logged in"] } };
	}

	const validated = RecipeSchema.safeParse({
		name: formData.get("name"),
		image_url: formData.get("image_url"),
		ingredients: formData.get("ingredients"),
		steps: formData.get("steps"),
	});

	if (!validated.success) {
		return { errors: validated.error.flatten().fieldErrors };
	}

	const { name, image_url, ingredients, steps } = validated.data;

	try {
		const result = await pool.query(
			`UPDATE recipes
       SET name=$1, image_url=$2, ingredients=$3, steps=$4, updated_at=NOW()
       WHERE id=$5 AND user_id=$6`,
			[name, image_url, parseLines(ingredients), parseLines(steps), id, session.user.id],
		);

		if (result.rowCount === 0) {
			return { errors: { general: ["Recipe not found or unauthorized"] } };
		}
	} catch {
		return { errors: { general: ["Failed to update recipe"] } };
	}

	revalidatePath("/recipes");
	revalidatePath(`/recipes/${id}`);
	redirect(`/recipes/${id}`);
}

export async function deleteRecipe(id: string): Promise<void> {
	const session = await auth();
	if (!session?.user?.id) return;

	await pool.query("DELETE FROM recipes WHERE id = $1 AND user_id = $2", [id, session.user.id]);

	revalidatePath("/recipes");
	redirect("/recipes");
}
