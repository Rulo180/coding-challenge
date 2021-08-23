import React from "react";

const EmptyState = ({ title, description, image}) => {
  return (
    <div className="empty-state">
      <div className="row justify-content-center pt-5 pb-5">
        <div className="col-6">
          <div className="empty-state__icon">
            <img width="50" src={image} alt="Search icon" />
          </div>
          <h3 className="empty-state__title">{title}</h3>
          <p className="empty-state__description">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
