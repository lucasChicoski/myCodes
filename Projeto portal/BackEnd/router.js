const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const dateNfs = require('date-fns');
var multer = require('multer');
const { fil } = require('date-fns/locale');
const { response } = require('express');

//função para tratar o arquivo de upload
// var storage = multer.diskStorage({
//     destination: function(req, file, callback){
//         callback(null,"uploads/")
//     },
//     filename:function(req, file, callback){
//         callback(null, file.originalname)
//     }
// })

// var storage2 = multer.diskStorage({
//     destination: function(req, file, callback){
//         callback(null,"uploads/")
//     },
//     filename:function(req, file, callback){
//         callback(null, file.originalname)
//     }
// })

// var upload = multer({storage})
// var upload2 = multer({storage2})

// var arquivo = multer({
//     dest:'/home/direc547/Apps/Portal_performance_social/imagens'
// })


const app = express();

app.use(bodyParser.json()) //para converter para json
app.use(cors())
    //app.use(express.json());

const connection = mysql.createPool({
    host: '162.214.121.73',
    port: '3306',
    user: 'direc547_directy',
    password: '@Directy#2020',
    database: 'direc547_teste'
});



//-----------------------------------------CADASTRO DE PESSOAS------------------------------------------

app.post('/usuarios', async function(req, res) {

    let corpoRequisicao = req.body;

    let nome = corpoRequisicao.nome;
    let login = corpoRequisicao.login;
    let senha = corpoRequisicao.senha;

    // console.log(nome, login, senha);


    await connection.getConnection(async function(err, connectionx) {
            if (err) {
                response.status(503).json({ erro: 'conexao' });
            } else {
                await connectionx.query("INSERT INTO usuarios (nome, login, senha) VALUES" + "(" + "'" + nome + "'" + "," + "'" + login + "'" + "," + "'" + senha + "'" + ")", function(error, results, fields) {

                    //console.log(results)
                    var resposta = {
                        nome: nome,
                        login: login,
                        senha: senha
                    }
                    if (err) {
                        response.status(503).json({ erro: 'query' });
                    } else {
                        res.send(results);
                        connectionx.release();
                    }
                })
            }
        })
        //INSERT INTO usuarios (nome, login, senha) VALUES()
        //res.send(corpoRequisicao);
});

//---------------------------------------------AUTENTICAÇÃO---------------------------------------------

app.post('/autenticacao', async function(req, res) {

    var requisicao = req.body;
    var loginReq = requisicao.login;
    var senhaReq = requisicao.senha

    await connection.getConnection(async function(err, connectionx) {
        if (err) {
            response.status(503).json({ erro: 'conexao' });
        } else {
            await connectionx.query("select * from usuarios where login =" + "'" + loginReq + "'" +
                "AND senha =" + "'" + senhaReq + "'",
                function(error, results, fields) {


                    var stringBancoDeDados = JSON.stringify(results);


                    if (stringBancoDeDados.length === 2) {

                        return res.status(400).json({ erro: "teste" })

                    } else {
                        var objectBancoDeDados = JSON.parse(stringBancoDeDados);

                        var loginBD = objectBancoDeDados[0].login;
                        var senhaBD = objectBancoDeDados[0].senha;
                        var idBD = objectBancoDeDados[0].id;
                        var nome = objectBancoDeDados[0].nome;

                        var resposta = {
                            usuario: {
                                id: idBD,
                                nome: nome,
                                login: loginBD,
                                senha: senhaBD
                            }
                        }
                        if (err) {
                            response.status(503).json({ erro: 'query' });
                        } else {
                            res.send(resposta);
                            connectionx.release();
                        }
                    }

                });
        }
    });

});


//---------------------------------------------DEMANDAS--------------------------------//
app.get('/demandas', function(req, res) {
    res.setHeader('content-type', 'application/json');
    connection.getConnection(function(objErr, objConn) {
        if (objErr) {
            response.status(503).json({ erro: 'conexao' });
        } else {
            objConn.query("SELECT * FROM demandas", function(Err, Rows, Fields) {
                if (Err) {
                    response.status(503).json({ erro: 'query' });
                } else {
                    res.send(Rows);
                    objConn.release();
                } //else
            });
        } //else
    });
});

app.put("/demandas", async function(req, res) {
    let requisicao = req.body;

    var id = requisicao.id;
    var Estado = requisicao.Estado;
    var Municipio = requisicao.Municipio;
    var Comunidade = requisicao.Comunidade;
    var Demandante = requisicao.Demandante;
    var Status = requisicao.Status;
    var Descricao = requisicao.Descricao;
    var Subclasse = requisicao.Subclasse;
    var Tratativa = requisicao.Tratativa;
    var Categoria = requisicao.Categoria;
    var IncidentePotencial = requisicao.IncidentePotencial;
    var Solicitacao = requisicao.Solicitacao;
    var Previsao = requisicao.Previsao;
    var Resposta = requisicao.Resposta;
    var Conclusao = requisicao.Conclusao;

    // console.log(corpoRequisicao);

    await connection.getConnection(async function(err, connectionx) {
        if (err) {
            /*
            O código 503 é um status de erro HTTP que indica uma 
            dificuldade de processamento do servidor geralmente devido a 
            uma sobrecarga temporária nos recursos do website.
            */
            response.status(503).json({ erro: 'conexao' });
        } else {

            await connectionx.query("UPDATE demandas " +
                "SET " +
                "Estado=" + "'" + Estado + "'" + "," +
                "Municipio=" + "'" + Municipio + "'" + "," +
                "Comunidade=" + "'" + Comunidade + "'" + "," +
                "Demandante=" + "'" + Demandante + "'" + "," +
                "Status=" + "'" + Status + "'" + "," +
                "Descricao=" + "'" + Descricao + "'" + "," +
                "Subclasse=" + "'" + Subclasse + "'" + "," +
                "Tratativa=" + "'" + Tratativa + "'" + "," +
                "Categoria=" + "'" + Categoria + "'" + "," +
                "IncidentePotencial=" + "'" + IncidentePotencial + "'" + "," +
                "Solicitacao=" + "'" + Solicitacao + "'" + "," +
                "Previsao=" + "'" + Previsao + "'" + "," +
                "Solicitacao=" + "'" + Solicitacao + "'" + "," +
                "Resposta=" + "'" + Resposta + "'" + "," +
                "Conclusao=" + "'" + Conclusao + "'" +
                " WHERE " + "id=" + "'" + id + "'"

                ,
                function(err, results, fields) {
                    if (err) {
                        response.status(503).json({ erro: 'query' });
                    } else {
                        res.send(results);
                        connectionx.release();

                    }
                })

        }
    })
})

app.post('/demandas', async function(req, res) {

    var requisicao = req.body;
    var Estado = requisicao.Estado;
    var Municipio = requisicao.Municipio;
    var Comunidade = requisicao.Comunidade;
    var Demandante = requisicao.Demandante;
    var Status = requisicao.Status;
    var Descricao = requisicao.Descricao;
    var Subclasse = requisicao.Subclasse;
    var Tratativa = requisicao.Tratativa;
    var Categoria = requisicao.Categoria;
    var IncidentePotencial = requisicao.IncidentePotencial;
    var Solicitacao = requisicao.Solicitacao;
    var Previsao = requisicao.Previsao;
    var Resposta = requisicao.Resposta;
    var Conclusao = requisicao.Conclusao;

    let retorno = JSON.stringify(requisicao);
    console.log(retorno.length);

    console.log(Conclusao);

    if (retorno.length === 2) {
        console.log("está vazio!");
        res.send("está vazio!");
    } else {
        let solicitaCao = new Date();
        let previVao = new Date();
        let respoSta = new Date();
        let concluSao = new Date();

        if (Solicitacao != null) {
            solicitaCao = dateNfs.format(new Date(Solicitacao), 'yyyy-MM-dd');
        } else {
            solicitaCao = null;
        }

        if (Previsao != null) {
            previVao = dateNfs.format(new Date(Previsao), 'yyyy-MM-dd');
        } else {
            previVao = null;
        }

        if (Resposta != null) {
            respoSta = dateNfs.format(new Date(Resposta), 'yyyy-MM-dd')
        } else {
            respoSta = null;
        }

        if (Conclusao != null) {
            concluSao = dateNfs.format(new Date(Conclusao), 'yyyy-MM-dd')
        } else {
            concluSao = null;
        }



        await connection.getConnection(async function(err, connectionx) {
            if (err) {
                response.status(503).json({ erro: 'conexao' });
            } else {

                await connectionx.query("INSERT INTO demandas(Estado, Municipio, Comunidade, Demandante, Status, Descricao, Subclasse," +
                    "Tratativa, Categoria, IncidentePotencial, Solicitacao, Previsao, Resposta, Conclusao)" + "VALUES" + "(" +
                    "'" + Estado + "'" + "," +
                    "'" + Municipio + "'" + "," +
                    "'" + Comunidade + "'" + "," +
                    "'" + Demandante + "'" + "," +
                    "'" + Status + "'" + "," +
                    "'" + Descricao + "'" + "," +
                    "'" + Subclasse + "'" + "," +
                    "'" + Tratativa + "'" + "," +
                    "'" + Categoria + "'" + "," +
                    "'" + IncidentePotencial + "'" + "," +
                    "'" + solicitaCao + "'" + "," +
                    "'" + previVao + "'" + "," +
                    "'" + respoSta + "'" + "," +
                    "'" + concluSao + "'" +
                    ")",
                    function(err, results, fields) {
                        if (err) {
                            response.status(503).json({ erro: 'query' });
                        } else {
                            res.send(results);
                            connectionx.release();

                        }
                    })
            }
        })

    } //fim do else

})

//-------------------------------------------------------VISITAS-----------------------------------------//

app.get('/visitas', function(req, res) {
    res.setHeader('content-type', 'application/json');
    connection.getConnection(function(objErr, objConn) {
        if (objErr) {
            response.status(503).json({ erro: 'conexao' });
        } else {
            objConn.query("SELECT * FROM visitas", function(Err, Rows, Fields) {
                if (Err) {
                    response.status(503).json({ erro: 'query' });
                } else {
                    res.send(Rows);
                    objConn.release();
                } //else
            });
        } //else
    });
});


app.post("/visitas", async function(req, res) {

    let corpoRequisicao = req.body;

    let Estado = corpoRequisicao.Estado;
    let Municipio = corpoRequisicao.Municipio;
    let Comunidade = corpoRequisicao.Comunidade;
    let ClimaDaVisita = corpoRequisicao.ClimaDaVisita;
    let IncidentePotencial = corpoRequisicao.IncidentePotencial;
    let Foto = corpoRequisicao.Foto;
    let Stakeholder = corpoRequisicao.Stakeholder;
    let Contato = corpoRequisicao.Contato;
    let Resumo = corpoRequisicao.Resumo;
    let Classificacao = corpoRequisicao.Classificacao;
    let DataVisita = corpoRequisicao.DataVisita;

    let retorno = JSON.stringify(corpoRequisicao);


    if (retorno.length === 2) {
        console.log("Requisição vazia!");
        res.send(corpoRequisicao + "requisicação vazia");
    } else {
        let dataVisita = dateNfs.format(new Date(DataVisita), 'yyyy-MM-dd')

        await connection.getConnection(async function(err, connectionx) {
            if (err) {
                response.status(503).json({ erro: 'conexao' });
            } else {

                await connectionx.query("INSERT INTO visitas(Estado, Municipio, Comunidade, ClimaDaVisita," +
                    "IncidentePotencial, Foto, Stakeholder," +
                    "Contato, Resumo, Classificacao, DataVisita)" + "VALUES(" +
                    "'" + Estado + "'" + "," +
                    "'" + Municipio + "'" + "," +
                    "'" + Comunidade + "'" + "," +
                    "'" + ClimaDaVisita + "'" + "," +
                    "'" + IncidentePotencial + "'" + "," +
                    "'" + Foto + "'" + "," +
                    "'" + Stakeholder + "'" + "," +
                    "'" + Contato + "'" + "," +
                    "'" + Resumo + "'" + "," +
                    "'" + Classificacao + "'" + "," +
                    "'" + dataVisita + "'" +
                    ")",
                    function(err, results, fields) {
                        if (err) {
                            response.status(503).json({ erro: 'query' });
                        } else {
                            res.send(results);
                            connectionx.release();

                        }


                    })
            }
        })


    }
})

app.put("/visitas", async function(req, res) {
    let corpoRequisicao = req.body;

    let id = corpoRequisicao.id;
    let Estado = corpoRequisicao.Estado;
    let Municipio = corpoRequisicao.Municipio;
    let Comunidade = corpoRequisicao.Comunidade;
    let ClimaDaVisita = corpoRequisicao.ClimaDaVisita;
    let IncidentePotencial = corpoRequisicao.IncidentePotencial;
    let Foto = corpoRequisicao.Foto;
    let Stakeholder = corpoRequisicao.Stakeholder;
    let Contato = corpoRequisicao.Contato;
    let Resumo = corpoRequisicao.Resumo;
    let Classificacao = corpoRequisicao.Classificacao;
    let DataVisita = corpoRequisicao.DataVisita;

    console.log(corpoRequisicao);

    await connection.getConnection(async function(err, connectionx) {
        if (err) {
            response.status(503).json({ erro: 'conexao' });
        } else {

            await connectionx.query("UPDATE visitas " +
                "SET " +
                "Estado=" + "'" + Estado + "'" + "," +
                "Municipio=" + "'" + Municipio + "'" + "," +
                "Comunidade=" + "'" + Comunidade + "'" + "," +
                "ClimaDaVisita=" + "'" + ClimaDaVisita + "'" + "," +
                "IncidentePotencial=" + "'" + IncidentePotencial + "'" + "," +
                "Foto=" + "'" + Foto + "'" + "," +
                "Stakeholder=" + "'" + Stakeholder + "'" + "," +
                "Contato=" + "'" + Contato + "'" + "," +
                "Resumo=" + "'" + Resumo + "'" + "," +
                "Classificacao=" + "'" + Classificacao + "'" + "," +
                "DataVisita=" + "'" + DataVisita + "'" +
                " WHERE " + "id=" + "'" + id + "'"

                ,
                function(err, results, fields) {

                    if (err) {
                        response.status(503).json({ erro: 'query' });
                    } else {
                        res.send(results);
                        connectionx.release();

                    }

                })

        }
    })
})

//--------------------------------------------STAKEHOLDERS---------------------------------------------

app.get('/stakeholders', function(req, res) {
    res.setHeader('content-type', 'application/json');
    connection.getConnection(function(objErr, objConn) {
        if (objErr) {
            response.status(503).json({ erro: 'conexao' });
        } else {
            objConn.query("SELECT * FROM stakeholders", function(Err, Rows, Fields) {
                if (Err) {
                    response.status(503).json({ erro: 'query' });
                } else {
                    res.send(Rows);
                    objConn.release();
                } //else
            });
        } //else
    });
});


app.put("/stakeholders", async function(req, res) {

    let corpoRequisicao = req.body;

    let id = corpoRequisicao.id;
    let estado = corpoRequisicao.Estado;
    let municipio = corpoRequisicao.Municipio;
    let contato = corpoRequisicao.Contato;
    let interface = corpoRequisicao.Interface;
    let stakeholder = corpoRequisicao.Stakeholder;
    let representacao = corpoRequisicao.Representacao;
    let interacoes = corpoRequisicao.Interacoes;
    let funcao = corpoRequisicao.Funcao;
    let postura = corpoRequisicao.Postura;
    let influencia = corpoRequisicao.Influencia;
    let impacto = corpoRequisicao.Impacto;
    let criticidade = corpoRequisicao.Criticidade;
    let comentario = corpoRequisicao.Comentario;
    let comunidade = corpoRequisicao.Comunidade;
    // console.log(corpoRequisicao);

    await connection.getConnection(async function(err, connectionx) {
        if (err) {
            response.status(503).json({ erro: 'conexao' });
        } else {
            await connectionx.query("UPDATE stakeholders " +
                "SET " +
                "Estado=" + "'" + estado + "'" + "," +
                "Municipio=" + "'" + municipio + "'" + "," +
                "Contato=" + "'" + contato + "'" + "," +
                "Interface=" + "'" + interface + "'" + "," +
                "Stakeholder=" + "'" + stakeholder + "'" + "," +
                "Representacao=" + "'" + representacao + "'" + "," +
                "Interacoes=" + "'" + interacoes + "'" + "," +
                "Funcao=" + "'" + funcao + "'" + "," +
                "Postura=" + "'" + postura + "'" + "," +
                "Influencia=" + "'" + influencia + "'" + "," +
                "Impacto=" + "'" + impacto + "'" + "," +
                "Criticidade=" + "'" + criticidade + "'" + "," +
                "Comentario=" + "'" + comentario + "'" + "," +
                "Comunidade=" + "'" + comunidade + "'" +
                " WHERE " + "id=" + "'" + id + "'"

                ,
                function(err, results, fields) {
                    if (err) {
                        response.status(503).json({ erro: 'query' });
                    } else {
                        res.send(results);
                        connectionx.release();
                    }

                })

        }
    })
})

app.post('/stakeholders', async function(req, res) {
    let corpoRequisicao = req.body;

    let estado = corpoRequisicao.Estado;
    let municipio = corpoRequisicao.Municipio;
    let contato = corpoRequisicao.Contato;
    let interface = corpoRequisicao.Interface;
    let stakeholder = corpoRequisicao.Stakeholder;
    let representacao = corpoRequisicao.Representacao;
    let interacoes = corpoRequisicao.Interacoes;
    let funcao = corpoRequisicao.Funcao;
    let postura = corpoRequisicao.Postura;
    let influencia = corpoRequisicao.Influencia;
    let impacto = corpoRequisicao.Impacto;
    let criticidade = corpoRequisicao.Criticidade;
    let comentario = corpoRequisicao.Comentario;
    let comunidade = corpoRequisicao.Comunidade;

    let resposta = {
        Estado: estado,
        Municipio: municipio,
        Contato: contato,
        Interface: interface,
        Stakeholder: stakeholder,
        Representacao: representacao,
        Interacoes: interacoes,
        Funcao: funcao,
        Postura: postura,
        Influencia: influencia,
        Impacto: impacto,
        Criticidade: criticidade,
        Comentario: comentario,
        Comunidade: comunidade
    }

    await connection.getConnection(async function(err, connectionx) {
        if (err) {
            response.status(503).json({ erro: 'conexao' });
        } else {

            await connectionx.query("INSERT INTO stakeholders" +
                "(Estado, Municipio, Comunidade,Contato, Interface, Stakeholder, Representacao, Interacoes, Funcao, Postura, Influencia, Impacto, Criticidade, Comentario) VALUES" +
                "(" +
                "'" + resposta.Estado + "'" + "," +
                "'" + resposta.Municipio + "'" + "," +
                "'" + resposta.Comunidade + "'" + "," +
                "'" + resposta.Contato + "'" + "," +
                "'" + resposta.Interface + "'" + "," +
                "'" + resposta.Stakeholder + "'" + "," +
                "'" + resposta.Representacao + "'" + "," +
                "'" + resposta.Interacoes + "'" + "," +
                "'" + resposta.Funcao + "'" + "," +
                "'" + resposta.Postura + "'" + "," +
                "'" + resposta.Influencia + "'" + "," +
                "'" + resposta.Impacto + "'" + "," +
                "'" + resposta.Criticidade + "'" + "," +
                "'" + resposta.Comentario + "'" +
                ")",
                function(err, results, fields) {

                    if (err) {
                        response.status(503).json({ erro: 'query' });
                    } else {
                        res.send(results);
                        connectionx.release();
                    }
                }

            )

        }
    })


    //  res.send(resposta);
})

// Iniciando o servidor.
app.listen(60005, () => {
    console.log('🚀 Servidor Rodando');
});