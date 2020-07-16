const PROTO_PATH = "./game.proto";

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).game;

const servicoJogo = protoDescriptor.ServicoJogo;

const Catalogo = [];

const Cliente = [];

const Pedidos = new Map();

function listarJogos (call, callback){
    console.log("Listar Jogos");
    callback (null, {jogos: Catalogo});
}

function consultarJogo (call, callback){
    const pos = call.request.posicao;
    callback (null, Catalogo[pos]);
}

function registrarJogo (call, callback){
    const jogo = {
        titulo: call.request.titulo,
        tipo: call.request.tipo,
        editora: call.request.editora,
        valor: call.request.valor,
        qtdEstoque: call.request.qtdEstoque,
    }

    Catalogo.push(jogo);
    callback (null, {});
}

function removerJogo (call, callback){
    const jogo = call.request.jogo;

    const existeNoCatalogo = Catalogo.findIndex(jogoDoCatalogo => jogoDoCatalogo.jogo === jogo);

    if (!existeNoCatalogo) {
        callback(null, "Não possuimos este jogo em nosso catalogo");
    } else {
        Catalogo.splice(existeNoCatalogo, 1);
        callback(null)
    }
}

function registrarCliente(call, callback){
    const cliente = {
        titulo: call.request.Cliente.cpf,
        tipo: call.request.Cliente.nome,
        editora: call.request.Cliente.cep,
        valor: call.request.Cliente.endereco,
    }

    Cliente.push(cliente);
    callback(null, {});
}

function comprarJogo (call, callback){
    const Carrinho = [];

    

    const jogo = call.request.jogo;

    Carrinho.push(jogo);
    callback(null, {});
}

function fecharPedido (call, callback){

}

const server = new grpc.Server();

server.addService(servicoJogo.service,
                            {
                                ListarJogos: listarJogos,
                                ConsultarJogo: consultarJogo,
                                RegistrarJogo: registrarJogo,
                                RemoverJogo: removerJogo,
                                RegistrarCliente: registrarCliente,
                                ComprarJogo: comprarJogo,
                                FecharPedido: fecharPedido,
                            });

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();