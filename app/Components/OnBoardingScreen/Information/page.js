'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logo from '../../../SetldImages/setldlogo.png';
import style from './accountinfo.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountInformationForm from './AccountInformation/page'; // Adjust path as needed
import AddressInformationForm from './AddressInformation/page'; // Import the address form component
import KYCVerificationForm from './KycVerification/page'; // Import the KYC verification component

const steps = ['Account Information', 'Address Information', 'KYC Verification'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => step === 1;

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // Media query for tablet and mobile view
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div>
            <div className={style.headersec}>
                <div>
                    <Image
                        src={logo}
                        alt="Picture of the logo"
                        width={69}
                        height={70}
                    />
                </div>
                <div className={style.gethelp}>
                    Get Help
                </div>
            </div>

            <div className={style.accountdetials}>
                <Box sx={{ width: '100%' }}>
                    {/* <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel
                                        StepIconProps={{
                                            sx: {
                                                '& .MuiStepIcon-root': {
                                                    color: activeStep === index || index < activeStep ? '#2C297B !important' : '#ccc !important', // Red color for active and completed steps, gray for inactive
                                                },
                                                '&.Mui-active': {
                                                    color: '#2C297B !important', 
                                                },
                                                '&.Mui-completed': {
                                                    color: '#2C297B !important', 
                                                },
                                                '&.Mui-disabled': {
                                                    color: '#ccc !important', 
                                                },
                                            },
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper> */}
                    {!isMobile && (
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel
                                            StepIconProps={{
                                                sx: {
                                                    '& .MuiStepIcon-root': {
                                                        color: activeStep === index || index < activeStep ? '#2C297B !important' : '#ccc !important',
                                                    },
                                                    '&.Mui-active': {
                                                        color: '#2C297B !important',
                                                    },
                                                    '&.Mui-completed': {
                                                        color: '#2C297B !important',
                                                    },
                                                    '&.Mui-disabled': {
                                                        color: '#ccc !important',
                                                    },
                                                },
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    )}
                    <div className={style.detialinfo}>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    <KYCVerificationForm handleNext={handleNext} handleBack={handleBack} />
                                </Typography>
                                {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box> */}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>

                                {activeStep !== 2 && (
                                    <Typography sx={{ mt: 2, mb: 1, color: '#090080', fontSize: '22px', fontWeight: '500' }}>
                                        {steps[activeStep]}
                                    </Typography>
                                )}
                                {/* <Typography sx={{ mt: 2, mb: 1, color: '#090080', fontSize: '22px', fontWeight: '500' }}> {steps[activeStep]}

                                </Typography> */}
                                {activeStep === 0 ? (
                                    <AccountInformationForm handleNext={handleNext} />
                                    // <KYCVerificationForm handleNext={handleNext} handleBack={handleBack} />
                                ) : activeStep === 1 ? (
                                    <AddressInformationForm handleNext={handleNext} handleBack={handleBack} />
                                ) : activeStep === 2 ? (
                                    <KYCVerificationForm handleNext={handleNext} handleBack={handleBack} />
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {isStepOptional(activeStep) && (
                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                        )}
                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                )}
                            </React.Fragment>

                        )}
                    </div>
                </Box>
            </div>
        </div>
    );
}
