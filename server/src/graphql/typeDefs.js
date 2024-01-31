const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON
	scalar Int

	type Post {
		id: ID
		title: String!
		post: String!
		tags: [String!]!
		created_by: String!
		created_date: String!
		updated_date: String!
		deleted: Boolean!
		explanation: String
	}

	type PostPagination {
		posts: [Post]!
		count: Int!
		currentPage: Int!
	}

	type Tag {
		id: ID!
		tag: String!
	}

	type User {
		userId: String!
		bindname: String!
		email: String
		firstName: String
		lastName: String
		position: String
	}

	type Query {
		getAllPosts(orderBy: String, tags: [String], createdBy: [String], title: String, page: Int, pageSize: Int): PostPagination
		getPostById(id: ID!): Post
		tags: [Tag]
		hailstormData: [User]
	}

	type Mutation {
		createPost(title: String!, post: String!, created_by: String!): PostMessage
		updatePost(postId: ID!, title: JSON, post: String!): PostMessage
		deletePost(postId: ID!): Result
		generateExplanation(postId: ID!): String
	}

	type Result {
		success: Boolean
		message: String
	}

	type PostMessage {
		data: Post
		success: Boolean
		message: String
	}
`;
