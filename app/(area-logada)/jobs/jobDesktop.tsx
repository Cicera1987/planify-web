"use client";

import JobsContent from "@/app/components/content/jobs";
import "./styles.css";

export default function JobDesktop() {
  return (
    <div className="job-container">
      <div className="desktop-job">
        <div className="background-job-dark"></div>
        <div className="background-job-light">
          <div className="light-job-header">
            <h1 className="app-job-title">Serviços</h1>
          </div>
        </div>

        <div className="form-job-container">
          <JobsContent />
        </div>
      </div>
    </div>
  );
}
