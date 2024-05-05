"use client";

import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import { navigateLogin } from "@/app/actions";
import tw from "tailwind-styled-components";

import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";


const pallikkunnuPage = () => {
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

	const randomSixDigitNumber = () => {
		return Math.floor(Math.random() * 900000) + 100000;
	};

	const [randomNumber, setRandomNumber] = useState(0);

	const generateRandomNumber = () => {
		setRandomNumber(randomSixDigitNumber());
	};

	const [showCodeBtn, setShowCodeBtn] = useState(false);

	return (
		<Container>
			<ConfirmContainer>
				<Heading>{showCodeBtn?"Click To Generate Verification Code":"Confirm Your Ride To Pallikunnu?"}</Heading>
				{!showCodeBtn && (
				<ButtonContainer>
					<Button
						className="w-20"
						variant="secondary"
						onClick={() => {
							setShowCodeBtn(true);
						}}
					>
						Sure
					</Button>
					<Button className="w-20" variant="secondary">
						Cancel
					</Button>
				</ButtonContainer>)}
			</ConfirmContainer>
			{showCodeBtn && (
				<Dialog>
					<VerifyButtonCont>
						<DialogTrigger>
							<Button onClick={generateRandomNumber}>Show Code</Button>
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
						<PinBox>
								{randomNumber}
						</PinBox>
					</DialogContent>
				</Dialog>
			)}
		</Container>
	);
};

export default pallikkunnuPage;

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

