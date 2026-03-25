import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Home() {
	const session = await auth();

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
			<h1 className="text-5xl font-bold text-orange-500 mb-4">🍳 RecipeBook</h1>
			<p className="text-gray-600 text-lg max-w-md mb-8">
				Your personal recipe collection. Create, manage, and revisit your favourite dishes.
			</p>
			{session?.user ? (
				<Link
					href="/recipes"
					className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
				>
					View My Recipes
				</Link>
			) : (
				<div className="flex gap-4">
					<Link
						href="/auth/register"
						className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
					>
						Get Started
					</Link>
					<Link
						href="/auth/login"
						className="border border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition"
					>
						Login
					</Link>
				</div>
			)}
		</div>
	);
}
