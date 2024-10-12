import PocketBase from "pocketbase";

export async function GET() {
	const pb = new PocketBase("http://127.0.0.1:8090");
	const authAdmin = await pb.admins
		.authWithPassword("ashishshaiju@gmail.com", "1234567890")
		.catch((error) => console.log(error));
	const otp = 4665;
	try {
		await pb.collection("driver").update("suzg46hxjz2zueu", { otp: otp });

		return new Response(JSON.stringify({ success: true, otp }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				Authorization: authAdmin.token,
			},
		});
	} catch (error) {
		console.error("Error updating OTP:", error);
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
}
