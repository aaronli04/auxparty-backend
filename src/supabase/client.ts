import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('Missing env vars')
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    auth: {
        persistSession: false
    }
});

export default supabase;