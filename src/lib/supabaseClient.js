import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://epcwqidrofivzlzxoeoh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwY3dxaWRyb2ZpdnpsenhvZW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjQyNzAsImV4cCI6MjA5NzIwMDI3MH0.kZ9duHnC-ymWz155ZJ7bgLZ7Q-TQzWaYTUhtiscNGRw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)