import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'
import Link from "next/link";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {
			user: null,
		},
	};
}

const LoginPage = ({
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const route = useRouter()

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
                            console.log("Login successfully")
                            route.push('/dashboard')
                        })
						.catch((error) => {
							console.log("Error loging in");
							console.log(error);
						});
				}}
			>
				<Form className="flex flex-col items-center max-w-xl my-6 space-y-2 mx-auto">
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
						className="bg-blue-500 text-white px-6 py-1 rounded-lg"
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
