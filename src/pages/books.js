import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import BookForm from '@/components/book/Form'
import BookList from '@/components/book/BookList'
import { useFormik } from 'formik'
import * as yup from 'yup'

const books = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const bookSchema = yup.object().shape({
        name: yup
            .string()
            .min(4, 'Minimal 4 character!')
            .max(254, 'Too Long!')
            .required('Name is Required!'),
        description: yup
            .string()
            .min(10, 'Minimal 10 character!')
            .max(300, 'Too Long!')
            .required('Description is Required!'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            image: '',
        },
        validationSchema: bookSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (values.id) {
                    const { data } = await axios.put(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${values.id}`,
                        values,
                    )

                    handleUpdateBook({ book: data.data })

                    resetForm()
                } else {
                    const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
                        values,
                    )

                    handleAddBook({
                        book: data.data,
                    })

                    resetForm()
                }
            } catch (error) {
                console.log(error)
            }
        },
    })

    const fetchBooks = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
            )

            setBooks(data.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const getBook = async id => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`,
            )

            const book = data.data

            formik.setFieldValue('name', book.name)
            formik.setFieldValue('description', book.description)
            formik.setFieldValue('price', book.price)
            formik.setFieldValue('id', book.id)
            formik.setFieldValue('image', book.image)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddBook = ({ book }) => {
        setBooks(prev => [...prev, book])
    }

    const handleUpdateBook = ({ book }) => {
        const updatedBook = books.map(item =>
            item.id === book.id ? book : item,
        )

        setBooks(updatedBook)
    }

    const handleDeleteBook = async id => {
        const ok = confirm('Are you sure?')

        if (ok) {
            try {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`,
                )
                const fillteredBooks = books.filter(item => item.id !== id)
                
                setBooks(fillteredBooks)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (error) return <div>{error.message}</div>

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Books
                </h2>
            }>
            <Head>
                <title>Laravel - Books</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <BookForm
                                handleAddBook={handleAddBook}
                                formik={formik}
                            />
                            {loading ? (
                                <p>Loading ...</p>
                            ) : (
                                <BookList
                                    books={books}
                                    getBook={getBook}
                                    handleDeleteBook={handleDeleteBook}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default books
