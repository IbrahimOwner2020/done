import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import nookies from "nookies";
import { adminAuth } from "../firebase/firebaseAdmin";
import { useAuth } from "../hooks/AuthProvider";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await adminAuth.verifyIdToken(cookies.token);

		const { uid, email } = token;
		return {
			props: {
				email,
				uid,
			},
		};
	} catch (error) {
		return {
			props: {
				email: null,
				uid: null,
			},
		};
	}
};

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	console.log(props);
	const { user } = useAuth();
	console.log(user);

	return (
		<div>
			<Head>
				<title>Done.</title>
				<meta
					name="description"
					content="The next gen todo app with tones of features"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="text-4xl text-red-700">
				The done app has started
			</div>
		</div>
	);
};

export default Home;
