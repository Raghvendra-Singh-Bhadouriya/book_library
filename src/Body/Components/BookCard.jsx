import axios from "axios"

const BookCard = ({book}) => {

    async function handleBookAdd(id) {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.post(
                `https://book-library-bc.onrender.com/api/mybooks/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                },
            }
        );
            alert("Book added to your list 📚");
            console.log(res.data);
        } catch (error) {
            console.error("Error adding book:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "Failed to add book");
        }
    }


    return(
        <>
        <div className="border border-gray-300 rounded-md shadow-md p-4">
                <img className="w-full h-[200px] object-cover mb-4 rounded" src={book.coverImage} />
                <h3 className="font-bold text-lg">{book.title}</h3>
                <p className="text-sm">{book.author}</p>
                <p className="text-sm mb-[5%]">{book.availability === true ? "Availabel" : "Not Availabel"}</p>
            <div className="m-auto">
                <button onClick={() => handleBookAdd(book._id)} className="block mx-auto w-[80%] bg-red-500 text-white px-4 py-2 rounded">Want to Read</button>
            </div>
        </div>
        </>
    )
}

export default BookCard;