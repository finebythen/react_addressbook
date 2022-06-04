import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { postAddress } from '../features/addressSlice';

const blue = {
    100: '#DAECFF', 200: '#80BFFF', 400: '#3399FF', 600: '#0072E5',
};
  
const grey = {
    50: '#F3F6F9', 100: '#E7EBF0', 200: '#E0E3E7', 300: '#CDD2D7', 400: '#B2BAC2', 500: '#A0AAB4', 600: '#6F7E8C',
    700: '#3E5060', 800: '#2D3843', 900: '#1A2027',
};
  
const StyledInputElement = styled('input')(
    ({ theme }) => `
        width: 320px;
        font-size: 0.875rem;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
        border-radius: 8px;
        padding: 12px 12px;

        &:hover {
        background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
        border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
        }

        &:focus {
        outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
        }
    `,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
        <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
});

const AddressCreate = () => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [country, setCountry] = useState('');
    const [addRequestStatus, setAddRequestState] = useState('idle');

    const onFirstNameChanged = (e) => setFirstName(e.target.value);
    const onLastNameChanged = (e) => setLastName(e.target.value);
    const onMailChanged = (e) => setMail(e.target.value);
    const onCountryChanged = (e) => setCountry(e.target.value);

    const canSave = [firstName, lastName, mail, country].every(Boolean) && addRequestStatus === 'idle';

    const onSaveClicked = () => {
        if (canSave) {
            try {
                setAddRequestState('loading');

                dispatch(postAddress({
                    first_name: firstName,
                    last_name: lastName,
                    email: mail,
                    country: country,
                    slug: ''
                })).unwrap();

                setFirstName('');
                setLastName('');
                setMail('');
                setCountry('');
                setFirstName('');
            } catch (err) {
                setAddRequestState('failed');
                console.log('Failed to add new address!', err);
            } finally {
                setAddRequestState('idle');
            };
        };
    };

    return(
        <section className="section-create">
            <div>
                <h2>Create new address:</h2>
                <form>
                    <CustomInput placeholder="First name..." value={firstName} onChange={onFirstNameChanged} />
                    <CustomInput placeholder="Last name..." value={lastName} onChange={onLastNameChanged} />
                    <CustomInput placeholder="Email..." value={mail} onChange={onMailChanged} />
                    <CustomInput placeholder="Country..." value={country} onChange={onCountryChanged} />
                    <Stack sx={{ my: "1rem" }} spacing={2} direction="row">
                        <Button variant="contained" onClick={onSaveClicked} disabled={!canSave} >Create address...</Button>
                    </Stack>
                </form>
            </div>
        </section>
    )
};

export default AddressCreate;