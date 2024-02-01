import type { AppProps } from 'next/app';
import { TokenProvider } from '@/context/AuthContext';
import { ModeProvider } from '@/context/ModeContext';

import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

interface CustomAppProps extends AppProps {
	pageProps: {
		session: CustomSession;
	};
}

interface CustomSession {
	accessToken: string;
	expires: string;
	user: {
		name: string;
		email: string;
		image: string;
	};
}

export default function App({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
	return (
		<SessionProvider session={session}>
			<TokenProvider>
				<ModeProvider>
					<Component {...pageProps} />
				</ModeProvider>
			</TokenProvider>
		</SessionProvider>
	);
}
