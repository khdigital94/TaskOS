const appController = (() => {
	const setToDos = (data) => {
		localStorage.setItem("Aufgaben", JSON.stringify(data));
	};

	const getToDos = () => {
		return JSON.parse(localStorage.getItem("Aufgaben"));
	};

	return {
		setToDos,
		getToDos,
	};
})();

export { appController };
