const express = require('express')
const mongoose = require('mongoose');

require('./models/home');
const Home = mongoose.model('Home');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/anna', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexao com BD MongoDB realizado com sucesso!");
}).catch((err) => {
    console.log("Erro: conexao com BD MongoDB nao realizado com sucesso: " + err);
})

app.get('/', (req, res) => {
    res.json({ name: "Anna Caroline Marques Tuvok S"});
});
app.get('/home', (req, res) => {
    Home.findOne({}).then((home) => {
        return res.json({
            error: false,
            home
        });
    }).catch((err) => {
  
        return res.status(400).json({
            error: true,
            message:"Nenhum registro encontrado!"
        });
    });
});
app.post('/home', async (req, res) => {

    const dados = {
            "topTitulo": "Temos a solução que a sua empresa precisa!",
            "topSubtitulo": "This is a simple heo unit, a simle Jumbotron-style componet for calling extra attention to featured content or information.",
            "topTextoBtn": "ENTRE EM CONTATO",       
            "topLinkBtn": "http://localhost:3000",
            "serTitulo": "Serviço",
            "serSubtitulo": "Algum subtitulo",
            "serUmIcone": "code",
            "serUmtitulo": "Serviço 1",
            "serUmDesc": "Descontos de alguma coisa que eu vou dar desconto porque sou muito maneira e gosto de ajudar as pessoas a terem desconto",
            "serDoisTitulo": "BLA BLA BLA, alguma outra coisinha aqui também né",
            "serDoisDesc": "Mais descontinho e tals",
            "serTresIcone": "mobile-alt",
            "serTresTitulo": "Serviço 3",
            "serTresDesc": "Ta bom chega de escrever textos de descriçao",

}

    const HomeExiste = await Home.findOne({});
    if(HomeExiste){
        return res.status(400).json({
            error: true,
            message: "Erro: A pagina home ja possui um registro"
        });
    }

    Home.create(dados, (err) => {
        if(err) return res.status(400).json({
            error:true,
            message: "Erro: conteudo da pagina home nao cadastrado com sucesso!"
        });
    })
    return res.json({
        error: false,
        message: "Conteudo da pagina home cadastrado com sucesso!"
    })

})

app.listen(8080, () => {
    console.log("Servidor inicido na porta 8080: http://localhost:8080");
});