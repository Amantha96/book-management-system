import axios from "axios";
// import http from "../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const addBook = async (book) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/add-new-book`,
    data: book,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return response;
};

const getAllBooks = async () => {
  const response = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_SERVER}/get-all-books`,
    headers: {}
  });
  return response;
}

const updateBook = async (isbn, bookData) => {
  const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_BACKEND_SERVER}/update/${isbn}`,
      data: bookData,
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
  });
  return response;
};

const deleteBook = async (isbn) => {
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/delete/${isbn}`,
    headers: {

    },
  });
  return response;
}

const BookServices = {
  addBook,
  getAllBooks,
  deleteBook
};

export default BookServices