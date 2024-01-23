import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from './UserContext';

interface AuthContextData {
	token: string | undefined;
	isAuthenticated: boolean;
	isLoadingUser: boolean;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const TokenProvider = ({ children }: AuthProviderProps) => {
	const { isAuthenticated, loginWithRedirect, isLoading: isLoadingUser, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

	const [token, setToken] = useState<string | undefined>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (isAuthenticated) {
					const idToken = await getIdTokenClaims();
					setToken(idToken?.__raw);
				}
			} catch (error) {
				console.error('Error fetching ID token:', error);
			}
		};

		fetchData();

		const tokenRefreshTimer = setInterval(async () => {
			try {
				if (isAuthenticated) {
					await getAccessTokenSilently();
					console.log('Access token renewed.');
				}
			} catch (error) {
				console.error('Error renewing access token:', error);
			}
		}, 300000);

		return () => {
			clearInterval(tokenRefreshTimer);
		};
	}, [isAuthenticated, getIdTokenClaims, getAccessTokenSilently]);

	if (!isAuthenticated && !isLoadingUser) {
		loginWithRedirect();
		return null;
	}

	if (!token) {
		return;
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				isAuthenticated,
				isLoadingUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);
