import React from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useBlockLayout,
  useRowSelect,
  useSortBy,
  usePagination,
} from "react-table";
import { useMemo, useState, useEffect } from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const Table = ({ columns, data, setSelectedRows }) => {
  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("full_name", value);
    setFilterInput(value);
  };

  // Input element

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useBlockLayout,
    useSortBy,
    useRowSelect,
    usePagination
  );
//za upravljanje selektiranim redovima
  useEffect(() => {
    setSelectedRows(selectedFlatRows.map((row) => row.original));
  }, [setSelectedRows, selectedFlatRows]);

  /* 
        Render the UI for this table
        - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks
      */
  return (
    <div>
      <input
        style={{ width: "90%" }}
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Pretraži po imenu..."}
      />

      <MaUTable {...getTableProps()} className="-striped -highlight">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {" "}
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Styling>
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </Styling>
            );
          })}
        </TableBody>
      </MaUTable>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Stranica{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Idite na stranicu :{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 15, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Pokaži {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Styling = styled.div`
  :hover {
    background: orange;
    cursor: pointer;
  }
`;

export default Table;
