import axios from "axios";
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {

    const BASE_URL=process.env.REACT_APP_BASE_URL;


    const navigate = useNavigate();
    const [formData, setFormData] = useState({ FullName: "", Email: "", Password: "" });
    const [userOTP, setUserOTP] = useState(["", "", "", "", "", ""]);
    const [isVerifyPage, setIsVerifyPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                toast.success(response.data.message, { duration: 3000 });
                
                setIsVerifyPage(true);
            }
        } catch (err) {
            console.log("Error:", err);
            if (err.response) {
                toast.error(err.response.data.message, { duration: 3000 });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPChange = (index, value) => {
        const newOTP = [...userOTP];

        if (value.length > 1) {
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
            const response = await axios.post(`${BASE_URL}/auth/signupconfirm`, {
                FullName: formData.FullName,
                Email: formData.Email,
                Password: formData.Password,
                userOTP: enteredOTP,
            });

            if (response.status === 200) {
                // toast.success(response.data.message, { duration: 3000 });
                localStorage.setItem("toastMessage", response.data.message);
                navigate("/login");
            }
        } catch (err) {
            console.log("Error:", err);
            toast.error("Invalid OTP. Please try again.", { duration: 3000 });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (isVerifyPage && userOTP.every((digit) => digit !== "")) {
            handleOTPSubmit();
        }
    }, [userOTP]);

    return (
        <div className="signup-container">
            <Toaster position="top-center" />

            {!isVerifyPage ? (
                <div className="auth-card">
                    <div className="card-header">
                        <h1 className="signup-title">Sign Up</h1>
                        
                    </div>
                    <div className="form-container">
                        <form className="signup-form" onSubmit={handleSubmit}>
                            <div className="input-field">
                                <input 
                                    type="text" 
                                    placeholder="Your Full Name" 
                                    name="FullName" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="input-field">
                                <input 
                                    type="email" 
                                    placeholder="Enter Your Email" 
                                    name="Email" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="input-field">
                                <input 
                                    type="password" 
                                    placeholder="Enter Your Password" 
                                    name="Password" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="button-container">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="auth-button"
                                >
                                    {isLoading ? "Processing..." : "Add Account"}
                                </button>
                            </div>
                            <div className="login-link">
                                Already have an account? <a href="/login">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="auth-card">
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
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignUp;