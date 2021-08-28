require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const sequelize = require('./db')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
        app.listen(port, () => console.log(`Server started on port ${port}!`))
    } catch (error) {
        console.log(error);
    }
}


start();