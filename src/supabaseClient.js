import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://supabasekong-wckks4gsg8owkososoo8sosg.128.140.44.162.sslip.io'
const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2ODkwNjQ0MCwiZXhwIjo0OTI0NTgwMDQwLCJyb2xlIjoiYW5vbiJ9.aePQztzDdhmgXjPlJ9zxh4_Qf5ex7Au7UyEiF_jzXK0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
