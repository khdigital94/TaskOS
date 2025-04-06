import "./app.css";
import { appController, Workspace, Task } from "./modules/appController";
import { domController } from "./modules/domController";

document.addEventListener("DOMContentLoaded", () => {
	appController.setToDos();

	const workspace1 = new Workspace("My Workspace 🚀", crypto.randomUUID());
	const workspace2 = new Workspace("Another Workspace ✅", crypto.randomUUID());
	appController.addWorkspace(workspace1);
	appController.addWorkspace(workspace2);

	const task1 = new Task("Clean the apartment", crypto.randomUUID(), workspace1.name, "Personal", "Vacuum, mop floors, and do laundry", "26.04.2025", "High");
	const task2 = new Task("Team Standup", crypto.randomUUID(), workspace1.name, "Work", "Daily sync with the dev team", "27.04.2025", "Medium");
	const task3 = new Task("Research destinations", crypto.randomUUID(), workspace1.name, "Travel", "Look into options for summer vacation", "28.04.2025", "Low");
	const task4 = new Task("Watch new series", crypto.randomUUID(), workspace1.name, "Entertainment", "Start season 2 of that thriller show", "29.04.2025", "Low");
	const task5 = new Task("Prepare presentation", crypto.randomUUID(), workspace1.name, "Work", "Slides for the client pitch on Friday", "30.04.2025", "High");
	const task6 = new Task("Go for a walk", crypto.randomUUID(), workspace1.name, "Personal", "Clear the mind with a 30-minute walk", "01.05.2025", "Medium");
	const task7 = new Task("Book train tickets", crypto.randomUUID(), workspace1.name, "Travel", "Tickets to Berlin for next weekend", "02.05.2025", "Medium");

	appController.addTask(task1);
	appController.addTask(task2);
	appController.addTask(task3);
	appController.addTask(task4);
	appController.addTask(task5);
	appController.addTask(task6);
	appController.addTask(task7);

	const task8 = new Task("Clean the garage", crypto.randomUUID(), workspace2.name, "Work", "Organize tools and clean the garage", "09.05.2025", "Medium");
	const task9 = new Task("Organize the pantry", crypto.randomUUID(), workspace2.name, "Personal", "Sort out expired items and tidy up", "10.05.2025", "Low");
	const task10 = new Task("Fix the fence", crypto.randomUUID(), workspace2.name, "Work", "Repair the broken fence in the garden", "11.05.2025", "High");
	const task11 = new Task("Book dentist appointment", crypto.randomUUID(), workspace2.name, "Personal", "Schedule appointment for the whole family", "12.05.2025", "Medium");
	const task12 = new Task("Laundry", crypto.randomUUID(), workspace2.name, "Personal", "Wash, fold, and put away clothes", "13.05.2025", "Low");
	const task13 = new Task("Pick up groceries", crypto.randomUUID(), workspace2.name, "Personal", "Go to the store and pick up weekly groceries", "14.05.2025", "High");
	const task14 = new Task("Prepare for family barbecue", crypto.randomUUID(), workspace2.name, "Personal", "Get everything ready for the barbecue this weekend", "15.05.2025", "High");
	const task15 = new Task("Help with homework", crypto.randomUUID(), workspace2.name, "Personal", "Assist kids with their school assignments", "16.05.2025", "Medium");

	appController.addTask(task8);
	appController.addTask(task9);
	appController.addTask(task10);
	appController.addTask(task11);
	appController.addTask(task12);
	appController.addTask(task13);
	appController.addTask(task14);
	appController.addTask(task15);

	domController.setCurrentworkspace(workspace1);

	console.log(appController.getToDos());

	// EVENTLISTENER
	const toggleMenu = document.querySelector("svg");
	const sidebar = document.querySelector(".menuContent");
	const overlay = document.querySelector(".sideMenuOverlay");

	toggleMenu.addEventListener("click", () => {
		sidebar.classList.toggle("showMenu");
		overlay.classList.toggle("showOverlay");
	});

	const menuDiv = document.querySelector(".menuContent");

	menuDiv.addEventListener("click", (event) => {
		const newWorkspace = event.target.textContent;
		const workspaces = appController.getToDos();
		const submitDiv = document.querySelector(".submitDiv");
		const addNewDiv = document.querySelector(".addNewWorkspace");
		const newWsInput = document.querySelector(".newWsInput");
		const errorMessage = document.querySelector(".errorMessage");

		if (event.target.classList.contains("menuItem")) {
			// Opens respective workspace
			workspaces.forEach((workspace) => {
				if (workspace.name.trim().toLowerCase() === newWorkspace.trim().toLowerCase()) {
					domController.setCurrentworkspace(workspace);
				}
			});

			sidebar.classList.remove("showMenu");
			overlay.classList.remove("showOverlay");
		} else if (event.target.classList.contains("addNewWorkspaceBtn")) {
			// Opens container to submit new workspace
			addNewDiv.classList.toggle("hide");
			submitDiv.classList.toggle("hide");
			newWsInput.focus();
		} else if (event.target.classList.contains("newWsSubmitBtn")) {
			// Submits new workspace
			if (!newWsInput.value) {
				errorMessage.textContent = "A name is required to create a workspace.";
			} else if (newWsInput.value.length > 50) {
				errorMessage.textContent = "The name must be less than 50 characters.";
			} else {
				appController.addWorkspace(new Workspace(newWsInput.value.toString(), crypto.randomUUID()));
				domController.loadWorkspace();
			}
		}
	});

	overlay.addEventListener("click", () => {
		sidebar.classList.remove("showMenu");
		overlay.classList.remove("showOverlay");
	});

	const catContainer = document.querySelector(".catContainer");
	catContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("catButton")) {
			domController.filterTasksByCat(event.target.textContent);
		}
	});
});
