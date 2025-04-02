'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Import Grid component
import styles from '../accountinfo.module.css'

function AccountInformationForm({ handleNext }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        dob: '',
        ssn: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation or form submission logic here if needed
        handleNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}> {/* Use Grid container */}
                    <Grid item xs={12} sm={6}> {/* First Name takes half width on small screens and full width on extra-small screens */}
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}> {/* Last Name takes half width on small screens and full width on extra-small screens */}
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    </Grid>
                </Grid>
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="SSN Number"
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" className={styles.button}>
                    Next
                </Button>
            </Box>
        </form>
    );
}

export default AccountInformationForm;
