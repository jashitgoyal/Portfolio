import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal';
import HoverDistortion from './HoverDistortion';
import { AnimatedButton } from './MicroInteractions';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    content: 'Jashit delivered exceptional work on our web application. His attention to detail and technical expertise made our project a huge success.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'Working with Jashit was a game-changer. He brought innovative solutions and delivered beyond our expectations.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Design Lead',
    company: 'Creative Agency',
    content: 'Jashit perfectly translated our designs into beautiful, functional code. His collaboration skills are outstanding.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <TextReveal className="testimonial-title" delay={0.2}>
          What People Say
        </TextReveal>
        
        <div className="testimonial-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: 45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -45 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <HoverDistortion className="testimonial-card">
                <div className="testimonial-content">
                  <motion.p
                    className="testimonial-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    "{testimonials[currentIndex].content}"
                  </motion.p>
                  <motion.div
                    className="testimonial-author"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].name}
                      className="author-avatar"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="author-info">
                      <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                      <p className="author-role">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </HoverDistortion>
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            className="carousel-controls"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatedButton onClick={prevTestimonial} className="carousel-btn prev">
              ←
            </AnimatedButton>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            <AnimatedButton onClick={nextTestimonial} className="carousel-btn next">
              →
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;