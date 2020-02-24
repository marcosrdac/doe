// configurando o servidor
const express = require("express")
const server = express()

// configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))
// habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
	express: server,
	noCache: true,
})

// lista de doadores (array)
const donors = [
	{
		name: "Gabriela Brito",
		blood: "A+"
	},
	{
		name: "Everaldo Conceição",
		blood: "O-"
	},
	{
		name: "Felipe Duarte",
		blood: "AB+"
	},
	{
		name: "Marcos Conceição",
		blood: "O-"
	}
]

// configurar a apresentação da página
server.get("/", function(req, res) {
	// return res.send("ok, cheguei aqui! Com nodemon!")
	return res.render("index.html", { donors })
})

server.post("/", function(req,res) {
	// pegar dados do formulario
	const name = req.body.name
	const email = req.body.emall
	const blood = req.body.blood


	if ( name == "" || email == "" || blood == "" ) {
		 return res.send("Todos os campos são obrigatórios.")
	}

	donors.push({
		name: name,
		blood: blood,
	})

	return res.redirect("/")
})

// ligar servidor e permitir acesso na porta 3000
server.listen(3000, function() {console.log("iniciei o servidor.")})
