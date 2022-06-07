import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

const AddressRow = ({ item }) => {

    const navigate = useNavigate();

    const onRowClicked = (adrId) => {
        navigate(`address/${adrId}`);
    };

    return(
        <TableRow className='tableRows' onClick={() => onRowClicked(item.id)} key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{item.full_name}</TableCell>
            <TableCell component="th" scope="row">{item.email}</TableCell>
            <TableCell component="th" scope="row">{item.country}</TableCell>
        </TableRow>
    )
};

export default AddressRow;