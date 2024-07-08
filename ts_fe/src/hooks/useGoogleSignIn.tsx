import { useEffect, useState } from "react";
import {
	signInWithPopup,
	GoogleAuthProvider,
	User,
	signOut,
	setPersistence,
	browserLocalPersistence,
} from "firebase/auth";

import { auth } from "@/utils/firebaseInit";
import SerializeUser from "@/utils/serializeUser";

type SignInError = {
	code: string;
	message: string;
};

type UseGoogleSignInResult = {
	user: User | null;
	error: SignInError | null;
	isLoading: boolean;
	signInWithGoogle: () => Promise<void>;
};

const useGoogleSignIn = (): UseGoogleSignInResult => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<SignInError | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const provider = new GoogleAuthProvider().setCustomParameters({
		prompt: "select_account",
	});

	const signInWithGoogle = async (): Promise<any> => {
		try {
			setIsLoading(true);

			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			// if (user.email?.split("@")[1] != "dshs.kr") {
			// 	signOut(auth);
			// 	localStorage.removeItem("auth");
			// 	throw new Error("대신고등학교 계정으로 로그인해주세요.");
			// }

			localStorage.setItem("auth", JSON.stringify(SerializeUser(user)));

			setUser(user);
			setError(null);
			return user;
		} catch (error: any) {
			setError({
				code: error.code,
				message: error.message,
			});
			setUser(null);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return { user, error, isLoading, signInWithGoogle };
};

export default useGoogleSignIn;
