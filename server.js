const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const employeeRouter = require('./routes/employees')

const app = express()

app.use('/api/user',userRouter)
app.use('/api/emp',employeeRouter)

app.use(express.json())

mongoose.Promise = global.Promise

mongoose.connect("mongodb+srv://yaroslav9728:Education2022@cluster0.elr77qb.mongodb.net/ass1db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(3030, () => {
    console.log(`Server is listening on port localhost:${3030}`);
});