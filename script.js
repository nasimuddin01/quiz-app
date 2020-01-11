// declaring dom variable
const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const score = document.getElementById('score');
const time = document.getElementById('time');
const welcome = document.querySelector('#welcome');
const hurray = document.querySelector('#hurray');

let currentQuestionIndex = 0;
let points;
let perQuestionPoint = 1;
let timeCounter = 0;
let givenTime = 15; //second

// start button event listener
startButton.addEventListener('click', startGame);

function startGame() {
  points = 0; //resetting points
  startButton.classList.add('hide');
  startButton.classList.remove('animated');
  time.classList.remove("hide"); //showing time
  score.classList.add("hide"); //hiding score
  questionContainer.classList.remove('hide');
  currentQuestionIndex = 0;
  welcome.classList.add("hide"); //hiding welcome section
  hurray.classList.add('hide');
  setNextQuestion()
  timer()
}

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
}

function timer() {
  let interval = setInterval(function() {
    if (currentQuestionIndex >= questions.length) {
      result();
      clearInterval(interval);
    }
    if (timeCounter == givenTime) {
      resetState()
      currentQuestionIndex++
      showQuestion(questions[currentQuestionIndex])
      console.log("timeout")
    } else {
      timeCounter++;
      time.innerText = `Time: ${ givenTime - timeCounter} second`;
      if (timeCounter >= 10) {
        time.style.color = "red";
      } else if (timeCounter >= 5) {
        time.style.color = "orange";
      } else {
        time.style.color = "black";
      }
    }
  }, 1000)
}



function showQuestion(question) {
  questionContainer.classList.add('animated');
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.classList.add('btn-primary')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  timeCounter = 0;
  clearStatusClass(document.body);
  hurray.classList.remove('animated');
  score.classList.remove('animated');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    points = points + perQuestionPoint * (givenTime - timeCounter);
  } else {
    points = points - perQuestionPoint
  }
  if (currentQuestionIndex >= questions.length-1) {
    result();
  } else {
    timeCounter = 0;
    currentQuestionIndex++;
    setNextQuestion()
  }
}

function result() {
  score.innerText = `Your Score is: ${points}`;
  score.classList.remove("hide");
  questionContainer.classList.add("hide");
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
  startButton.classList.add('animated');
  time.classList.add('hide');
  hurray.classList.remove('hide');
  hurray.classList.add('animated');
  score.classList.add('animated');
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


// question section
const questions = [{
    question: 'What is the output of 2 + 2?',
    answers: [{
        text: '4',
        correct: true
      },
      {
        text: '22',
        correct: false
      },
      {
        text: '8',
        correct: false
      },
      {
        text: '20',
        correct: false
      }
    ]
  },
  {
    question: 'What is the root of 144?',
    answers: [{
        text: '12',
        correct: true
      },
      {
        text: '15',
        correct: false
      },
      {
        text: '21',
        correct: false
      },
      {
        text: '40',
        correct: false
      }
    ]
  },
  {
    question: 'What is the cube root of 27?',
    answers: [{
        text: '4',
        correct: false
      },
      {
        text: '9',
        correct: false
      },
      {
        text: '3',
        correct: true
      },
      {
        text: '2',
        correct: false
      }
    ]
  },
  {
    question: 'What is the output of 4 * 2?',
    answers: [{
        text: '6',
        correct: false
      },
      {
        text: '8',
        correct: true
      },
      {
        text: '7',
        correct: false
      },
      {
        text: '9',
        correct: false
      }
    ]
  }
]
