"use client";

// import img from "images/signin-image.jpg";
// import tw from "tailwind-styled-components";
// import Image from "next/image";
import React from "react";
import { useState } from "react";
import "../style.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import PocketBase from "pocketbase";
import { navigateHome, navigateRegister } from "@/app/actions";

const LoginPage = () => {

	const pb = new PocketBase("http://127.0.0.1:8090");

	const [isLoggedIn, setLoggedIn] = useState(false);

	const authUser = async (data) => {
		try {
			const authData = await pb
				.collection("users")
				.authWithPassword(data.email, data.password)
				.then(() => {
					// alert("Logged in as " + pb.authStore.model.name);
					// after the above you can also access the auth data from the authStore
					setLoggedIn(true);
					console.log("AuthValid: ", pb.authStore.isValid);
					console.log("Token: ", pb.authStore.token);
					console.log("Id: ", pb.authStore.model.id);
					console.log("Name: ", pb.authStore.model.name);
					alert("Logged in as " + pb.authStore.model.name);
					navigateHome();
				});
		} catch (error) {
			console.log("authError: ", error);
			alert("Invalid credentials, Try again");
		}

		// "logout" the last authenticated model
		// pb.authStore.clear();
	};

	// Formik stuffs: Form validation
	const initialValues = {
		email: "",
		password: "",
	};

	const onSubmit = () => {
		let data = {
			email: formik.values.email,
			password: formik.values.password,
		};
		authUser(data);
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid Email!").required("Required!!!"),
		password: Yup.string().required("Required!"),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	const gotoRegister = () => {
		navigateRegister();
	};

	return (
		<div className="session">
			<div className="left"></div>
			<form onSubmit={formik.handleSubmit} className="log-in">
				<h4>
					<span>College Wheels</span>
				</h4>
				<p>Welcome back! Log in to your account to view today's clients:</p>
				<div className="floating-label">
					<input
						placeholder="Email"
						type="email"
						name="email"
						id="email"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
					<label htmlFor="email">Email: </label>
					{/* {formik.touched.email &&
						(formik.errors.email ? (
							<div className="error_message">{formik.errors.email}</div>
						) : null)} */}
				</div>
				<div className="floating-label">
					<input
						placeholder="Password"
						type="password"
						name="password"
						id="password"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					<label htmlFor="password">Password: </label>
				</div>
				<div className="flex justify-between w-full items-center">
				<button className="SubmitBtn" type="submit">Log in</button>
				<a className="text-sm hover:underline" onClick={gotoRegister}>Register</a>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
