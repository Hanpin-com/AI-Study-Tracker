const courseForm = document.querySelector("#course-form");
const courseFields = document.querySelector("#course-fields");
const courseNameInput = document.querySelector("#course-name");
const courseCodeInput = document.querySelector("#course-code");
const courseMessage = document.querySelector("#course-message");
const taskForm = document.querySelector("#task-form");
const taskFields = document.querySelector("#task-fields");
const titleInput = document.querySelector("#task-title");
const courseInput = document.querySelector("#task-course");
const priorityInput = document.querySelector("#task-priority");
const dueDateInput = document.querySelector("#task-due-date");
const notesInput = document.querySelector("#task-notes");
const taskList = document.querySelector("#task-list");
const taskMessage = document.querySelector("#task-message");
let studyData = { courses: [], tasks: [] };

function showMessage(message, isError = false) {
  taskMessage.textContent = message;
  taskMessage.classList.toggle("error-message", isError);
}

function showCourseMessage(message, isError = false) {
  courseMessage.textContent = message;
  courseMessage.classList.toggle("error-message", isError);
}

function renderCourses() {
  const selectedCourseId = courseInput.value;
  const courseList = document.querySelector("#course-list");
  courseList.replaceChildren();
  courseInput.replaceChildren();
  for (const course of studyData.courses) {
    const label = course.code ? `${course.name} (${course.code})` : course.name;
    const item = document.createElement("li");
    item.textContent = label;
    courseList.append(item);
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = label;
    courseInput.append(option);
  }
  if (studyData.courses.some(course => course.id === selectedCourseId)) {
    courseInput.value = selectedCourseId;
  }
  taskFields.disabled = studyData.courses.length === 0;
}

courseForm.addEventListener("submit", event => {
  event.preventDefault();
  if (courseFields.disabled) return;

  const name = courseNameInput.value.trim();
  if (!name) {
    courseNameInput.setAttribute("aria-invalid", "true");
    showCourseMessage("Enter a course name containing more than spaces.", true);
    courseNameInput.focus();
    return;
  }
  courseNameInput.removeAttribute("aria-invalid");

  let id;
  do {
    id = `course-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  } while (studyData.courses.some(course => course.id === id));
  const course = { id, name, code: courseCodeInput.value.trim() };
  const nextData = { ...studyData, courses: [...studyData.courses, course] };

  try {
    StudyStorage.saveData(nextData);
  } catch (error) {
    showCourseMessage("Could not save the course. Check browser storage permissions or available space and try again.", true);
    return;
  }

  studyData = nextData;
  renderCourses();
  showCourseMessage("Course added.");
  showMessage("Ready to manage your tasks.");
  courseForm.reset();
  courseNameInput.focus();
});

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function renderTasks() {
  taskList.replaceChildren();
  document.querySelector("#task-empty").hidden = studyData.tasks.length > 0;
  const today = localToday();

  for (const task of studyData.tasks) {
    const item = document.createElement("li");
    item.className = "task-card";
    item.classList.toggle("is-complete", task.completed);
    const heading = document.createElement("h4");
    heading.className = "task-title";
    // textContent safely displays HTML-like input as plain text.
    heading.textContent = task.title;
    const course = document.createElement("p");
    course.textContent = studyData.courses.find(course => course.id === task.courseId).name;
    const priority = document.createElement("span");
    priority.className = `priority priority-${task.priority.toLowerCase()}`;
    priority.textContent = task.priority;
    const due = document.createElement("p");
    const overdue = !task.completed && task.dueDate < today;
    due.classList.toggle("overdue", overdue);
    due.textContent = `Due: ${task.dueDate}${overdue ? " — Overdue" : ""}`;

    const actions = document.createElement("div");
    actions.className = "task-actions";
    const completeLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Completed: ${task.title}`);
    checkbox.addEventListener("change", () => {
      const index = studyData.tasks.findIndex(current => current.id === task.id);
      const tasks = studyData.tasks.map(current => current.id === task.id
        ? { ...current, completed: checkbox.checked } : current);
      if (saveTasks(tasks, checkbox.checked ? "Task completed." : "Task reopened.")) {
        taskList.querySelectorAll('input[type="checkbox"]')[index].focus();
      } else {
        checkbox.checked = task.completed;
      }
    });
    completeLabel.append(checkbox, " Completed");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.title}`);
    deleteButton.addEventListener("click", () => {
      const index = studyData.tasks.findIndex(current => current.id === task.id);
      const tasks = studyData.tasks.filter(current => current.id !== task.id);
      if (saveTasks(tasks, "Task deleted.")) {
        const buttons = taskList.querySelectorAll("button");
        const nextButton = buttons[Math.min(index, buttons.length - 1)];
        if (nextButton) nextButton.focus();
        else if (!taskFields.disabled) titleInput.focus();
      }
    });
    actions.append(completeLabel, deleteButton);
    item.append(heading, course, priority, due);
    if (task.notes) {
      const notes = document.createElement("p");
      notes.className = "task-notes";
      notes.textContent = task.notes;
      item.append(notes);
    }
    item.append(actions);
    taskList.append(item);
  }
}

function saveTasks(tasks, message) {
  const nextData = { ...studyData, tasks };
  try {
    // Save first so a storage failure leaves the existing tasks intact.
    StudyStorage.saveData(nextData);
    studyData = nextData;
    renderTasks();
    showMessage(message);
    return true;
  } catch (error) {
    showMessage("Could not save changes. Check browser storage permissions or available space and try again.", true);
    return false;
  }
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const courseId = courseInput.value;
  const priority = priorityInput.value;
  const dueDate = dueDateInput.value;
  if (!title) {
    showMessage("Enter a task title containing more than spaces.", true);
    titleInput.focus();
    return;
  }
  if (!studyData.courses.some(course => course.id === courseId)) {
    showMessage("Select an existing course. A course must exist before adding tasks.", true);
    courseInput.focus();
    return;
  }
  if (!["Low", "Medium", "High"].includes(priority)) {
    showMessage("Choose Low, Medium, or High priority.", true);
    priorityInput.focus();
    return;
  }
  if (!StudyStorage.isValidDate(dueDate)) {
    showMessage("Enter a valid due date.", true);
    dueDateInput.focus();
    return;
  }
  let id;
  do {
    id = `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  } while (studyData.tasks.some(task => task.id === id));
  const task = { id, courseId, title, priority, dueDate, completed: false, notes: notesInput.value.trim() };
  if (saveTasks([...studyData.tasks, task], "Task added.")) {
    taskForm.reset();
    titleInput.focus();
  }
});

async function initializeApp() {
  try {
    studyData = await StudyStorage.loadData();
    renderCourses();
    renderTasks();
    courseFields.disabled = false;
    showCourseMessage("Ready to add courses.");
    showMessage(studyData.courses.length ? "Ready to manage your tasks." :
      "No courses available. Add a course in the Courses section before creating tasks.");
  } catch (error) {
    showCourseMessage("Could not load study data. Refresh after checking Live Server and browser storage permissions. Existing saved data has not been replaced.", true);
    showMessage("Could not load study data. Run with Live Server and check browser storage permissions. Existing saved data has not been replaced.", true);
  }
}

initializeApp();
