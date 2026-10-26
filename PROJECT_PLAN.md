**AI Study Tracker — MVP Product Plan**

The MVP helps one student answer three questions: **What do I need to study? What is due next? How much have I completed?**

Despite the name, this version does not need an AI model or API.

### 1. MVP requirements

| Area | MVP requirement |
|---|---|
| Dashboard | Show total tasks, completed tasks, overdue tasks, and upcoming deadlines. |
| Courses | Display courses and allow the student to add a course with a name and optional course code. |
| Study tasks | Add a task with a title, course, priority, and due date. Notes are optional. |
| Priority | Support Low, Medium, and High. Default to Medium. |
| Due dates | Highlight overdue tasks and show upcoming tasks in due-date order. |
| Completion | Mark tasks completed and reopen them. |
| Statistics | Show overall completion percentage and completed/total tasks per course. |
| Persistence | Preserve courses and tasks after a page refresh. |
| Data portability | Export saved data to JSON and import a previously exported JSON file. |

**Technical approach**

- HTML, CSS, and vanilla JavaScript only.
- A local JSON file supplies initial sample data.
- Save changes as JSON in browser `localStorage`, which requires no backend or database.
- Import/export provides portable JSON backups. Browser JavaScript cannot silently overwrite the project’s JSON file.
- Run through VS Code’s Live Server extension so loading the sample JSON works reliably.

**Outside the MVP:** accounts, cloud sync, AI recommendations, notifications, study timers, collaboration, and external calendar integration.

### 2. User stories

| ID | User story |
|---|---|
| US-01 | As a student, I want a dashboard so I can quickly understand my workload. |
| US-02 | As a student, I want to add and view courses so I can organize my studies. |
| US-03 | As a student, I want to add tasks to a course so I know what work remains. |
| US-04 | As a student, I want to assign priorities so I can identify important work. |
| US-05 | As a student, I want to set deadlines so I can plan ahead. |
| US-06 | As a student, I want to complete or reopen tasks so my progress stays accurate. |
| US-07 | As a student, I want progress statistics so I can see how much I have finished. |
| US-08 | As a student, I want my data saved and exportable so I can continue later and keep a backup. |

### 3. Folder structure

| Path | Purpose |
|---|---|
| `ai-study-tracker/` | Project folder |
| `index.html` | Dashboard, course list, task form, and task list |
| `css/styles.css` | Layout, colors, priority indicators, and responsive styles |
| `js/app.js` | Initialization, event handling, and screen updates |
| `js/storage.js` | Initial JSON loading, browser storage, import, and export |
| `js/stats.js` | Completion and overdue calculations |
| `data/sample-data.json` | Example courses and tasks |
| `README.md` | Setup instructions, features, and storage explanation |
| `docs/testing-checklist.md` | Manual testing checklist |

Use **one page with clearly separated sections** to keep navigation and implementation beginner-friendly.

Each course needs an ID, name, and optional code. Each task needs an ID, course ID, title, priority, due date, completion status, and optional notes.

### 4. Development phases

| Phase | Work | Completion milestone |
|---|---|---|
| 1. Plan | Define fields, sketch the page, and prepare sample JSON. | Data structure and screen layout agreed. |
| 2. Build the interface | Create the dashboard, course section, task form, and task list. | Page works visually with sample content. |
| 3. Add core behavior | Implement course creation, task creation, validation, and completion toggles. | Student can manage a basic workload. |
| 4. Add persistence | Load sample JSON, save changes, and implement JSON import/export. | Data survives refresh and can be restored. |
| 5. Add statistics | Calculate totals, overdue tasks, upcoming deadlines, and course progress. | Dashboard accurately reflects task changes. |
| 6. Verify and document | Test workflows, empty states, accessibility, and local setup. | All acceptance criteria pass. |

### 5. Acceptance criteria

1. **Local setup:** Following the README, a beginner can open the project in VS Code and run it through Live Server without a build step.
2. **First launch:** Sample data loads only when no saved dataset exists. An intentionally empty saved dataset stays empty.
3. **Courses:** A course with a nonblank name can be added and immediately appears in the course list and task form.
4. **Task creation:** A task requires a nonblank title, an existing course, a valid priority, and a valid due date. Invalid submissions show a clear message and create no task.
5. **Priority:** Every task displays Low, Medium, or High using text, with color as an additional cue.
6. **Deadlines:** An incomplete task is overdue only when its due date is earlier than today in the student’s local time. Tasks due today are not overdue.
7. **Upcoming tasks:** The dashboard shows up to five incomplete tasks due today or later, ordered by nearest deadline.
8. **Completion:** Completing or reopening a task immediately updates its appearance and all relevant statistics.
9. **Statistics:** Completion percentage equals completed tasks divided by total tasks, rounded to a whole percentage. With zero tasks, display `0%`.
10. **Persistence:** Added courses, tasks, and completion changes remain after refreshing in the same browser and local site address.
11. **JSON backup:** Export produces valid JSON. Import validates the full dataset before replacing saved data and asks for confirmation before replacement. Invalid files leave existing data unchanged.
12. **Usability:** Forms have visible labels, core actions work by keyboard, and the page remains usable on desktop and a narrow mobile screen.

### 6. Testing checklist

**Setup and storage**

- [ ] Run successfully using the README instructions.
- [ ] Confirm sample JSON loads on first launch.
- [ ] Refresh after changes and verify data remains.
- [ ] Verify an empty saved dataset does not reload sample tasks.

**Courses and tasks**

- [ ] Add a course and select it when creating a task.
- [ ] Add tasks with each priority level.
- [ ] Reject blank and whitespace-only required fields.
- [ ] Prevent task creation when no course exists and explain how to proceed.
- [ ] Verify long titles and special characters display correctly.
- [ ] Confirm entered HTML-like text appears as text.

**Deadlines and progress**

- [ ] Test yesterday, today, and tomorrow as due dates.
- [ ] Confirm completed tasks never count as overdue.
- [ ] Verify upcoming tasks appear in the correct order.
- [ ] Complete and reopen a task; check every affected statistic.
- [ ] Verify zero tasks, partially completed tasks, and all tasks completed.
- [ ] Check course totals against the task list.

**Import, export, and usability**

- [ ] Export data, import it again, and compare the result.
- [ ] Reject malformed JSON, missing fields, duplicate IDs, and invalid course references.
- [ ] Cancel an import replacement and confirm existing data remains.
- [ ] Test keyboard navigation and narrow-screen layout.
- [ ] Confirm there are no browser console errors during normal use.

**MVP success condition:** A student can add a course, create a prioritized task with a deadline, complete it, refresh the page, and see accurate saved progress.