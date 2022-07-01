import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/config";
import { User } from "firebase/auth";
import nookies from "nookies";

const AuthContext = createContext<{ user: User | null }>({
	user: null,
});

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		return auth.onIdTokenChanged(async (user) => {
			if (!user) {
				setUser(null);
				nookies.set(undefined, "token", "", { path: "/" });
			} else {
				const token = await user.getIdToken();
				setUser(user);
				nookies.set(undefined, "token", token, { path: "/" });
			}
		});
	}, []);

	// Force refresh the token every after 10 minutes.
	// Firebase refreshes the token itself after every 1 hour if you are using firestore or realtime database
    // Thus in this project I will use firestore, I wont need refreshing token every 20 minutes
	// useEffect(() => {
	// 	const handle = setInterval(async () => {
	// 		const user = auth.currentUser;
	// 		if (user) await user.getIdToken(true);
	// 	}, 20 * 60 * 1000);

	// 	// clean up setInterval
	// 	return () => clearInterval(handle);
	// }, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
