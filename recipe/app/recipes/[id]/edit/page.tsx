import { notFound } from "next/navigation";
import { getRecipeById, updateRecipe } from "@/lib/actions/recipes";
import RecipeForm from "@/components/RecipeForm";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const recipe = await getRecipeById(id);

	if (!recipe) notFound();

	const updateWithId = updateRecipe.bind(null, recipe.id);

	return (
		<div className="max-w-2xl mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Recipe</h1>
			<div className="bg-white rounded-2xl shadow-md p-8">
				<RecipeForm action={updateWithId} recipe={recipe} />
			</div>
		</div>
	);
}
