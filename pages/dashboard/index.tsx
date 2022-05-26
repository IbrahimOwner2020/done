import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuth } from "../../hooks/AuthProvider";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {
			isUser: false,
		},
	};
}

const Dashboard = ({
	isUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { user } = useAuth();
	const route = useRouter();
	console.log(user);

	return (
		<div>
			<>Thi is the user&apso;s Dashboard</>;
			<button
				onClick={() => {
					signOut(auth)
						.then(() => route.push("/auth/login"))
						.catch((error) => {
							console.log("Error while signing out");
							console.log(error);
						});
				}}
			>
				Sign out
			</button>
		</div>
	);
};

export default Dashboard;
