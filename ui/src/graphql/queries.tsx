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
	query ($orderBy: String, $tags: [String], $createdBy: [String], $title: String, $page: Int, $pageSize: Int) {
		getAllPosts(orderBy: $orderBy, tags: $tags, createdBy: $createdBy, title: $title, page: $page, pageSize: $pageSize) {
			posts {
				id
				title
				post
				tags
				created_by
				created_date
				explanation
			}
			count
			currentPage
		}
	}
`;

export const ADD_POST = gql`
	mutation CreatePost($title: String!, $post: String!, $createdBy: String!) {
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
