import { appController } from "./appController";

const domController = (() => {
	let currentWorkspace;
	const taskContainer = document.querySelector(".taskContainer");

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
		const title = document.querySelector(".workspaceTitle");
		title.textContent = currentWorkspace.name;
	};

	const setWorkspaceCategories = () => {
		const catContainer = document.querySelector(".catContainer");
		const workspaces = appController.getToDos();

		catContainer.innerHTML = "";
		catContainer.innerHTML = `<button class="catButton catActive">All</button>`;

		workspaces.forEach((workspace) => {
			if (workspace.name.trim().toLowerCase() === currentWorkspace.name.trim().toLowerCase()) {
				workspace.categories.forEach((category) => {
					catContainer.innerHTML += `
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

		taskContainer.innerHTML = "";

		workspaces.forEach((workspace) => {
			if (workspace.name.trim().toLowerCase() === currentWorkspace.name.trim().toLowerCase()) {
				workspace.categories.forEach((category) => {
					category.tasks.forEach((task) => {
						taskArray.push(task);
					});
				});
			}
		});

		taskArray.forEach((task) => {
			taskContainer.innerHTML += `
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
		console.log(cat + " was clicked!");

		const workspaces = appController.getToDos();
		let filteredTasks = [];

		workspaces.forEach((workspace) => {
			if (workspace.name === currentWorkspace.name) {
				workspace.categories.forEach((category) => {
					if (category.name === cat && cat !== "All") {
						category.tasks.forEach((task) => {
							filteredTasks.push(task);
							console.log(`Showing tasks in category ${cat}`);
						});
					} else if (cat === "All") {
						category.tasks.forEach((task) => {
							filteredTasks.push(task);
							console.log("Showing all tasks");
						});
					}
				});
			}
		});

		taskContainer.innerHTML = "";

		filteredTasks.forEach((task) => {
			taskContainer.innerHTML += `
                    <div class="task">
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

		console.log(filteredTasks);
	};

	const setMenu = () => {
		const workspaces = appController.getToDos();
		const currentWorkspace = getCurrentworkspace();
		const menu = document.querySelector(".menu");

		menu.innerHTML = "";

		workspaces.forEach((workspace) => {
			menu.innerHTML += `
				<li class="menuItem">
					<div class="${workspace.id === currentWorkspace.id ? "activeWS" : null}"></div>
					${workspace.name}
				</li>
			`;
		});

		menu.innerHTML += `
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
		const popup = document.querySelector(".newTaskPopup");

		const formTaskName = document.querySelector("#taskName");
		const formTaskDescription = document.querySelector("#taskDescription");
		const formTaskCategory = document.querySelector("#taskCategory");
		const formTaskPriority = document.querySelector("#taskPriority");
		const formTaskDueDate = document.querySelector("#taskDueDate");

		popup.classList.toggle("hide");

		workspaces.forEach((workspace) => {
			if (workspace.name === currentWorkspace.name) {
				workspace.categories.forEach((category) => {
					category.tasks.forEach((task) => {
						if (task.id === openedTask.dataset.id) {
							formTaskName.value = task.name;
							formTaskDescription.value = task.description;
							formTaskCategory.value = task.category;
							formTaskPriority.value = task.priority;
							formTaskDueDate.value = task.dueDate; // MUSS NOCH GEFIXED WERDEN
						}
					});
				});
			}
		});
	};

	return { loadWorkspace, setCurrentworkspace, getCurrentworkspace, setWorkspaceTasklist, filterTasksByCat, editTask };
})();

export { domController };
