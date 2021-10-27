import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { sentenceCaps } from '../../utilities/stringOperations';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(249 249 249)',
    color: '#828282',
    fontWeight: 600
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function createData(name, date, company, members, status, action) {
  return {
    name, date, company, members, status, action
  };
}

const rows = [
  createData('spring 2019', new Date().getFullYear(), 6.0, 24, 4.0),
  createData('summer 2018', 237, 9.0, 37, 4.3),
  createData('fall 2020', 262, 16.0, 24, 6.0),
  createData('autumn 2021', 305, 3.7, 67, 4.3),
  createData('summer 2020', 356, 16.0, 49, 3.9)
];
const handleRow = (row) => console.log(row);

export default function CustomizedTables({ heads }) {
  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Company</StyledTableCell>
            <StyledTableCell align="right">No. of Member</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <div className="bold theme-font font-small">{sentenceCaps(row.name)}</div>
              </StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.date}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.company}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.members}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.status}</div></StyledTableCell>
              <StyledTableCell align="right">
                <div className="theme-font-2"><button type="button" className="btn-small btn text-white" onClick={() => handleRow(row)}>view</button></div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
