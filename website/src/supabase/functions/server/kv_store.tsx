import { createClient } from 'npm:@supabase/supabase-js'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

const TABLE_NAME = 'kv_store_db4e0999'

export async function get(key: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .eq('key', key)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    console.error('Error getting key:', key, error)
    return null
  }
  return data?.value
}

export async function set(key: string, value: any) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert({ key, value })
  
  if (error) {
    console.error('Error setting key:', key, error)
    throw error
  }
}

export async function del(key: string) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('key', key)
  
  if (error) {
    console.error('Error deleting key:', key, error)
    throw error
  }
}

export async function mget(keys: string[]) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('key, value')
    .in('key', keys)
  
  if (error) {
    console.error('Error mgetting keys:', keys, error)
    return []
  }
  return data
}

export async function mset(entries: { key: string; value: any }[]) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert(entries)
  
  if (error) {
    console.error('Error msetting entries:', error)
    throw error
  }
}

export async function mdel(keys: string[]) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .in('key', keys)
  
  if (error) {
    console.error('Error mdeleting keys:', keys, error)
    throw error
  }
}

export async function getByPrefix(prefix: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('key, value')
    .like('key', `${prefix}%`)
  
  if (error) {
    console.error('Error getting by prefix:', prefix, error)
    return []
  }
  return data
}
