let listaInglesLocalStorage = JSON.parse(localStorage.getItem("listaInglesLG"));
let listaPortuguesLocalStorage = JSON.parse(
  localStorage.getItem("listaPortuguesLG")
);

let listaLocalStorageIngles = listaInglesLocalStorage || [];
let listaLocalStoragePortugues = listaPortuguesLocalStorage || [];

if (listaLocalStorageIngles.length === 0) {
  localStorage.setItem("listaInglesLG", JSON.stringify(listaIngles));
}
if (listaLocalStoragePortugues.length === 0) {
  localStorage.setItem("listaPortuguesLG", JSON.stringify(listaPortugues));
}

let renderListaIngles =
  listaLocalStorageIngles.length > 0 ? listaLocalStorageIngles : listaIngles;
let renderListaPortugues =
  listaLocalStoragePortugues.length > 0
    ? listaLocalStoragePortugues
    : listaPortugues;

const inglesLista = () => {
  const listaContainer = document.getElementById("listaInglesContainer");
  listaContainer.innerHTML = ""; // Limpa o conteúdo antes de renderizar

  const items = renderListaIngles
    .map(
      (item, index) => `
    <li>
      ${item.pergunta}: ${item.resposta.join(", ")}
      <button data-id="${index}" onclick="editarItemI(event)">Editar</button>
    </li>
  `
    )
    .join("");

  listaContainer.innerHTML = items;
};

const PortuguesLista = () => {
  const listaContainer = document.getElementById("listaPortuguesContainer");
  listaContainer.innerHTML = ""; // Limpa o conteúdo antes de renderizar

  const items = renderListaPortugues
    .map(
      (item, index) => `
    <li>
      ${item.pergunta}: ${item.resposta.join(", ")}
      <button data-id="${index}" onclick="editarItemP(event)">Editar</button>
    </li>
  `
    )
    .join("");

  listaContainer.innerHTML = items;
};

const iniciar = () => {
  inglesLista();
  PortuguesLista();
};

// Função para editar um item da lista em inglês
const editarItemI = (event) => {
  const itemId = parseInt(event.target.getAttribute("data-id"));
  const item = renderListaIngles[itemId];

  const novaPergunta = prompt("Edite a pergunta:", item.pergunta);
  const novaResposta = prompt(
    "Edite a resposta:",
    item.resposta.join(", ")
  ).split(", ");

  // Atualiza os valores no array
  renderListaIngles[itemId].pergunta = novaPergunta;
  renderListaIngles[itemId].resposta = novaResposta;

  // Atualiza o localStorage
  localStorage.setItem("listaInglesLG", JSON.stringify(renderListaIngles));

  // Re-renderiza a lista após a edição
  inglesLista();
};

// Função para editar um item da lista em português
const editarItemP = (event) => {
  const itemId = parseInt(event.target.getAttribute("data-id"));
  const item = renderListaPortugues[itemId];

  const novaPergunta = prompt("Edite a pergunta:", item.pergunta);
  const novaResposta = prompt(
    "Edite a resposta:",
    item.resposta.join(", ")
  ).split(", ");

  // Atualiza os valores no array
  renderListaPortugues[itemId].pergunta = novaPergunta;
  renderListaPortugues[itemId].resposta = novaResposta;

  // Atualiza o localStorage
  localStorage.setItem(
    "listaPortuguesLG",
    JSON.stringify(renderListaPortugues)
  );

  // Re-renderiza a lista após a edição
  PortuguesLista();
};

// Função para adicionar um novo item à lista em inglês
const adicionarIngles = () => {
  // Solicita a pergunta e a resposta do usuário
  const pergunta = prompt("Digite a pergunta em inglês:");
  const resposta = prompt("Digite a resposta (separada por vírgulas):").split(", ");

  // Cria um novo item
  const novoItem = {
    pergunta: pergunta,
    resposta: resposta
  };

  // Adiciona o novo item à lista existente
  renderListaIngles.push(novoItem);

  // Atualiza o localStorage com a lista modificada
  localStorage.setItem("listaInglesLG", JSON.stringify(renderListaIngles));

  // Re-renderiza a lista após adicionar o novo item
  inglesLista();
};
// Função para adicionar um novo item à lista em inglês
const adicionarPortugues = () => {
  // Solicita a pergunta e a resposta do usuário
  const pergunta = prompt("Digite a pergunta em inglês:");
  const resposta = prompt("Digite a resposta (separada por vírgulas):").split(", ");

  // Cria um novo item
  const novoItem = {
    pergunta: pergunta,
    resposta: resposta
  };

  // Adiciona o novo item à lista existente
  renderListaPortugues.push(novoItem);

  // Atualiza o localStorage com a lista modificada
  localStorage.setItem("listaPortuguesLG", JSON.stringify(renderListaPortugues));

  // Re-renderiza a lista após adicionar o novo item
  PortuguesLista();
};


// Função para limpar o localStorage e mostrar um alerta
const clearStorageBtn = () => {
  // Limpa todo o localStorage
  localStorage.clear();

  // Exibe uma mensagem de confirmação
  alert("Local Storage restaurado com sucesso!");

  // Atualiza as listas após limpar o localStorage
  iniciar();
};

// Chama a função iniciar ao carregar a página
window.onload = iniciar;
