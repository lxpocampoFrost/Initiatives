import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	debug: true,
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			if (session) {
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
});
