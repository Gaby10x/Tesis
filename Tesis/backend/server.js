const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si tu usuario MySQL es diferente
    password: '', // Cambia esto si tu contraseña MySQL es diferente
    database: 'tesis' // Cambia a la base de datos "tesis"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

    // Consulta de prueba para asegurarse de que la conexión es correcta
    db.query('SELECT DATABASE()', (err, result) => {
        if (err) {
            console.error('Error running test query:', err);
            return;
        }
        console.log('Connected to database:', result[0]['DATABASE()']);
    });
});

app.use(bodyParser.json());
app.use(cors());

// Pasar la conexión de la base de datos a las rutas
app.use('/api/auth', authRoutes(db));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
