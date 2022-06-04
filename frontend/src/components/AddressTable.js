import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AddressTable = ({ address }) => {
    return(
        <TableContainer sx={{ mx: 'auto', mt: '1rem', maxWidth: '75%' }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Country</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { address && address.map((item) => (
                        <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{item.full_name}</TableCell>
                            <TableCell component="th" scope="row">{item.email}</TableCell>
                            <TableCell component="th" scope="row">{item.country}</TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </TableContainer>
    )    
};

export default AddressTable;