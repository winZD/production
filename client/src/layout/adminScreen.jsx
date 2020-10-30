import React, { Component } from "react";
import styled from "styled-components";
import useGetData from "../customHooks/useGetData";
import usePostData from "../customHooks/usePostData";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookie";
import { useCookies } from "react-cookie";
import { Formik, Form as FormikForm, Field } from "formik";
import { useMemo, useState, useEffect } from "react";
import back from "../icons/back.png";
import Select from "react-select";
import { TextField, Button } from "@material-ui/core";
//import ReactTable from "react-table";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ReactTable from "react-table-6";

import "react-table-6/react-table.css";
import treeTableHOC from "react-table-6/lib/hoc/treeTable";
import selectTableHOC from "react-table-6/lib/hoc/selectTable";
import Table from "./table/AdminsTable";
//
import ClientsTable from "./table/ClientsTable";
//

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import hr from "date-fns/locale/hr";

import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

//lokalizacija datuma na hr
registerLocale("hr", hr);

//funkcija za administratorski ekran
const AdminScreen = () => {
  //const SelectTreeTable = selectTableHOC(treeTableHOC(ReactTable));

  //hook za setanje i brisanje cookija
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  //funkcija za odjavu administratora, uklanja dodjeljeni token
  const handleLogOut = async (e) => {
    e.preventDefault();
    const token = document.cookie;
    console.log("ovo je token: " + token);

    removeCookie(token);
    window.location.reload(false);
  };

  /////////////////////////////////////////
  /* <SelectTreeTable
            data={allData}
            columns={columns}
            defaultPageSize={2}
            pageSizeOptions={[2, 4, 6]}
            sortable={true}
            filterable={true}
            className="-striped -highlight"

            /* getTrProps={(state, rowInfo, column) => {
              return {
                style: {
                  background: rowInfo.row.age > 40 ? "green" : "red",
                },
              };
            }}
            />*/
  //////////////////////////////////******************** */
  const [loading, setLoading] = useState(true);
  //za time picker

  /////////////////////
  const optionsForDateDataLocale = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [date, setDate] = useState(new Date());
  const handleChangeDate = (date) => setDate(date);
  console.log(date.toLocaleDateString("hr", optionsForDateDataLocale));
  const dateLocale = date.toLocaleDateString("hr", optionsForDateDataLocale);
  //za sqlite
  const [profsData, setProfsData] = useState([]);
  const [cabinetData, setCabinetData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [allData, setAllData] = useState([]);

  //za timepicker
  const [timeChangeBegin, setTimeChangeBegin] = useState(moment());
  const [timeChangeUntil, setTimeChangeUntil] = useState(moment());
  const handleTimeChangeBegin = (timeChangeBegin) => {
    setTimeChangeBegin(timeChangeBegin);

    //console.log(timeChangeBegin.format("HH:mm") + "<------ Vrijeme");
  };

  //funkcija za za setanje promjena vremena
  const handleTimeChangeUntil = (timeChangeUntil) => {
    setTimeChangeUntil(timeChangeUntil);

    //console.log(timeChangeUntil.format("HH:mm") + "<------ Vrijeme");
  };

  ////dohvat svih podataka za odredenog profesora

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

      setProfsData(response.data);
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

  const mapDataByName2 = profsData.map((prof) => ({
    id: prof.professors_id,
    label: prof.full_name,
    value: prof.full_name,
  }));

  const mapDataByCabinet2 = cabinetData.map((cabinet) => ({
    id: cabinet.cabinets_id,
    label: cabinet.cabinet_number,
    value: cabinet.cabinet_number,
  }));

  const mapDataByDay2 = daysData.map((day) => ({
    id: day.days_id,
    label: day.day_name,
    value: day.day_name,
  }));

  const mapDataByDepartment2 = departmentsData.map((department) => ({
    id: department.departments_id,
    label: department.department_name,
    value: department.department_name,
  }));

  const mapDataByCourse2 = coursesData.map((course) => ({
    id: course.courses_id,
    label: course.course_name,
    value: course.course_name,
  }));

  //može i React.useMemo
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(selectedRows);
  //mapiranje selectedRowsa za dohvat svakog itema u retku
  const result = selectedRows.map((d) => d.full_name);
  console.log(result);
  /*
  const [disabled, setDisabled] = useState(
    selectedRows.length >= 1 ? false : true
  );
*/
  const handleClick = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      alert(selectedRows);
    }
  };

  console.log();

  const deleteDataWithID = async () => {
    if (window.confirm("Jeste li sigurni? ")) {
      const id = selectedRows.map((d) => d.id);
      window.location.reload(false);
      const response = await axios.delete(
        `https://schooboxlocal.herokuapp.com/api/removeProfDayCabCouDep/${id}`,
        {
          id: id,
        }
      );
      console.log(response);
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: "Školske informacije",
        // First group columns
        columns: [
          {
            id: "full_name",
            Header: "Ime i prezime",
            accessor: (data) => data.full_name,
            sortType: "basic",
            width: 150,
          },
          {
            id: "cabinets",
            Header: "Učionica",
            accessor: (data) => data.cabinet_number,
            sortType: "basic",
            width: 80,
          },

          {
            id: "departments",
            Header: "Odjel",
            accessor: (data) => data.department_name,
            sortType: "basic",
            width: 150,
          },
          {
            id: "courses",
            Header: "Predmet",
            accessor: (data) => data.course_name,
            sortType: "basic",
          },

          {
            id: "date",
            Header: "Datum",
            accessor: (data) => data.full_date,
            sortType: "basic",
          },
          {
            id: "time_change_begin_until",
            Header: "Vrijeme",
            accessor: (data) =>
              `${data.time_change_begin} - ${data.time_change_until}`,
            sortType: "basic",
          },
        ],
      },
    ],
    []
  );

  //////////////////////////////////////////

  if (!profsData) return <div>loading...</div>;

  return (
    <Container>
      <Title>
        {" "}
        <Link to="/">
          <img
            src={back}
            style={{
              width: "50px",
              position: "absolute",
              left: "1%",
              top: "1%",
            }}
          ></img>{" "}
        </Link>
        <AlignTitleDiv>Administracija</AlignTitleDiv>
      </Title>

      <SideBarForm>
        <AlignSideBarDiv>
          <Formik
            initialValues={{
              dates: "",
              time_change_begin: "",
              time_change_until: "",
              days: "",

              profesori: "",
              department: "",
              course: "",
              cabinet: "",
            }}
            onSubmit={async (data, { resetForm }) => {
              console.log(data); //ovo maknuti

              await axios.post(
                "https://schooboxlocal.herokuapp.com/api/postProfDayCabCouDep",
                {
                  dates: dateLocale,
                  time_change_begin: timeChangeBegin.format("HH:mm"),
                  time_change_until: timeChangeUntil.format("HH:mm"),
                  days_id: data.days,
                  professors_id: data.profesori,
                  departments_id: data.department,
                  course_id: data.course,
                  cabinets_id: data.cabinet,
                }
              );

              resetForm();
              window.location.reload(false);
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
                      name={"dates"}
                      selected={date}
                      onChange={handleChangeDate}
                      dateFormat="d MMMM , yyyy"
                      locale="hr"
                      inline
                      minDate={new Date()}
                    />
                  )}

                  <SelectDiv>
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <label style={{ color: "white" }}>
                        Odaberite vrijeme predavanja
                      </label>
                    )}

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <TimePicker
                          name="time_change_begin"
                          showSecond={false}
                          minuteStep={30}
                          onChange={handleTimeChangeBegin}
                          value={timeChangeBegin}
                        />
                      )}
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <label style={{ color: "white" }}> {" - "} </label>
                      )}
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <TimePicker
                          name="time_change_until"
                          showSecond={false}
                          minuteStep={30}
                          onChange={handleTimeChangeUntil}
                          value={timeChangeUntil}
                        />
                      )}
                    </div>
                  </SelectDiv>
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      placeholder={"Odaberite dan"}
                      name={"days"}
                      options={mapDataByDay2}
                      values={values.daysData}
                      onChange={(value) => setFieldValue("days", value.id)}
                      onBlur={() => setFieldTouched("days", true)}
                    ></Select>
                  )}
                </SelectDiv>

                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"profesori"}
                      placeholder={"Odaberite profesora"}
                      isDisabled={loading}
                      options={mapDataByName2}
                      values={values.profsData}
                      onChange={(value) => setFieldValue("profesori", value.id)}
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"department"}
                      placeholder={"Odaberite odjel"}
                      isDisabled={loading}
                      options={mapDataByDepartment2}
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
                      isDisabled={loading}
                      options={mapDataByCourse2}
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
                      isDisabled={loading}
                      options={mapDataByCabinet2}
                      values={values.cabinetsData}
                      onChange={(value) => setFieldValue("cabinet", value.id)}
                    ></Select>
                  )}
                </SelectDiv>

                <Button type="submit" variant="contained" color="primary">
                  Spremi u tablicu
                </Button>
              </form>
            )}
          </Formik>
        </AlignSideBarDiv>
      </SideBarForm>

      <MainContent>
        <button
          onClick={deleteDataWithID}
          disabled={selectedRows.length >= 1 ? false : true}
        >
          Obriši
        </button>

        <button onClick={handleLogOut}>Odjavi se</button>
        {loading ? (
          <Skeleton count={5} height={50} />
        ) : (
          <Table
            columns={columns}
            data={allData}
            setSelectedRows={setSelectedRows}
          />
        )}
      </MainContent>
    </Container>
  );
};

export default AdminScreen;
//<Table columns={columns} data={allData} />
const Container = styled.div`
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 380px 1fr 0px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 1px;

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
const SelectDiv = styled.div`
  width: 80 vw;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: black;
`;

const MainContent = styled.div`
  grid-area: content;
  background-color: whitesmoke;
`;
const AlignSideBarDiv = styled.div`
  display: grid;
  font-family: "Audiowide", cursive;
  text-align: center;
`;
const AlignTitleDiv = styled.div`
  padding-top: 1rem;
`;

/*
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
*/
