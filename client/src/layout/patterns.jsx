import React from "react";
import Select from "react-select";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import back from "../icons/back.png";
import logo_sveuciliste_u_zadru from "../icons/logo_sveuciliste_u_zadru.jpg";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState, useEffect, useRef } from "react";

import { saveAs } from "file-saver";
import axios from "axios";

//funkcija od ekrana obrazac
const Patterns = () => {
  const [themeName, setThemeName] = useState("(Naslov teme)");

  const [studentName, setStudentName] = useState("(Ime i prezime studenta)");

  const [studentNumber, setStudentNumber] = useState("(Matični broj studenta)");

  const [mentor, setMentor] = useState("(Mentor)");

  const [selectedOption, setSelectedOption] = useState("redovan");

  const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
  };

  const handleInputTheme = (e) => {
    setThemeName(e.target.value);
  };
  const handleInputName = (e) => {
    setStudentName(e.target.value);
  };

  const handleStudentNumber = (e) => {
    setStudentNumber(e.target.value);
  };

  const handleMentor = (e) => {
    setMentor(e.target.value);
  };

  //funkcija za kreiranje PDF dokumenta
  const createPDF = async () => {
    const post = await axios.post(
      "https://schooboxlocal.herokuapp.com/api/createPDF",
      {
        themeName,
        studentName,
        studentNumber,
        mentor,
        selectedOption,
      }
    );
    //funkcija za dohvat PDF dokumenta
    const response = await axios.get(
      "https://schooboxlocal.herokuapp.com/api/fetchPDF",
      {
        responseType: "blob",
      }
    );

    const pdfBlob = await new Blob([response.data], {
      type: "application/pdf",
    });
    saveAs(pdfBlob, "obrazac_1.pdf");
  };

  return (
    <ParrentDiv>
      <Link to="/">
        <img
          src={back}
          style={{
            width: "50px",
            position: "absolute",
            left: "1%",
            top: "1%",
          }}
        ></img>
      </Link>
      <Title>
        <AlignTitleDiv>Obrazac</AlignTitleDiv>
      </Title>

      <SideBarForm>
        <form>
          <h2>Upišite podatke:</h2>
          <TextField
            id="standard-basic"
            label="Tema završnog rada"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleInputTheme(e);
            }}
          />

          <TextField
            id="standard-basic"
            label="Ime i prezime"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleInputName(e);
            }}
          />

          <div>
            <label>
              <input
                type="radio"
                value="redovan"
                checked={selectedOption === "redovan"}
                onChange={handleOptionChange}
              />
              Redovan
            </label>
            <label>
              <input
                type="radio"
                value="izvanredan"
                checked={selectedOption === "izvanredan"}
                onChange={handleOptionChange}
              />
              Izvanredan
            </label>
          </div>

          <TextField
            id="standard-basic"
            label="Mentor"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleMentor(e);
            }}
          />

          <TextField
            id="standard-basic"
            label="Matični broj studenta"
            type="number"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleStudentNumber(e);
            }}
          />
        </form>{" "}
        <Botun onClick={createPDF}>Spremi PDF</Botun>
      </SideBarForm>
      <MainContentDiv>
        <PatternDiv>
          <img
            style={{ width: "200px", height: "200px" }}
            src={logo_sveuciliste_u_zadru}
          ></img>

          <h1>Sveučilište u Zadru</h1>
          <h2>Prijava teme završnog rada</h2>

          <p>Prijedlog naslova teme: {themeName}</p>
          <p>Ime studenta: {studentName}</p>
          <p>Matični broj studenta: {studentNumber}</p>
          <p>Mentor: {mentor}</p>
          <p>Status studenta: {selectedOption}</p>
          <div style={{ marginLeft: "15px", marginRight: "15px" }}>
            <p>
              Povjerenstvu za završne i diplomske radove Sveučilišta u Zadru,
              odjela Informacijske tehnologije, podnosim zamolbu za prijavu teme
              diplomskog rada sa gore navedenim podacima.
            </p>
            <p>
              Predajom ove prijave diplomskog rada izjavljujem i potvrđujem da
              ću diplomski rad koji će nastati na temelju ovdje napisanog
              izraditi potpuno samostalno u skladu sa savjetima i komentarima
              mentora i članova povjerenstva za diplomske radove te objavljenu
              literaturu koja je navedena u samom tekstu rada i popisu
              literature.
              <p>
                {" "}
                Izjavljujem da niti jedan dio mojeg rada neće biti prepisan iz
                necitiranog rada, da niti jednim dijelom svojeg rada neću kršiti
                bilo čija autorska prava i da niti jedan dio rada neće biti
                napisan na nedozvoljeni način.
              </p>{" "}
              <p>
                Pri pisanju i sastavljanju rada vodit ću se načelima najbolje
                akademske prakse, što je prvenstveno vezano uz nepovredivost
                autorstva te ispravno citiranje i referenciranje radova drugih
                autora.
              </p>{" "}
              U slučaju da se u bilo kojem trenutku dokaže kako je rad napisan
              na nedozvoljen način spreman/spremna sam snositi sve posljedice
              takvog čina, uključivo i oduzimanje javne isprave koju ću takvim
              radom steći.{" "}
            </p>
            <p>
              <span>_______________________(potpis studenta)</span>
            </p>
          </div>
        </PatternDiv>
      </MainContentDiv>
    </ParrentDiv>
  );
};
export default Patterns;
const ParrentDiv = styled.div`
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 380px 1fr 0px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;

  height: 100vh;
`;
const Title = styled.div`
  height: 4rem;
  grid-area: header;
  background-color: #3f1f5f;

  text-align: center;
  font-size: 1.5rem;
  color: white;
  font-family: "Audiowide", cursive;
`;

const MainContentDiv = styled.div`
  grid-area: content;
  background-color: whitesmoke;
`;

const SideBarForm = styled.div`
  grid-area: nav;
  text-align: center;

  background-color: #6c7792;
`;

const PatternDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s ease-in-out;
`;
const AlignTitleDiv = styled.div`
  padding-top: 1rem;
`;

const Botun = styled.button`
padding: 10px 10px;
font-size: 15px;
text-align: center;
cursor: pointer;
outline: none;
color: #fff;
background-color: #3f1f5f;
border: none;
border-radius: 15px;

:hover {background-color: #3e8e41}
:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
`;
