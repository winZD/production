import React, { useState, useEffect } from "react";
import MaterialTable, { MTableBodyRow } from "material-table";
import axios from "axios";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const WeekTable = (props) => {
  const { weekDay, date } = props;

  const [weekData, setWeekData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <MaterialTable
      columns={[
        { title: "Ime i prezime", field: "full_name" },
        { title: "Kabinet", field: "cabinet_number" },
        { title: "Odjel", field: "department_name" },
        { title: "Predmet", field: "course_name" },
        {
          title: "Vrijeme od",
          field: "time_change_begin",
        },
        {
          title: "Vrijeme do",
          field: "time_change_until",
        },
        {
          title: "E-mail",
          field: "email",
        },
      ]}
      data={weekDay}
      icons={tableIcons}
      /* onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }*/
      options={{
        filtering: true,
        emptyRowsWhenPaging: false,
        search: true,
        sorting: true,
        exportButton: true,
        showTitle: false,
        rowStyle: { "&:hover": { backgroundColor: "#EEE" } },
        rowStyle: (rowData, index, level) => ({
          backgroundColor: index % 2 === 0 ? "#EEE" : "white",
        }),
        /*
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? "red" : "#FFF",
        }),

        rowStyle: (rowData, index, level) => ({
          backgroundColor: index % 2 === 0 ? "#EEE" : "white",
        }),*/
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "Nema podataka...",
        },

        header: {
          actions: "Actions",
        },

        pagination: {
          labelDisplayedRows: "{from}-{to} do {count}",
          labelRowsSelect: "Redovi",
        },
        toolbar: {
          nRowsSelected: "{0} reda(ova) selektirana",
          searchPlaceholder: "Pretraži...",
          exportTitle: "Download",
        },
      }}
    />
  );
};

export default WeekTable;
