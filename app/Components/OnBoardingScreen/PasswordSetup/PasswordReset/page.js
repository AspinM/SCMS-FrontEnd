'use client';

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginApi, otpVerifyApi } from '../../ApiService/page';
import Image from 'next/image';
import signupimage from '../../../SetldImages/signupimage.png';
import logo from '../../../SetldImages/logo.png';
import otpmailicon from '../../../SetldImages/otpmailicon.png';
import style from '../resetpassword.module.css'
import { Modal, Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/navigation';
import Loader from '../../../Loader/page'
import { useDispatch, useSelector } from 'react-redux';
import { setOtpVerificationKey } from '../../../Redux/Slices/UserSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField } from '@mui/material';


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
                router.push('/Components/OnBoardingScreen/welcomeScreen'); // Replace '/signup' with the actual route of your signup page

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
        setTimeout(() => {
            router.push('/Components/OnBoardingScreen/PasswordSetup/NewPassword'); // Replace '/signup' with the actual route of your signup page
        }, 500);
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
        setTimeout(() => {
            router.push('/Components/OnBoardingScreen/SignUp'); // Replace '/signup' with the actual route of your signup page
        }, 1000);
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
                        <div className="d-flex justify-content-center mt-4">
                            <Image
                                src={otpmailicon}
                                alt="otp"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className={style.Forgot}>Verify OTP</div>
                        <div className={`${style.wesendmailtxt} `}>We have sent an email to <br></br> gopikaviscom95@gmail.com</div>
                        <form className="d-flex flex-column mt-2" onSubmit={handleSubmit}>

                            <div className={style.otpfield}>
                                <OTPInput
                                    value={otp}
                                    onChange={handleOtpChange}
                                    numInputs={4}
                                    separator={<span>-</span>}
                                    isInputNum={true}
                                    inputStyle={{
                                        width: '3rem',
                                        height: '3rem',
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
                            {/* {login.isError && (
                                <div className={style.error}>
                                    {login.error.message || 'An error occurred'}
                                </div>
                            )} */}
                            <div className="d-flex justify-content-center pb-4">
                                <button
                                    type="submit"
                                    className={`${style.signupbutton} w-100`}
                                    disabled={login.isLoading}
                                >
                                    {login.isLoading ? 'proceed...' : 'proceed'}
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
                    <div className={`${style.verify} d-flex justify-content-center pb-2`}>OTP Verification</div>

                    {/* Description Text */}
                    <p className={`${style.verifytxt} mt-2 `}>
                        Enter your one Time password. We have
                        sent to &nbsp;
                        {getFirstThreeCharacters(username)}{username.includes('@') ? '...@gmail' : 'XXXX'} {username.includes('@') ? 'email' : 'message'}.
                    </p>

                    {/* OTP Input Field */}
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
                                borderRadius: '4px',
                                borderBottom: '2px solid #000',
                                textAlign: 'center',
                            }}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>

                    {/* Countdown Timer */}
                    <div className={style.codeactive}>
                        Didn’t receive the OTP? &nbsp;
                        <span>Resent({formatTime(timeLeft)}s)</span>&nbsp;
                    </div>

                    {/* Buttons */}
                    <Button type="button" className={style.verifybutton} onClick={handleOtpSubmit}>
                        Verify
                    </Button>
                    {/* <Button type="button" className={style.cancelbutton} onClick={handleCloseModal}>
                        Cancel
                    </Button> */}
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