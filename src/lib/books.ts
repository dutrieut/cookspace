import { supabase } from '../lib/supabase'
import type { Book } from '../types'

export async function createBook(
    title: string
): Promise<{ book: Book | null; error: string | null }> {
    const resp = await supabase.from('books').insert({ title }).select().single()
    if (resp.error) {
        return { book: null, error: resp.error.message }
    }
    return { book: resp.data, error: null }
}

export async function getBooks(): Promise<{ books: Book[]; error: string | null }> {
    const resp = await supabase.from('books').select()
    if (resp.error) {
        return { books: [], error: resp.error.message }
    }
    return { books: resp.data, error: null }
}

// TODO: for testing purpose only, delete after
export async function deleteBooks(): Promise<string | null> {
    const resp = await supabase.from('books').delete().gt('created_at', '1970-01-01')
    if (resp.error) {
        return resp.error.message
    }
    return null
}
