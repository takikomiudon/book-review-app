import React, { useEffect, useState } from 'react'

const BookList = async () => {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://railway.bookreview.techtrain.dev/public/books')
      const data = await response.json()
      setBooks(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {books.map((book: any) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  )
}

export default BookList
