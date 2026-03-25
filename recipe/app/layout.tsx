import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geist = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "RecipeBook",
	description: "Create and manage your personal recipes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${geist.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col bg-orange-50 font-sans">
				<NavBar />
				<main className="flex-1">{children}</main>
			</body>
		</html>
	);
}
