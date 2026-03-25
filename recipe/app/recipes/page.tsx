import Link from "next/link";
import { getRecipes } from "@/lib/actions/recipes";
import RecipeCard from "@/components/RecipeCard";

export default async function RecipesPage() {
	const recipes = await getRecipes();

	return (
		<div className="max-w-5xl mx-auto px-4 py-10">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold text-gray-800">My Recipes</h1>
				<Link
					href="/recipes/create"
					className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
				>
					+ New Recipe
				</Link>
			</div>

			{recipes.length === 0 ? (
				<div className="text-center py-20 text-gray-400">
					<p className="text-xl">No recipes yet.</p>
					<p className="mt-2">
						<Link href="/recipes/create" className="text-orange-500 hover:underline">
							Create your first recipe!
						</Link>
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{recipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			)}
		</div>
	);
}
