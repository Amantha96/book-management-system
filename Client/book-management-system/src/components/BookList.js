import React, { useState } from 'react'
import BookServices from '../services/BookServices';

function BookList({ booklist, setBooklist }) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState(""); 
    const [isbn, setIsbn] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (book) => {
        setIsbn(book.isbn);
        setTitle(book.title);
        setAuthor(book.author);
    };


    const handleDelete = (e) => {
        e.preventDefault()
        BookServices.deleteBook(isbn).then((res) => {
            console.log(res)
            if (res.data.message === "Book deleted") {
                const filteredData = booklist.filter((book) => book.isbn !== isbn);
                setBooklist(filteredData)
                setIsbn("")
            }
        }).catch((e) => {
            alert("Invalid ISBN")
        })
    }
    return (
        <div className="book-list">
            <h1>Book List</h1>

            <div className="delete-book">
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                    className='delete-input'
                    placeholder='Enter ISBN'
                />
                <button onClick={handleDelete}>Delete</button>
            </div>

            <table>
                <tr>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Update</th>
                </tr>


                {booklist && booklist?.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>

                        <td className="Edit">
                            <button onClick={() => handleEdit(book)}>Edit</button>
                        </td>


                    </tr>
                ))}
                {/* <tr>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                    <td>Mexico</td>
                </tr> */}
            </table>
        </div>
    )
}

export default BookList

