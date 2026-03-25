import RecipeForm from "@/components/RecipeForm";
import { createRecipe } from "@/lib/actions/recipes";

export default function CreateRecipePage() {
	return (
		<div className="max-w-2xl mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">New Recipe</h1>
			<div className="bg-white rounded-2xl shadow-md p-8">
				<RecipeForm action={createRecipe} />
			</div>
		</div>
	);
}
