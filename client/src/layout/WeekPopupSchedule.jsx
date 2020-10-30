import React, { useMemo, useState, useEffect } from "react";

import Select from "react-select";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import back from "../icons/back.png";

import axios from "axios";

//import TableStudents from "./table/TableStudents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import hr from "date-fns/locale/hr";
import ClientsTable from "./table/ClientsTable";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import WeekTable from "./table/Weektable";

//popup za tjedni pregled
const WeekPopupSchedule = (props) => {
  const { weekData, date, daysData, closeWeekSchedule } = props;

  const [countedDay, setCountedDay] = useState(0);
  const [weekDay, setWeekDay] = useState([]);
  const [allData, setAllData] = useState([]);

  //dohvat određenog dana u tjednu
  useEffect(() => {
    const postData = async () => {
      // setCountedDay(countedDay);
      const post = await axios.post(
        "https://schooboxlocal.herokuapp.com/api/weekData",
        {
          days_id: daysData[countedDay].days_id,
        }
      );

      setWeekDay(post.data);
      console.log("dobiven podatak od servera : " + post.data);
      console.log("brojač od servera: " + countedDay);
    };
    postData();
  }, [countedDay]);

  //funkcija za povećanje brojača
  const handleCountedDaysClick = async () => {
    setCountedDay(countedDay + 1);

    if (countedDay === daysData.length - 1) {
      setCountedDay(0);
    }
  };

  //funkcija za smanjivanje brojača
  const handleSubtractedDaysClick = async () => {
    setCountedDay(countedDay - 1);

    if (countedDay === 0) {
      setCountedDay(daysData.length - 1);
    }
  };

  return (
    <WeekPopupScheduleWindow>
      <WeekPopupScheduleInside>
        <Title>
          <Botun onClick={closeWeekSchedule}></Botun>
          <div>
            <button onClick={handleSubtractedDaysClick}>-</button>

            {daysData[countedDay].day_name}
            <button onClick={handleCountedDaysClick}>+</button>
          </div>
        </Title>
        <WeekTable weekDay={weekDay} date={date}></WeekTable>
      </WeekPopupScheduleInside>
    </WeekPopupScheduleWindow>
  );
};

export default WeekPopupSchedule;

const WeekPopupScheduleWindow = styled.div`
  max-height: 90%;
  width: 95%;
`;
const WeekPopupScheduleInside = styled.div`
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
`;
const Title = styled.div`
  height: 4rem;

  background-color: #3f1f5f;
  text-align: center;
  font-size: 20px;

  color: white;
  font-family: "Audiowide", cursive;
`;
const Botun = styled.button`
  display: block;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-width: 0.1px;

  border-color: #3f1f5f;
  :hover {
    background-color: red;
  }
  background: -webkit-linear-gradient(
      -45deg,
      transparent 0%,
      transparent 46%,
      white 46%,
      white 56%,
      transparent 56%,
      transparent 100%
    ),
    -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, white 46%, white
          56%, transparent 56%, transparent 100%);
  background-color: #3f1f5f;

  transition: all 0.3s ease;
`;
