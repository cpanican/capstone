const express = require('express');
const multer = require('multer');
const cors = require('cors');
const EXPRESS_FUNCTIONS = require('./functions');

const multerStorage = multer.diskStorage({
    filename: (r,f,c) => c(null, f.originalname.split('.')[0] + '-' + Date.now().toString() + '.' + f.originalname.split('.')[1]),
    destination: 'uploads/'
})

const upload = multer({
    storage: multerStorage
});
const app = express();
app.use(cors());

app.get('/', EXPRESS_FUNCTIONS.ROOT_GET);
app.get('/upload', EXPRESS_FUNCTIONS.UPLOAD_GET);
app.post('/upload', upload.single('model'), EXPRESS_FUNCTIONS.UPLOAD_PUT);
app.get('/download/list', EXPRESS_FUNCTIONS.DOWNLOAD_LIST_GET);
app.get('/download', EXPRESS_FUNCTIONS.DOWNLOAD_GET);
app.get('/download/:date', EXPRESS_FUNCTIONS.DOWNLOAD_GET);


app.listen(3030, () => console.log('Listening on port 3030'));