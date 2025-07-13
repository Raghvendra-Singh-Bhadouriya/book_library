import BookCard from "./Components/BookCard";
import axios from "axios";
import React, { useReducer, useEffect, useState } from "react";

const initialState = {
    loading: false,
    data: null,
    error: false
}

const apiReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true };
        
        case "FETCH_SUCCESS":
            return { ...state, loading: false, data: action.payload };
        
        case "FETCH_ERROR":
            return { ...state, loading: false, data: null, error: action.payload}
        default:
            return state;
    }
}

const Home = () => {

    const [state, dispatch] = useReducer(apiReducer, initialState)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchData(){
        dispatch({ type: "FETCH_START"})
        try {
            const res = await axios({
                method: `get`,
                url: `https://book-library-bc.onrender.com/books`
            })
            dispatch({type: "FETCH_SUCCESS", payload: res.data.data})
            console.log("response", res.data.data)
        } catch (error) {
            dispatch({type: "FETCH_ERROR", payload: `Failed to fetch: ${error.message}`})
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

    
    return(
        <>
        <div className="w-[80%] m-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {state.data && state.data.map((book) => {
                return(
                    <>
                        <BookCard key={book.id} book={book}/>
                    </>
                )
            })}
            
        </div>
        </>
    )
}

export default Home;