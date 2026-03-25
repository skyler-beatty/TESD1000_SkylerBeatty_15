import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById, deleteRecipe } from "@/lib/actions/recipes";

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const recipe = await getRecipeById(id);

	if (!recipe) notFound();

	const deleteWithId = deleteRecipe.bind(null, recipe.id);

	return (
		<div className="max-w-3xl mx-auto px-4 py-10">
			<Link href="/recipes" className="text-orange-500 hover:underline text-sm mb-6 inline-block">
				← Back to recipes
			</Link>

			<div className="bg-white rounded-2xl shadow-md overflow-hidden">
				<div className="relative w-full h-72">
					<Image
						src={recipe.image_url}
						alt={recipe.name}
						fill
						sizes="(max-width: 768px) 100vw, 768px"
						className="object-cover"
						priority
					/>
				</div>

				<div className="p-8">
					<div className="flex items-start justify-between mb-6">
						<h1 className="text-3xl font-bold text-gray-800">{recipe.name}</h1>
						<div className="flex gap-3">
							<Link
								href={`/recipes/${recipe.id}/edit`}
								className="text-sm bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full font-medium hover:bg-orange-200 transition"
							>
								Edit
							</Link>
							<form action={deleteWithId}>
								<button
									type="submit"
									className="text-sm bg-red-100 text-red-600 px-4 py-1.5 rounded-full font-medium hover:bg-red-200 transition"
								>
									Delete
								</button>
							</form>
						</div>
					</div>

					<section className="mb-6">
						<h2 className="text-lg font-semibold text-gray-700 mb-3">Ingredients</h2>
						<ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
							{recipe.ingredients.map((ing, i) => (
								<li key={i}>{ing}</li>
							))}
						</ul>
					</section>

					<section>
						<h2 className="text-lg font-semibold text-gray-700 mb-3">Steps</h2>
						<ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
							{recipe.steps.map((step, i) => (
								<li key={i}>{step}</li>
							))}
						</ol>
					</section>
				</div>
			</div>
		</div>
	);
}
