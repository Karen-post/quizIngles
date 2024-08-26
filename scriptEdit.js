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
// Função para renderizar a lista em inglês
const inglesLista = () => {
  const listaContainer = document.getElementById("listaInglesContainer");
  listaContainer.innerHTML = ""; // Limpa o conteúdo antes de renderizar

  renderListaIngles.forEach((item, index) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", true);
    li.dataset.id = index;
    li.innerHTML = `${item.pergunta}: ${item.resposta.join(", ")}
      <button onclick="editarItemI(event)">Editar</button>
      <button onclick="apagarItemI(event)">Apagar</button>`;
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);
    document.getElementById("listaInglesContainer").appendChild(li);
  });
};

// Função para renderizar a lista em português
const PortuguesLista = () => {
  const listaContainer = document.getElementById("listaPortuguesContainer");
  listaContainer.innerHTML = ""; // Limpa o conteúdo antes de renderizar

  renderListaPortugues.forEach((item, index) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", true);
    li.dataset.id = index;
    li.innerHTML = `${item.pergunta}: ${item.resposta.join(", ")}
      <button onclick="editarItemP(event)">Editar</button>
      <button onclick="apagarItemP(event)">Apagar</button>`;
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);
    document.getElementById("listaPortuguesContainer").appendChild(li);
  });
};

// Função de inicialização
const iniciar = () => {
  inglesLista();
  PortuguesLista();
};

// Funções para arrastar e soltar
let draggedItem = null;

const handleDragStart = (event) => {
  draggedItem = event.target;
  event.target.classList.add("dragging");
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.tagName === "LI" && target !== draggedItem) {
    const container = target.parentNode;
    const draggedIndex = Array.from(container.children).indexOf(draggedItem);
    const targetIndex = Array.from(container.children).indexOf(target);

    // Move o item arrastado para a nova posição
    container.insertBefore(draggedItem, target.nextSibling);

    // Atualiza as listas
    if (container.id === "listaInglesContainer") {
      const item = renderListaIngles.splice(draggedIndex, 1)[0];
      renderListaIngles.splice(targetIndex, 0, item);
      localStorage.setItem("listaInglesLG", JSON.stringify(renderListaIngles));
    } else {
      const item = renderListaPortugues.splice(draggedIndex, 1)[0];
      renderListaPortugues.splice(targetIndex, 0, item);
      localStorage.setItem(
        "listaPortuguesLG",
        JSON.stringify(renderListaPortugues)
      );
    }

    // Re-renderiza a lista
    inglesLista();
    PortuguesLista();
  }
  draggedItem.classList.remove("dragging");
  draggedItem = null;
};

// Função para editar um item da lista em inglês
const editarItemI = (event) => {
  const itemId = parseInt(event.target.parentNode.dataset.id);
  const item = renderListaIngles[itemId];

  const novaPergunta = prompt("Edite a pergunta:", item.pergunta);
  const novaResposta = prompt("Edite a resposta:", item.resposta.join(", "))
    .split(", ")
    .map((res) => res.trim());

  if (novaPergunta && novaResposta.length > 0) {
    renderListaIngles[itemId] = {
      pergunta: novaPergunta,
      resposta: novaResposta,
    };
    localStorage.setItem("listaInglesLG", JSON.stringify(renderListaIngles));
    inglesLista();
  } else {
    alert("Por favor, forneça uma pergunta e pelo menos uma resposta.");
  }
};

// Função para apagar um item da lista em inglês
const apagarItemI = (event) => {
  const itemId = parseInt(event.target.parentNode.dataset.id);
  const item = renderListaIngles[itemId];

  const confirmar = confirm(
    `Você tem certeza que deseja apagar o item: "${item.pergunta}"?`
  );

  if (confirmar) {
    renderListaIngles.splice(itemId, 1);
    localStorage.setItem("listaInglesLG", JSON.stringify(renderListaIngles));
    inglesLista();
    alert("Item apagado com sucesso!");
  } else {
    alert("Ação cancelada. O item não foi apagado.");
  }
};

// Função para editar um item da lista em português
const editarItemP = (event) => {
  const itemId = parseInt(event.target.parentNode.dataset.id);
  const item = renderListaPortugues[itemId];

  const novaPergunta = prompt("Edite a pergunta:", item.pergunta);
  const novaResposta = prompt("Edite a resposta:", item.resposta.join(", "))
    .split(", ")
    .map((res) => res.trim());

  if (novaPergunta && novaResposta.length > 0) {
    renderListaPortugues[itemId] = {
      pergunta: novaPergunta,
      resposta: novaResposta,
    };
    localStorage.setItem(
      "listaPortuguesLG",
      JSON.stringify(renderListaPortugues)
    );
    PortuguesLista();
  } else {
    alert("Por favor, forneça uma pergunta e pelo menos uma resposta.");
  }
};

// Função para apagar um item da lista em português
const apagarItemP = (event) => {
  const itemId = parseInt(event.target.parentNode.dataset.id);
  const item = renderListaPortugues[itemId];

  const confirmar = confirm(
    `Você tem certeza que deseja apagar o item: "${item.pergunta}"?`
  );

  if (confirmar) {
    renderListaPortugues.splice(itemId, 1);
    localStorage.setItem(
      "listaPortuguesLG",
      JSON.stringify(renderListaPortugues)
    );
    PortuguesLista();
    alert("Item apagado com sucesso!");
  } else {
    alert("Ação cancelada. O item não foi apagado.");
  }
};

// Função para adicionar um novo item à lista em inglês
const adicionarIngles = () => {
  const pergunta = prompt("Digite a pergunta em inglês:");
  const resposta = prompt("Digite a resposta (separada por vírgulas):")
    .split(", ")
    .map((res) => res.trim());

  if (pergunta && resposta.length > 0) {
    const novoItem = { pergunta, resposta };
    renderListaIngles.push(novoItem);
    localStorage.setItem("listaInglesLG", JSON.stringify(renderListaIngles));
    inglesLista();
  } else {
    alert("Por favor, forneça uma pergunta e pelo menos uma resposta.");
  }
};

// Função para adicionar um novo item à lista em português
const adicionarPortugues = () => {
  const pergunta = prompt("Digite a pergunta em português:");
  const resposta = prompt("Digite a resposta (separada por vírgulas):")
    .split(", ")
    .map((res) => res.trim());

  if (pergunta && resposta.length > 0) {
    const novoItem = { pergunta, resposta };
    renderListaPortugues.push(novoItem);
    localStorage.setItem(
      "listaPortuguesLG",
      JSON.stringify(renderListaPortugues)
    );
    PortuguesLista();
  } else {
    alert("Por favor, forneça uma pergunta e pelo menos uma resposta.");
  }
};

// Função para limpar o localStorage e mostrar um alerta
const clearStorageBtn = () => {
  localStorage.clear();
  alert("Local Storage restaurado com sucesso!");
  iniciar();
};

// Chama a função iniciar ao carregar a página
window.onload = iniciar;
