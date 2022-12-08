import React from "react";
import PrivateCal from "./PrivateCal";

const PrivateCalendars = ({ privateCals, handleDelete }) => {
  return (
    <div
      className="p-3 mb-2 bg-dark text-white border border-light rounded"
      style={{ marginTop: "10px", width: "250px", textAlign: "center" }}
    >
      Sisu kalenterit
      <div>
        {privateCals.map((privateCal) => (
          <PrivateCal
            style={{ textAlign: "center" }}
            key={privateCal.id}
            cal={privateCal}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PrivateCalendars;
