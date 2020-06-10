require('dotenv').config();
const express = require('express'),
      catCtrl = require('./catCtrl'),
      {SERVER_PORT, CONNECTION_STRING} = process.env;

app = express();

app.use(express.json());

app.get('/api/categories', catCtrl.readCategories);
app.put('/api/categories', catCtrl.updateNew);
app.put('/api/oldcategories', catCtrl.updateOld)

const port = SERVER_PORT;
app.listen(port, () => console.log(`port: ${port}`))