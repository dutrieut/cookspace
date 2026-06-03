import BookForm from './BookForm'
import { createBook } from '../lib/books'

interface WelcomeScreenProps {
    onError: React.Dispatch<React.SetStateAction<string | null>>
    onCreateBook: () => void
}

export default function WelcomeScreen({ onError, onCreateBook }: WelcomeScreenProps) {
    const onSubmit = async (title: string) => {
        const resp = await createBook(title)
        if (resp.error) {
            onError(resp.error)
            return
        }
        onCreateBook()
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">Cookbook</h1>
                <div className="flex flex-col items-center">
                    <BookForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
