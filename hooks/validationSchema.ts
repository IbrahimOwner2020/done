import * as yup from "yup";

const signUpSchema = yup.object({
	name: yup
		.string()
		.min(3, "Name should be not less than 3 characters")
		.max(15, "Name should nor exceed 15 characters")
		.required("Enter your name"),
	email: yup
		.string()
		.email("Please enter a valid email address")
		.required("Please enter your email"),
	password: yup
		.string()
		.min(8, "Password must contain more than 8 characters")
		.max(16, "Password mot contain more than 16 characters")
		.required("Please enter password"),
});

export { signUpSchema };
