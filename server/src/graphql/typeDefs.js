const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON

	type Post {
		id: ID
		title: JSON!
		post: String!
		tags: [String!]!
		created_by: String!
		created_date: String!
		updated_date: String!
		deleted: Boolean!
		explanation: String
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
		getAllPosts(orderBy: String, tags: [String], createdBy: [String], page: Int, pageSize: Int): [Post]
		getPostById(id: ID!): Post
		tags: [Tag]
		hailstormData: [User]
	}

	type Mutation {
		createPost(title: JSON!, post: String!, created_by: String!): PostMessage
		updatePost(postId: ID!, post: String!, tagsId: [ID!]!): PostMessage
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
