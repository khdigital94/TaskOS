import "./app.css";
import { appController } from "./modules/appController";

document.addEventListener("DOMContentLoaded", () => {
	let arr = {
		name: "Default Workplace",
		categories: {
			name: "Persönlich",
			toDos: {
				name: "Einkaufen gehen",
				description: "Laborum elit exercitation proident consectetur sint ex dolore.",
				dueDate: "10.04.2025",
				priority: "High",
				checklist: ["Bananen", "Äpfel", "Fensterreiniger", "Thai Curry", "Toasty"],
			},
		},
	};

	appController.setToDos(arr);
	const toDos = appController.getToDos();

	console.log(toDos);
});
