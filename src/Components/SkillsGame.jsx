import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from './MicroInteractions';
import TextReveal from './TextReveal';

const gameQuestions = [
  {
    id: 1,
    skill: 'JavaScript',
    question: 'What will this code output?',
    code: `console.log(typeof null);`,
    options: ['null', 'undefined', 'object', 'boolean'],
    correct: 2,
    explanation: 'typeof null returns "object" - this is a known quirk in JavaScript!'
  },
  {
    id: 2,
    skill: 'React',
    question: 'Which hook is used for side effects?',
    code: `function Component() {
  // Which hook goes here?
  return <div>Hello</div>;
}`,
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correct: 1,
    explanation: 'useEffect is used for side effects like API calls, subscriptions, etc.'
  },
  {
    id: 3,
    skill: 'CSS',
    question: 'How to center a div both horizontally and vertically?',
    code: `.container {
  display: flex;
  /* What properties? */
}`,
    options: [
      'text-align: center',
      'justify-content: center; align-items: center',
      'margin: auto',
      'position: absolute'
    ],
    correct: 1,
    explanation: 'Flexbox with justify-content and align-items centers both ways!'
  },
  {
    id: 4,
    skill: 'Node.js',
    question: 'What does this Express middleware do?',
    code: `app.use(express.json());`,
    options: [
      'Serves static files',
      'Parses JSON request bodies',
      'Handles errors',
      'Sets up routing'
    ],
    correct: 1,
    explanation: 'express.json() parses incoming JSON request bodies!'
  },
  {
    id: 5,
    skill: 'Python',
    question: 'What will this list comprehension create?',
    code: `result = [x**2 for x in range(5)]`,
    options: [
      '[0, 1, 2, 3, 4]',
      '[0, 1, 4, 9, 16]',
      '[1, 4, 9, 16, 25]',
      '[2, 4, 6, 8, 10]'
    ],
    correct: 1,
    explanation: 'Squares of numbers 0-4: [0², 1², 2², 3², 4²] = [0, 1, 4, 9, 16]'
  }
];

const SkillsGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [particles, setParticles] = useState([]);
  
  const timerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameComplete && !showExplanation) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameComplete, showExplanation, currentQuestion]);

  const handleTimeUp = () => {
    setSelectedAnswer(-1);
    setShowExplanation(true);
    setStreak(0);
    clearInterval(timerRef.current);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setGameComplete(false);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    clearInterval(timerRef.current);
    
    const isCorrect = answerIndex === gameQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      const points = Math.max(10, timeLeft);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      createParticles();
    } else {
      setStreak(0);
    }
    
    setShowExplanation(true);
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const nextQuestion = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameComplete(false);
    setTimeLeft(30);
  };

  const getScoreMessage = () => {
    const percentage = (score / (gameQuestions.length * 30)) * 100;
    if (percentage >= 80) return "🏆 Excellent! You really know your stuff!";
    if (percentage >= 60) return "🎉 Great job! Solid programming knowledge!";
    if (percentage >= 40) return "👍 Good effort! Keep learning!";
    return "💪 Nice try! Practice makes perfect!";
  };

  if (!gameStarted) {
    return (
      <section className="skills-game-section">
        <div className="game-container">
          <TextReveal className="game-title" delay={0.2}>
            Test My Skills! 🎮
          </TextReveal>
          <motion.div
            className="game-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Interactive Coding Challenge</h3>
            <p>Think you can keep up? Test your programming knowledge with questions covering JavaScript, React, CSS, Node.js, and Python!</p>
            <div className="game-rules">
              <div className="rule">⏱️ 30 seconds per question</div>
              <div className="rule">🎯 Higher score for faster answers</div>
              <div className="rule">🔥 Build streaks for bonus points</div>
            </div>
            <AnimatedButton onClick={startGame} className="start-game-btn">
              Start Challenge
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    );
  }

  if (gameComplete) {
    return (
      <section className="skills-game-section">
        <div className="game-container">
          <motion.div
            className="game-complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <h2>🎉 Challenge Complete!</h2>
            <div className="final-score">
              <div className="score-display">{score} Points</div>
              <div className="score-message">{getScoreMessage()}</div>
            </div>
            <div className="game-stats">
              <div className="stat">
                <span className="stat-value">{gameQuestions.filter((_, i) => i < gameQuestions.length).length}</span>
                <span className="stat-label">Questions</span>
              </div>
              <div className="stat">
                <span className="stat-value">{Math.round((score / (gameQuestions.length * 30)) * 100)}%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
            <div className="game-actions">
              <AnimatedButton onClick={resetGame} className="play-again-btn">
                Play Again
              </AnimatedButton>
              <AnimatedButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="secondary">
                Back to Portfolio
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const question = gameQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <section className="skills-game-section" ref={gameRef}>
      <div className="game-container">
        {/* Particles */}
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="particle"
              initial={{ 
                opacity: 1, 
                scale: 0,
                x: `${particle.x}%`,
                y: `${particle.y}%`
              }}
              animate={{ 
                opacity: 0, 
                scale: 1,
                y: `${particle.y - 50}%`
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          ))}
        </AnimatePresence>

        {/* Game Header */}
        <div className="game-header">
          <div className="game-progress">
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / gameQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="progress-text">
              {currentQuestion + 1} / {gameQuestions.length}
            </span>
          </div>
          
          <div className="game-stats-header">
            <div className="stat-item">
              <span className="stat-label">Score</span>
              <motion.span 
                className="stat-value"
                key={score}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {score}
              </motion.span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Streak</span>
              <span className={`stat-value ${streak > 0 ? 'streak-active' : ''}`}>
                {streak > 0 && '🔥'} {streak}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Time</span>
              <motion.span 
                className={`stat-value timer ${timeLeft <= 10 ? 'timer-warning' : ''}`}
                animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
              >
                {timeLeft}s
              </motion.span>
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          className="question-container"
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="skill-badge">{question.skill}</div>
          <h3 className="question-text">{question.question}</h3>
          
          {question.code && (
            <motion.div
              className="code-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <pre><code>{question.code}</code></pre>
            </motion.div>
          )}

          <div className="options-container">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                className={`option-btn ${
                  selectedAnswer === index 
                    ? isCorrect 
                      ? 'correct' 
                      : 'incorrect'
                    : selectedAnswer !== null && index === question.correct
                      ? 'correct-answer'
                      : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {selectedAnswer === index && (
                  <motion.span
                    className="option-icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCorrect ? '✓' : '✗'}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              className="explanation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
            >
              <div className="explanation-content">
                <h4>{isCorrect ? '🎉 Correct!' : '❌ Not quite!'}</h4>
                <p>{question.explanation}</p>
                <AnimatedButton onClick={nextQuestion} className="next-btn">
                  {currentQuestion < gameQuestions.length - 1 ? 'Next Question' : 'Finish Game'}
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGame;