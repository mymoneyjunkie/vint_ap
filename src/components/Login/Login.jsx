import { useRef, useState, useEffect } from "react";

import axiosInstance from '../../api/axios';

import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
	const userRef = useRef();
	const errRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/device';

	const [ userInput, setUserInput ] = useState({
		email: '',
		password: ''
	})

	const [ inputError, setInputError ] = useState({
		email: '',
		password: ''
	})

	const [showPassword, setShowPassword] = useState(false);
	const [ errMsg, setErrMsg ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
		setInputError({
			email: '',
			password: ''
		})
	}, [ userInput.email, userInput.password ])

	const handleEmailChange = (e) => {
		setUserInput((prevState) => {
			return {...prevState,
			email: e.target.value}
		})
	}

	const handlePasswordChange = (e) => {
		setUserInput((prevState) => {
			return {...prevState,
			password: e.target.value}
		})
	}

	const togglePassword = () => {
	  setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userInput.email || !userInput.password) {
			setInputError((prevState) => {
				return {
					...prevState,
					email: userInput.email === '' ? true : false,
					password: userInput.password === '' ? true : false
				}
			});
			return;
		}

		try {
			setIsLoading(true);

			const response = await axiosInstance.post('/admin/sign-in',
				{
					email: userInput.email,
					password: userInput.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					}
				}
			);

			if (response.data && response.data.isSuccess) {
				setUserInput({
					email: '',
					password: ''
				})

				navigate(from, { replace: true });
			}

			else {
				setErrMsg("Login Failed...");
			}
		}

		catch (error) {
			// console.log(error);
			if (!error?.response) {
				setErrMsg("Failed to Login In. Try Again...");
			}

			else if (error.response.data?.statusCode === 400 && !error.response.data?.isSuccess) {
				setErrMsg(error.response?.data.message);
			}

			else if (error.response.data?.statusCode === 401) {
				setErrMsg(error.response?.data.message)
			}

			else {
				setErrMsg("Login Failed...");
			}
		}

		finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
	      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
	      	{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
				</div>
			) : (
				<>
					{errMsg && (
						<div 
							ref={errRef} 
							className="bg-red-900/20 border border-red-800/50 text-red-200 p-3 rounded-md mb-6 text-center text-sm"
							aria-live="assertive"
						>
							{errMsg}
						</div>
					)}
			        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Login</h2>
			        <form onSubmit={handleSubmit} className="space-y-5">
			        	<div className="space-y-1">
			          		<div className="mb-4">
			            <label className="block text-emerald-50 mb-2" htmlFor="email">Email</label>
			            <input
			              id="email"
			              type="email"
			              ref={userRef}
			              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
			              placeholder="Enter your email"
			              value={userInput.email}
					      onChange={handleEmailChange}
			            />
			          		</div>
			          		{inputError.email === true && <p className="text-red-500 text-xs">Please enter a valid email address.</p>}
			          	</div>

			          	<div className="space-y-1">
			          		<div className="mb-6">
			            <label className="block text-green-200 mb-2" htmlFor="password">Password</label>
			            <div className="relative">
			              <input
			                id="password"
			                type={showPassword ? 'text' : 'password'}
			                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
			                placeholder="Enter your password"
			                value={userInput.password}
						    onChange={handlePasswordChange}
			              />
			              <button
			                type="button"
			                onClick={togglePassword}
			                className="absolute right-2 top-2 text-sm text-green-300 hover:text-green-500 focus:outline-none"
			              >
			                {showPassword ? 'Hide' : 'Show'}
			              </button>
			            </div>
			          		</div>
							{inputError.password === true && <p className="text-red-500 text-xs">Please enter your password.</p>}
			          	</div>

			          		<button
			          		  type="submit"
			          		  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded"
			          		>
			            		Login
			          		</button>
			        </form>
			    </>
			)}
	      </div>
	    </div>
	)
}

export default Login;
