const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
//Router
const groupReportRouter = require('./routes/pastoralWork/groupReportRouter');
const autheticationRouter = require('./routes/auth/authenticationRouter');
const userRouter = require('./routes/users/userRouter');
// Port
const PORT = process.env.PORT || 8000;
// App
const app = express();

// Body Parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
// Cors
app.use(cors());

app.use('/api/auth', autheticationRouter);
app.use('/api/pastoralWork', groupReportRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running in PORT : ${PORT}`);
})

