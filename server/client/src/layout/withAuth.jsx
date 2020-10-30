import React from "react";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

//autorizacijska funkcija
const withAuthorization = (ComponentToProtect) => (props) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  //dohvat podataka i provjera ispravnosti tokena
  useEffect(() => {
    const token = localStorage.token;
    console.log("ovo je token: " + token);

    fetch("https://schooboxlocal.herokuapp.com/api/checkToken", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setRedirect(true);
      });
  }, []);

  if (loading) {
    return null;
  }
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return <ComponentToProtect {...props} />;
};

export default withAuthorization;
