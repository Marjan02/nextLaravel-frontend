import React from 'react'
import PropTypes from 'prop-types'
import Button from '../form/Button'

const BookList = ({ books = [], getBook, handleDeleteBook }) => {
    const Item = ({ children }) => {
        return (
            <div className="w-full border-2 border-gray-300 px-5 py-5 mb-2 rounded-lg ">
                {children}
            </div>
        )
    }

    return books.map((book, index) => (
        <Item key={book.id}>
            <div className="flex justify-between items-center">
                <div className="">
                    <div className="flex text-lg font-semibold mb-1">
                        <p className="mr-2">{index + 1}.</p>
                        <p className="">{book.name}</p>
                    </div>
                    <div className="text-sm">
                        <p className="">{book.description}</p>
                    </div>
                    {book.image && (
                        <div className="">
                            <img
                                className="object-cover h-84 w-64"
                                src={book.image}
                                alt=""
                            />
                        </div>
                    )}
                    <h2 className="text-lg">${book.price}</h2>
                </div>
                <div>
                    <Button className="mr-3" onClick={() => getBook(book.id)}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDeleteBook(book.id)}>
                        Delete
                    </Button>
                </div>
            </div>
        </Item>
    ))
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
}

export default BookList
