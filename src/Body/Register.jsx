import axios from "axios"
import React, { useReducer, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const initialState = {
    name: "",
    email: "",
    password: ""
}

function reducer(state, action){
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload}
        case "SET_EMAIL":
            return { ...state, email: action.payload}
        case "SET_PASSWORD":
            return { ...state, password: action.payload}
        case "RESET":
            return initialState
        default:
            return state
    }
}


const Register = () => {

    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ error, setError ] = useState("")
    const navigate = useNavigate()

    function handleChange(e){
        const { name, value } = e.target;

        setError("")

        if(name === "name"){
            dispatch ({ type: "SET_NAME", payload: value })
        }
        if(name === "email"){
            dispatch ({ type: "SET_EMAIL", payload: value })
        }
        if(name === "password"){
            dispatch ({ type: "SET_PASSWORD", payload: value })
        }
    }

    async function postuserData(){
        try {
            const res = await axios({
                method: "post",
                url: `https://book-library-bc.onrender.com/auth/register`,
                data: state
            })
            setError("")
            console.log(res)
            navigate("/login")
        } catch (error) {
            const msg = error.response?.data?.message
            setError(msg)
        }
    }

    function handleSubmit(e){
        e.preventDefault();

        postuserData()

        dispatch({ type: "RESET" })
    }


    return(
        <>
        <div className="border border-black w-[30%] m-auto mt-[5%] p-[2%] rounded">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="border border-blue-200 mb-[5%] w-[100%] rounded"
                />
                <input
                type="text"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border border-blue-200 mb-[5%] w-[100%] rounded"
                />
                <input
                type="text"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border border-blue-200 mb-[5%] w-[100%] rounded"
                />
                {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
                <input type="submit"
                className="block mx-auto rounded px-4 py-1 bg-blue-500 text-white"
                />
            </form>

            <p className="mt-[8%]">You have already an account <Link to="/login" className="text-blue-500">
                Login
            </Link>
            </p>
        </div>
        </>
    )
}

export default Register;