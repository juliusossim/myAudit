import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { CgArrowsExpandUpRight } from 'react-icons/all';
import { sentenceCaps } from '../../utilities/stringOperations';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(249 249 249)',
    color: '#202020',
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
export default function ClientsTable({ data }) {
  const { push } = useHistory();
  function createData(name, phone, address, business, email, action) {
    return {
      name, phone, address, business, email, action
    };
  }

  const rows = data?.map((item) => createData(
    item.name, item.phone, item.address, item.nature_of_business, item.email
  ));
  const handleRow = (row) => push({ pathname: `/app/view/${row.name}/${row.id}` });

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Telephone</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Business Nature</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <div className="bold theme-font font-small">{sentenceCaps(row.name)}</div>
              </StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.phone}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.address}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.business}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.email}</div></StyledTableCell>
              <StyledTableCell align="right">
                <div className="theme-font-2">
                  <Button type="button" className="btn-small btn text-white" onClick={() => handleRow(row)}>
                    <CgArrowsExpandUpRight />
                  </Button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
