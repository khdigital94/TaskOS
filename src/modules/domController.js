import { appController } from "./appController";

const domController = (() => {
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
		const taskContainer = document.querySelector(".taskContainer");
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
                    <div class="task">
					    <p>${task.name}</p>
						<div class="taskFooter">
							<span class="taskPriority">${task.priority}</span>
							<span class="taskDueDate">${task.dueDate}</span>
						</div>
					</div>
            `;
		});
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

	return { loadWorkspace, setCurrentworkspace, getCurrentworkspace };
})();

export { domController };
