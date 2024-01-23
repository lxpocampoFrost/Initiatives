import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const NewApolloClient = (token: string | undefined) => {
	const httpLink = createHttpLink({
		uri: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
	});

	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
};
