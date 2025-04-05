const appController = (() => {
	let workspaces = [
		{
			name: "Default Workplace",
			id: crypto.randomUUID(),
			categories: {
				name: "Persönlich",
				toDos: {
					name: "Einkaufen gehen",
					category: "Persönlich",
					description: "Laborum elit exercitation proident consectetur sint ex dolore.",
					dueDate: "10.04.2025",
					priority: "High",
					checklist: ["Bananen", "Äpfel", "Fensterreiniger", "Thai Curry", "Toasty"],
				},
			},
		},
	];

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

	return {
		setToDos,
		getToDos,
		addWorkspace,
		removeWorkspace,
	};
})();

class Workspace {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.categories = ["Persönlich", "Arbeit", "Reisen", "Unterhaltung"];
	}

	changeName(newName) {
		this.name = newName;
	}

	addCategory(newCategory) {
		this.categories.push(newCategory);
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
			console.log(this.id);
			appController.setToDos(workspaces);
		}
	}
}

export { appController, Workspace };
