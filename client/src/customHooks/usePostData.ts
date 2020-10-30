import React, { useState, useEffect } from "react";
import axios from "axios";

const usePostData = () => {
  axios.post("http://localhost:5000/api/putData", {
    id: 1,
    firstNameLastName: "Franji Tuđman",
    hour: "14:00",
    department: "IT",
    classroom: "2",
  });
};

export default usePostData;
