/* server/Conection.js */

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json()); // Asegúrate de incluir este middleware
app.use(express.urlencoded({ extended: true })); // Middleware para URL-encoded

const PORT = 3001;

app.use(express.urlencoded({ extended: true })); // Para datos URL-encoded


//conexion a la base de datos----------IMPORTANTE

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234", // 11352871
  database: "qrmuseos",
});

// Manejo de conexión
db.connect((err) => {
    if (err) {
      console.error("❌ Error conectando a la base de datos:", err);
      return;
    }
    console.log("✅ Conectado a la base de datos");
  });
  
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });


  db.query('SHOW TABLES', (err, results) => {
    if (err) {
        console.error('Error en la consulta:', err);
    } else {
        console.log('Tablas en la base de datos:', results);
    }
});
