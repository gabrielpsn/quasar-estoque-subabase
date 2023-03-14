import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composable/useAuthUser'

const supabaseUrl = 'https://qrnrvbjcaxtrldbiphzw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybnJ2YmpjYXh0cmxkYmlwaHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyNzMzMTMsImV4cCI6MTk5Mjg0OTMxM30.wLZbDYJmHiOcn7u0j8yMnG0uJE69F9kpZ98tiCjNFO4'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()
  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}
