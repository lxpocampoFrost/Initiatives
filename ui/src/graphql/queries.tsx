import { gql } from '@apollo/client';

export const GET_TAGS = gql`
	query {
		tags {
			id
			tag
		}
	}
`;

export const GET_POSTS = gql`
	query Posts($filter: PostFilterInput, $pagination: PaginationInput) {
		posts(filter: $filter, pagination: $pagination) {
			items {
				id
				title
				post
				tags
				created_by
				created_date
				updated_date
				deleted
				explanation
			}
			count
			currentPage
		}
	}
`;

export const ADD_POST = gql`
	mutation CreatePost($input: PostCreate) {
		createdPost(input: $input) {
			data
			success
			message
			error {
				message
				code
			}
		}
	}
`;

export const UPDATE_POST = gql`
	mutation UpdatedPost($postId: ID!, $input: PostUpdate) {
		updatedPost(postId: $postId, input: $input) {
			data
			success
			message
			error {
				message
				code
			}
		}
	}
`;

export const DELETE_POST = gql`
	mutation DeletePost($postId: ID!) {
		deletedPost(postId: $postId) {
			data
			success
			message
			error {
				message
				code
			}
		}
	}
`;

export const ADD_TAG = gql`
	mutation ($name: [String]!) {
		createdTag(name: $name) {
			data
			success
			message
			error {
				message
				code
			}
		}
	}
`;
