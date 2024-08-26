import fs from 'fs'
import chalk from 'chalk'

function extraiLink(texto) {
	const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
	const capturas = [...texto.matchAll(regex)]
	const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
	return resultados.length !== 0 ? resultados : chalk.bgWhite.black('Não há link no arquivo.')
}

function trataErro(erro) {
	throw new Error(chalk.black.bgRedBright(erro.code))
}

// async/await

async function pegaArquivo(endArq) {
	try {
		const texto = await fs.promises.readFile(endArq, 'utf-8')
		// console.log(chalk.blue(texto))
		return extraiLink(texto)
	} catch (erro) {
		trataErro(erro)
	}
}

export default pegaArquivo