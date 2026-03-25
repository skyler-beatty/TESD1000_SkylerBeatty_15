import Link from "next/link";
import { auth } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";

export default async function NavBar() {
	const session = await auth();

	return (
		<nav className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between shadow-md">
			<Link href="/" className="text-2xl font-bold tracking-tight">
				🍳 RecipeBook
			</Link>
			<div className="flex items-center gap-4">
				{session?.user ? (
					<>
						<span className="text-sm text-orange-100">Hi, {session.user.name}</span>
						<Link href="/recipes" className="text-sm font-medium hover:underline">
							My Recipes
						</Link>
						<Link
							href="/recipes/create"
							className="bg-white text-orange-500 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-orange-50 transition"
						>
							+ New Recipe
						</Link>
						<form action={logout}>
							<button type="submit" className="text-sm font-medium hover:underline">
								Logout
							</button>
						</form>
					</>
				) : (
					<>
						<Link href="/auth/login" className="text-sm font-medium hover:underline">
							Login
						</Link>
						<Link
							href="/auth/register"
							className="bg-white text-orange-500 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-orange-50 transition"
						>
							Register
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
