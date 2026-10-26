# Task management: manual testing

Run the page using the Live Server instructions in `README.md`.

- [ ] The page title and introduction appear.
- [ ] Dashboard, Courses, and Tasks each have a heading; sample courses and tasks load on first launch.
- [ ] Each navigation link jumps to its matching section (check the URL fragment).
- [ ] The page remains usable at a narrow width such as 375 pixels, without horizontal scrolling.
- [ ] Press Tab to reveal the skip link, then press Enter to reach the main content.
- [ ] Continue using Tab and Enter to navigate; focused links have a visible outline.
- [ ] The browser console has no errors and local files load without missing-file errors.

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
- [ ] Verify malformed saved data shows a load error without overwriting it.
- [ ] Simulate a storage write failure; confirm adding, completing, and deleting leave existing tasks unchanged and show a message.
- [ ] Use only the keyboard to add, complete, reopen, and delete tasks; focus remains usable after list updates.

The complete feature checklist remains in `PROJECT_PLAN.md`. Course creation,
dashboard statistics, upcoming deadlines, and JSON import/export are future steps.
