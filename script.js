// declaring dom variable
const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const score = document.getElementById('score');
const time = document.getElementById('time');
const welcome = document.querySelector('.welcome');

let currentQuestionIndex = 0;
let points;
let perQuestionPoint = 1;
let timeCounter = 0;
let givenTime = 15;//second

// start button event listener
startButton.addEventListener('click', startGame);

function startGame() {
  points = 0; //resetting points
  startButton.classList.add('hide');
  time.classList.remove("hide"); //showing time
  score.classList.add("hide"); //hiding score
  questionContainer.classList.remove('hide');
  currentQuestionIndex = 0;
  welcome.classList.add("hide"); //hiding welcome section
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
      showQuestion(questions[currentQuestionIndex])
      currentQuestionIndex++
      console.log("timeout")
    } else {
      timeCounter++;
      time.innerText = `Time: ${ givenTime - timeCounter} second`;
    }
  }, 1000)
}


function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
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
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  console.log(points);
  if (correct) {
    points = points + perQuestionPoint*(givenTime - timeCounter);
  }else{
    points = points - perQuestionPoint
  }
  if (currentQuestionIndex < questions.length) {
    timeCounter = 0;
    currentQuestionIndex++;
    setNextQuestion()
  } else {
    result();
  }
}

function result() {
  score.innerText = `Your Score is: ${points}`;
  score.classList.remove("hide");
  questionContainer.classList.add("hide");
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
  time.classList.add("hide");
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// question section
const questions = [{
    question: 'What is 2 + 2?',
    answers: [{
        text: '4',
        correct: true
      },
      {
        text: '22',
        correct: false
      }
    ]
  },
  {
    question: 'Who is the most futuristic human in the world?',
    answers: [{
        text: 'Elon Musk',
        correct: true
      },
      {
        text: 'Bill Gates',
        correct: false
      },
      {
        text: 'Jeff Bezos',
        correct: false
      },
      {
        text: 'Larry Page',
        correct: false
      }
    ]
  },
  {
    question: 'Who is the current president of USA?',
    answers: [{
        text: 'Obama',
        correct: false
      },
      {
        text: 'Hilary Clinton',
        correct: false
      },
      {
        text: 'Donuld Trump',
        correct: true
      },
      {
        text: 'Bill Clinton',
        correct: false
      }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [{
        text: '6',
        correct: false
      },
      {
        text: '8',
        correct: true
      }
    ]
  }
]
