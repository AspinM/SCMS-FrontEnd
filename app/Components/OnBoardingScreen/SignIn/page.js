'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginApi, otpVerifyApi } from '../ApiService/page';
import Image from 'next/image';
import signupimage from '../../../SetldImages/signupimage.png';
import logo from '../../../SetldImages/logo.png';
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
        // setLoading(true);
        // login.mutate({ username, password, identifier });

        router.push('/Components/Common/DashBoardMain'); 
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
        <div className={style.signinmain}>
            <ToastContainer />
            {loading && <Loader />}
            <div className={style.submain}>

                <div className={`${style.division1} col-lg-6`}>
                    <div className={style.signupimgsection}>
                        <Image
                            src={signupimage}
                            alt="Signup Image"
                            className={style.signupimage}
                        />
                        <p className={style.signuptxt}>

                        </p>
                    </div>
                </div>


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
                        <div className={style.signintxt}>Sign in</div>
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <div className={`${style.floatingGroup} mb-1`}>
                                <TextField
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="outlined-basic"
                                    label="User Name"
                                    variant="outlined"
                                    className='w-100'
                                    error={!!usernameError} // Show error state
                                    helperText={usernameError} // Display error message
                                />
                            </div>
                            <div className={`${style.floatingGroup} mb-1 mt-4`}>
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    className='w-100'
                                    error={!!passwordError} // Show error state
                                    helperText={passwordError} // Display error message
                                />
                            </div>
                            <FormControl fullWidth className={`mt-4`}>
                                <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Organization"
                                    // onChange={handleChange}
                                >
                                   <MenuItem value={"Org1"}>Organization 1</MenuItem>
                                    <MenuItem value={"Org2"}>Organization 2</MenuItem>
                                    <MenuItem value={"Org3"}>Organization 3</MenuItem>
                                </Select>
                            </FormControl>


                            <div className={style.forgetpasstxt} >
                                <span onClick={handleforgetpass}>
                                    Forgot Password?
                                </span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className={`${style.signupbutton} w-100`}
                                    disabled={login.isLoading}
                                >
                                    {login.isLoading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                        <div className={style.termstxt} >
                            <span onClick={handleterms}>  Terms of Use</span>
                        </div>
                        <div className={style.review} >
                            <span onClick={handlepolicy}>
                                Review our Privacy Policy
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`${style.division2} col-lg-4`}></div>
            </div>

            {/* OTP Modal */}


            <Modal show={showOtpModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <div className={`${style.modelmain}`}>

                    <div className={`${style.verify} d-flex justify-content-center pb-2`}>OTP Verification</div>


                    <p className={`${style.verifytxt} mt-2 `}>
                        Enter your one Time password. We have
                        sent to &nbsp;
                        {getFirstThreeCharacters(username)}{username.includes('@') ? '...@gmail' : 'XXXX'} {username.includes('@') ? 'email' : 'message'}.
                    </p>


                    <div className={style.otpfield}>
                        <OTPInput
                            value={otp}
                            onChange={handleOtpChange}
                            numInputs={4}
                            separator={<span>-</span>}
                            isInputNum={true}
                            inputStyle={{
                                width: '4rem',
                                height: '4rem',
                                margin: '0 0.5rem',
                                fontSize: '1.5rem',
                                borderBottom: '2px solid #000',
                                textAlign: 'center',
                            }}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <div className={style.codeactive}>
                        Didn’t receive the OTP? &nbsp;
                        <span>Resent({formatTime(timeLeft)}s)</span>&nbsp;
                    </div>

                    {/* Buttons */}
                    <Button type="button" className={style.verifybutton} onClick={handleOtpSubmit}>
                        Verify
                    </Button>
                </div>
            </Modal>
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