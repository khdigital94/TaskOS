const appController = (() => {
	let workspaces = [];

	const setToDos = (arr = workspaces) => {
		localStorage.setItem("Aufgaben", JSON.stringify(arr));
	};

	const getToDos = () => {
		return JSON.parse(localStorage.getItem("Aufgaben"));
	};

	const addWorkspace = (newWorkSpace) => {
		const workspaces = getToDos();
		workspaces.push(newWorkSpace);
		setToDos(workspaces);
	};

	const removeWorkspace = (workspaceName) => {
		const workspaces = getToDos();
		const newArr = workspaces.filter((workspace) => workspace.name !== workspaceName);
		setToDos(newArr);
	};

	const addTask = (newTask) => {
		const workspaces = getToDos();

		workspaces.forEach((workspace) => {
			if (workspace.name.trim().toLowerCase() === newTask.workspace.trim().toLowerCase()) {
				workspace.categories.forEach((category) => {
					if (category.name.trim().toLowerCase() === newTask.category.trim().toLowerCase()) {
						category.tasks.push(newTask);
					}
				});
			}
		});

		setToDos(workspaces);
	};

	const removeTask = (taskToRemove) => {
		let workspaces = getToDos();

		workspaces.forEach((workspace) => {
			if (workspace.name.trim().toLowerCase() === taskToRemove.workspace.trim().toLowerCase()) {
				workspace.categories.forEach((category) => {
					if (category.name.trim().toLowerCase() === taskToRemove.category.trim().toLowerCase()) {
						category.tasks.forEach((task) => {
							workspaces = category.tasks.filter((task) => task.id !== taskToRemove.id);
						});
					}
				});
			}
		});

		setToDos(workspaces);
	};

	const updateTask = (obj, keyToChange, newValue) => {
		const workspaces = getToDos();

		workspaces.forEach((workspace) => {
			workspace.categories.forEach((category) => {
				category.tasks.forEach((task) => {
					if (task.id === obj.id) {
						console.log("klappt!!!");
						task[keyToChange] = newValue;
						setToDos(workspaces);
						console.log(task[keyToChange]);
					}
				});
			});
		});
	};

	return {
		setToDos,
		getToDos,
		addWorkspace,
		removeWorkspace,
		addTask,
		removeTask,
		updateTask,
	};
})();

class Workspace {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.categories = [
			{
				name: "Personal",
				tasks: [],
			},
			{
				name: "Work",
				tasks: [],
			},
			{
				name: "Travel",
				tasks: [],
			},
			{
				name: "Entertainment",
				tasks: [],
			},
		];
	}

	changeName(newName) {
		this.name = newName;
	}

	addCategory(newCategory) {
		this.categories.push({ name: newCategory, tasks: [] });
		this.updateWorkspace();
	}

	removeCategory(oldCategory) {
		this.categories = this.categories.filter((category) => category !== oldCategory);
		this.updateWorkspace();
	}

	updateWorkspace() {
		const workspaces = appController.getToDos();
		console.log(workspaces);
		const index = workspaces.findIndex((workspace) => workspace.id == this.id);

		if (index !== -1) {
			workspaces[index] = this;
			appController.setToDos(workspaces);
		}
	}
}

class Task {
	constructor(name, id, workspace, category, description, dueDate, priority, checklist) {
		this.name = name;
		this.id = id;
		this.workspace = workspace;
		this.category = category;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.checklist = checklist;
	}
}

export { appController, Workspace, Task };
