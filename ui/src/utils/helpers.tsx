export const getBindnameForUserId = (data: any, userId: number) => {
	if (data && data.hailstormData) {
		const hsUser = data.hailstormData.find((hsUser: any) => hsUser.userId === userId);

		return hsUser ? hsUser.bindname : '';
	}
	return '';
};

export const getColorForUserId = (userId: number) => {
	const colors = ['#4FBBE9', '#E551CD', '#1DBA8A'];

	const index = userId % colors.length;

	return colors[index];
};
