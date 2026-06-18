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
      <h1>New Request</h1>
      <RequestForm reviewers={reviewers} onSubmit={handleSubmit} submitLabel="Create Request" />
    </div>
  );
}
