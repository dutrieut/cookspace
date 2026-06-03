import { useState } from 'react'

interface BookFormProps {
    onSubmit: (title: string) => void
    placeholder?: string
    buttonLabel?: string
}

export default function BookForm({
    onSubmit,
    placeholder = 'Name...',
    buttonLabel = 'Create',
}: BookFormProps) {
    const [title, setTitle] = useState('')
    const onClick = async () => {
        if (!title) return
        onSubmit(title.trim())
        setTitle('')
    }

    return (
        <>
            <input
                type="text"
                placeholder={placeholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onClick()}
                autoFocus
                className="border border-gray-300 px-4 py-2 w-80 outline-none focus:border-gray-600"
            />
            <button
                onClick={onClick}
                className="mt-3 bg-black text-white py-2 hover:bg-gray-800 w-80"
            >
                {buttonLabel}
            </button>
        </>
    )
}
