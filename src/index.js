import "./app.css";
import { appController, Workspace } from "./modules/appController";

document.addEventListener("DOMContentLoaded", () => {
	const toDos = appController.getToDos();
});
