import { appController } from "./appController";

const domController = (() => {
	const qs = (element) => document.querySelector(element);
	let currentCategory = "All";
	let currentWorkspace;

	const loadWorkspace = () => {
		setWorkspaceTitle();
		setWorkspaceCategories();
		setWorkspaceTasklist();
		setMenu();
	};

	const setCurrentworkspace = (workspace) => {
		currentWorkspace = workspace;
		loadWorkspace();
	};

	const getCurrentworkspace = () => {
		return currentWorkspace;
	};

	const setWorkspaceTitle = () => {
		qs(".workspaceTitle").textContent = currentWorkspace.name;
	};

	const setWorkspaceCategories = () => {
		const workspaces = appController.getToDos();

		qs(".catContainer").innerHTML = "";
		qs(".catContainer").innerHTML = `<button class="catButton catActive">All</button>`;

		workspaces.forEach((workspace) => {
			if (workspace.name.trim().toLowerCase() === currentWorkspace.name.trim().toLowerCase()) {
				workspace.categories.forEach((category) => {
					qs(".catContainer").innerHTML += `
                        <button class="catButton">${category.name}</button>
                    `;
				});
			}
		});
	};

	const setWorkspaceTasklist = () => {
		const workspaces = appController.getToDos();
		const current = workspaces.find((ws) => ws.name.trim().toLowerCase() === currentWorkspace.name.trim().toLowerCase());
		let taskArray = [];

		qs(".taskContainer").innerHTML = "";

		workspaces.forEach((workspace) => {
			if (workspace.name.trim().toLowerCase() === currentWorkspace.name.trim().toLowerCase()) {
				// Erstmal nur die Aufgaben der aktuellen Kategorie
				workspace.categories.forEach((category) => {
					category.tasks.forEach((task) => {
						taskArray.push(task);
					});
				});
			}
		});

		if (currentCategory !== "All") {
			taskArray = taskArray.filter((task) => task.category === currentCategory);
		}

		taskArray.forEach((task) => {
			qs(".taskContainer").innerHTML += `
                    <div class="task" data-id="${task.id}">
					    <p>${task.name}</p>
						<div class="taskFooter">
							<div class="taskbadges">
								<span class="taskPriority priority${task.priority}">${task.priority}</span>
								<span class="taskCategory">${task.category}</span>
								<span class="taskCategory">🕓 ${task.dueDate}</span>
							</div>
						</div>
					</div>
            `;
		});
	};

	const filterTasksByCat = (cat) => {
		const workspaces = appController.getToDos();
		currentCategory = cat;
		let filteredTasks = [];

		workspaces.forEach((workspace) => {
			if (workspace.name === currentWorkspace.name) {
				workspace.categories.forEach((category) => {
					// Wenn die Kategorie mit der gewählten übereinstimmt, oder "All" gewählt wurde
					if (cat === "All" || category.name === cat) {
						category.tasks.forEach((task) => {
							filteredTasks.push(task); // Tasks zur Liste hinzufügen
						});
					}
				});
			}
		});

		qs(".taskContainer").innerHTML = "";

		filteredTasks.forEach((task) => {
			qs(".taskContainer").innerHTML += `
      				<div class="task" data-id="${task.id}">
					    <p>${task.name}</p>
						<div class="taskFooter">
							<div class="taskbadges">
								<span class="taskPriority priority${task.priority}">${task.priority}</span>
								<span class="taskCategory">${task.category}</span>
								<span class="taskCategory">🕓 ${task.dueDate}</span>
							</div>
						</div>
					</div>
    `;
		});

		const catButtons = document.querySelectorAll(".catButton");
		catButtons.forEach((button) => {
			button.classList.remove("catActive");
			if (button.textContent === cat) {
				button.classList.add("catActive");
			}
		});
	};

	const setMenu = () => {
		const workspaces = appController.getToDos();
		const currentWorkspace = getCurrentworkspace();

		qs(".menu").innerHTML = "";

		workspaces.forEach((workspace) => {
			qs(".menu").innerHTML += `
				<li class="menuItem">
					<div class="${workspace.id === currentWorkspace.id ? "activeWS" : null}"></div>
					${workspace.name}
				</li>
			`;
		});

		qs(".menu").innerHTML += `
				<li class="addNewWorkspace">
					<button class="addNewWorkspaceBtn">Create New Workspace</button>
				</li>
				<li class="submitDiv hide">
					<input class="newWsInput" type="Text" placeholder="Enter a workspace name" />
					<button class="newWsSubmitBtn">Submit</button>
					<span class="errorMessage"></span>
				</li>
		`;
	};

	const editTask = (openedTask) => {
		const workspaces = appController.getToDos();
		qs(".newTaskPopup").classList.toggle("hide");

		workspaces.forEach((workspace) => {
			if (workspace.name === currentWorkspace.name) {
				workspace.categories.forEach((category) => {
					category.tasks.forEach((task) => {
						if (task.id === openedTask.dataset.id) {
							qs("#taskName").value = task.name;
							qs("#taskDescription").value = task.description;
							qs("#taskCategory").value = task.category;
							qs("#taskPriority").value = task.priority;
							qs("#taskDueDate").value = task.dueDate; // MUSS NOCH GEFIXED WERDEN
						}
					});
				});
			}
		});
	};

	return { loadWorkspace, setCurrentworkspace, getCurrentworkspace, setWorkspaceTasklist, filterTasksByCat, editTask };
})();

export { domController };
