import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { useState } from "react";
import { Button, Input, Logo } from ".";

interface IFormInput {
    email: string;
    password: string;
    name: string;
}

function Signup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<IFormInput>();
    const [error, setError] = useState("");

    const handleSignup: SubmitHandler<IFormInput> = async (data) => {
        setError("");

        const getErrorMessage = (error: unknown) => {
            if (error instanceof Error) return error.message;
            return String(error);
        };

        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                userData && dispatch(login(userData));
                navigate("/");
            }
        } catch (error: unknown) {
            setError(getErrorMessage(error));
        }

    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border  border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center font-bold text-2xl leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-pretty transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(handleSignup)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            type="text"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                    message: "Email adress must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                    message: "Password must contain 8 characters with 1 uppercase letter 1 lowercase letter and 1 number"
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;