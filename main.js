const questions = [
    {
      question: "¿Qué es una habilidad digital?",
      answers: [
        { text: "Es una habilidad para usar herramientas digitales", correct: true },
        { text: "Es una habilidad física", correct: false },
        { text: "Es una habilidad deportiva", correct: false },
        { text: "Es una habilidad artística", correct: false }
      ]
    },
    {
      question: "¿Qué herramienta se utiliza para programar en HTML?",
      answers: [
        { text: "Microsoft Word", correct: false },
        { text: "Adobe Photoshop", correct: false },
        { text: "Visual Studio Code", correct: true },
        { text: "Paint", correct: false }
      ]
    },
    {
      question: "¿Cuál de estas es una red social?",
      answers: [
        { text: "Twitter", correct: true },
        { text: "Google", correct: false },
        { text: "Linux", correct: false },
        { text: "Word", correct: false }
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const scoreElement = document.getElementById('score');
  
  function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    scoreElement.innerText = score;
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
      selectedButton.classList.add('correct');
      score += 10;
    } else {
      selectedButton.classList.add('incorrect');
      score -= 5;
    }
    scoreElement.innerText = score;
    
    Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct) {
        button.classList.add('correct');
      }
    });
  
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showFinalScore();
      }
    }, 1000); // Espera 1 segundo para mostrar la siguiente pregunta
  }
  
  function showFinalScore() {
    questionElement.innerText = "Juego terminado. ¡Gracias por participar!";
    answerButtonsElement.innerHTML = '';
    const finalScoreMessage = document.createElement('p');
    finalScoreMessage.innerText = `Tu puntuación final es: ${score}`;
    finalScoreMessage.classList.add('final-score');
    answerButtonsElement.appendChild(finalScoreMessage);
  }
  
  startGame();
  