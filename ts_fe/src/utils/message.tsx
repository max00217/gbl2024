import { getMessaging, getToken } from "firebase/messaging";
import { app } from "./firebaseInit";

console.log("Requesting permission...");
Notification.requestPermission().then((permission) => {
	if (permission === "granted") {
		console.log("Notification permission granted.");
		const messaging = getMessaging(app);
		getToken(messaging, {
			vapidKey: process.env.NEXT_PUBLIC_MESSAGING_KEY,
		}).then((currentToken) => {
			if (currentToken) {
				console.log("currentToken: ", currentToken);
			} else {
				console.log("Can not get token");
			}
		});
	} else {
		console.log("Do not have permission!");
	}
});
