# Collaboration Notes

## Assumptions made

- The backend exposes `GET /requests/reviewers` so the "New Request" form
  can populate its reviewer dropdown - this isn't in the original API
  spec; see the backend's `COLLABORATION.md` for the same note from that
  side.
- A logged-in user's role is fixed at the account level (set by the
  backend on first sign-in). The frontend doesn't offer a role switcher -
  if the backend ever supports one identity holding both roles, the
  routing in `AppRoutes.jsx` would need to change to a role-selector
  rather than a redirect.
- `withCredentials: true` on the Axios instance assumes the frontend and
  backend are configured for cross-origin cookies (matching origins in
  development, or `SameSite=None; Secure` in a real cross-domain
  deployment). Documented here since it's a common source of "login works
  but `/auth/me` returns 401" bugs.

## Known limitations

- No client-side validation beyond HTML5 `required` attributes - field
  length limits, for instance, are enforced by the backend's Pydantic
  schemas and surface only as a generic error message if violated.
- No optimistic UI: every approve/reject or create/delete waits for the
  backend round-trip before updating the list.
- No automated end-to-end test (e.g. Playwright/Cypress) covering the
  real OAuth redirect - RTL component tests cover the UI logic, but the
  actual Google consent screen → callback → cookie flow is only verified
  manually and in the demo video.

## What would change in production

- A loading skeleton and toast-style notifications instead of plain
  inline text for async states.
- An error boundary at the app root, so an unexpected render error
  doesn't blank the whole page.
- Environment-specific API base URLs baked into the build rather than a
  single `.env` file, if this ever needs separate staging/production
  builds.

## Scalability considerations

The request list endpoints aren't paginated yet on the backend, so
`useRequests` currently fetches and renders the entire list in one call.
That's fine at the volume this assessment implies; the first frontend
change if that stopped being true would be adding pagination controls
(or infinite scroll) to `RequesterDashboard` and `ReviewerDashboard`,
matching whatever pagination shape the backend adds first.
