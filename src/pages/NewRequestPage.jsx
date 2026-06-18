import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "../components/RequestForm";
import { requestService } from "../services/requestService";

export default function NewRequestPage() {
  const [reviewers, setReviewers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    requestService.listReviewers().then(setReviewers);
  }, []);

  const handleSubmit = async (payload) => {
    await requestService.create(payload);
    navigate("/");
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>New Request</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
          Fill in the details below and assign a reviewer.
        </p>
      </div>
      <RequestForm reviewers={reviewers} onSubmit={handleSubmit} submitLabel="Submit Request" />
    </div>
  );
}
