import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type Book = {
  id: number;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
}; // typesディレクトリを作って別ファイルに定義してimportするのが良い

const BookDetail = () => {
  const { id } = useParams();
  const { token } = useAuth()!;
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    setLoading(true);
    const response = await fetch(
      `https://railway.bookreview.techtrain.dev/books/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setBook(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Detail</th>
            <th>Review</th>
            <th>Reviewer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{book?.title}</td>
            <td>{book?.url}</td>
            <td>{book?.detail}</td>
            <td>{book?.review}</td>
            <td>{book?.reviewer}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookDetail;
