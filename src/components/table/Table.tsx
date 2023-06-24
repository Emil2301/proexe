import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(id: number, name: string, username: string, email: string, city: string) {
  return { id, name, username, email, city }
}

const rows = [createData(1, 'Emil', 'emil2301', 'e@op.pl', 'Warszawa')]

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Username</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='right'>{row.name}</TableCell>
              <TableCell align='right'>{row.username}</TableCell>
              <TableCell align='right'>{row.email}</TableCell>
              <TableCell align='right'>{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
