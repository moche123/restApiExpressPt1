const express = require('express');
const app = express();
const { v4:uuidv4 } = require('uuid');
const cors = require('cors');
const { readFile,writeFile } = require('fs').promises;
const morgan = require('morgan');

let items = [];

//SETTINGS
app.use(cors());
//Solo archivos http con peticiones
app.use(express.urlencoded({extended:false}));
//Una rest API solo devolverá archivos JSON(Por lo general debe ser así)
app.use(express.json());
//Asignamos el puerto
app.set('port',3000);
//Aisgnamos morgan pero como dev
app.use(morgan('dev'));

//ROUTES
app.get('/',(req,res)=>{
    res.json({'message':'Hello'});
})
app.get('/elementos',async(req,res)=>{
    await open();
    res.json(items);
})

app.post('/elementos', async (req, res) => {
    const id = uuidv4();
    console.log(req.body);
    req.body['id'] = id;
    await open();
    items.unshift(req.body);
    
    await save();
    res.json(req.body);
}); 

async function save(){
    const res = await writeFile('data.json', JSON.stringify(items), 'utf-8');
  
}

async function open(){
    const res = await readFile('data.json', 'utf-8');
    items = JSON.parse(res); //Objeto JS a Objeto
    
}
//LISTEN ON PORT
app.listen(app.get('port'),()=>{
    console.log('listen on port: ',app.get('port'));
})