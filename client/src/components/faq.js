import React, { useState } from "react";
import "./Faq.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Faq = () => {
  const faqsData = [
    {
      id: 1,
      question: "What is XXX?",
      answer: "“XXX is a task, list and note management application.”",
    },
    {
      id: 2,
      question: "Why does cheese smell?",
      answer:
        "“The strong aroma of stinky cheese is created by bacteria called Brevibacterium linens or b. Linens growing on the rind, which is produced by washing the cheese in a brine of saltwater or alcohol.”",
    },
    {
      id: 3,
      question: "How far away is the moon?",
      answer: "“384,400 km (238,855 miles)”",
    },
    {
      id: 4,
      question: "Pull my finger?",
      answer: "“NO.”",
    },
    {
      id: 5,
      question: "What are they selling?",
      answer: "“Chowcklate!”",
    },
    {
      id: 6,
      question: "What are you reading at the moment?",
      answer: "“The Ancient Magus Bride”",
    },
    {
      id: 7,
      question: "How fast can a grizzly bear run?",
      answer: "“56 kph (35 mph)”",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (faqId) => {
    setExpandedFaq((prevExpanded) => (prevExpanded === faqId ? null : faqId));
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-description">
          Answers to frequently asked questions.
        </p>
      </div>
      <div className="faqs">
        <ul>
          {faqsData.map((faq) => (
            <li key={faq.id}>
              <button
                className={expandedFaq === faq.id ? "active" : ""}
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
                <span className="icon-arrow">
                  <FontAwesomeIcon
                    icon={expandedFaq === faq.id ? faChevronUp : faChevronDown}
                  />{" "}
                </span>
              </button>
              {expandedFaq === faq.id && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faq;
