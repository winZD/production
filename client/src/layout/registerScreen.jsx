import React, { Component } from "react";
import styled from "styled-components";
import homePage from "../icons/homePage.jpg";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

import { useHistory } from "react-router-dom";

const Container = styled.div`
  height: 100vh; // stands for “viewport height”, which is the viewable screen’s height. 100VH would represent 100% of the viewport’s height, or the full height of the screen
  width: 100vw; // stands for "viewport width", which is the viewable screen's width. 100VW would represent 100% of the viewport's width, or the full width of the screen

  background-color: #f0ffff;
`;

const LogInDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  background-color: #000000cc;
  height: 38rem;
  width: 45rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 1rem;
  overflow: auto;
`;
const TitleDiv = styled.div`
  height: 7rem;
  width: 100%;
  background-color: #a3006d;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  color: white;
`;

//registracijska funkcija
const RegisterScreen = () => {
  let history = useHistory();
  const [data, setData] = useState(false);

  //provjera jeli postoji korisnik/administrator u bazi
  useEffect(() => {
    fetch("https://schooboxlocal.herokuapp.com/api/getRegisterData")
      .then((response) => response.json())
      .then((data) => {
        const { success } = data;
        //console.log(success);
        setData(success);
      });
  }, []);

  const [username, setUsername] = useState("");
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //funkcija za registraciju korisnika/administratora
  const handleSubmit = (e) => {
    axios.post("http://localhost:5000/api/registeruser", {
      username: username,
      email: email,
      password: password,
    });
    try {
      console.log(data);
      {
        data ? history.push("/login") : history.push("/register");
      }
    } catch {}
  };

  return (
    <Container>
      <LogInDiv>
        <TitleDiv>
          <h1>Register</h1>
        </TitleDiv>
        <form>
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => {
              handleUsername(e);
            }}
          ></input>
          <label>E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              handleEmail(e);
            }}
          ></input>
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              handlePassword(e);
            }}
            required
          ></input>
          <button type="submit" onClick={handleSubmit}>
            LOG IN
          </button>
        </form>
      </LogInDiv>
    </Container>
  );
};

export default RegisterScreen;
