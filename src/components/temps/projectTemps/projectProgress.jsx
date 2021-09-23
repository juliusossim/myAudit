import React from 'react';

const ProjectProgress = ({ project }) => (
  <div className="progress mt-1 mb-3" style={{ height: '8px' }} title={`#${(project?.donationTarget - project?.amountRaised).toLocaleString()} to hit target`}>
    <div
      className="progress-bar bg-wema"
      role="progressbar"
      aria-valuenow={
        (project?.amountRaised / project?.donationTarget) * 100
      }
      style={{ width: `${(project?.amountRaised / project?.donationTarget) * 100}%` }}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-labelledby="progress_bar"
    />
  </div>
);
export default ProjectProgress;
