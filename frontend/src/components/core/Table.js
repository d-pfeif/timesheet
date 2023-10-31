import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CustomTable = ({ headers, tableData, handleRowClick }) => {
  const tableContainerStyles = {
    maxWidth: "800px",
  };

  const tableRowStyles = {
    "&:last-child td, &:last-child th": { border: 0 },
    ...(handleRowClick && {
      "&:hover": {
        backgroundColor: "#f0f0f0",
        cursor: "pointer",
      },
    }),
  };

  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table sx={{ minWidth: 300 }} aria-label="A table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.label}>{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((data, index) => (
              <TableRow
                key={index}
                sx={tableRowStyles}
                onClick={() => {
                  handleRowClick && handleRowClick(data);
                }}
              >
                {Object.values(data).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                style={{ textAlign: "center" }}
              >
                No data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
