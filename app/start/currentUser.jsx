import PocketBase from "pocketbase";
export async function addCurrent(user) {
  const data = {
    "user": user.model
};
	const pb = new PocketBase("http://127.0.0.1:8090");
  // const authAdmin = await pb.admins.authWithPassword('ashishshaiju@gmail.com', '1234567890').catch((error)=>console.log(error))
  try {
		await pb
			.collection('requests')
			.create(data).then(console.log(data))
			
	} catch (error) {
		console.log(error);
	}
}
