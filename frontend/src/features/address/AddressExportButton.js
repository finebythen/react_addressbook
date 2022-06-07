import { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';

// Link for exporting all addresses inside headers, only shows when data in state contains at least one object

const AddressExportButton = () => {

    const base_url = 'http://localhost:8000/api/';

    const [data, setData] = useState([]);

    const headers = [
        { label: "ID", key: "id" },
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Full Name", key: "full_name" },
        { label: "Email", key: "email" },
        { label: "Country", key: "country" }
    ];

    const add_necessary_zero = (date) => {
        return date < 10 ? `0${date}` : String(date);
    };

    const today = new Date();
    const actual_date = `${today.getFullYear()}-${add_necessary_zero((today.getMonth() + 1))}-${add_necessary_zero(today.getDay())}`;

    const handleFetchedData = async () => {
        try {
            const response = await axios.get(`${base_url}address/`)
            const result = response.data;
            setData(result);
        } catch (err) {
            console.log('Export aborted due to error: ', err);
        }        
    };

    useEffect(() => {
        handleFetchedData();
    }, [])

    return(
        <>
            { data?.length && 
                <CSVLink
                    className='csv-link'
                    headers={headers}
                    data={data}
                    filename={`exported-addresses-${actual_date}.csv`}
                    target={"_blank"}
                >
                    Download CSV
                </CSVLink>
            }
        </>
    )
};

export default AddressExportButton;