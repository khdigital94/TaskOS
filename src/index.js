import "./app.css";
import { appController, Workspace, Task } from "./modules/appController";
import { domController } from "./modules/domController";

document.addEventListener("DOMContentLoaded", () => {
	const qs = (element) => document.querySelector(element);

	appController.setToDos();

	const workspace1 = new Workspace("My Workspace 🚀", crypto.randomUUID());
	const workspace2 = new Workspace("Another Workspace ✅", crypto.randomUUID());
	appController.addWorkspace(workspace1);
	appController.addWorkspace(workspace2);

	appController.addTask(new Task("Clean the apartment", crypto.randomUUID(), workspace1.name, "Personal", "Vacuum, mop floors, and do laundry", "26.04.2025", "High"));
	appController.addTask(new Task("Team Standup", crypto.randomUUID(), workspace1.name, "Work", "Daily sync with the dev team", "27.04.2025", "Medium"));
	appController.addTask(new Task("Research destinations", crypto.randomUUID(), workspace1.name, "Travel", "Look into options for summer vacation", "28.04.2025", "Low"));
	appController.addTask(new Task("Watch new series", crypto.randomUUID(), workspace1.name, "Entertainment", "Start season 2 of that thriller show", "29.04.2025", "Low"));
	appController.addTask(new Task("Prepare presentation", crypto.randomUUID(), workspace1.name, "Work", "Slides for the client pitch on Friday", "30.04.2025", "High"));
	appController.addTask(new Task("Go for a walk", crypto.randomUUID(), workspace1.name, "Personal", "Clear the mind with a 30-minute walk", "01.05.2025", "Medium"));
	appController.addTask(new Task("Book train tickets", crypto.randomUUID(), workspace1.name, "Travel", "Tickets to Berlin for next weekend", "02.05.2025", "Medium"));
	appController.addTask(new Task("Clean the garage", crypto.randomUUID(), workspace2.name, "Work", "Organize tools and clean the garage", "09.05.2025", "Medium"));
	appController.addTask(new Task("Organize the pantry", crypto.randomUUID(), workspace2.name, "Personal", "Sort out expired items and tidy up", "10.05.2025", "Low"));
	appController.addTask(new Task("Fix the fence", crypto.randomUUID(), workspace2.name, "Work", "Repair the broken fence in the garden", "11.05.2025", "High"));
	appController.addTask(new Task("Book dentist appointment", crypto.randomUUID(), workspace2.name, "Personal", "Schedule appointment for the whole family", "12.05.2025", "Medium"));
	appController.addTask(new Task("Laundry", crypto.randomUUID(), workspace2.name, "Personal", "Wash, fold, and put away clothes", "13.05.2025", "Low"));
	appController.addTask(new Task("Pick up groceries", crypto.randomUUID(), workspace2.name, "Personal", "Go to the store and pick up weekly groceries", "14.05.2025", "High"));
	appController.addTask(new Task("Prepare for family barbecue", crypto.randomUUID(), workspace2.name, "Personal", "Get everything ready for the barbecue this weekend", "15.05.2025", "High"));
	appController.addTask(new Task("Help with homework", crypto.randomUUID(), workspace2.name, "Personal", "Assist kids with their school assignments", "16.05.2025", "Medium"));

	domController.setCurrentworkspace(workspace1);

	// EVENTLISTENER
	const toggleMenu = qs("svg");
	const sidebar = qs(".menuContent");
	const overlay = qs(".sideMenuOverlay");

	// Shows / hides menu
	toggleMenu.addEventListener("click", () => {
		sidebar.classList.toggle("showMenu");
		overlay.classList.toggle("showOverlay");
	});

	// Menu
	const menuDiv = qs(".menuContent");
	menuDiv.addEventListener("click", (event) => {
		const newWorkspace = event.target.textContent;
		const workspaces = appController.getToDos();
		const submitDiv = qs(".submitDiv");
		const addNewDiv = qs(".addNewWorkspace");
		const newWsInput = qs(".newWsInput");
		const errorMessage = qs(".errorMessage");

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

	// Hiding menu overlay
	overlay.addEventListener("click", () => {
		sidebar.classList.remove("showMenu");
		overlay.classList.remove("showOverlay");
	});

	// Filtering tasks by category
	const catContainer = qs(".catContainer");
	catContainer.addEventListener("click", (event) => {
		if (event.target.classList.contains("catButton")) {
			domController.filterTasksByCat(event.target.textContent);
		}
	});

	// Öffnet die Target Task
	let taskId;

	qs(".taskContainer").addEventListener("click", (event) => {
		qs(".popupOverlay").style.pointerEvents = "all";

		const taskElement = event.target.closest(".task");
		const overlay = event.target.closest(".popupOverlay");

		if (taskElement) {
			domController.editTask(taskElement);
			taskId = taskElement.dataset.id;
		}
	});

	// Bearbeiten
	qs(".popup").addEventListener("change", (event) => {
		let workspaces = appController.getToDos();
		const key = event.target.dataset.key;

		if (event.target.closest(".formInput")) {
			workspaces.forEach((workspace) => {
				workspace.categories.forEach((category) => {
					category.tasks.forEach((task) => {
						if (task.id === taskId) {
							appController.updateTask(task, key, event.target.value);
						}
					});
				});
			});
		}
		domController.setWorkspaceTasklist();
	});

	qs(".popupOverlay").addEventListener("click", () => {
		qs(".newTaskPopup").classList.toggle("hide");
	});
});
