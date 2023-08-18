import express  from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import morgan from "morgan";
import router from './routers/route.js'
import connect from './dataBase/connect.js'

const app = express();

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(cors());
app.use(express.json());
app.use(morgan());

const PORT = process.env.PORT || 8080;

app.use('/api', router)

connect().then(() =>{
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('can not connect to the database')        
    }
}
).catch(error => {
    console.log('Invalid connection...!')
})
