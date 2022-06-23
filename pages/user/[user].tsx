import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useAuth } from "../../hooks/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { adminAuth } from "../../firebase/firebaseAdmin";
import nookies from "nookies";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { params } = ctx;
	const cookies = nookies.get(ctx);
	return await adminAuth
		.verifyIdToken(cookies.token)
		.then(() => {
			return {
				props: {
					page: params?.user,
				},
			};
		})
		.catch(() => {
			return {
				redirect: {
					permanent: false,
					destination: "/",
				},
			};
		});
};

const UserPage = ({
	page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const route = useRouter();
	const { user } = useAuth();

	return (
		<div>
			<div>
				this is the {page} section of the users dashboard
				<br /> with the email: {user?.email}
			</div>
			<br />
			<button
				onClick={() => {
					signOut(auth);
					route.push("/");
				}}
			>
				log out
			</button>
		</div>
	);
};

export default UserPage;
