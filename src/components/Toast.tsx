import { useEffect } from 'react'

interface ToastProps {
    message: string | null
    onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
    useEffect(() => {
        if (!message) return
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [message, onClose])

    if (!message) return null

    return (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 text-sm shadow-lg">
            {message}
        </div>
    )
}
