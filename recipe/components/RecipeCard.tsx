import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
	return (
		<Link href={`/recipes/${recipe.id}`}>
			<div className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden group">
				<div className="relative w-full h-48">
					<Image
						src={recipe.image_url}
						alt={recipe.name}
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="p-4">
					<h2 className="text-lg font-semibold text-gray-800">{recipe.name}</h2>
					<p className="text-sm text-gray-500 mt-1">
						{recipe.ingredients.length} ingredients · {recipe.steps.length} steps
					</p>
				</div>
			</div>
		</Link>
	);
}
