import { UsableType } from '../../(site)/dev/admin/create-post/UsablesModal/constants';
import type { Usable } from '../../(site)/dev/admin/create-post/UsablesModal/constants';

export type PostReqPostBody = {
	title: string;
	description: string;
	categories: string[];
	content: string;
	usables: { [id: string]: Usable };
	coverImage?: string;
	published?: boolean;
};

export type PostReqResponse = {
	status: 'success';
};

export interface UsableComponent {
	swapOut: (dummyComponent: RegExp, post: string) => string;
}

export const usableImports: Record<UsableType, string> = {
	[UsableType.RecipeCard]:
		"import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte'",
	[UsableType.PhotoGallery]: 'TODO', // ! TODO
};
