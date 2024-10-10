import { Link } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation.js";
import { toast } from "react-hot-toast";
const LoginPage = () => {
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});
	const  [login, {loading}]= useMutation(LOGIN,
		{
			refetchQueries: ["GetAuthenticatedUser"],
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login({
				variables: {
					input: loginData
				},
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex rounded-lg overflow-hidden z-50 bg-gray-300'>
				<div className='w-full bg-green-500 min-w-80 sm:min-w-96 flex items-center justify-center'>
					<div className='max-w-md w-full p-6'>
						<h1 className='text-3xl font-semibold mb-6 text-white text-center'>Login</h1>
						<h1 className='text-sm font-semibold mb-6 text-gray-100 text-center'>
							Welcome back! Log in to your account
						</h1>
						<form className='space-y-4' onSubmit={handleSubmit}>
							<InputField
								label='Username'
								id='username'
								name='username'
								value={loginData.username}
								onChange={handleChange}
							/>

							<InputField
								label='Password'
								id='password'
								name='password'
								type='password'
								value={loginData.password}
								onChange={handleChange}
							/>
							<div>
                            <button
									type='submit'
									className='w-full bg-green-600 text-white-500 p-2 rounded-md hover:bg-white hover:text-green-500 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
								 disabled={loading} >

									{loading ? "Loading..." : "Login"}
								</button>
							</div>
						</form>
						<div className='mt-4 text-sm text-gray-200 text-center'>
							<p>
								{"Don't"} have an account?{" "}
								<Link to='/signup' className='text-white hover:underline'>
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;