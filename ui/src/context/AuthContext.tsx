import { createContext, useState, useContext, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';

import { UserProvider } from './UserContext';
import { NewApolloClient } from '../graphql/apolloClient';

interface AuthContextData {
	token: string | undefined;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const TokenProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | undefined>('');

	const { data: session, status } = useSession();

	useEffect(() => {
		const signInWithGoogle = async () => {
			try {
				await signIn('google');
			} catch (error) {
				console.error('Error signing in with Google:', error);
			}
		};

		if (status === 'unauthenticated') {
			signInWithGoogle();
		}
	}, [status]);

	useEffect(() => {
		if (session) {
			//@ts-ignore
			setToken(session?.accessToken);
		}
	}, [session]);

	if (!token) {
		return;
	}

	const client = NewApolloClient(token ? token : undefined);

	return (
		<AuthContext.Provider
			value={{
				token,
			}}
		>
			<ApolloProvider client={client}>
				<UserProvider>{children}</UserProvider>
			</ApolloProvider>
		</AuthContext.Provider>
	);
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
