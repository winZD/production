import React, { Component } from "react";
import styled from "styled-components";
import homePage from "../icons/homePage.jpg";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Unijeli se krivi e-mail!")
    .required("Unos e-maila je obavezan!"),
  password: Yup.string()
    .min(4, "Lozinka je prekratka!")
    .max(50, "Lozinka je preduga!")
    .required("Unos lozinke je obavezan!"),
});

//funkcija z alofin ekran
const LoginScreen = () => {
  const [data, setData] = useState(false);
  let history = useHistory();

  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  /*
  const handleSubmit = async (e) => {
    await axios
      .post(
        "http://localhost:5000/api/loginusers",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("token", token);
          history.push("/adminScreen");
        }
      })

      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };
*/
  return (
    <Container>
      <LogDiv>
        <TitleDiv>
          <h2>Prijava korisnika</h2>
        </TitleDiv>
        <LogFormDiv>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (data) => {
              await axios
                .post(
                  "https://schooboxlocal.herokuapp.com/api/loginusers",
                  {
                    email: data.email,
                    password: data.password,
                  },
                  { withCredentials: true }
                )
                .then((response) => {
                  if (response.status === 200) {
                    const { token } = response.data;
                    localStorage.setItem("token", token);
                    history.push("/adminScreen");
                  }
                })

                .catch((error) => {
                  alert("Krivi e-mail ili lozinka! Pokušajte ponovno");
                  console.log(error);
                  history.push("/");
                });

              // same shape as initial values
              console.log(data);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <LogFormDiv>
                  <Field
                    name="email"
                    type="email"
                    autoFocus
                    placeholder=" unesite e-mail..."
                  />

                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>
                      <strong>{errors.email}</strong>
                    </div>
                  ) : null}
                </LogFormDiv>
                <LogFormDiv>
                  <Field
                    name="password"
                    type="password"
                    placeholder=" unesite lozinku..."
                  />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>
                      <strong>{errors.password}</strong>
                    </div>
                  ) : null}
                </LogFormDiv>
                <button type="submit">Prijava</button>
              </Form>
            )}
          </Formik>
        </LogFormDiv>
      </LogDiv>
    </Container>
  );
};

export default LoginScreen;

const Container = styled.div`
  display: flex;
  height: 100vh; // stands for “viewport height”, which is the viewable screen’s height. 100VH would represent 100% of the viewport’s height, or the full height of the screen
  width: 100vw; // stands for "viewport width", which is the viewable screen's width. 100VW would represent 100% of the viewport's width, or the full width of the screen
  justify-content: center;
  background-color: whitesmoke;
  align-items: center;
`;

const LogDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  width: 30%;
  height: 40%;

  border-radius: 1rem;
  background-color: #6c7792;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const LogFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const TitleDiv = styled.div`
  height: 4rem;
  width: 100%;
  background-color: #3f1f5f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  color: white;
`;

const FieldCustom = styled.input`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s all;
  :hover {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }
`;
