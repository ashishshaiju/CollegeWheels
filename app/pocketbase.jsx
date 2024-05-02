// "use server";

// const pb_URL = "http://127.0.0.1:8090";

// import PocketBase from "pocketbase";
// import { navigateHome } from "@/app/actions";

// // export 

// const pb = new PocketBase(pb_URL);

// export async function authUser(userData) {
// 	try {
// 		const authUserData = await pb
// 			.collection("users")
// 			.authWithPassword(userData.email, userData.password)
// 			.then(() => {
// 				// alert("Logged in as " + pb.authStore.model.name);
// 				// after the above you can also access the auth data from the authStore
// 				console.log("AuthValid: ", pb.authStore.isValid);
// 				console.log("Token: ", pb.authStore.token);
// 				console.log("Id: ", pb.authStore.model.id);
// 				console.log("Name: ", pb.authStore.model.name);
// 				// alert("Logged in as " + pb.authStore.model.name);
// 			});
// 	} catch (error) {
// 		console.log("authError: ", error);
// 		alert("Invalid credentials, Try again");
// 	}

// 	if (pb.authStore.isValid) {
// 		navigateHome();
// 	}
// };

// export async function authDriver(authDriverData) {
// 	try {
// 		const authDriverData = await pb
// 			.collection("driver")
// 			.authWithPassword(userData.email, userData.password)
// 			.then(() => {
// 				// alert("Logged in as " + pb.authStore.model.name);
// 				// after the above you can also access the auth data from the authStore
// 				console.log("AuthValid: ", pb.authStore.isValid);
// 				console.log("Token: ", pb.authStore.token);
// 				console.log("Id: ", pb.authStore.model.id);
// 				console.log("Name: ", pb.authStore.model.name);
// 			});

// 	if (pb.authStore.isValid) {
// 		navigateDriver();
// 	}
//   return { 
//     alert("Logged in as " + pb.authStore.model.name); }
//     };
// };catch (error) {
// 		console.log("authError: ", error);

// // "logout" the last authenticated model
// export async function logout() {
// 	pb.authStore.clear()
// }
