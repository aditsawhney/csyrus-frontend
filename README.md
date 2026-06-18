# Csyrus Workflow Approval Management System — Frontend

React + Vite frontend for the approval workflow tool. Talks to the FastAPI
backend (`../backend`) over Axios, authenticates through Google OAuth (the
backend owns the OAuth handshake — this app just redirects into it and
reads the resulting session).

## Stack

React 18, Vite, React Router, Axios. Tests use Vitest + React Testing
Library.

## Project layout

```
frontend/
├── src/
│   ├── api/          # axios instance, shared error handling
│   ├── services/     # one file per backend resource (auth, requests, reviewer)
│   ├── context/       # AuthContext - holds the current user
│   ├── hooks/          # useAuth, useRequests
│   ├── components/     # reusable, presentation-focused pieces
│   ├── pages/            # one component per route
│   ├── routes/             # route table + role-based guarding
│   └── utils/
└── tests/
```

Business logic (API calls, validation) lives in `services/` and `hooks/`,
not inside JSX — components stay focused on rendering. See
`ENGINEERING_DECISIONS.md` for more on this split.

## Setup

```bash
npm install
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend, e.g. `http://localhost:8000` |

## Running the app

```bash
npm run dev
```

Starts on `http://localhost:5173` by default. The backend must also be
running (see `../backend/README.md`) since this app has no functionality
without it — every page beyond the login screen requires an authenticated
session.

## Running tests

```bash
npm test
```

Runs the Vitest suite once. Use `npm run test:watch` during development.
Backend calls are mocked at the service layer (`vi.mock` on
`services/*`) so the tests never hit a real network — see
`ENGINEERING_DECISIONS.md` for the reasoning.

## Building for production

```bash
npm run build
```

Outputs static assets to `dist/`, ready to serve from any static host or
behind the same reverse proxy as the backend.

## Pages

| Route | Who can see it | Purpose |
|---|---|---|
| `/login` | Anyone | Google sign-in entry point |
| `/` | Requester | Dashboard: stats + list of your own requests |
| `/requests/new` | Requester | Create a request, assign a reviewer |
| `/requests/:id` | Requester (owner only, enforced by the backend) | View a request, delete it while pending |
| `/reviewer` | Reviewer | List of assigned pending requests, approve/reject with comments |

`ProtectedRoute` (`src/components/ProtectedRoute.jsx`) redirects
unauthenticated users to `/login`, and redirects authenticated users to
their own role's dashboard if they land on a route meant for the other
role.
