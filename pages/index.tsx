import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import nookies from "nookies";
import { adminAuth } from "../firebase/firebaseAdmin";
import { useAuth } from "../hooks/AuthProvider";
import Link from "next/link";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		return await adminAuth
			.verifyIdToken(cookies.token)
			.then(() => {
				return {
					redirect: {
						permanent: false,
						destination: "/user/dashboard",
					},
				};
			})
			.catch(() => {
				return {
					props: {
						email: null,
						uid: null,
					},
				};
			});
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

			<div className="text-4xl text-red-700">with no login user</div>
			<Link href="/auth/signUp" passHref>
				<a>Sign in</a>
			</Link>
			<Link href="/auth/login" passHref>
				<a>Log in</a>
			</Link>
		</div>
	);
};

export default Home;
