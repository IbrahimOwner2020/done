import { GetServerSidePropsContext } from "next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import nookies from "nookies";
import { useRouter } from "next/router";
import { adminAuth } from "../../firebase/firebaseAdmin";
import { signUpSchema } from "../../hooks/validationSchema";

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
						checkUser: null,
					},
				};
			});
	} catch (error) {
		return {
			props: {
				checkUser: null,
			},
		};
	}
};

const SignupPage = () => {
	const route = useRouter();

	return (
		<div className="max-w-xl mx-auto my-6">
			<Formik
				validationSchema={signUpSchema}
				initialValues={{
					name: "",
					email: "",
					password: "",
				}}
				onSubmit={async (values) => {
					await createUserWithEmailAndPassword(
						auth,
						values.email,
						values.password
					)
						.then((userCredentials) => {
							console.log("Account created");
							const user = userCredentials.user;
							console.log(user);

							// update user displayName
							updateProfile(user, {
								displayName: values.name,
							})
								.then(() => {
									console.log("Profile name updated");
									route.push("/user/dashboard");
								})
								.catch((error) => {
									console.log("Error u[dating user name");
									console.log(error);
								});
						})
						.catch((error) => {
							console.log("Error creating account");
							console.log(error);
						});
				}}
			>
				<Form className="flex flex-col items-center space-y-2">
					<Field
						type="text"
						name="name"
						placeholder="Enter your name"
						className="border"
					/>
					<ErrorMessage name="name">
						{(error) => <p>{error}</p>}
					</ErrorMessage>
					<Field
						type="email"
						name="email"
						placeholder="Enter your email address"
						className="border"
					/>
					<ErrorMessage name="email">
						{(error) => <p>{error}</p>}
					</ErrorMessage>
					<Field
						type="password"
						name="password"
						placeholder="Enter your password"
						className="border"
					/>
					<ErrorMessage name="password">
						{(error) => <p>{error}</p>}
					</ErrorMessage>
					<button type="submit">Sign up</button>
				</Form>
			</Formik>
			<p>or</p>
			<button onClick={() => console.log("continue with google")}>
				Sign in with Google
			</button>
			<p>
				Already have an account{" "}
				<Link href="/auth/login">
					<a>Log in</a>
				</Link>{" "}
			</p>
		</div>
	);
};

export default SignupPage;
