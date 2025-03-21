import axios from "axios";
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
    const BASE_URL=process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userOTP, setUserOTP] = useState(["", "", "", "", "", ""]);
    const [currentStep, setCurrentStep] = useState("email"); // email, otp, resetPassword
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/auth/forgetpassword`, 
                { Email: email },
                { headers: { "Content-Type": "application/json" }}
            );

            if (response.status === 200) {
                toast.success(response.data.message, { duration: 3000 });
                setCurrentStep("otp");
            }
        } catch (err) {
        
            if (err.response) {
                toast.error(err.response.data.message, { duration: 3000 });
            } else {
                toast.error("Failed to send reset email. Please try again.", { duration: 3000 });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPChange = (index, value) => {
        const newOTP = [...userOTP];

        if (value.length > 1) {
            // Handle paste event
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newOTP[i] = pastedCode[i] || "";
            }
            setUserOTP(newOTP);

            const lastFilledIndex = newOTP.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newOTP[index] = value;
            setUserOTP(newOTP);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !userOTP[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleOTPSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        const enteredOTP = userOTP.join("");

        try {
            const response = await axios.post(`${BASE_URL}/auth/forgetpasswordverifyotp`, {
                Email: email,
                OTP: enteredOTP
            });

            if (response.status === 200) {
                toast.success(response.data.message, { duration: 3000 });
                setCurrentStep("resetPassword");
            }
        } catch (err) {
            toast.error("Invalid OTP. Please try again.", { duration: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match", { duration: 3000 });
            return;
        }
        
        setIsLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/auth/resetpassword`, {
                Email: email,
                NewPassword: newPassword,
                OTP: userOTP.join("")
            });

            if (response.status === 200) {
                localStorage.setItem("toastMessage", response.data.message);
                navigate("/login");
            }
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message, { duration: 3000 });
            } else {
                toast.error("Failed to reset password. Please try again.", { duration: 3000 });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (currentStep === "otp" && userOTP.every((digit) => digit !== "")) {
            handleOTPSubmit();
        }
    }, [userOTP]);

    return (
        <div className="forgot-password-container">
            <Toaster position="top-center" />

            <div className="auth-card">
                {currentStep === "email" && (
                    <>
                        <div className="card-header">
                            <h1 className="forgot-password-title">Forgot Password</h1>
                        </div>
                        <div className="form-container">
                            <form className="forgot-password-form" onSubmit={handleEmailSubmit}>
                                <p className="forgot-password-description">
                                    Enter your email address and we'll send you a code to reset your password.
                                </p>
                                <div className="input-field">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="button-container">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="auth-button"
                                    >
                                        {isLoading ? "Sending..." : "Send Reset Code"}
                                    </button>
                                </div>
                                <div className="login-link">
                                    Remember your password? <a href="/login">Login</a>
                                </div>
                            </form>
                        </div>
                    </>
                )}

                {currentStep === "otp" && (
                    <>
                        <h1 className="otp-title">Verify Your Email</h1>
                        <form className="otp-form" onSubmit={handleOTPSubmit}>
                            <p className="otp-description">Enter the 6-digit code sent to your email address.</p>

                            <div className="otp-input-container">
                                {userOTP.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        maxLength="6"
                                        value={digit}
                                        onChange={(e) => handleOTPChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="otp-input"
                                    />
                                ))}
                            </div>

                            <div className="button-container">
                                <button
                                    type="submit"
                                    disabled={isLoading || userOTP.some((digit) => !digit)}
                                    className="auth-button"
                                >
                                    {isLoading ? "Verifying..." : "Verify Code"}
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {currentStep === "resetPassword" && (
                    <>
                        <div className="card-header">
                            <h1 className="reset-password-title">Reset Password</h1>
                        </div>
                        <div className="form-container">
                            <form className="reset-password-form" onSubmit={handleResetPassword}>
                                <p className="reset-password-description">
                                    Create a new password for your account.
                                </p>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="button-container">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="auth-button"
                                    >
                                        {isLoading ? "Resetting..." : "Reset Password"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;