"use client";

// import Image from "next/image";
// import img from "images/signin-image.jpg";
// import tw from "tailwind-styled-components";
import "../style.scss";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PocketBase from "pocketbase";
import { navigateLogin } from "@/app/actions";

const RegisterPage = () => {
	const pb = new PocketBase("http://127.0.0.1:8090");

	// create function
	const createUser = async (nudata) => {
		console.log("nudata: ", nudata);
		try {
			const data = {
				name: nudata.name,
				email: nudata.email,
				emailVisibility: true,
				password: nudata.password,
				passwordConfirm: nudata.password,
				contact: nudata.phone,
				dept: nudata.dept,
				sem: nudata.sem,
			};
			console.log("data: ", data);
			const record = await pb
				.collection("users")
				.create(data)
				.then((e) => {
					alert("User Created!");
					console.log("e: ", e);

					//Redirect to login page
					navigateLogin();
				});
		} catch (error) {
			console.log("authError: ", error);
			alert("Somethings Wrong, Try again");
		}
	};

	// Formik stuffs: Form validation
	const initialValues = {
		name: "",
		email: "",
		phone: "",
		dept: "",
		sem: "",
		password: "",
	};

	const onSubmit = () => {
		let data = {
			name: formik.values.name,
			email: formik.values.email,
			phone: Number(formik.values.phone),
			dept: formik.values.dept,
			sem: formik.values.sem,
			password: formik.values.password,
		};
		createUser(data);
	};

	// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid Email!").required("Required!!!"),
		password: Yup.string().required("Required!"),
		name: Yup.string().required("Required!"),
		// phone: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Required!!!"),
		phone: Yup.string().required("Required!!!"),
		dept: Yup.string().required("Required!"),
		sem: Yup.string().required("Required!"),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	const gotoLogin = () => {
		navigateLogin();
	}

	return (
		<div className="session">
			<div className="left"></div>
			<form
				onSubmit={formik.handleSubmit}
				className="sign-up"
				autocomplete="off"
			>
				<h4>
					<span>College Wheels</span>
				</h4>
				<p>Welcome! Register in to your account to use our services:</p>

				<div className="floating-label">
					<input
						placeholder="Name"
						type="text"
						name="name"
						id="name"
						autocomplete="off"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.name}
					/>
					<label htmlFor="name">Name: </label>
				</div>

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
				</div>

				<div className="floating-label">
					<input
						placeholder="Contact No"
						type="phone"
						name="phone"
						id="phone"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.phone}
					/>
					<label htmlFor="phone">Contact No: </label>
				</div>

				<div className="class_cont flex flex-row">
					<div className="floating-label">
						<input
							placeholder="Dept"
							type="text"
							name="dept"
							id="dept"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.dept}
						/>
						<label htmlFor="dept">Dept: </label>
					</div>

					<div className="floating-label">
						<input
							placeholder="Sem"
							type="text"
							name="sem"
							id="sem"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.sem}
						/>
						<label htmlFor="sem">Sem: </label>
					</div>
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
					<button type="submit">Register</button>
					<a className="text-sm hover:underline" onClick={gotoLogin}>
						Login
					</a>
				</div>
			</form>
		</div>
	);
};

export default RegisterPage;

// const Heading = tw.h1`
// h-screen text-center
// `;
