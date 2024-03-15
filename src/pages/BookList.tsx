import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import "./BookList.scss";

const BookList = () => {
  const { token } = useAuth()!;
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = currentPage * itemsPerPage;
        const response = await fetch(
          `https://railway.bookreview.techtrain.dev/books?offset=${offset}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, token]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className="book-list">
      <h1 className="book-list__title">書籍一覧</h1>
      <table className="book-list__table">
        <thead className="book-list__table-head">
          <tr className="book-list__row">
            <th className="book-list__header">書籍名</th>
            <th className="book-list__header">詳細</th>
            <th className="book-list__header">レビュー</th>
            <th className="book-list__header">レビュアー</th>
          </tr>
        </thead>
        <tbody className="book-list__table-body">
          {books.map((book: any) => (
            <tr key={book.id} className="book-list__row">
              <td className="book-list__data">{book.title}</td>
              <td className="book-list__data">{book.detail}</td>
              <td className="book-list__data">{book.review}</td>
              <td className="book-list__data">{book.reviewer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePreviousPage} disabled={currentPage === 0}>前へ</button>
      <button onClick={handleNextPage}>次へ</button>
    </div>
  );
};

export default BookList;
