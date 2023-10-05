import React from 'react'
import { useState } from "react";
import BookServices from '../services/BookServices';


function Form({booklist,setBooklist}) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");

    const handleSubmit=(event)=>{
        event.preventDefault()
       
        const book={
            title: title,
            author: author,
            isbn: isbn
        }

        BookServices.addBook(book).then((res)=>{
            if(res.status===201 || res.status===200){
                // alert("added")
                setBooklist([...booklist, res.data]);
                setTitle("")
                setAuthor("")
                setIsbn("")
            }
            else if(res.status===409){
                alert("Book with this ISBN already exists")
            }
        }).catch((e)=>{
            console.log(e.message)
            alert("Book with this ISBN already exists")
        })
       
    }

    return (
        <div className='form-container'>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <p>Title</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-inputs">
                    <p>Author</p>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-inputs">
                    <p>ISBN</p>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}

export default Form