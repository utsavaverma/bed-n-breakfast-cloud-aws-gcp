import React from "react";

const Visualizations = (props) => {
  return (
    <div>
      <button className="btn btn-primary" style={{ margin: "20px" }}>
        <a
          style={{ color: "white" }}
          href="https://datastudio.google.com/embed/reporting/b6222cd4-a6ce-4421-8e32-8d727074a2da/page/tEnnC"
          target="_blank"
          rel="noreferrer noopener"
        >
          Room Booking Visualizations
        </a>
      </button>
      <button className="btn btn-primary" style={{ margin: "20px" }}>
        <a
          style={{ color: "white" }}
          href="https://datastudio.google.com/embed/u/0/reporting/999b22dc-e171-4a73-87ef-cd7258056fb8/page/tEnnC"
          target="_blank"
          rel="noreferrer noopener"
        >
          Meal Booking Visualizations
        </a>
      </button>
      <button className="btn btn-primary" style={{ margin: "20px" }}>
        <a
          style={{ color: "white" }}
          href="https://datastudio.google.com/embed/reporting/4bc424ac-44cb-4750-8cf1-2e54c587b86a/page/tEnnC"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tour Booking Visualizations
        </a>
      </button>
    </div>
  );
};

export default Visualizations;
