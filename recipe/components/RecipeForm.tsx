"use client";

import { useActionState } from "react";
import type { RecipeFormState } from "@/types";
import type { Recipe } from "@/types";

type Props = {
	action: (prevState: RecipeFormState, formData: FormData) => Promise<RecipeFormState>;
	recipe?: Recipe;
};

export default function RecipeForm({ action, recipe }: Props) {
	const [state, formAction, pending] = useActionState(action, {});

	return (
		<form action={formAction} className="space-y-6">
			{state.errors?.general && <p className="text-red-500 text-sm">{state.errors.general[0]}</p>}

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
				<input
					name="name"
					defaultValue={recipe?.name}
					className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
				/>
				{state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
				<input
					name="image_url"
					defaultValue={recipe?.image_url}
					className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
				/>
				{state.errors?.image_url && <p className="text-red-500 text-xs mt-1">{state.errors.image_url[0]}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Ingredients <span className="text-gray-400 font-normal">(one per line)</span>
				</label>
				<textarea
					name="ingredients"
					rows={5}
					defaultValue={recipe?.ingredients.join("\n")}
					className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
				/>
				{state.errors?.ingredients && <p className="text-red-500 text-xs mt-1">{state.errors.ingredients[0]}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Steps <span className="text-gray-400 font-normal">(one per line)</span>
				</label>
				<textarea
					name="steps"
					rows={6}
					defaultValue={recipe?.steps.join("\n")}
					className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
				/>
				{state.errors?.steps && <p className="text-red-500 text-xs mt-1">{state.errors.steps[0]}</p>}
			</div>

			<button
				type="submit"
				disabled={pending}
				className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
			>
				{pending ? "Saving..." : "Save Recipe"}
			</button>
		</form>
	);
}
