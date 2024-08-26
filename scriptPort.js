// Recupera o valor do localStorage com a chave "listaPortugues"
let valorRecuperado = localStorage.getItem("listaPortuguesLG");
// Converte o valor recuperado de JSON para um objeto/array
let quizPortugues = valorRecuperado ? JSON.parse(valorRecuperado) : [];

// Se não houver dados salvos, usa a lista padrão
if (quizPortugues.length === 0) {
  quizPortugues = listaPortugues; // Certifique-se de que listaIngles está definida
}

// const quizPortugues = listaPortugues;

let currentQuestionIndex = 0;

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function loadQuestion() {
  const questionElement = document.getElementById("question");
  questionElement.textContent = quizPortugues[currentQuestionIndex].pergunta;

  document.getElementById("answerInput").value = "";
  document.getElementById("result").textContent = "";
  // document.getElementById('nextBtn').style.display = 'none';
  // document.getElementById('showAnswerBtn').style.display = 'none';

  // Mostrar ou esconder o botão de "Voltar"
  if (currentQuestionIndex > 0) {
    // document.getElementById('prevBtn').style.display = 'block';
  } else {
    // document.getElementById('prevBtn').style.display = 'none';
  }
}

function checkAnswer() {
  const userAnswer = normalizeText(
    document.getElementById("answerInput").value.trim()
  );
  const correctAnswers =
    quizPortugues[currentQuestionIndex].resposta.map(normalizeText);

  const resultElement = document.getElementById("result");
  // const resultElementDois = document.getElementById('resultDois');

  if (correctAnswers.includes(userAnswer)) {
    // resultElementDois.textContent = `Correto! As respostas possíveis são: `;
    resultElement.textContent = `${quizPortugues[
      currentQuestionIndex
    ].resposta.join(", ")}`;
    resultElement.style.color = "green";
    // document.getElementById('nextBtn').style.display = 'block';
  } else {
    resultElement.textContent =
      "Incorreto. Tente novamente ou veja a resposta.";
    resultElement.style.color = "red";
    // document.getElementById('showAnswerBtn').style.display = 'block';
  }

  // Adiciona eventos de clique às respostas
  document.querySelectorAll(".answer").forEach((el) => {
    el.onclick = () => speakText(el.textContent);
  });
  resultElement.onclick = () => speakText(resultElement.textContent);
}

function showAnswer() {
  const correctAnswers =
    quizPortugues[currentQuestionIndex].resposta.join(", ");
  const resultElement = document.getElementById("result");
  //  const resultElementDois = document.getElementById("resultDois");
  // resultElementDois.textContent = `A resposta correta é: `;
  resultElement.textContent = `${correctAnswers}`;
  resultElement.style.color = "blue";
  // document.getElementById('showAnswerBtn').style.display = 'none';
  // document.getElementById('nextBtn').style.display = 'block';

  // Adiciona eventos de clique às respostas
  document.querySelectorAll(".result").forEach((el) => {
    el.onclick = () => speakText(el.textContent);
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizPortugues.length) {
    loadQuestion();
  } else {
    document.getElementById("question").textContent =
      "Parabéns! Você completou o quizPortugues.";
    document.getElementById("answerInput").style.display = "none";
    // document.getElementById('nextBtn').style.display = 'none';
    // document.getElementById('prevBtn').style.display = 'none';
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // Define o idioma para inglês dos EUA
  speechSynthesis.speak(utterance);
}

window.onload = loadQuestion;


// Função para embaralhar um array
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Função para embaralhar as perguntas
function embaralhar() {
  embaralharArray(quizPortugues);
  currentQuestionIndex = 0; // Reinicia a indexação das perguntas
  loadQuestion(); // Carrega a primeira pergunta da nova ordem
}
