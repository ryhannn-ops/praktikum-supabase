import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.auth.getUser();

        if (error && !error.message.includes('Invalid token')) {
            console.error('Supabase connection failed: Invalid API key.');
            return false;
        }
        console.log('Supabase connection successful.');
        return true;
    } catch (err) {
        console.error('Supabase connection failed:', err.message);
        return false;
    }
}

app.get('/', async (req, res) => {
    res.send('Server Express.js is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    const isSupabaseConnected = await testSupabaseConnection();
    if (!isSupabaseConnected) {
        console.log('Warning: Supabase connection failed.');
    }
});
