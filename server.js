const express = require('express');
const axios = require('axios');
const app = express();

// Configura tu clave de Airtable
const API_KEY = 'pat9wBOS3cEULZjbM.46a19c678b7b3a403febb212e0ec73de16f408d4193bf476a5d7348c23be39b1';
const BASE_ID = 'appVuMTXFU8YHrGND';
const TABLE_NAME = 'Independientes%202.0';

app.use(express.json());

// Ruta para obtener datos desde Airtable
app.get('/airtable', async (req, res) => {
    const group = req.query.group;
    if (!group) {
        return res.status(400).json({ error: 'Falta el parámetro "group".' });
    }

    try {
        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula={Grupo}="${group}"`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al conectar con Airtable.' });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor proxy ejecutándose en http://localhost:${PORT}`);
});
