var express = require('express');
var router = express.Router();


// Procura um usuário pelo seu nome de usuário.
router.get('/:usuario', function(req, res){
	var db = req.db;
	var collection = db.get('usuarios');
	collection.findOne({'usuario':req.params.usuario}, function(err, data){
		if(err) 
			res.send(err);
		else
			res.json(data);
	});
});

// Criando um novo usuario
router.post('/', function(req, res){
	var db = req.db;
	var collection = db.get('usuarios');

	collection.insert(req.body, function(err, data){
		if(err)
			res.send(err);
		else
			res.json(data);
	});
});

// Atualizando dados do usuario
router.put('/:usuario', function(req, res){
	var db = req.db;
	var collection = db.get('usuarios');

	var usuario = req.params.usuario;
	var nSenha = req.body.senha;
	var nAtivo = req.body.ativo;

	collection.update({'usuario':usuario},{'usuario':usuario,'senha':nSenha, 'ativo':nAtivo}, function(err, data){
		if(err)
			res.send(err);
		else{
			collection.findOne({'usuario':usuario}, function(erro, result){
				if(erro)
					res.send(erro);
				else
					res.json(result);
			});
		}
	});
});


module.exports = router;
