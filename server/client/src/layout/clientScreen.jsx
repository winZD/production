import React, { Component } from "react";
import Select from "react-select";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import back from "../icons/back.png";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

//import TableStudents from "./table/TableStudents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import hr from "date-fns/locale/hr";
import ClientsTable from "./table/ClientsTable";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import WeekPopupSchedule from "./WeekPopupSchedule";

registerLocale("hr", hr);

const ClientScreenInfo = () => {
  const [loading, setLoading] = useState(true);

  //varijabla za prikaz atributa datuma
  const optionsForDateDataLocale = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [date, setDate] = useState(new Date());

  const handleChangeDate = (date) => setDate(date);
  const dateLocale = date.toLocaleDateString("hr", optionsForDateDataLocale);
  // .toUpperCase();
  console.log(date);

  const [profData, setProfData] = useState([]);
  const [cabinetData, setCabinetData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [allData, setAllData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  //dohvat svih podataka za odredenog profesora
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://schooboxlocal.herokuapp.com/api/profDayCabCouDep"
      );
      console.log(response);

      setAllData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  ///////dohvat profesora//////////
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://schooboxlocal.herokuapp.com/api/getDataProfessors"
      );
      console.log(response);

      setProfData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  ///////////dohvat kabineta///////
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://schooboxlocal.herokuapp.com/api/getDataCabinets"
      );
      console.log(response);

      setCabinetData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //////////////dohvat dana//////
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://schooboxlocal.herokuapp.com/api/getDataDays"
      );
      console.log(response);

      setDaysData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //dohvat odjela///////////
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://schooboxlocal.herokuapp.com/api/getDataDepartments"
      );
      console.log(response);

      setDepartmentsData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  ////dohvat predmeta
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://schooboxlocal.herokuapp.com/api/getDataCourses"
      );
      console.log(response);

      setCoursesData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  /////////////////////////

  const handleClick = () => {};

  const [popup, setPopup] = useState(false);
  const [weekDay, setWeekDay] = useState([]);
  const handleWeekSchedule = () => {
    setPopup(true);
  };
  const closeWeekSchedule = () => {
    setPopup(false);
  };

  /////////////////////////////////////////

  if (!profData) return <div>Loading...</div>;
  //mapiranje objekata po id-u i imenu i njihova dodjela specifičnim varijablama za Select komponentu
  const mapDataByName = profData.map((prof) => ({
    id: prof.professors_id,
    label: prof.full_name,
    value: prof.full_name,
  }));

  const mapDataByCabinet = cabinetData.map((cabinet) => ({
    id: cabinet.cabinets_id,
    label: cabinet.cabinet_number,
    value: cabinet.cabinet_number,
  }));

  const mapDataByDay = daysData.map((day) => ({
    id: day.days_id,
    label: day.day_name,
    value: day.day_name,
  }));
  const mapDataByDepartment = departmentsData.map((department) => ({
    id: department.departments_id,
    label: department.department_name,
    value: department.department_name,
  }));

  const mapDataByCourse = coursesData.map((course) => ({
    id: course.courses_id,
    label: course.course_name,
    value: course.course_name,
  }));

  //<TableStudents columns={columns} data={allData} /> ako bude potrebno mijenjati
  return (
    <Container>
      <Title>
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

        <AlignTitleDiv>
          <div>
            <span>Raspored</span>
          </div>
        </AlignTitleDiv>
      </Title>

      <SideBarForm>
        <AlignSideBarDiv>
          <span style={{ color: "white" }}>
            Pretraživanje po datumu ili ključnoj riječi
          </span>
          <Formik
            initialValues={{
              date: "",
              days: "",
              profesori: "",
              department: "",
              course: "",
              cabinet: "",
            }}
            onSubmit={async (data) => {
              const post = await axios.post(
                "https://schooboxlocal.herokuapp.com/api/postSearchProfDayCabCouDep",
                {
                  full_date: dateLocale,

                  professors_id: data.profesori,
                  departments_id: data.department,
                  course_id: data.course,
                  cabinets_id: data.cabinet,
                }
              );

              setFilteredData(post.data);
              console.log(post);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              onChange,
              handleSubmit,
              setFieldTouched,
              isSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <SelectDiv>
                  {loading ? (
                    <Skeleton height={250} width={200} />
                  ) : (
                    <DatePicker
                      name="date"
                      selected={date}
                      onChange={handleChangeDate}
                      value={values.date}
                      dateFormat="d MMMM , yyyy"
                      locale="hr"
                      inline
                      minDate={new Date()}
                    />
                  )}
                </SelectDiv>

                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"profesori"}
                      placeholder={"Odaberite profesora"}
                      //isDisabled={loading}
                      options={mapDataByName}
                      values={values.profData}
                      onChange={(value) => setFieldValue("profesori", value.id)}
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton height={50} />
                  ) : (
                    <Select
                      name={"department"}
                      placeholder={"Odaberite odjel"}
                      //isDisabled={loading}
                      options={mapDataByDepartment}
                      values={values.departmentsData}
                      onChange={(value) =>
                        setFieldValue("department", value.id)
                      }
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"course"}
                      placeholder={"Odaberite predmet"}
                      //isDisabled={loading}
                      options={mapDataByCourse}
                      values={values.coursesData}
                      onChange={(value) => setFieldValue("course", value.id)}
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"cabinet"}
                      placeholder={"Odaberite kabinet"}
                      //isDisabled={loading}
                      options={mapDataByCabinet}
                      values={values.cabinetsData}
                      onChange={(value) =>
                        setFieldValue("cabinet", value.value)
                      }
                    ></Select>
                  )}
                </SelectDiv>

                <ButtonSearch type="submit">Pretraži</ButtonSearch>
              </form>
            )}
          </Formik>
        </AlignSideBarDiv>
      </SideBarForm>
      <MainContent>
        <ButtonWeek onClick={handleWeekSchedule}>{"PREGLED TJEDNA"}</ButtonWeek>

        {popup ? (
          <WeekPopupSchedule
            weekData={allData}
            date={dateLocale}
            daysData={daysData}
            closeWeekSchedule={closeWeekSchedule}
          />
        ) : (
          <InTableDataDiv>
            {loading ? (
              <Skeleton count={5} height={50} />
            ) : (
              <ClientsTable
                filteredDataOrAllData={
                  filteredData.length != 0 ? filteredData : allData
                }
              />
            )}
          </InTableDataDiv>
        )}
      </MainContent>
    </Container>
  );
};

const TableDiv = styled.div`
  height: 65rem;
  max-height: 62.5vh;
  width: 50rem;
  position: absolute;
  top: 55%;
  left: 62.5%;
  transform: translate(-50%, -50%);

  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const InTableDataDiv = styled.div`
  max-height: 90%;
  width: 95%;
`;

const Container = styled.div`
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 380px 1fr 200px;
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
const SideBarForm = styled.div`
  grid-area: nav;

  background-color: #6c7792;
`;

const MainContent = styled.div`
  grid-area: content;
  background-color: whitesmoke;
`;

const SelectDiv = styled.div`
  width: 80 vw;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: black;
`;
const AlignSideBarDiv = styled.div`
  display: grid;
  font-family: "Audiowide", cursive;
  text-align: center;
`;
/////////////////////////////
const AlignTitleDiv = styled.div`
  padding-top: 1rem;
`;

const ButtonWeek = styled.button`
margin-bottom: 5px;
padding: 7px 15px;
font-size: 15px;
text-align: center;
cursor: pointer;
outline: none;
color: #fff;
background-color: #3f1f5f;
border: none;
border-radius: 15px;

:hover {background-color: #34054d}
:active {
  background-color: #34054d;
 
  transform: translateY(4px);
`;

const ButtonSearch = styled.button`
padding: 10px 35px;
font-size: 20px;
text-align: center;
cursor: pointer;
outline: none;
color: #fff;
background-color: #3f1f5f;
border: none;
border-radius: 15px;

:hover {background-color: #34054d}
:active {
  background-color: #34054d;
 
  transform: translateY(4px);
`;

export default ClientScreenInfo;
