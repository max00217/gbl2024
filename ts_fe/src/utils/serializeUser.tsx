const SerializeUser = (user: any) => {
	return {
		uid: user.uid,
		email: user.email,
		displayName: user.displayName,
		photoURL: user.photoURL,
		registered: user.registered,
	};
};

export default SerializeUser;
