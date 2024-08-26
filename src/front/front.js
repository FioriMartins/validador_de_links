import chalk from 'chalk'
import express from 'express'
import dirname from 'node:path'

const router = express.Router()
const app = express()

router.get('/', function(req, res){
    res.sendFile(process.cwd()+'/index.html')
    
})

app.use('/',router)
app.listen(process.env.port || 3000)

console.log(chalk.blue('Server rodando...'))