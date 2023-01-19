import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

console.log('The database contains: ', db.data)

if( db.data === null ) {
	// vi använder namnet som id i det här exemplet
	db.data = [
		{ name: 'Semla', price: 29 },
		{ name: 'Wienerbröd', price: 15 }
	]
	await db.write()
}

async function addCookie(name, price) {
	db.data.push({
		name: name,
		price: price
	})
	await db.write()
}

async function removeCookie(name) {
	// Två alternativ: splice och filter
	db.data = db.data.filter(cookie => name != cookie.name)
	await db.write()
}

// addCookie('Brownie', 45)
removeCookie('Semla')

export { addCookie }
