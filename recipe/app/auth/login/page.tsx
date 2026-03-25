"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions/auth";

export default function LoginPage() {
	const [state, formAction, pending] = useActionState(login, {});

	return (
		<div className="flex items-center justify-center min-h-[80vh] px-4">
			<div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome back</h1>

				{state.errors?.general && <p className="text-red-500 text-sm mb-4">{state.errors.general[0]}</p>}

				<form action={formAction} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							name="email"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
						/>
						{state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
						<input
							type="password"
							name="password"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
						/>
						{state.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>}
					</div>

					<button
						type="submit"
						disabled={pending}
						className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
					>
						{pending ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="text-sm text-gray-500 mt-4 text-center">
					Don&apos;t have an account?{" "}
					<Link href="/auth/register" className="text-orange-500 font-medium hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
