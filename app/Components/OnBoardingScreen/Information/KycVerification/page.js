'use client'

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import kycimg from '../../../../SetldImages/kycimg.png';
import styles from '../accountinfo.module.css';

import successfulimg from '../../../../SetldImages/passwordsuccessful.png';
import failedimg from '../../../../SetldImages/kycfailedimg.png';

export default function KYCVerificationForm({ handleNext, handleBack }) {
    const [loading, setLoading] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'failed'

    const handleVerification = () => {
        setLoading(true);

        // Simulate a verification process that takes 5 seconds
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // Randomly decide if the verification is successful
            setLoading(false);
            setVerificationStatus(isSuccess ? 'success' : 'failed');

            // Automatically proceed to the next step on success
            if (isSuccess) {
                setTimeout(() => {
                    handleNext();
                }, 2000); // Wait 2 seconds before moving to the next step
            }
        }, 5000);
    };
    const successscreen=()=>{
        setVerificationStatus('success');
    }

    const failedscreen=()=>{
        setVerificationStatus('failed');
    }

    if (verificationStatus === 'success') {
        return (
            <div>
                <div className='d-flex justify-content-center'>
                    <Image
                        src={successfulimg}
                        width={134}
                        height={24}
                        alt='image of kyc verification'
                    />
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <p className={styles.kyctxt}>KYC  <br></br>
                    Verification Completed</p>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className={styles.toensuretxt}>
                    Successfully completed KYC verification process, ensuring <br></br> compliance with regulatory requirements and enabling <br></br> access to services.
                    </div>
                </div>

                <div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, gap: '20px' }}>
                        <Button onClick={handleBack} className={styles.backbutton} disabled={loading}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            className={styles.button}
                            // onClick={handleVerification}
                            onClick={failedscreen}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Verification'}
                        </Button>
                    </Box>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'failed') {
        return (
            <div>
                <div className='d-flex justify-content-center'>
                    <Image
                        src={failedimg}
                        width={134}
                        height={24}
                        alt='image of kyc verification'
                    />
                </div>
                <div className='d-flex justify-content-center mt-5'>
                <p className={styles.kyctxt}>KYC  <br></br>
                Verification Failed</p>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className={styles.toensuretxt}>
                    KYC verification failed due to incomplete or incorrect <br></br> information provided. Please review and resubmit the <br></br> required documents for further processing.

                    </div>
                </div>

                <div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, gap: '20px' }}>
                        <Button onClick={handleBack} className={styles.backbutton} disabled={loading}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={handleVerification}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Verification'}
                        </Button>
                    </Box>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Image
                    src={kycimg}
                    width={311}
                    height={300}
                    alt='image of kyc verification'
                />
            </div>
            <div className='d-flex justify-content-center'>
                <p className={styles.kyctxt}>KYC Verification</p>
            </div>
            <div className='d-flex justify-content-center'>
                <div className={styles.toensuretxt}>
                    To ensure the security of your account and comply with
                    regulatory requirements, we need to verify your identity.<br />
                    <span>You will be Done in 5 mins!</span>
                </div>
            </div>

            <div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, gap: '20px' }}>
                    <Button onClick={handleBack} className={styles.backbutton} disabled={loading}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        className={styles.button}
                        // onClick={handleVerification}
                        onClick={successscreen}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Verification'}
                    </Button>
                </Box>
            </div>
        </div>
    );
}
