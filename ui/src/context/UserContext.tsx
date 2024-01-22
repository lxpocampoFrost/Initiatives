import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useQuery } from '@apollo/client';

interface UserData {
	userId: string;
	firstName: string;
	lastName: string;
	bindname: string;
	email: string;
	picture: string;
}

interface UserContextData {
	currentUserDetails: UserData | null;
	data: any;
	hailstormLoading: boolean;
}

interface UserProviderProps {
	children: React.ReactNode;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const GET_HAILSTORM = gql`
	query GetHailstormData {
		hailstormData {
			userId
			bindname
			email
			firstName
			lastName
			position
		}
	}
`;

export const UserProvider = ({ children }: UserProviderProps) => {
	const { user } = useAuth0();
	const { loading: hailstormLoading, data } = useQuery(GET_HAILSTORM);

	const [currentUserDetails, setCurrentUserDetails] = useState<null>(null);

	useEffect(() => {
		if (!currentUserDetails && !hailstormLoading && data) {
			if (data.hailstormData && user) {
				let hs_user: any = data.hailstormData.find((hs_user: any) => hs_user.email === user.email);
				setCurrentUserDetails({
					...hs_user,
					picture: user.picture,
				});
			}
		}
	}, [currentUserDetails, hailstormLoading, data, user]);

	if (!currentUserDetails) {
		return;
	}

	return (
		<UserContext.Provider
			value={{
				currentUserDetails,
				data,
				hailstormLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;

export const useUserContext = () => useContext(UserContext);
