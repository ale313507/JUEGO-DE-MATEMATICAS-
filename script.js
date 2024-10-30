let score = 0;
let questionElement = document.getElementById("question");
let answerInput = document.getElementById("answer");
let submitButton = document.getElementById("submit");
let scoreDisplay = document.getElementById("score");
let historyList = document.getElementById("history");
let correctAnswer;

// Cargar historial al iniciar
document.addEventListener("DOMContentLoaded", loadHistory);
resetGame();

// Generar una nueva pregunta
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    questionElement.textContent = `¿Cuánto es ${num1} + ${num2}?`;
    return num1 + num2; // Devolver la respuesta correcta
}

// Manejar la respuesta del usuario
submitButton.addEventListener("click", function() {
    const userAnswer = parseInt(answerInput.value);
    if (userAnswer === correctAnswer) {
        score++;
        scoreDisplay.textContent = "Puntos: " + score;
        correctAnswer = generateQuestion();
    } else {
        alert("Incorrecto! Fin del juego.");
        saveScore();
        resetGame();
    }
    answerInput.value = ''; // Limpiar el campo de respuesta
});

// Guardar puntuación y nombre en el historial
function saveScore() {
    const name = prompt("Ingrese su nombre:");
    if (name) {
        const date = new Date();
        const historyEntry = `${name}: ${score} puntos el ${date.toLocaleString()}`;
        addToHistory(historyEntry); // Agregar al historial visible
        updateLocalStorage(historyEntry); // Guardar en localStorage
    }
}

// Agregar entrada al historial en la interfaz
function addToHistory(entry) {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
}

// Cargar historial desde localStorage
function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    savedHistory.forEach(entry => addToHistory(entry)); // Mostrar historial guardado
}

// Actualizar localStorage con el historial
function updateLocalStorage(entry) {
    const currentHistory = JSON.parse(localStorage.getItem('history')) || [];
    currentHistory.push(entry);
    localStorage.setItem('history', JSON.stringify(currentHistory)); // Guardar el historial
}

// Reiniciar el juego
function resetGame() {
    score = 0;
    scoreDisplay.textContent = "Puntos: 0";
    correctAnswer = generateQuestion(); // Generar la primera pregunta
}

// Iniciar el juego
resetGame();
