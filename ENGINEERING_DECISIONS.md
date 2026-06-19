# Engineering Decisions

## Architecture

Three layers, deliberately thin: `services/` wraps every backend call in a
plain async function (no React inside it), `hooks/` adapts that into
component-friendly state (`useAuth`, `useRequests`), and `components/` /
`pages/` only render. A component never calls `axios` directly - it calls
a hook or a service function. This is what the brief means by "business
logic separated from JSX," and it's also why the test suite can mock
`services/reviewerService` for `ReviewerDashboard` without touching axios,
React Router, or anything else.

`AuthContext` holds exactly one thing: the current user (or `null`). It's
populated once, on mount, by calling `GET /auth/me` - there's no client-side
token handling to get wrong, since the session lives in an httponly cookie
the browser sends automatically.

## Routing and role guarding

`ProtectedRoute` is the single place that knows "Requesters belong at `/`,
Reviewers belong at `/reviewer`." Rather than scattering role checks
through individual pages, every route in `AppRoutes.jsx` declares the role
it expects, and `ProtectedRoute` redirects mismatches to the right home
page instead of just blocking them. That means adding a new
Requester-only or Reviewer-only page later is a one-line addition to the
route table, not a new auth check copy-pasted into the page itself.

## State management

No Redux, no Zustand, no React Query. The app's actual state is small: who's
logged in, and the list of requests for whichever role is viewing. Context
plus a couple of custom hooks cover that without a dependency whose main
benefit (caching, background refetch, optimistic updates) doesn't matter
at this scale. If this grew to support real-time updates across multiple
reviewers acting concurrently, that's the point where I'd reach for
something like React Query or a WebSocket-backed store instead of rolling
my own.

## Testing strategy

Tests mock at the `services/` boundary with `vi.mock`, not at the HTTP
layer with something like MSW. For a frontend this size, mocking one
layer up means tests assert on what the component actually does in
response to data ("when `listAssigned` resolves with one pending request,
clicking it shows the review panel") rather than on network plumbing.
`RequestForm.test.jsx` covers both the happy path and the error path
(backend returns a 4xx, the form surfaces `error.response.data.detail`),
since that error-surfacing logic is exactly the kind of thing that's easy
to write once and forget to verify.

`ReviewerDashboard`'s tests cover the actual reviewer flow end to end at
the component level: list assigned requests, select one, approve or
reject with a comment, and confirm the right service call fires with the
right arguments.

## Trade-offs accepted

- **Inline styles via a single `index.css`, no CSS framework.** Faster to
  set up correctly within the assessment's time box than wiring up
  Tailwind or a component library, at the cost of less polish. The
  component structure underneath would support either with minimal
  rework.
- **No global error boundary.** Each page handles its own fetch errors
  (see `RequestDetailPage`, `RequestForm`), which is enough for this app's
  size, but a production version would want a top-level boundary as a
  backstop for anything that slips through.

## What I'd improve with more time

Optimistic UI updates on approve/reject instead of a full refetch,
loading skeletons instead of plain "Loading..." text, and an MSW-based
integration test that exercises the full login → create → approve flow
against a mocked backend rather than testing each page in isolation.
