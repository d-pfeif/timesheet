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

const CustomTable = ({ headers, tableData }) => {
  const containerStyle = {
    maxWidth: "800px",
  };

  return (
    <TableContainer component={Paper} sx={containerStyle}>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.values(data).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} style={{ textAlign: "center" }}>
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
