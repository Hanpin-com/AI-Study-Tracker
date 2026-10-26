# Course and task management: manual testing

Run the page using the Live Server instructions in `README.md`.

- [ ] The page title and introduction appear.
- [ ] Dashboard, Courses, and Tasks each have a heading; sample courses and tasks load on first launch.
- [ ] Each navigation link jumps to its matching section (check the URL fragment).
- [ ] The page remains usable at a narrow width such as 375 pixels, without horizontal scrolling.
- [ ] Press Tab to reveal the skip link, then press Enter to reach the main content.
- [ ] Continue using Tab and Enter to navigate; focused links have a visible outline.
- [ ] The browser console has no errors and local files load without missing-file errors.

- [ ] Add courses with and without a code; verify each appears immediately in the course list and task course dropdown.
- [ ] Reject blank and whitespace-only course names without saving; show an error and focus the name field.
- [ ] Confirm course names and codes are trimmed, and HTML-like text displays as plain text.
- [ ] Refresh after adding a course; verify it remains in both the list and dropdown.
- [ ] Select a course and start filling in a task, then add another course; verify the existing task selection and fields are preserved.
- [ ] From an empty saved dataset, add the first course; verify task creation becomes enabled and a task can be saved under that course.
- [ ] Simulate a storage write failure when adding a course; verify the list, dropdown, saved data, and task availability stay unchanged, and course inputs remain available for retry.
- [ ] Add tasks with Low, Medium (the default), and High priority, a course, and a due date.
- [ ] Add optional notes; confirm long titles and HTML-like text display as plain text.
- [ ] Reject blank or whitespace-only titles, missing courses, invalid priorities, and missing/invalid dates without creating tasks.
- [ ] Complete and reopen tasks; confirm their appearance changes immediately.
- [ ] Delete a task; refresh and verify it stays deleted.
- [ ] Delete all tasks; confirm the empty message appears and sample tasks do not return on refresh.
- [ ] Refresh after adding or completing tasks; confirm changes remain.
- [ ] Test yesterday, today, and tomorrow: only incomplete tasks before today show Overdue.
- [ ] Complete an overdue task and confirm the overdue highlight disappears; reopen it and confirm it returns.
- [ ] Verify an empty saved dataset stays empty and disables task creation with an explanation.
- [ ] Verify malformed saved data shows a load error and keeps both forms disabled without overwriting it.
- [ ] Simulate a storage write failure; confirm adding, completing, and deleting leave existing tasks unchanged and show a message.
- [ ] Use only the keyboard to add courses and add, complete, reopen, and delete tasks; focus remains usable after list updates.

The complete feature checklist remains in `PROJECT_PLAN.md`. Dashboard statistics,
upcoming deadlines, and JSON import/export are future steps.
