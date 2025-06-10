import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { AnimatedButton } from './MicroInteractions';
import TextReveal from './TextReveal';

const skillsData = [
  // Frontend
  { id: 1, name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', icon: '🟨' },
  { id: 2, name: 'React', category: 'Frontend', color: '#61DAFB', icon: '⚛️' },
  { id: 3, name: 'CSS', category: 'Frontend', color: '#1572B6', icon: '🎨' },
  { id: 4, name: 'HTML', category: 'Frontend', color: '#E34F26', icon: '📄' },
  
  // Backend
  { id: 5, name: 'Node.js', category: 'Backend', color: '#68A063', icon: '🟢' },
  { id: 6, name: 'Python', category: 'Backend', color: '#306998', icon: '🐍' },
  { id: 7, name: 'Java', category: 'Backend', color: '#ED8B00', icon: '☕' },
  { id: 8, name: 'Spring Boot', category: 'Backend', color: '#6DB33F', icon: '🍃' },
  
  // DevOps
  { id: 9, name: 'Docker', category: 'DevOps', color: '#2496ED', icon: '🐳' },
  { id: 10, name: 'AWS', category: 'DevOps', color: '#FF9900', icon: '☁️' },
  { id: 11, name: 'Jenkins', category: 'DevOps', color: '#D33833', icon: '🔧' },
  { id: 12, name: 'Git', category: 'DevOps', color: '#F05032', icon: '📚' },
  
  // Database
  { id: 13, name: 'MongoDB', category: 'Database', color: '#47A248', icon: '🍃' },
  { id: 14, name: 'MySQL', category: 'Database', color: '#4479A1', icon: '🗄️' },
  { id: 15, name: 'PostgreSQL', category: 'Database', color: '#336791', icon: '🐘' },
];

const categories = [
  { name: 'Frontend', color: '#FF6B6B', description: 'User Interface & Experience' },
  { name: 'Backend', color: '#4ECDC4', description: 'Server & Logic' },
  { name: 'DevOps', color: '#45B7D1', description: 'Deployment & Infrastructure' },
  { name: 'Database', color: '#96CEB4', description: 'Data Management' },
];

const challenges = [
  {
    id: 1,
    title: "Build a Full-Stack App",
    description: "Drag the technologies you'd use to build a complete web application",
    requiredCategories: ['Frontend', 'Backend', 'Database'],
    minSkills: 6,
    bonus: "Add DevOps tools for extra points!"
  },
  {
    id: 2,
    title: "Modern Web Development",
    description: "Show your frontend expertise",
    requiredCategories: ['Frontend'],
    minSkills: 3,
    bonus: "Include CSS frameworks and build tools!"
  },
  {
    id: 3,
    title: "Cloud & DevOps Pipeline",
    description: "Demonstrate your deployment knowledge",
    requiredCategories: ['DevOps'],
    minSkills: 3,
    bonus: "Include containerization and CI/CD!"
  }
];

const SkillsGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState(skillsData);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const dropZoneRef = useRef(null);

  const startGame = () => {
    setGameStarted(true);
    setCurrentChallenge(0);
    setSelectedSkills([]);
    setAvailableSkills(skillsData);
    setScore(0);
    setGameComplete(false);
    setShowFeedback(false);
  };

  const handleDrop = (skill) => {
    if (selectedSkills.find(s => s.id === skill.id)) return;
    
    setSelectedSkills(prev => [...prev, skill]);
    setAvailableSkills(prev => prev.filter(s => s.id !== skill.id));
    createParticles();
  };

  const removeSkill = (skillId) => {
    const skill = selectedSkills.find(s => s.id === skillId);
    if (skill) {
      setSelectedSkills(prev => prev.filter(s => s.id !== skillId));
      setAvailableSkills(prev => [...prev, skill].sort((a, b) => a.id - b.id));
    }
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const evaluateChallenge = () => {
    const challenge = challenges[currentChallenge];
    let points = 0;
    let feedback = [];

    // Check required categories
    const selectedCategories = [...new Set(selectedSkills.map(s => s.category))];
    const hasRequiredCategories = challenge.requiredCategories.every(cat => 
      selectedCategories.includes(cat)
    );

    if (hasRequiredCategories) {
      points += 50;
      feedback.push("✅ Great! You included all required technology categories!");
    } else {
      feedback.push("❌ Missing some required categories. Try adding more diverse skills!");
    }

    // Check minimum skills
    if (selectedSkills.length >= challenge.minSkills) {
      points += 30;
      feedback.push(`✅ Perfect! You selected ${selectedSkills.length} technologies!`);
    } else {
      feedback.push(`❌ Need at least ${challenge.minSkills} skills for this challenge.`);
    }

    // Bonus points for good combinations
    const frontendSkills = selectedSkills.filter(s => s.category === 'Frontend').length;
    const backendSkills = selectedSkills.filter(s => s.category === 'Backend').length;
    const devopsSkills = selectedSkills.filter(s => s.category === 'DevOps').length;
    const dbSkills = selectedSkills.filter(s => s.category === 'Database').length;

    if (frontendSkills >= 2 && backendSkills >= 2) {
      points += 20;
      feedback.push("🎉 Bonus: Great full-stack combination!");
    }

    if (devopsSkills >= 2) {
      points += 15;
      feedback.push("🚀 Bonus: Excellent DevOps knowledge!");
    }

    // Check for modern tech stack
    const hasReact = selectedSkills.some(s => s.name === 'React');
    const hasNodeJS = selectedSkills.some(s => s.name === 'Node.js');
    const hasDocker = selectedSkills.some(s => s.name === 'Docker');
    
    if (hasReact && hasNodeJS) {
      points += 10;
      feedback.push("⚡ Bonus: Modern JavaScript stack!");
    }

    if (hasDocker) {
      points += 10;
      feedback.push("🐳 Bonus: Containerization expertise!");
    }

    setScore(prev => prev + points);
    setShowFeedback(true);
    
    return { points, feedback };
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setSelectedSkills([]);
      setAvailableSkills(skillsData);
      setShowFeedback(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentChallenge(0);
    setSelectedSkills([]);
    setAvailableSkills(skillsData);
    setScore(0);
    setGameComplete(false);
    setShowFeedback(false);
  };

  if (!gameStarted) {
    return (
      <section className="skills-game-section">
        <div className="game-container">
          <TextReveal className="game-title" delay={0.2}>
            Drag & Drop Skills Challenge! 🎯
          </TextReveal>
          <motion.div
            className="game-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Interactive Tech Stack Builder</h3>
            <p>Drag and drop my skills to solve real-world development challenges! Build tech stacks, create solutions, and see how well you know modern development!</p>
            <div className="game-rules">
              <div className="rule">🎯 Complete 3 unique challenges</div>
              <div className="rule">🔧 Drag skills to build solutions</div>
              <div className="rule">⭐ Bonus points for smart combinations</div>
            </div>
            <div className="skills-preview">
              <h4>Available Skills:</h4>
              <div className="skills-categories">
                {categories.map(category => (
                  <div key={category.name} className="category-preview">
                    <span className="category-name" style={{ color: category.color }}>
                      {category.name}
                    </span>
                    <span className="category-count">
                      {skillsData.filter(s => s.category === category.name).length} skills
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <AnimatedButton onClick={startGame} className="start-game-btn">
              Start Building! 🚀
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    );
  }

  if (gameComplete) {
    const maxScore = challenges.length * 100;
    const percentage = Math.round((score / maxScore) * 100);
    
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
              <div className="score-percentage">{percentage}% Mastery</div>
              <div className="score-message">
                {percentage >= 80 ? "🏆 Tech Stack Master!" :
                 percentage >= 60 ? "🎯 Solid Developer!" :
                 percentage >= 40 ? "💪 Good Foundation!" :
                 "🌱 Keep Learning!"}
              </div>
            </div>
            <div className="game-stats">
              <div className="stat">
                <span className="stat-value">{challenges.length}</span>
                <span className="stat-label">Challenges</span>
              </div>
              <div className="stat">
                <span className="stat-value">{skillsData.length}</span>
                <span className="stat-label">Skills Available</span>
              </div>
              <div className="stat">
                <span className="stat-value">{categories.length}</span>
                <span className="stat-label">Tech Categories</span>
              </div>
            </div>
            <div className="game-actions">
              <AnimatedButton onClick={resetGame} className="play-again-btn">
                Try Again
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

  const challenge = challenges[currentChallenge];

  return (
    <section className="skills-game-section">
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
                animate={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="progress-text">
              Challenge {currentChallenge + 1} / {challenges.length}
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
              <span className="stat-label">Selected</span>
              <span className="stat-value">{selectedSkills.length}</span>
            </div>
          </div>
        </div>

        {/* Challenge */}
        <motion.div
          className="challenge-container"
          key={currentChallenge}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="challenge-header">
            <h2 className="challenge-title">{challenge.title}</h2>
            <p className="challenge-description">{challenge.description}</p>
            <div className="challenge-requirements">
              <span className="requirement">
                📋 Categories: {challenge.requiredCategories.join(', ')}
              </span>
              <span className="requirement">
                🎯 Min Skills: {challenge.minSkills}
              </span>
              <span className="bonus-hint">💡 {challenge.bonus}</span>
            </div>
          </div>

          {/* Drop Zone */}
          <motion.div
            ref={dropZoneRef}
            className={`drop-zone ${selectedSkills.length > 0 ? 'has-skills' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="drop-zone-header">
              <h3>Your Tech Stack</h3>
              <span className="skills-count">{selectedSkills.length} skills selected</span>
            </div>
            
            <div className="selected-skills">
              <AnimatePresence>
                {selectedSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    className="selected-skill"
                    style={{ backgroundColor: skill.color + '20', borderColor: skill.color }}
                    initial={{ opacity: 0, scale: 0, rotate: 180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: -180 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => removeSkill(skill.id)}
                  >
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-category">{skill.category}</span>
                    <button className="remove-skill">×</button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {selectedSkills.length === 0 && (
                <div className="empty-drop-zone">
                  <span className="drop-icon">🎯</span>
                  <p>Drag skills here to build your solution!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Available Skills */}
          <div className="skills-palette">
            <h3>Available Skills</h3>
            <div className="skills-by-category">
              {categories.map(category => {
                const categorySkills = availableSkills.filter(s => s.category === category.name);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category.name} className="skill-category">
                    <div className="category-header">
                      <h4 style={{ color: category.color }}>{category.name}</h4>
                      <span className="category-description">{category.description}</span>
                    </div>
                    <div className="skills-grid">
                      {categorySkills.map((skill, index) => (
                        <DraggableSkill
                          key={skill.id}
                          skill={skill}
                          onDrop={handleDrop}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="challenge-actions">
            <AnimatedButton 
              onClick={evaluateChallenge}
              className="evaluate-btn"
              disabled={selectedSkills.length === 0}
            >
              Evaluate Solution 🔍
            </AnimatedButton>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              className="feedback-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
            >
              <div className="feedback-content">
                <h4>Challenge Results</h4>
                <div className="feedback-list">
                  {evaluateChallenge().feedback.map((item, index) => (
                    <motion.div
                      key={index}
                      className="feedback-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
                <AnimatedButton onClick={nextChallenge} className="next-challenge-btn">
                  {currentChallenge < challenges.length - 1 ? 'Next Challenge' : 'Finish Game'} →
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const DraggableSkill = ({ skill, onDrop, index }) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      className="draggable-skill"
      style={{ 
        backgroundColor: skill.color + '15',
        borderColor: skill.color,
        color: skill.color
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      drag
      dragControls={dragControls}
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileDrag={{ 
        scale: 1.1, 
        rotate: 5,
        zIndex: 1000,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}
      whileHover={{ scale: 1.05, y: -3 }}
      onDragEnd={(event, info) => {
        const dropZone = document.querySelector('.drop-zone');
        if (dropZone) {
          const dropRect = dropZone.getBoundingClientRect();
          const dragRect = event.target.getBoundingClientRect();
          
          if (
            dragRect.left < dropRect.right &&
            dragRect.right > dropRect.left &&
            dragRect.top < dropRect.bottom &&
            dragRect.bottom > dropRect.top
          ) {
            onDrop(skill);
          }
        }
      }}
    >
      <span className="skill-icon">{skill.icon}</span>
      <span className="skill-name">{skill.name}</span>
      <span className="drag-hint">Drag me!</span>
    </motion.div>
  );
};

export default SkillsGame;