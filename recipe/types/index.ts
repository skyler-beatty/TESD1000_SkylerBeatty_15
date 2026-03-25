export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export type Recipe = {
	id: string;
	user_id: string;
	name: string;
	image_url: string;
	ingredients: string[];
	steps: string[];
	created_at: string;
	updated_at: string;
};

export type RecipeFormState = {
	errors?: {
		name?: string[];
		image_url?: string[];
		ingredients?: string[];
		steps?: string[];
		general?: string[];
	};
	message?: string;
};

export type AuthFormState = {
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		general?: string[];
	};
	message?: string;
};
