import axios from "axios"
import React, { useReducer, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/UserInfoContext"

const initialState = {
    email:"",
    password:""
}

function reducer(state, action){
    switch (action.type) {
        case "SET_EMAIL":
            return {...state, email: action.payload}
        case "SET_PASSWORD":
            return {...state, password: action.payload}
        case "RESET":
            return initialState
        default:
            return state
    }
}

const Login = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ error, setError ] = useState("")
    const navigate = useNavigate()
    const { setIsLoggedIn } = useContext(AuthContext)

    function handleChange(e){
        const { name, value } = e.target;

        setError("")

        if(name === "email"){
            dispatch({ type: "SET_EMAIL", payload: value})
        }
        if(name === "password"){
            dispatch({ type: "SET_PASSWORD", payload: value})
        }
    }

    async function postlogin(){
        try {
            let res = await axios({
                method: "post",
                url: `https://book-library-bc.onrender.com/auth/login`,
                data: state
            })
            setError("")
            console.log(res.data)

            if (res.status === 200) {
                localStorage.setItem("token", res.data.access_token);
                setIsLoggedIn(true)
                navigate("/");
            }

        } catch (error) {
            console.log("Error in Login", error.message)
            const msg= error.response?.data?.message || "Login failed"
            setError(msg)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        postlogin()

        dispatch({ type: "RESET" })
    }

    return(
        <>
        <div className="border border-black w-[30%] m-auto mt-[5%] p-[2%] rounded">
            <form onSubmit={handleSubmit}>
                <p>Email:</p>
                <input
                type="text"
                name="email"
                value={state.email}
                onChange={handleChange}
                className="border border-blue-200 mb-[5%] w-[100%] rounded"
                />
                <p>Password:</p>
                <input
                type="text"
                name="password"
                value={state.password}
                onChange={handleChange}
                className="border border-blue-200 mb-[5%] w-[100%] rounded"
                />
                {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
                <input
                type="submit"
                className="block mx-auto rounded px-4 py-1 bg-blue-500 text-white"
                />
            </form>

            <p className="mt-[8%]">You don't have an account <Link to="/register" className="text-blue-500">
                    Register
                </Link>
            </p>
        </div>
        </>
    )
}

export default Login;