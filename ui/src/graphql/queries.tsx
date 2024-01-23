import { gql } from '@apollo/client';

export const GET_POSTS = gql`
	query {
		getAllPosts {
			id
			title
			post
			tags
			explanation
			created_date
			created_by
		}
	}
`;

export const ADD_POST = gql`
	mutation CreatePost($title: JSON!, $post: String!, $createdBy: String!) {
		createPost(title: $title, post: $post, created_by: $createdBy) {
			data {
				id
				title
				post
				created_by
			}
			message
			success
		}
	}
`;
