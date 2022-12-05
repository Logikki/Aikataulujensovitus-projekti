import React from "react";
import PrivateCal from "./PrivateCal";

const PrivateCalendars = ({ privateCals, handleDelete }) => {
  return (
    <div
      className="p-3 mb-2 bg-dark text-white"
      style={{ marginLeft: "15px", width: "250px", border: "solid" }}
    >
      Yksityiset kalenterit
      <div>
        {privateCals.map((privateCal) => (
          <PrivateCal
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
