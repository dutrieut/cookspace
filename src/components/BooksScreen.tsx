import { useState } from 'react'
import BookForm from './BookForm'
import { createBook } from '../lib/books'
import type { Book } from '../types'

interface BooksScreenProps {
    books: Book[]
    onError: React.Dispatch<React.SetStateAction<string | null>>
    onSelectBook: (book: Book) => void
    onCreateBook: () => void
    onDeleteAll: () => void
}

export default function BooksScreen({
    books,
    onError,
    onSelectBook,
    onCreateBook,
    onDeleteAll,
}: BooksScreenProps) {
    const [showPopup, setShowPopup] = useState(false)

    const onSubmit = async (title: string) => {
        const resp = await createBook(title)
        if (resp.error) {
            onError(resp.error)
            return
        }
        setShowPopup(false)
        onCreateBook()
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 max-w-lg mx-auto">
            {showPopup && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="bg-white p-8 flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="font-bold text-lg self-start"></h2>
                        <BookForm onSubmit={onSubmit} />
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Books</h1>
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-black text-white px-4 py-2 hover:bg-gray-800 text-sm"
                >
                    + New Book
                </button>
                <button
                    onClick={onDeleteAll}
                    className="bg-black text-white px-4 py-2 hover:bg-gray-800 text-sm"
                >
                    - Delete all
                </button>
            </div>

            <ul className="space-y-2">
                {books.map((book) => (
                    <li key={book.id}>
                        <button
                            onClick={() => onSelectBook(book)}
                            className="w-full text-left px-4 py-3 bg-white border border-gray-200 hover:border-gray-400 transition-colors"
                        >
                            <span className="font-medium">{book.title}</span>
                            <span className="block text-xs text-gray-400 mt-0.5">
                                {new Date(book.created_at).toLocaleDateString('fr-FR')}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
