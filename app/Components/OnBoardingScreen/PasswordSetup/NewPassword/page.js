'use client';

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { validateResetKeyApi, otpVerifyApi, updatenewpassword } from '../../ApiService/page';
import Image from 'next/image';
import signupimage from '../../../SetldImages/signupimage.png';
import logo from '../../../SetldImages/logo.png';
import keyicon from '../../../SetldImages/passwordkeyicon.png';
import style from '../resetpassword.module.css'
import { Modal, Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [passwordResetKey, setPasswordResetKey] = useState('');

  const { passwordresetkey } = useParams();

  useEffect(() => {
    if (passwordresetkey) {
      validateKey(passwordresetkey);
    } else {
      toast.error('Invalid or missing reset key.');
    }
  }, [passwordresetkey]);

  // Mutation for login
  const verifykey = useMutation({
    mutationFn: validateResetKeyApi,
    onSuccess: (data) => {
      console.log('Key validation successful:', data);
      // If validation is successful, proceed to show the password update form
      setLoading(false);
    },
    onError: (error) => {
      console.error('Key validation failed:', error);
      const errorMessage = error.response?.data?.headers?.message || 'Invalid reset key';
      toast.error(errorMessage); // Show the error message in a toast
      setLoading(false);
    },
  });

  const validateKey = (key) => {
    setLoading(true);
    verifykey.mutate({
      identifier: process.env.NEXT_PUBLIC_IDENTIFER, // Replace with actual identifier
      passwordResetKey: key,
    });
  };

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


  const updatePassword = useMutation({
    mutationFn: updatenewpassword,
    onSuccess: (data) => {
      toast.success('Password updated successfully!');
      setLoading(false);
      
        router.push('/Components/OnBoardingScreen/PasswordSetup/KycCompleted'); // Replace '/signup' with the actual route of your signup page
      
    },
    onError: (error) => {
      console.error('Password update failed:', error);
      const errorMessage = error.response?.data?.headers?.message || 'Password update failed';
      toast.error(errorMessage);
      setLoading(false);
    },
  });

  const handleconformation = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    updatePassword.mutate({
      identifier: process.env.NEXT_PUBLIC_IDENTIFER, // Replace with actual identifier
      passwordResetKey: passwordresetkey, // Pass the reset key from the prop
      password, // New password
      confirmPassword, // Confirm password
    });
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOtpModal(true)
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


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <div className={style.Forgot}>Create New Password</div>
            <div className={style.wesendmailtxt}>Please enter a new password. Ensure that <br></br>
              your new password is different from the <br></br>
              previous one for better security..</div>
            <form className="d-flex flex-column mt-2" onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password "
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText>Must be a least 8 Character</FormHelperText>

              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password "
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <div className="d-flex justify-content-center pb-4">
                <button
                  type="submit"
                  className={`${style.signupbutton} w-100`}

                >
                  proceed
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
          <div className="d-flex justify-content-center">
            <Image
              src={keyicon}
              alt="keyicon"
              width={80}
              height={80}
            />
          </div>
          <div className={`${style.conformheadertxt} pb-2`}>Please confirm that you
            want to reset your password</div>



          <div className='d-flex gap-3'>
            <Button type="button" className={style.cancelbutton} onClick={handleCloseModal}>
              cancel
            </Button>
            <Button type="button" className={style.verifybutton} onClick={handleconformation}>
              Confirm
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










// 'use client'

// import { useState } from 'react';
// import axios from 'axios';

// const PasswordResetForm = ({ verificationKey }) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("key",verificationKey)

//     if (newPassword !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       // Adjust the payload to match the required format
//       const payload = {
//         password: newPassword,
//         confirmPassword,
//         identifier: 'setldwebapp',  // Adjust the identifier if needed
//         passwordResetKey: verificationKey,
//       };

//       // Call the updatepassword API
//       await axios.post('https://sandbox.setld.app/users-service/auth/updatepassword', payload);
//       setSuccessMessage('Password has been successfully reset.');
//       setErrorMessage('');
//     } catch (error) {
//       setErrorMessage('Error resetting password.');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default PasswordResetForm;


