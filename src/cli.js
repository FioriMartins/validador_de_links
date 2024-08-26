import chalk from 'chalk'
import fs from 'fs'
import pegaArquivo from './index.js'
import listaValidada from './http-validacao.js'

const caminho = process.argv

async function imprimeLista(valida, resultado, nome = '') {
    if (valida) {
        console.log(chalk.yellow(`lista validada (${nome})`), await listaValidada(resultado))
    } else {
        console.log(chalk.yellow(`lista de links (${nome})`), resultado)
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]
    const valida = argumentos[3] === '--valida'

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.bgRed('Arquivo ou diretório não existe.'))
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2])
        imprimeLista(valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomearq) => {
            const lista = await pegaArquivo(`${caminho}/${nomearq}`)
            imprimeLista(valida, lista, nomearq)
        })
        console.log(arquivos)
    }
}

processaTexto(caminho)