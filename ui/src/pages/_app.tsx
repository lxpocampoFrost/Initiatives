import { TokenProvider } from '@/context/AuthContext';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Auth0Provider
			domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER ? process.env.NEXT_PUBLIC_AUTH0_ISSUER : ''}
			clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ? process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID : ''}
			authorizationParams={{
				redirect_uri: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
			}}
		>
			<TokenProvider>
				<Component {...pageProps} />
			</TokenProvider>
		</Auth0Provider>
	);
}
