import { useState, useEffect } from 'react'
import Spinner from './components/Spinner'
import WelcomeScreen from './components/WelcomeScreen'
import BooksScreen from './components/BooksScreen'
import Toast from './components/Toast'
import { getBooks, deleteBooks } from './lib/books'
import type { Book } from './types'

export default function App() {
    const [loading, setLoading] = useState<boolean>(true)
    const [toast, setToast] = useState<string | null>(null)
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        getBooks().then(({ books, error }) => {
            if (error) setToast(error)
            else setBooks(books)
            setLoading(false)
        })
    }, [])

    const onSelectBook = (_book: Book) => {
        return
    }
    const onCreateBook = async () => {
        const { books, error } = await getBooks()
        if (error) setToast(error)
        else setBooks(books)
    }

    return (
        <div>
            <Toast message={toast} onClose={() => setToast(null)} />
            {loading ? (
                <Spinner />
            ) : books.length > 0 ? (
                <BooksScreen
                    books={books}
                    onError={setToast}
                    onSelectBook={onSelectBook}
                    onCreateBook={onCreateBook}
                    onDeleteAll={async () => {
                        const error = await deleteBooks()
                        if (error) setToast(error)
                        else setBooks([])
                    }}
                />
            ) : (
                <WelcomeScreen onError={setToast} onCreateBook={onCreateBook} />
            )}
        </div>
    )
}
