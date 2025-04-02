// AddressInformationForm.js
'use client'

import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import styles from '../accountinfo.module.css'

export default function AddressInformationForm({ handleNext, handleBack }) {
    return (
        <Box component="form" sx={{ mt: 2 }}>
            <TextField
                label="Street Address"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Address 2"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="State"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="City"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Zip Code"
                fullWidth
                margin="normal"
                variant="outlined"
            />

            <Box sx={{ display: 'flex',justifyContent: 'flex-end', mt: 2,gap:'10px' }}>
                <Button onClick={handleBack} className={styles.backbutton}>Back</Button>
                <Button variant="contained" className={styles.button} onClick={handleNext}>
                    Next
                </Button>
            </Box>
        </Box>
    );
}
