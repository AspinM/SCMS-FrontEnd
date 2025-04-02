'use client';

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { passwordreset } from '../../ApiService/page';
import Image from 'next/image';
import signupimage from '../../../../SetldImages/signupimage.png';
import logo from '../../../../SetldImages/logo.png';
import style from '../resetpassword.module.css'
import { Modal, Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import Loader from '../../../../Loader/page'
import { useDispatch, useSelector } from 'react-redux';
import { setOtpVerificationKey } from '../../../../Redux/Slices/UserSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField } from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import { FaSms, FaEnvelope } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';


function SignInPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(45); // Example timer value in minutes

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const isFieldEmpty = (field) => field.trim() === '';
    const dispatch = useDispatch();
    const verificationKey = useSelector((state) => state.userinfo.otpVerificationKey);


    const identifier = process.env.NEXT_PUBLIC_IDENTIFER;

    // Mutation for login
    const resetpasswrd = useMutation({
        mutationFn: passwordreset,
        onSuccess: (data) => {
            console.log('Password reset successful:', data);
            const successMessage = data.headers?.message || 'Password reset link sent successfully';
            toast.success(successMessage); // Show the success message in a toast
            setTimeout(() => {
                const key = "yourKeyValue"; // Replace with the actual key value you want to pass
                router.push(`/Components/OnBoardingScreen/PasswordSetup/NewPassword?key=${key}`);
            }, 500);
            setLoading(false);
        },  
        onError: (error) => {
            console.error('Login failed:', error);
            const errorMessage = error.response?.data?.headers?.message || 'Login failed';
            toast.error(errorMessage); // Show the error message in a toast
            setLoading(false);
        },
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        resetpasswrd.mutate({ identifier, username });


    };
    const handleOtpChange = (otp) => {
        setOtp(otp);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        console.log('OTP Submitted:', otp);

        console.log('ooooooooooooooooooo', verificationKey)

        verify.mutate({ otp, verificationKey });
        // setShowOtpModal(false); 
    };

    const handleCloseModal = () => {
        setShowOtpModal(false);
    };

    return (
        <div className={style.signinmain}>
            <ToastContainer />
            {loading && <Loader />}
            <div className={style.submain}>
                {/* Left Side - Image Section */}
                <div className={`${style.division1} col-lg-8`}>
                    <div className={style.signupimgsection}>
                        <Image
                            src={signupimage}
                            alt="Signup Image"
                            className={style.signupimage}
                        />
                        <p className={style.signuptxt}>
                            SETLD s Mission is to safely and efficiently facilitate every non-retail transaction  <br></br> in the United States through its SETLD app using Smart Settle Technology.  <br></br>
                            Integrated with tiipstr, SETLD now provides unparalleled insight into people  <br></br> and companies with whom you transact.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className={style.condent}>
                    <div>
                        <div className="d-flex justify-content-center">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={184}
                                height={24}
                            />
                        </div>
                        <div className={style.Forgot}>Forgot Password?</div>
                        <div className={style.dontworrytxt}>Don’t worry we got you covered.Please <br></br>
                            select a password recovery method below.</div>
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <div className={`${style.floatingGroup} mb-1`}>
                                <TextField
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="outlined-basic"
                                    label="Send via SMS"
                                    variant="outlined"
                                    className="w-100"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <RiMessage2Fill style={{ marginRight: '8px' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            left: (theme) => isFieldEmpty(username) ? '40px' : '0px', // Adjust based on input value
                                            '&.Mui-focused': {
                                                left: '0px', // Left position when focused
                                            },
                                        },
                                        shrink: !!username || document.activeElement === document.getElementById('outlined-basic'),
                                    }}
                                />
                            </div>
                            <div className={`${style.floatingGroup} mb-1 mt-3`}>
                                <TextField
                                    value={email} // Corrected to 'email'
                                    onChange={(e) => setEmail(e.target.value)} // Corrected to 'setEmail'
                                    id="outlined-basic-mail"
                                    label="Send via Mail"
                                    variant="outlined"
                                    className="w-100"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaEnvelope style={{ marginRight: '8px' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            left: (theme) => isFieldEmpty(email) ? '40px' : '0px', // Adjust based on input value
                                            '&.Mui-focused': {
                                                left: '0px', // Left position when focused
                                            },
                                        },
                                        shrink: !!email || document.activeElement === document.getElementById('outlined-basic-mail'),
                                    }}
                                />
                            </div>

                            <div className="d-flex justify-content-center mb-5">
                                <button
                                    type="submit"
                                    className={`${style.signupbutton} w-100`}
                                    disabled={resetpasswrd.isLoading}
                                >
                                    {resetpasswrd.isLoading ? 'proceed...' : 'proceed'}
                                </button>
                            </div>
                        </form>


                    </div>
                </div>

                <div className={`${style.division2} col-lg-4`}></div>
            </div>


        </div>
    );
}

export default SignInPage;


{/* <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
/> */}