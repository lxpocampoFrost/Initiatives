const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON
	scalar Int
	scalar DateTime

	input PostCreate {
		title: String!
		post: String!
		created_by: String!
		tagsId: [String]
	}

	input PostUpdate {
		title: String!
		post: String!
		tagsId: [String]
	}

	input PostFilterInput {
		orderBy: String
		tags: [String]
		createdBy: [String]
		title: String
	}

	input PaginationInput {
		page: Int
		pageSize: Int
	}

	type Post {
		id: ID
		title: String!
		post: String!
		tags: [String!]!
		created_by: String!
		created_date: DateTime!
		updated_date: DateTime!
		deleted: Boolean!
		explanation: String
	}

	type PostPagination {
		items: [Post]!
		count: Int!
		currentPage: Int!
	}

	type Tag {
		id: ID!
		tag: String!
		post_count: Int!
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
		posts(filter: PostFilterInput, pagination: PaginationInput): PostPagination
		postId(id: ID!): Post
		tag(id: [ID]!): Tag
		tags: [Tag]
		hailstormData: [User]
	}

	type Mutation {
		createdPost(input: PostCreate): Message
		updatedPost(postId: ID!, input: PostUpdate): Message
		deletedPost(postId: ID!): Message
		generateExplanation(postId: ID!): String
		createdTag(name: [String]!): Message
		updatedTag(tagId: [ID]!, tag: String!): Message
		deletedTag(tagId: ID!): Message
	}

	type Message {
		data: JSON
		success: Boolean
		message: String
		error: Error
	}

	type Error {
		message: String!
		code: String
	}
`;
