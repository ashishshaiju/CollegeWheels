"use client";

import { useState } from "react";
import tw from "tailwind-styled-components";
import auto from "../assets/auto.png";
import "./globals.css";
import Image from "next/image";
import PocketBase from "pocketbase";
import {
	navigateLogin,
	navigateStartPallikunnu,
	navigateStartKuttikkanam,
} from "./actions";

export default function Home() {
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
			navigateLogin();
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};
	checkUserValid();

	const goToPallikunnu = () => {
		navigateStartPallikunnu();
	};

	const goToKuttikkanam = () => {
		navigateStartKuttikkanam();
	};

	return (
		<Main>
			<Map>
				<iframe
					src="https://embed.waze.com/iframe?zoom=16&lat=9.582618&lon=76.971127&ct=livemap"
					width="15000"
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
					<InputButton>Where To?</InputButton>
					<RideButtons>
						<RideButton onClick={goToKuttikkanam}>
							<AutoImg>
								<Image src={auto} />
							</AutoImg>
							<RideText>Kuttikkanam</RideText>
						</RideButton>
						<RideButton onClick={goToPallikunnu}>
							<AutoImg>
								<Image src={auto} />
							</AutoImg>
							<RideText>Pallikunnu</RideText>
						</RideButton>
					</RideButtons>
				</ActionButtons>
			</ActionItems>
		</Main>
	);
}

const Map = tw.div`
map flex-1 text-center flex items-center justify-center 
`;

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
gap-5
`;

const RideButton = tw.div`
rideButton h-40 bg-gray-200 text-2xl p-4 
rounded-xl items-center w-44 text-center
flex justify-center flex-col hover:scale-105
transition flex-1 
`;

const AutoImg = tw.div`
autoImg h-24 w-28
`;

const RideText = tw.p`
text-xl 
`;
