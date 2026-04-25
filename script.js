class Personagem {
  nome;
  tipagem;
  descricao;
  imagem;
  pontuacao = 0;

  constructor(nome, tipagem, descricao, imagem) {
    this.nome = nome;
    this.tipagem = tipagem;
    this.descricao = descricao;
    this.imagem = imagem;
    this.pontuacao = 0;
  };

  adicionarPontos(pontos) {
    this.pontuacao += pontos;
  };
};

class Quiz {
  constructor() {
    this.personagens = [
      new Personagem("Bulbasaur","Inicial do tipo planta","Bulbasaur é o inicial perfeito para quem gosta de trabalhar com estratégia, e é um companheiro que é bastante equilibrado, perfeito para acompanha-lo em sua jornada.","bulbasaur.png"),
      new Personagem("Charmander","Inicial do tipo fogo","Charmander é o inicial perfeito para quem é cheio de energia e gosta de batalhar, esse monstrinho é bastante energético e irá te ajudar na busca de ser o melhor dos treinadores.","charmander.png"),
      new Personagem("Squirtle","Inicial do tipo água","Squirtle é o inicial perfeito para quem quer se aventurar pelo mundo, sendo bastante calmo e resistente, ele é perfeito para quem prefere viajar por todo o continente.","squirtle.png")
    ];

    this.perguntas = [
      {
        texto: "Qual é seu tipo preferido?",
        opcoes: [
          { texto: "Planta", pontuacao: [3,1,2] },
          { texto: "Fogo", pontuacao: [1,3,2] },
          { texto: "Água", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "Qual ambiente você prefere?",
        opcoes: [
          { texto: "Floresta", pontuacao: [3,1,2] },
          { texto: "Montanha", pontuacao: [1,3,2] },
          { texto: "Praia", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "Qual seu estilo de batalha?",
        opcoes: [
          { texto: "Estratégico", pontuacao: [3,1,2] },
          { texto: "Ofensivo", pontuacao: [1,3,2] },
          { texto: "Defensivo", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "Qual clima você detesta?",
        opcoes: [
          { texto: "Frio", pontuacao: [3,1,2] },
          { texto: "Úmido", pontuacao: [1,3,2] },
          { texto: "Seco", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "O que é mais importante?",
        opcoes: [
          { texto: "Equilíbrio", pontuacao: [3,1,2] },
          { texto: "Conquistas", pontuacao: [1,3,2] },
          { texto: "Paz", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "Qual tipo de animal você prefere?",
        opcoes: [
          { texto: "Rã", pontuacao: [3,1,2] },
          { texto: "Lagarto", pontuacao: [1,3,2] },
          { texto: "Tartaruga", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "Profissão ideal?",
        opcoes: [
          { texto: "Jardineiro", pontuacao: [3,1,2] },
          { texto: "Treinador", pontuacao: [1,3,2] },
          { texto: "Bombeiro", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "O que você gosta de fazer?",
        opcoes: [
          { texto: "Capturar novos pokémon", pontuacao: [3,1,2] },
          { texto: "Batalhar com vários treinadores", pontuacao: [1,3,2] },
          { texto: "Aventurar-se pelo mundo", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "Qual tipo de personalidade você gostaria no seu companheiro?",
        opcoes: [
          { texto: "Harmonioso", pontuacao: [3,1,2] },
          { texto: "Energético", pontuacao: [1,3,2] },
          { texto: "Calmo", pontuacao: [2,1,3] }
        ]
      },
      {
        texto: "Qual caractéristica você atribuiria a você?",
        opcoes: [
          { texto: "Inteligente", pontuacao: [3,1,2] },
          { texto: "Corajoso", pontuacao: [1,3,2] },
          { texto: "Resiliente", pontuacao: [2,1,3] }
        ]
      }
    ];

    this.indice = 0;
    this.respostaSelecionada = null;
  };

  iniciar() {
    document.getElementById("inicio").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    this.pergunta();
  };

  pergunta() {
    let pergunta = this.perguntas[this.indice];

    document.getElementById("pergunta").innerText =
      `(${this.indice + 1}/10) ${pergunta.texto}`;

    let opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    pergunta.opcoes.forEach((opcao) => {
      let botaoOpcao = document.createElement("button");
      botaoOpcao.innerText = opcao.texto;

      botaoOpcao.onclick = () => {
        this.respostaSelecionada = opcao.pontuacao;

        document.querySelectorAll("#opcoes button").forEach(b => {
          b.style.backgroundColor = "";
        });

        botaoOpcao.style.backgroundColor = "green";
      };

      opcoesDiv.appendChild(botaoOpcao);
    });
  };

  proximaPergunta() {
    if (!this.respostaSelecionada) {
      alert("Escolha uma opção!");
      return;
    };
    
    this.personagens.forEach((personagem, indice) => {
      personagem.adicionarPontos(this.respostaSelecionada[indice])
    });

    this.respostaSelecionada = null;
    this.indice++;

    if (this.indice < this.perguntas.length) {
      this.pergunta();
    } else {
      this.resultado();
    };
  };

  resultado() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("resultado").classList.remove("hidden");

    let personagemEscolhido = this.personagens[0];
    for (let i = 1; i < this.personagens.length; i++) {
      if (this.personagens[i].pontuacao >= personagemEscolhido.pontuacao) {
        personagemEscolhido = this.personagens[i];
      };
    };

    document.getElementById("nomePersonagem").innerText = personagemEscolhido.nome;
    document.getElementById("tipagem").innerText = personagemEscolhido.tipagem;
    document.getElementById("descricao").innerText = personagemEscolhido.descricao;
    document.getElementById("imagemPersonagem").src = personagemEscolhido.imagem;
    document.getElementById("pontuacao").innerText = "Pontuação: " + personagemEscolhido.pontuacao;
  };
};

const quiz = new Quiz();
document.getElementById("botaoiniciar").onclick = () => quiz.iniciar();
document.getElementById("botaoproximo").onclick = () => quiz.proximaPergunta();