import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }: { auth: any; request: { nextUrl: URL } }) {
			const isLoggedIn = !!auth?.user;
			const isOnRecipes = nextUrl.pathname.startsWith("/recipes");

			if (isOnRecipes) {
				if (isLoggedIn) return true;
				return false;
			}
			return true;
		},
		session({ session, token }: { session: any; token: any }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		jwt({ token, user }: { token: any; user: any }) {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
