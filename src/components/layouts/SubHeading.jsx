import React from "react";

const SubHeading = ({ title }) => {
  return (
    <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-green-600 pl-4">
      {title}
    </h3>
  );
};

export default SubHeading;
