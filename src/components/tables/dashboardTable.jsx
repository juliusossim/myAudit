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
import { CgArrowsExpandUpRight } from 'react-icons/all';
import Button from '@mui/material/Button';
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
export default function DashboardTable({ data }) {
  const { push } = useHistory();
  function createData(name, date, client, members, status, action) {
    return {
      name, date, client, members, status, action
    };
  }
  const rows = data?.map((item) => createData(
    item?.name, item?.year, item?.client?.name, item?.staff_power, item?.status
  ));
  const handleRow = (row) => push({ pathname: `/app/view/${row.name}/${row.id}` });

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Client</StyledTableCell>
            <StyledTableCell align="right">No. of Member</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={sentenceCaps(row.name)}>
              <StyledTableCell component="th" scope="row">
                <div className="bold theme-font font-small">{sentenceCaps(row.name)}</div>
              </StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.date}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{sentenceCaps(row.client)}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{sentenceCaps(row.members)}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{sentenceCaps(row.status)}</div></StyledTableCell>
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
