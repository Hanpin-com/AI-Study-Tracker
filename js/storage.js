// Keep browser storage and sample-data loading in one place.
const StudyStorage = (() => {
  const storageKey = "ai-study-tracker-data";

  function isValidDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + "T00:00:00Z");
    return Number(value.slice(0, 4)) > 0 &&
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function isNonblank(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  // Never replace unreadable saved data with sample data.
  function validateData(data) {
    if (!data || !Array.isArray(data.courses) || !Array.isArray(data.tasks)) {
      throw new Error("Saved data must contain courses and tasks.");
    }
    const courseIds = new Set();
    for (const course of data.courses) {
      if (!course || !isNonblank(course.id) || !isNonblank(course.name) ||
          courseIds.has(course.id) || (course.code !== undefined && typeof course.code !== "string")) {
        throw new Error("Course data is invalid.");
      }
      courseIds.add(course.id);
    }
    const taskIds = new Set();
    for (const task of data.tasks) {
      if (!task || !isNonblank(task.id) || taskIds.has(task.id) ||
          !isNonblank(task.title) || !courseIds.has(task.courseId) ||
          !["Low", "Medium", "High"].includes(task.priority) || !isValidDate(task.dueDate) ||
          typeof task.completed !== "boolean" ||
          (task.notes !== undefined && typeof task.notes !== "string")) {
        throw new Error("Task data is invalid.");
      }
      taskIds.add(task.id);
    }
  }

  function saveData(data) {
    validateData(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  async function loadData() {
    const saved = localStorage.getItem(storageKey);
    // An intentionally empty saved dataset must stay empty.
    if (saved !== null) {
      const data = JSON.parse(saved);
      validateData(data);
      return data;
    }
    const response = await fetch("data/sample-data.json");
    if (!response.ok) throw new Error("Could not load sample data.");
    const data = await response.json();
    saveData(data);
    return data;
  }

  // JSON import/export can be added here in a later step.
  return { loadData, saveData, isValidDate };
})();
