'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { setUserInfo } from '../../../Redux/Slices/UserSlice';
import { signupApi } from '../ApiService/page'; // Assuming you have a signup API service
import style from './signup.module.css';
import Image from 'next/image';
import signupimage from "../../../SetldImages/signupimage.png";
import { useDispatch } from 'react-redux';
import logo from '../../../SetldImages/logo.png';
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Loader from '../../../Loader/page'

function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const identifier = process.env.NEXT_PUBLIC_IDENTIFER;

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();

    // Mutation for sign-up
    // Mutation for sign-up
    const signup = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            console.log('Sign up successful:', data);
            setLoading(false);
            toast.success("Sign Up Successful");
           
                router.push('/Components/OnBoardingScreen/welcomeScreen'); // Replace '/signup' with the actual route of your signup pageD:\SETLD-Web\setld-web\app\OnBoardingScreen\welcomeScreen
            
            dispatch(setUserInfo(data));
        },
        onError: (error) => {
            // toast.error('Sign up failed');

            console.error('Sign up failed:', error);
            setLoading(false);
            if (error.response && error.response.data) {
                const { errorlist } = error.response.data;
                if (errorlist) {
                    setErrors(errorlist);
                }
            }
        },
    });

    const validate = () => {
        let hasError = false;
        const newErrors = {};

        if (!firstName) {
            setLoading(false);
            newErrors.firstName = 'First name is required.';
            hasError = true;
        }
        if (!lastName) {
            setLoading(false);
            newErrors.lastName = 'Last name is required.';
            hasError = true;
        }
        if (!phoneNo) {
            setLoading(false);
            newErrors.phoneNo = 'Phone number is required.';
            hasError = true;
        }
        if (!email) {
            setLoading(false);
            newErrors.email = 'Email is required.';
            hasError = true;
        }
        if (!password) {
            setLoading(false);
            newErrors.password = 'Password is required.';
            hasError = true;
        }
        if (password !== confirmPassword) {
            setLoading(false);
            newErrors.confirmPassword = 'Passwords do not match.';
            hasError = true;
        }
        setErrors(newErrors);
        return !hasError;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        if (validate() && isChecked) {
            signup.mutate({ firstName, lastName, phoneNo, email, password, confirmPassword, identifier });
        } else if (!isChecked) {
            toast.error('You must agree to the terms and conditions.');
        }
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handlesignin = (event) => {
        event.preventDefault();
        setLoading(true)
            router.push('/'); // Replace '/signup' with the actual route of your signup page
    }

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
            <div className={`${style.submain}`}>
                <div className={`${style.division1} col-lg-8`}>
                    <div className={style.signupimgsection}>
                        <Image
                            src={signupimage}
                            alt="Signup Image"
                            className={style.signupimage}
                        />
                        <p className={style.signuptxt}>
                            SETLDs Mission is to safely and efficiently facilitate every non-retail transaction  <br></br> in the United States through its SETLD app using Smart Settle Technology.  <br></br>
                            Integrated with tiipstr, SETLD now provides unparalleled insight into people  <br></br> and companies with whom you transact.
                        </p>
                    </div>
                </div>
                <div className={`${style.condent}`}>
                    <div>
                        <div className="d-flex justify-content-center">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={184}
                                height={24}
                            />
                        </div>
                        <div className={style.signintxt}>Sign up</div>
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={`${style.floatingGroup} mb-1`}>
                                        <TextField
                                            error={!!errors.firstName}
                                            label="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            helperText={errors.firstName}
                                            variant="outlined"
                                            className='w-100 mb-1'
                                            size="small"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={`${style.floatingGroup} mb-1`}>
                                        <TextField
                                            error={!!errors.lastName}
                                            label="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            helperText={errors.lastName}
                                            variant="outlined"
                                            className='w-100 mb-1'
                                            size="small"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`${style.floatingGroup} mb-1 mt-2`}>
                                <TextField
                                    error={!!errors.phoneNo}
                                    label="Phone Number"
                                    value={phoneNo}
                                    onChange={(e) => setPhone(e.target.value)}
                                    helperText={errors.phoneNo}
                                    variant="outlined"
                                    className='w-100 mb-1'
                                    size="small"
                                />
                            </div>
                            <div className={`${style.floatingGroup} mb-1 mt-2`}>
                                <TextField
                                    error={!!errors.email}
                                    label="Email ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    helperText={errors.email}
                                    variant="outlined"
                                    className='w-100 mb-1'
                                    size="small"
                                />
                            </div>
                            <div className={`${style.floatingGroup} mb-1 mt-2`}>
                                <TextField
                                    error={!!errors.password}
                                    label="Enter Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    helperText={errors.password}
                                    variant="outlined"
                                    className='w-100 mb-1'
                                    size="small"
                                />
                            </div>

                            <div className={`${style.floatingGroup} mb-1 mt-2`}>
                                <TextField
                                    error={!!errors.confirmPassword}
                                    label="Re-enter Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    helperText={errors.confirmPassword}
                                    variant="outlined"
                                    className='w-100 mb-1'
                                    size="small"
                                />

                            </div>
                            <div className="form-check mb-2 mt-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                   
                                    onChange={handleCheckboxChange}
                                />
                                <label className={`${style.iagreetxt}`} >
                                    I agree to BOTH the <span onClick={handleterms} role="button">Terms of Use</span> and <span onClick={handlepolicy} role="button">Privacy policy</span>
                                </label>
                            </div>
                            {/* {signup.isError && (
                                <div className={style.error}>
                                    {signup.error.message || 'An error occurred'}
                                </div>
                            )} */}
                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className={`${style.signupbutton} w-100 mt-1`}
                                    disabled={!isChecked || signup.isLoading} // Disable if checkbox is not checked or loading
                                >
                                    {signup.isLoading ? 'Signing up...' : 'Sign In'}
                                </button>
                            </div>
                        </form>
                        <div className={style.donthaveacctxt}>
                            Already have an account? <span onClick={handlesignin}>Sign In</span>
                        </div>
                    </div>
                </div>
                <div className={`${style.division2} col-lg-8`} />
            </div>
        </div>
    );
}

export default SignUpPage;
