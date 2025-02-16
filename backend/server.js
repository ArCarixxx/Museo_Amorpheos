const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Habilita CORS para que el frontend pueda acceder

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Asegúrate de cambiar esto si es necesario
  password: "030772", // Tu contraseña
  database: "MuseoDB",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Ruta para obtener una obra por ID y actualizar visitas
app.get("/obras/:id", (req, res) => {
  const { id } = req.params;

  // Aumentar visitas
  const updateQuery = "UPDATE Objeto_museo SET n_visitas = n_visitas + 1 WHERE idObjeto = ?";
  db.query(updateQuery, [id], (err) => {
    if (err) {
      console.error("Error al actualizar visitas:", err);
      return res.status(500).json({ error: "Error al actualizar visitas" });
    }

    // Obtener la obra
    const selectQuery = "SELECT * FROM Objeto_museo WHERE idObjeto = ?";
    db.query(selectQuery, [id], (err, results) => {
      if (err) {
        console.error("Error obteniendo la obra:", err);
        return res.status(500).json({ error: "Error obteniendo la obra" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Obra no encontrada" });
      }
      res.json(results[0]);
    });
  });
});

const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
