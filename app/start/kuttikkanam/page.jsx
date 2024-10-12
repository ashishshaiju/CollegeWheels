"use client";

import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import { navigateLogin, navigateStart, navigateHome } from "@/app/actions";
import tw from "tailwind-styled-components";
import { generateOTP, sendUserName } from "@/app/verify";
import { addCurrent } from "../currentUser";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const kuttikkanamPage = () => {
	const pb = new PocketBase("http://127.0.0.1:8090");
	const [isuserValid, setUserValid] = useState(true);
	const [userName, setUserName] = useState(null);

	const checkUserValid = async () => {
		try {
			const userN = await pb.authStore.model.name;
			setUserName(userN);
			setUserValid(true);
		} catch (error) {
			console.error("Error checking user validity:", error);
			navigateLogin();
		}
		if (isuserValid == false) {
			navigateLogin();
		}
	};

	useEffect(() => {
		checkUserValid();
	}, []);

	// const initialValues = {
	// 	pin: "",
	// };

	// const onSubmit = () => {
	// 	let data = {
	// 		pin: formik.values.pin,
	// 		};

	// 		toast({
	// 					title: "You submitted the following values:",
	// 					description: (
	// 						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
	// 							<code className="text-white">{JSON.stringify(data.pin, null, 2)}</code>
	// 						</pre>
	// 					),
	// 				});
	// };

	// const formik = useFormik({
	// 	initialValues,
	// 	onSubmit,
	// });

	// const FormSchema = z.object({
	// 	pin: z.string().min(6, {
	// 		message: "Your one-time password must be 6 characters.",
	// 	}),
	// });

	// const form = useForm({
	// 	resolver: zodResolver(FormSchema),
	// 	defaultValues: {
	// 		pin: "",
	// 	},
	// });

	// function handleSubmit(data) {
	// 	// setValue(data);
	// 	console.log(parseInt(value));
	// 	toast({
	// 		title: (<p>You submitted the following values: {Number(value)}</p>)
	// 		// description: (
	// 		// 	<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
	// 		// 		<code className="text-white">{JSON.stringify(data, null, 2)}</code>
	// 		// 	</pre>
	// 		// ),
	// 	});
	// }
	const [randomNumber, setRandomNumber] = useState(0);
	const handleGenerateOTP = () => {
		const random = generateOTP();
		setRandomNumber(random);
	};

	const [showCodeBtn, setShowCodeBtn] = useState(false);
	const sureAction = async () => {
		addCurrent(pb.authStore);
		setShowCodeBtn(true);
	};

	return (
		<Container>
			<ConfirmContainer>
				<Heading>
					{showCodeBtn
						? "Click To Generate Verification Code"
						: "Confirm Your Ride To Kuttikkanam?"}
				</Heading>
				{!showCodeBtn && (
					<ButtonContainer>
						<Button
							className="w-20"
							variant="secondary"
							onClick={() => sureAction()}
						>
							Sure
						</Button>
						<Button
							className="w-20"
							variant="secondary"
							onClick={() => navigateHome()}
						>
							Cancel
						</Button>
					</ButtonContainer>
				)}
			</ConfirmContainer>
			{showCodeBtn && (
				<Dialog>
					<VerifyButtonCont>
						<DialogTrigger>
							<Button onClick={handleGenerateOTP}>Show Code</Button>
						</DialogTrigger>
						<Text>
							Click the button above to generate the Verification code.
							<br />
							Show the code generated to the driver when arrived.
						</Text>
					</VerifyButtonCont>
					<DialogContent className="flex flex-col items-start">
						<DialogHeader>
							<DialogTitle>Verification Code</DialogTitle>
							<DialogDescription>
								Show this code to the driver <br />
								Start the ride only after verifying the correct code.
							</DialogDescription>
						</DialogHeader>
						<PinBox>{randomNumber}</PinBox>
					</DialogContent>
				</Dialog>
			)}
		</Container>
	);
};
export default kuttikkanamPage;

const PinBox = tw.div`
flex flex-col items-center justify-center w-full tracking-[2em] text-black text-xl font-extrabold
`;

const Container = tw.div`
flex flex-col items-center justify-center h-screen bg-gray-300
`;

const ConfirmContainer = tw.div`
flex flex-col items-center justify-center bg-gray-300
`;

const ButtonContainer = tw.div`
flex items-center justify-around gap-10
`;

const Heading = tw.h1`
text-black text-xl font-extrabold mb-8
`;

const VerifyButtonCont = tw.div`
flex flex-col items-center justify-center gap-4
`;

const Text = tw.p`
text-black text-xs mx-6 text-center
`;

// import React from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';
// import './styles.scss';

// const DialogDemo = () => (
//   <Dialog.Root>
//     <Dialog.Trigger asChild>
//       <button className="Button violet">Edit profile</button>
//     </Dialog.Trigger>
//     <Dialog.Portal>
//       <Dialog.Overlay className="DialogOverlay" />
//       <Dialog.Content className="DialogContent">
//         <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
//         <Dialog.Description className="DialogDescription">
//           Make changes to your profile here. Click save when you're done.
//         </Dialog.Description>
//         <fieldset className="Fieldset">
//           <label className="Label" htmlFor="name">
//             Name
//           </label>
//           <input className="Input" id="name" defaultValue="Pedro Duarte" />
//         </fieldset>
//         <fieldset className="Fieldset">
//           <label className="Label" htmlFor="username">
//             Username
//           </label>
//           <input className="Input" id="username" defaultValue="@peduarte" />
//         </fieldset>
//         <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
//           <Dialog.Close asChild>
//             <button className="Button green">Save changes</button>
//           </Dialog.Close>
//         </div>
//         <Dialog.Close asChild>
//           <button className="IconButton" aria-label="Close">
//             <Cross2Icon />
//           </button>
//         </Dialog.Close>
//       </Dialog.Content>
//     </Dialog.Portal>
//   </Dialog.Root>
// );

// export default DialogDemo;
