
const questions = [
    {
      question: "¿Qué es una habilidad digital?",
      answers: [
        { text: "Es una habilidad para el desarrollo tecnologico", correct: true },
        { text: "Es una habilidad para el desarrollo físico", correct: false },
        { text: "Es una habilidad para el desarrollo deportivo", correct: false },
        { text: "Es una habilidad para el desarrollo artístico", correct: false }
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
    },
    {
        question: "¿Qué es el diseño responsivo?",
        answers: [
          { text: "Diseño que se adapta a diferentes tamaños de pantalla", correct: true },
          { text: "Diseño solo para computadoras de escritorio", correct: false },
          { text: "Diseño que no cambia en ningún dispositivo", correct: false },
          { text: "Diseño para aplicaciones móviles", correct: false }
        ]
      },
      {
        question: "¿Cuál de estas es una plataforma de programación en línea?",
        answers: [
          { text: "GitHub", correct: false },
          { text: "CodePen", correct: true },
          { text: "WordPress", correct: false },
          { text: "PowerPoint", correct: false }
        ]
      },
      {
        question: "¿Qué lenguaje se utiliza para crear sitios web interactivos?",
        answers: [
          { text: "HTML", correct: false },
          { text: "JavaScript", correct: true },
          { text: "CSS", correct: false },
          { text: "SQL", correct: false }
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
  
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      button.classList.add(`btn-${index + 1}`);  // Asignamos una clase de color única
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
    }, 2000); // Espera 1 segundo para mostrar la siguiente pregunta
  }
  
  function showFinalScore() {
    questionElement.innerText = "Juego terminado. ¡Gracias por participar!";
    answerButtonsElement.innerHTML = '';
    const finalScoreMessage = document.createElement('p');
    finalScoreMessage.innerText = `Tu puntuación final es: ${score} puntos`;
    finalScoreMessage.classList.add('final-score');
    answerButtonsElement.appendChild(finalScoreMessage);
  }
  
  startGame();
  
  function showFinalScore() {
    questionElement.innerText = "Juego terminado. ¡Gracias por participar!";
    answerButtonsElement.innerHTML = '';
    
    // Función para convertir los puntos a calificación
    const finalGrade = getGrade(score);
    
    const finalScoreMessage = document.createElement('p');
    finalScoreMessage.innerText = `Has sacado: ${finalGrade} de calificación`;
    finalScoreMessage.classList.add('final-score');
    answerButtonsElement.appendChild(finalScoreMessage);
  }
  
  function getGrade(points) {
    if (points >= 0 && points <= 15) {
      return 5;
    } else if (points >= 16 && points <= 30) {
      return 6;
    } else if (points >= 31 && points <= 45) {
      return 8;
    } else if (points >= 46 && points <= 60) {
      return 10;
    } else {
      return 5;
    }
  }
  
