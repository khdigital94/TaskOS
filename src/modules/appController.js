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
				const taskIndex = category.tasks.findIndex((task) => task.id === obj.id);
				if (taskIndex !== -1) {
					const task = category.tasks[taskIndex];
					if (keyToChange === "category") {
						category.tasks.splice(taskIndex, 1);
						const newCategory = workspace.categories.find((cat) => cat.name === newValue);
						if (newCategory) {
							task.category = newValue;
							newCategory.tasks.push(task);
						} else {
						}
					} else {
						task[keyToChange] = newValue;
					}
					setToDos(workspaces);
				}
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
