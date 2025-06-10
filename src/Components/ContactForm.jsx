import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton, AnimatedInput } from './MicroInteractions';
import HoverDistortion from './HoverDistortion';
import TextReveal from './TextReveal';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <HoverDistortion className="contact-content">
          <TextReveal className="contact-title" delay={0.2}>
            Let's Work Together
          </TextReveal>
          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </motion.p>
          
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <AnimatedInput
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <AnimatedInput
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <motion.textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="5"
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(0, 109, 119, 0.1)"
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            <AnimatedButton
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="loading-spinner"></div>
              ) : (
                'Send Message'
              )}
            </AnimatedButton>
          </motion.form>
        </HoverDistortion>
      </div>
    </section>
  );
};

export default ContactForm;