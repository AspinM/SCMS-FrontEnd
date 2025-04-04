'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginApi, otpVerifyApi } from '../ApiService/page';
import Image from 'next/image';
import signupimage from '../../../SCMSImages/medical-people-staff.png';
import logo from '../../../SCMSImages/SCMS Logo new.png';
import style from './signIn.module.css';
import { Modal, Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import Loader from '../../../Loader/page'
import { useDispatch, useSelector } from 'react-redux';
import { setOtpVerificationKey } from '../../../Redux/Slices/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField, MenuItem, Select } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(45); // Example timer value in minutes
    const [loading, setLoading] = useState(false);
    const timerRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const verificationKey = useSelector((state) => state.userinfo.otpVerificationKey);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const identifier = process.env.NEXT_PUBLIC_IDENTIFER;


    const login = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            console.log('Login successful:', data);
            dispatch(setOtpVerificationKey(data.otpVerificationKey));
            setShowOtpModal(true);
            setLoading(false);
            startCountdown(600);
        },
        onError: (error) => {
            console.error('Login failed:', error);
            const errorMessage = error.response?.data?.headers?.message || 'Login failed';
            toast.error(errorMessage);
            setLoading(false);
            setUsernameError('');
            setPasswordError('');

            if (error.response?.data?.errorlist) {
                const { username, password } = error.response.data.errorlist;
                setUsernameError(username || '');
                setPasswordError(password || '');
            }
        },
    });

    const verify = useMutation({
        mutationFn: otpVerifyApi,
        onSuccess: (data) => {
            toast.success("Login Successful");
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }
            if (data.refreshKey) {
                localStorage.setItem('refreshKey', data.refreshKey);
            }
            setLoading(false)
            router.push('/Components/OnBoardingScreen/welcomeScreen');
        },
        onError: (error) => {
            setLoading(false)
            const errorMessage = error.response?.data?.headers?.message || 'OTP verification failed';
            toast.error(errorMessage);
            console.error('verify failed:', error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // login.mutate({ username, password, identifier });

        setTimeout(() => {
        router.push('/Components/Common/DashBoardMain');
            
        }, 1000);

    };

    const handleOtpChange = (otp) => {
        setOtp(otp);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        verify.mutate({ otp, verificationKey });
    };

    const handleCloseModal = () => {
        setShowOtpModal(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${secs < 10 ? `0${secs}` : secs}`;
    };

    const getFirstThreeCharacters = (str) => {
        return str.slice(0, 3);
    };

    const handleSignUpRedirect = () => {
        setLoading(true);

        router.push('/Components/OnBoardingScreen/SignUp');
    };

    const handleforgetpass = (e) => {
        e.preventDefault();
        setLoading(true);
        router.push('/Components/OnBoardingScreen/PasswordSetup/ForgetPassword'); // Replace '/signup' with the actual route of your signup page
    }


    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const startCountdown = (initialTime) => {
        if (initialTime <= 0) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000); // Update every second
    };

    // useEffect to clean up on unmount
    useEffect(() => {
        return () => clearInterval(timerRef.current); // Clean up on component unmount
    }, []);

    const handleterms = (event) => {
        event.preventDefault();
        setLoading(true);

        router.push('/Components/OnBoardingScreen/Termsofuse'); // Replace '/signup' with the actual route of your signup page

    }

    const handlepolicy = (event) => {
        event.preventDefault();
        setLoading(true);
        router.push('/Components/OnBoardingScreen/PrivacyPolicy'); // Replace '/signup' with the actual route of your signup page

    }


    return (

        <>
        <ToastContainer />
        {loading && <Loader />}
            <div className="row m-0 vh-100 overflow-hidden">
            
                {/* Left Side */}
                <div className={`col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center px-5 py-4 ${style.leftPanel}`}>
                    <div className="d-flex flex-column align-items-center text-white">
                        <Image
                            src={signupimage}
                            alt="Signup Image"
                            width={500}     // or any size
                            height={500}
                        />
                        <p className={style.signuptxt}>Welcome to our platform!</p>
                    </div>
                </div>

                {/* Right Side with Centered Form */}
                <div className={`col-lg-6 d-flex justify-content-center align-items-center px-4 ${style.rightPanel}`}>

                    <form className="d-flex flex-column w-100 border border-secondary rounded p-6 shadow" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
                        <div className="d-flex justify-content-center mb-2">
                            <Image
                                src={logo} // Make sure to import logo correctly
                                alt="Logo"
                                width={130}
                                height={100}
                            />
                        </div>
                        <h2 className={`fw-bold mb-4 ${style.loginHeading}`}>Sign In</h2>

                        <div className={`mb-1`}>
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="outlined-basic"
                                label="User Name"
                                variant="outlined"
                                className="w-100"
                                error={!!usernameError}
                                helperText={usernameError}
                            />
                        </div>

                        <div className={` mb-1 mt-4`}>
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                className="w-100"
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                        </div>

                        <FormControl fullWidth className="mt-4">
                            <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Organization"
                            // value={org}
                            // onChange={handleOrgChange}
                            >
                                <MenuItem value={"Org1"}>Organization 1</MenuItem>
                                <MenuItem value={"Org2"}>Organization 2</MenuItem>
                                <MenuItem value={"Org3"}>Organization 3</MenuItem>
                            </Select>
                        </FormControl>

                        <div className={style.forgetpasstxt + " mt-3"}>
                            <span onClick={handleforgetpass}>Forgot Password?</span>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <button
                                type="submit"
                                className={`${style.loginbutton} w-100`}
                                disabled={login.isLoading}
                            >
                                {login.isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>




        </>
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