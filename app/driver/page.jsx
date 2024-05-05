"use client";

import React from "react";
import tw from "tailwind-styled-components";
import "../globals.scss";
import { useState } from "react";
import { navigateLoginDriver } from "@/app/actions";
import PocketBase from "pocketbase";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Driver() {
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

	const logout = () => {
		try {
			pb.authStore.clear();
			navigateLoginDriver();
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	const [value, setValue] = useState('')

	checkUserValid();

	return (
		<Main>
			<Map>
				<iframe
					src="https://embed.waze.com/iframe?zoom=16&lat=9.582618&lon=76.971127&ct=livemap"
					width="600"
					height="450"
					allowfullscreen
				></iframe>
			</Map>

			<ActionItems>
				<Header>
					<LogoContainer>College Wheels</LogoContainer>
					<Profile onClick={logout}>
						<UserImage src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" />
						<UserName>{userName}</UserName>
					</Profile>
				</Header>

				<ActionButtons>
					<InputButton>New Requests</InputButton>
					<RideButtons>
						<RideButton>
							<Dialog>
								<RideText>Neha</RideText>
								<DialogTrigger>
									<Button className="w-32">Accept</Button>
								</DialogTrigger>
								<DialogContent className="flex flex-col items-start">
									<DialogHeader>
										<DialogTitle>Verify Code from User</DialogTitle>
										<DialogDescription>
											The code will be displayed in the user's phone. <br />
											Start the ride only after entering the correct code.
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-2">
										<InputOTP
											maxLength={6}
											value={value}
											onChange={() => setValue(value)}
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
										<div className="text-center text-sm">
											{value === "" ? (
												<>Enter your one-time password.</>
											) : (
												<>You entered: {value}</>
											)}
										</div>
									</div>
									<Button type="submit">
                    Submit
                  </Button>
								</DialogContent>
							</Dialog>
						</RideButton>
					</RideButtons>
				</ActionButtons>
			</ActionItems>
		</Main>
	);
}

const Map = tw.div`flex-1 text-center flex items-center justify-center`;

const ActionItems = tw.div`
flex-1 bg-white
`;

const Main = tw.div`
flex h-lvh flex-col justify-evenly bg-red
`;

const Header = tw.div`
flex justify-between p-3 items-center
`;

const LogoContainer = tw.h1`
logoContainer text-2xl font-bold text-gray-800
`;

const Profile = tw.div`
flex flex-col items-center 
`;

const UserImage = tw.img`
rounded-full w-10 border border-green-200 p-px
`;

const UserName = tw.h1`text-black text-sm`;

const ActionButtons = tw.div`
actionButtons-cont text-black m-4 h-3/5 flex
flex-col justify-around
`;

const InputButton = tw.div`
inputButton h-20 bg-gray-200 text-2xl p-4 flex
rounded-xl items-center justify-center
`;

const RideButtons = tw.div`
rideButtons-cont h-40 flex justify-around
gap-5 flex-col
`;

const RideButton = tw.div`
rideButton h-40 bg-gray-200 text-2xl p-4 px-6 
rounded-xl items-center w-auto text-center
flex justify-around hover:scale-102
transition flex-1
`;

const AutoImg = tw.div`
autoImg h-24 w-28
`;

const RideText = tw.p`
text-xl w-auto
`;
