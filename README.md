# AI Study Tracker

A beginner-friendly study organizer built with HTML, CSS, and vanilla JavaScript.
The full specification is in `PROJECT_PLAN.md`. No AI model or API is needed.

## Current step

The page displays sample courses and lets you add courses with a required name
and optional course code. Blank and whitespace-only names are rejected. New
courses appear immediately in the course list and task course dropdown.
You can add tasks with a title, course,
priority (Low, Medium, or High), due date, and optional notes. Medium is the
default priority. Check Completed to complete a task, uncheck it to reopen it,
or use Delete to remove it immediately. Overdue incomplete tasks are highlighted;
tasks due today are not overdue. Required fields are validated before saving.

Courses and tasks persist after refresh in the same browser and site address.
Dashboard statistics, upcoming deadlines, and JSON import/export
are still planned. The Dashboard section and `js/stats.js` remain placeholders.

## Run locally

1. Open this project folder in Visual Studio Code.
2. Open Extensions and install **Live Server** by Ritwick Dey.
3. Right-click `index.html` and select **Open with Live Server**.
4. Open the Courses section, enter a name and optional code, and select **Add course**.
5. Open the Tasks section, fill in the task form, and select **Add task**.

No packages, build step, backend, or database are required. Use Live Server
throughout development so loading the sample JSON works reliably.

## Files and folders

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, navigation, course form and list, task form, and task list. |
| `css/styles.css` | Layout, forms, task states, keyboard focus, and mobile styles. |
| `js/app.js` | Initialization, course creation, task validation, rendering, completion, and deletion. |
| `js/storage.js` | Sample loading, dataset validation, and localStorage persistence. |
| `js/stats.js` | Placeholder for completion and deadline calculations. |
| `data/sample-data.json` | One example course and task showing the planned data fields. |
| `README.md` | Setup instructions, current scope, and an explanation of the files. |
| `docs/testing-checklist.md` | Manual checks for task management and the page layout. |
| `PROJECT_PLAN.md` | Existing product specification and future acceptance criteria. |

## Storage

The app reads `data/sample-data.json` only when the `ai-study-tracker-data`
localStorage key is absent, then saves the dataset under that key. An empty saved
dataset stays empty. Existing invalid saved data is not replaced automatically.
Storage errors display a message and do not apply course or task changes.

Browser JavaScript does not overwrite the project's JSON file. Clearing browser
storage removes saved changes; JSON backup import/export is planned for later.
If a saved dataset has no courses, task creation is disabled until you add the
first course. Both forms stay disabled if loading fails, to protect saved data.
