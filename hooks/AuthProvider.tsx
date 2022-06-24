import { createContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";

const AuthContext = createContext<{ user: firebase.User | null }>({
	user: null,
});

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<firebase.User | null>(null);

	useEffect(() => {
        return 
    }, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};
