import express from 'express';
import bodyParser from 'body-parser';
import qr from 'qr-image';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'main.html'))
});

app.post('/create-code', (req, res) => {
    const qrImage = req.body.url;
    const qr_image = qr.image(qrImage);
    
    qr_image.pipe(fs.createWriteStream(path.join(__dirname, 'public', 'qr-code.png')));
    res.redirect('/code');
});

app.get('/code', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'code.html'))
})



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})