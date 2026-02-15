# Specification

## Summary
**Goal:** Build a mobile-first, responsive course menu web app that lists courses and opens their existing Tutor LMS course pages, with no login.

**Planned changes:**
- Create responsive screens for: course list (menu), course detail, and settings.
- Implement a manual course list configuration (title, short description, optional thumbnail URL, Tutor LMS course URL) that works by default.
- Add optional remote JSON feed support via a user-provided URL, with settings to switch between manual and remote modes.
- Add course browsing UX: search by title and an optional list/grid toggle.
- Ensure a course detail view shows course metadata and a prominent “Open course” action that navigates to the Tutor LMS URL.
- Apply a consistent education-style theme (colors/typography/spacing) and avoid a blue/purple primary palette.
- Persist selected data source mode and remote feed URL locally so they survive reloads.
- Add clear error handling for remote feed failures (network/CORS/invalid JSON) with a way to return to manual mode.

**User-visible outcome:** Users can immediately browse and search a course menu on mobile or desktop, view a course’s details, and open the corresponding Tutor LMS course page; optionally they can switch to a remote JSON course feed and have their settings remembered.
