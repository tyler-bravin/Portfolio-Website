/**
 * @file Contact.js
 * @description Final call-to-action section.
 * @author Tyler Bravin
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
    return (
        <motion.section
            className="contact"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <span className="section-eyebrow">{'// contact'}</span>
            <h2 className="contact-heading">Get in touch</h2>
            <p className="contact-copy">
                I'm looking for a graduate software engineering role and I'm
                always up for talking about interesting projects. My inbox is
                open — whether it's an opportunity, a question, or just to say
                hello.
            </p>
            <a href="mailto:tylerbravin02@gmail.com" className="button button-solid">
                <FiMail /> tylerbravin02@gmail.com
            </a>
        </motion.section>
    );
};

export default Contact;
