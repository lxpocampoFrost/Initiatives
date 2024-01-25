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
	query ($tags: [String], $orderBy: String, $createdBy: [String]) {
		getAllPosts(tags: $tags, orderBy: $orderBy, createdBy: $createdBy) {
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

export const UPDATE_POST = gql`
	mutation UpdatePost($postId: ID!, $title: JSON, $post: String!) {
		updatePost(postId: $postId, title: $title, post: $post) {
			data {
				id
				title
				post
				updated_date
			}
			message
			success
		}
	}
`;

export const DELETE_POST = gql`
	mutation DeletePost($postId: ID!) {
		deletePost(postId: $postId) {
			success
			message
		}
	}
`;
