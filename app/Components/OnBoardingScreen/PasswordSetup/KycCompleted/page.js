'use client';

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginApi, otpVerifyApi } from '../../ApiService/page';
import Image from 'next/image';
import signupimage from '../../../SetldImages/signupimage.png';
import logo from '../../../SetldImages/logo.png';
import successimg from '../../../SetldImages/passwordsuccessful.png';
import style from '../resetpassword.module.css'
import { Modal, Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import Loader from '../../../Loader/page'
import { useDispatch, useSelector } from 'react-redux';
import { setOtpVerificationKey } from '../../../Redux/Slices/UserSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(45); // Example timer value in minutes

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const dispatch = useDispatch();
    const verificationKey = useSelector((state) => state.userinfo.otpVerificationKey);
    const [showPassword, setShowPassword] = useState(false);


    const identifier = process.env.NEXT_PUBLIC_IDENTIFER;

    // Mutation for login
    const login = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            console.log('Login successful:', data);
            dispatch(setOtpVerificationKey(data.otpVerificationKey));
            setShowOtpModal(true); // Show OTP modal on successful login
            setLoading(false);
        },
        onError: (error) => {
            console.error('Login failed:', error);
            const errorMessage = error.response?.data?.headers?.message || 'Login failed';
            toast.error(errorMessage); // Show the error message in a toast
            setLoading(false);
        },
    });

    const verify = useMutation({
        mutationFn: otpVerifyApi,
        onSuccess: (data) => {
            console.log('verify successful:', data);
            toast.success("Login Successful");
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
        setShowOtpModal(true);
        // login.mutate({ username, password, identifier });
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
            router.push('/OnBoardingScreen/SignUp'); 
    };


    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000); // Update every second

        return () => clearInterval(timer);
    }, [timeLeft]);

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
                        <div className="d-flex justify-content-center mt-5">
                            <Image
                                src={successimg}
                                alt="successimg"
                                width={134}
                                height={24}
                            />
                        </div>
                        <div className={style.passwordtxt}>Password Reset</div>
                        <div className={style.dontworrytxt}>Your password has been successfully rest, <br></br> click below to Sign in </div>
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>

                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className={`${style.signupbutton} w-100`}
                                    disabled={login.isLoading}
                                >
                                    {login.isLoading ? 'Continue' : 'Continue'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

                <div className={`${style.division2} col-lg-4`}></div>
            </div>

            {/* OTP Modal */}
            <Modal show={showOtpModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <div className={`${style.modelmain}`}>
                    {/* Modal Title */}
                    <div className={`${style.verify} d-flex justify-content-center pb-2`}>Please confirm that you
                        want to reset your password</div>

                    {/* Description Text */}
                    {/* <p className={`${style.verifytxt} mt-2 `}>
                        Enter your one Time password. We have
                        sent to &nbsp;
                        {getFirstThreeCharacters(username)}{username.includes('@') ? '...@gmail' : 'XXXX'} {username.includes('@') ? 'email' : 'message'}.
                    </p> */}

                    {/* OTP Input Field */}


                    {/* Countdown Timer */}


                    {/* Buttons */}

                    <div className='d-flex g-2'>
                        <Button type="button" className={style.verifybutton} onClick={handleOtpSubmit}>
                            Verify
                        </Button>
                        <Button type="button" className={style.verifybutton} onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </div>

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