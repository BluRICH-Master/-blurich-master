import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xgssdyozjprpwfetocpg.supabase.co'
const supabaseAnonKey = 'sb_publishable_D1RM56GYQ4eS1hKJdZxtPw_zN_2f56Q' // Вставь сюда свой Publishable key из Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
