const express = require('express');
const cors = require('cors');

const tarefasRoutes = require('./routes/tarefasRoutes');
const adultosRoutes = require('./routes/adultosRoutes');
const secoesRoutes = require('./routes/secoesRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    projeto: 'PI Alpha Centauri',
    status: 'API funcionando',
    rotas: ['/tarefas', '/adultos', '/secoes', '/dashboard']
  });
});

app.use('/tarefas', tarefasRoutes);
app.use('/adultos', adultosRoutes);
app.use('/secoes', secoesRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
