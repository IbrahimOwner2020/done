import { GetServerSidePropsContext } from "next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import nookies from "nookies";
import Link from "next/link";
import { adminAuth } from "../../firebase/firebaseAdmin";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
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
					user: null,
				},
			};
		});
}

const LoginPage = () => {
	const route = useRouter();

	return (
		<div>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={async (values) => {
					await signInWithEmailAndPassword(
						auth,
						values.email,
						values.password
					)
						.then(() => {
							console.log("Login successfully");
							route.push("/user/dashboard");
						})
						.catch((error) => {
							console.log("Error loging in");
							console.log(error);
						});
				}}
			>
				<Form className="flex flex-col items-center max-w-xl mx-auto my-6 space-y-2">
					<Field
						type="email"
						name="email"
						placeholder="Email address"
						className="border"
					/>
					<Field
						type="password"
						name="password"
						placeholder="password"
						className="border"
					/>
					<button
						type="submit"
						className="px-6 py-1 text-white bg-blue-500 rounded-lg"
					>
						Log in
					</button>
				</Form>
			</Formik>

			<p>or</p>
			<button
				className="bg-red-500"
				onClick={() => {
					console.log("continue with google");
				}}
			>
				Signin with google
			</button>
			<p>
				Don&apos;t have an account{" "}
				<Link href="/auth/signup">
					<a>Sign up</a>
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
