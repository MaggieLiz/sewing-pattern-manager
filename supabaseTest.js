
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pviheuhqxqxlhbuelkjn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2aWhldWhxeHF4bGhidWVsa2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTc1OTUsImV4cCI6MjA2MDU3MzU5NX0.VPojqkXx-QEfzhSaTvAkzZyhRIkzIvM7d2ev-BnpqMI'
export const supabase = createClient(supabaseUrl, supabaseKey)
  async function testConnection() {
  const { data, error } = await supabase.from('patterns').select('*')
  if (error) {
    console.error('❌ Supabase error:', error.message)
  } else {
    console.log('✅ Connected! Got rows:', data.length)
  }
}

testConnection()