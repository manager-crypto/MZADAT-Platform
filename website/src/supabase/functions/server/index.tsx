import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'

const app = new Hono()

app.use('*', logger((message) => console.log(message)))
app.use('*', cors())

const routePrefix = '/make-server-db4e0999'

app.get(`${routePrefix}/health`, (c) => {
  return c.json({ status: 'ok' })
})

app.post(`${routePrefix}/signup`, async (c) => {
  try {
    const { email, password, name } = await c.req.json()

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      return c.json({ error: 'Server configuration error' }, 500)
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name: name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.error('Error creating user:', error)
      return c.json({ error: error.message }, 400)
    }

    return c.json({ user: data.user, message: 'User created successfully' })
  } catch (error) {
    console.error('Unexpected error during signup:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

Deno.serve(app.fetch)
