import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ Email: "", Password: "" });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const message = localStorage.getItem("toastMessage");
        if (message) {
            toast.success(message, { duration: 3000 });
            localStorage.removeItem("toastMessage"); 
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("toastMessage", response.data.message);

                navigate("/home"); 
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

    return (
        <div className="signup-container">
            <Toaster position="top-center" />

            <div className="auth-card">
                <div className="card-header">
                    <h1 className="signup-title">Login</h1>
                </div>
                <div className="form-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
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
                                {isLoading ? "Processing..." : "Login"}
                            </button>
                        </div>
                        <div className="login-link">
                            Don't have an account? <a href="http://localhost:3000/signup">Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;