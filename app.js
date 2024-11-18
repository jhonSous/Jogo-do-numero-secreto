//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'jogo do número secreto';

    //let paragrafo = document.querySelector('p');
    //paragrafo.innerHTML ='Escolha um número entre 1 e 10';
    let listaDeNumeroSorteados = [];
    let numeroLimite = 10;
    let numeroSecreto = gerarNumeroAleatorio();
    let tentativas = 1;
    

    function exibirTextoNaTela(tag, texto){ // escrevendo o codigo acima com menos linhas
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    }

    function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número secreto entre 1 e 10');
    }

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
            exibirTextoNaTela('p', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
            if (chute > numeroSecreto) { exibirTextoNaTela ('p', '0 número secreto é menor');
            } else {
                    exibirTextoNaTela('p', 'O número secreto é maior');
            }
            tentativas++;
            limparCampo();
    }
}


    function gerarNumeroAleatorio (){
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;
    
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }
    
    if (listaDeNumeroSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumeroSorteados.push(NumeroEscolhido);
        return NumeroEscolhido;
    }

    }

    function limparCampo(){
        chute = document.querySelector('input');
        chute.value = '';
    }

    function reiniciarJogo(){
        numeroSecreto = gerarNumeroAleatorio();
        tentativas = 1;
        exibirMensagemInicial();
        document.getElementById('reiniciar').setAttribute('disadled', true);
    }