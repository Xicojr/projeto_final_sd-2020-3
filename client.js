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

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).game;

const client = new protoDescriptor.ServicoJogo('localhost:50051',
                                       grpc.credentials.createInsecure());

client.RegistrarJogo({titulo: "Zombicide", tipo: "Miniatura", editora: "Galapagos", valor: 400, qtdEstoque: 5}, function(err, response) {
    if (err != null){
        console.log("Ocorreu um erro ao Registrar um Jogo");
        return;
    }

    console.log("Zombicide registrado com sucesso");

});

client.RegistrarJogo({titulo: "Carcassone", tipo: "Montagem Mapa", editora: "Devir", valor: 200, qtdEstoque: 9}, function(err, response) {
    if (err != null){
        console.log("Ocorreu um erro ao Registrar um Jogo");
        return;
    }

    console.log("Carcassone registrado com sucesso");

});

client.RegistrarJogo({titulo: "Coup", tipo: "Party Game", editora: "Mandala Jogos", valor: 90, qtdEstoque: 3}, function(err, response) {
    if (err != null){
        console.log("Ocorreu um erro ao Registrar um Jogo");
        return;
    }

    console.log("Coup registrado com sucesso");

    client.ListarJogos({}, function(err, response) {
        if (err != null){
            console.log("Ocorreu um erro na chamada do procedimento ListarJogos");
            return;
        }
    
        const lista = response.jogos;
    
        console.log(lista);
    
    });

});

client.ListarJogos({}, function(err, response) {
    if (err != null){
        console.log("Ocorreu um erro na chamada do procedimento ListarJogos");
        return;
    }

    const lista = response.jogos;

    console.log(lista);

});
