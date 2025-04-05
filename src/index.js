import "./app.css";
import { appController, Workspace, Task } from "./modules/appController";

document.addEventListener("DOMContentLoaded", () => {
	appController.setToDos();

	const workspace1 = new Workspace("Kevins Arbeitsplatz", crypto.randomUUID());
	appController.addWorkspace(workspace1);

	const task1 = new Task("Aufräumen", crypto.randomUUID(), "Kevins Arbeitsplatz", "Persönlich", "Wohnzimmer putzen, Schlafzimmer saugen", "20.04.2025", "High");
	const task2 = new Task("Muddi anrufen", crypto.randomUUID(), "Kevins Arbeitsplatz", "Persönlich", "Sonntags-Call nicht vergessen", "21.04.2025", "Medium");
	const task3 = new Task("Meeting vorbereiten", crypto.randomUUID(), "Kevins Arbeitsplatz", "Arbeit", "Agenda schreiben, Präsentation updaten", "22.04.2025", "High");
	const task4 = new Task("Flüge buchen", crypto.randomUUID(), "Kevins Arbeitsplatz", "Reisen", "Check günstige Flüge nach Spanien", "25.04.2025", "Low");
	const task5 = new Task("Projekt-Deadline", crypto.randomUUID(), "Kevins Arbeitsplatz", "Arbeit", "Code finalisieren, Review einholen", "23.04.2025", "High");

	appController.addTask(task1);
	appController.addTask(task2);
	appController.addTask(task3);
	appController.addTask(task4);
	appController.addTask(task5);

	task2.setDescription("✅ DAS IST EINE NEUE BESCHREIBUNG");
});
