const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(express.json());

app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));

app.get('/', (req, res) => {
  res.send('Olá, este é o servidor back-end do projeto de gerenciamento de projetos!!!');
});
const UserRoutes = require('./routes/UserRoutes');
app.use('/user', UserRoutes);



app.listen(port);


