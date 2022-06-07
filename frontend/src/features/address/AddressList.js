import AddressTable from "../../features/address/AddressTable";
import AddressCreate from './AddressCreate';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress, selectAllAddress } from "./addressSlice";
import { useEffect } from "react";

const AddressList = () => {

    const dispatch = useDispatch();
    
    const address = useSelector(selectAllAddress);
    
    useEffect(() => {
        dispatch(fetchAddress());
    }, [dispatch]);

    return(
        <>
            <AddressCreate />
            <AddressTable address={ address } />
        </>
    )
};

export default AddressList;