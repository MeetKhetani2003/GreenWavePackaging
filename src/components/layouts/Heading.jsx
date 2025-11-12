import React from "react";

const Heading = ({ heading }) => {
  return (
    <div className="flex flex-col items-center mb-16">
      <h2 className="about-heading text-green-700 font-extrabold text-center text-4xl ">
        {heading}
      </h2>
      <span className="about-underline h-1 mt-4 w-28 bg-orange-500 rounded-full py-0.2 mx-auto shadow-md"></span>
    </div>
  );
};

export default Heading;
