import React, { useState, useEffect } from "react";
import axios from "axios";

const useGetdata = () => {
  const [podaci, setDohvati] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/getData");
      console.log(response);

      setDohvati(response.data.data);
    };
    fetchData();
  }, []);
  return podaci;
};

export default useGetdata;
