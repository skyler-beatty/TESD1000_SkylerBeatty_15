"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/actions/auth";

export default function RegisterPage() {
	const [state, formAction, pending] = useActionState(register, {});

	return (
		<div className="flex items-center justify-center min-h-[80vh] px-4">
			<div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Create an account</h1>

				{state.errors?.general && <p className="text-red-500 text-sm mb-4">{state.errors.general[0]}</p>}

				<form action={formAction} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
						<input
							type="text"
							name="name"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
						/>
						{state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
					</div>

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
						{pending ? "Creating account..." : "Register"}
					</button>
				</form>

				<p className="text-sm text-gray-500 mt-4 text-center">
					Already have an account?{" "}
					<Link href="/auth/login" className="text-orange-500 font-medium hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
