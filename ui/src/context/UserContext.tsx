import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

interface UserData {
	userId: string;
	firstName: string;
	lastName: string;
	bindname: string;
	email: string;
	position?: string;
	picture?: string;
}

interface UserContextData {
	currentUserDetails: UserData | null;
	data: any;
	hailstormLoading: boolean;
	currentDevTeam: string[];
	setCurrentDevTeam: any;
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
	const { data: sessionData } = useSession();
	const { loading: hailstormLoading, data } = useQuery(GET_HAILSTORM);

	const [currentUserDetails, setCurrentUserDetails] = useState<UserData | null>(null);

	const [currentDevTeam, setCurrentDevTeam] = useState([]);

	useEffect(() => {
		if (!currentUserDetails && !hailstormLoading && data) {
			if (data.hailstormData && sessionData) {
				let hs_user: any = data.hailstormData.find((hs_user: any) => hs_user.email === sessionData.user?.email);
				setCurrentUserDetails({
					...hs_user,
					picture: sessionData.user?.image,
				});
			}
		}

		if (data && data.hailstormData.length > 0 && currentUserDetails) {
			const positions = ['developer', 'technical lead', 'chief creative'];
			const devTeam = data.hailstormData.filter((user: UserData) => user.position && positions.some((position) => user.position?.toLowerCase().includes(position)));

			const teamMembers = devTeam.map((user: { userId: string; firstName: string; lastName: string }) => ({
				index: user.userId,
				name: `${user.firstName} ${user.lastName}`,
			}));

			const currentUser = `${currentUserDetails.firstName} ${currentUserDetails.lastName}`;

			const indexToRemove = teamMembers.findIndex((member: { name: string }) => member.name === currentUser);
			if (indexToRemove !== -1) {
				teamMembers.splice(indexToRemove, 1);
			}

			setCurrentDevTeam(teamMembers);
		}
	}, [currentUserDetails, hailstormLoading, data, sessionData]);

	if (!currentUserDetails) {
		return;
	}

	return (
		<UserContext.Provider
			value={{
				currentUserDetails,
				data,
				hailstormLoading,
				currentDevTeam,
				setCurrentDevTeam,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;

export const useUserContext = () => useContext(UserContext);
