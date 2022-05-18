const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// middleWere
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('To Do App server in Running...')
})

app.listen(port, () => console.log('to app server run on', port))