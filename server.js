const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Claves y URL de Airtable
const AIRTABLE_API_URL = "https://api.airtable.com/v0/appVuMTXFU8YHrGND/Independientes%202.0";
const AIRTABLE_API_KEY = "tu_api_key_aqui"; // Reemplaza con tu API Key real

// Endpoint para obtener datos por grupo
app.get("/airtable", async (req, res) => {
    const group = req.query.group;
    if (!group) {
        return res.status(400).send({ error: "Falta el parámetro 'group'" });
    }

    try {
        const response = await axios.get(AIRTABLE_API_URL, {
            params: { filterByFormula: `{Grupo}="${group}"` },
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error al obtener datos de Airtable:", error.message);
        res.status(500).send({ error: "Error al obtener datos de Airtable" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
