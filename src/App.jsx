import "./App.css";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function App() {
  const [answers, setAnswers] = useState([]);
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isChoosed, setIsChoosed] = useState(false);
  const [answer, setAnswer] = useState({});
  const [stockAnswer, setStockAnswer] = useState([]);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    const stockedAnswers = JSON.parse(localStorage.getItem("answers"));
    setStockAnswer(stockedAnswers);
  }, [answers]);

  // ================== QUIZ_ARRAY ==================

  const quiz = [
    {
      question: "First football team created in Algeria",
      choices: [
        { answer: "Entente sportive sétifienne (ESS)", isTrue: false },
        {
          answer: "Union Sportive de la Médina d'Alger (USMA)",
          isTrue: false,
        },
        { answer: "Mouloudia Club d'Alger (MCA)", isTrue: true },
        { answer: "Chabab Riadhi Belouizdad (CRB)", isTrue: false },
      ],
    },
    {
      question: "What is the name of the largest ocean on Earth",
      choices: [
        { answer: "Atlantic Ocean", isTrue: false },
        { answer: "Pacific Ocean", isTrue: true },
        { answer: "Indian Ocean", isTrue: false },
        { answer: "Arctic Ocean", isTrue: false },
      ],
    },
    {
      question: "What year did World War II end",
      choices: [
        { answer: "1918", isTrue: false },
        { answer: "1939", isTrue: false },
        { answer: "1945", isTrue: true },
        { answer: "1953", isTrue: false },
      ],
    },
    {
      question: "The building blocks of all living things are called",
      choices: [
        { answer: "Minerals", isTrue: false },
        { answer: "Cells", isTrue: true },
        { answer: "Elements", isTrue: false },
        { answer: "Molecules", isTrue: false },
      ],
    },
    {
      question: "What is the closest planet to the Sun",
      choices: [
        { answer: "Earth", isTrue: false },
        { answer: "Mars", isTrue: false },
        { answer: "Mercury", isTrue: true },
        { answer: "Venus", isTrue: false },
      ],
    },
  ];

  // ================== QUIZ_ARRAY ==================

  const statesHandler = () => {
    if (count < quiz.length - 1 && isChoosed) {
      setCount(count + 1);
      setIsChoosed(false);
      setAnswers([...answers, answer]);
    }
  };

  const quizDone = () => {
    isChoosed && setIsDone(true);
    setAnswers([...answers, answer]);
  };

  const stockAnswers = (answer, index) => {
    setIsChoosed(true);
    setAnswer({ answer, index });
  };

  const correctAnswers = stockAnswer.reduce((start, answer) => {
    return (start += answer.answer.isTrue);
  }, 0);

  return (
    <>
      {!isDone ? (
        <section className="quiz-app">
          <div className="quiz">
            <div className="quiz-title">
              <p>Quiz App</p>
            </div>

            <div className="question">
              <p>
                {count + 1}. {quiz[count].question}
              </p>
            </div>

            <div className="choices">
              {quiz[count].choices.map((ques, index) => {
                return (
                  <button
                    className="choice"
                    onClick={() => stockAnswers(ques, count)}
                    key={index}
                  >
                    <p>{ques.answer}</p>
                  </button>
                );
              })}
            </div>

            <div className="next-button">
              {count + 1 === quiz.length ? (
                <button onClick={quizDone}>Done</button>
              ) : (
                <button onClick={statesHandler}>Next</button>
              )}
            </div>

            <div className="questions-num">
              <p>
                Question {count + 1} of {quiz.length}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <div className="answers">
          <div className="q-a">
            <div className="quiz-app-answers-title">
              <p>Quiz App Result</p>
            </div>
            <div className="all-answers">
              {stockAnswer.map((answer) => {
                return (
                  <div className="single-answer">
                    <div className="s-a">
                      <div className="">
                        <p>
                          {answer.index + 1}. {quiz[answer.index].question} ?
                        </p>
                        <div></div>
                      </div>
                      <div className="s">
                        <p>- {answer.answer.answer}</p>
                        <div>
                          {answer.answer.isTrue ? (
                            <span className="correct">
                              <FaCheckCircle />
                            </span>
                          ) : (
                            <span className="wrong">
                              <MdCancel />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="correct-answers">
              {correctAnswers >= 1 ? (
                <p>
                  you got {correctAnswers}{" "}
                  {correctAnswers > 1 ? "answers" : "answer"} correct
                </p>
              ) : (
                <p>None correct</p>
              )}
            </div>
            <div>
              <button
                className="again"
                onClick={() => {
                  setIsDone(false);
                  setCount(0);
                  setIsChoosed(false);
                  setAnswers([]);
                }}
              >
                <span>Start Again</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
