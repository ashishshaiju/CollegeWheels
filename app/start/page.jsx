"use client";

import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import { navigateLogin, navigateStart } from "@/app/actions";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@radix-ui/react-dialog"



const startPage = () => {
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

	return <div>
    {/* <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog> */}
</div>;
};



export default startPage;


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

