import React from "react";

import { FaRegHourglass } from "react-icons/fa";

function Hourglass() {
  return (
    <div className="hourglass-container ">
      <FaRegHourglass className="hourglass-icon animate-spin w-6" size={20} />
    </div>
  );
}

export default Hourglass;
