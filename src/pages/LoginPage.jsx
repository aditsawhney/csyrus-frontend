import { authService } from "../services/authService";

export default function LoginPage() {
  return (
    <div className="login-page">
      <h1>Csyrus Workflow Approvals</h1>
      <p>Sign in to create or review approval requests.</p>
      <a className="google-button" href={authService.getGoogleLoginUrl()}>
        Sign in with Google
      </a>
    </div>
  );
}
