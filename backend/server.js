const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Inicializa Firebase Admin SDK (usa la clave de servicio que debes descargar desde Firebase)
const serviceAccount = require("./museobd-serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://museobd-58426.firebaseio.com"
});

const db = admin.firestore();
const app = express();

app.use(express.json());
app.use(cors());

// Ruta para obtener un objeto de museo por ID y actualizar las visitas
app.get("/obras/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obraRef = db.collection("Objeto_museo").doc(id);
    const obraDoc = await obraRef.get();

    if (!obraDoc.exists) {
      return res.status(404).json({ error: "Obra no encontrada" });
    }

    const obraData = obraDoc.data();

    // Incrementar visitas
    await obraRef.update({ n_visitas: admin.firestore.FieldValue.increment(1) });

    res.json({ id: obraDoc.id, ...obraData });
  } catch (error) {
    console.error("Error al obtener la obra:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
