import React, { useState } from "react";
import './help.css'

const helpTopics = [
  {
    title: "Getting Started",
    content: "Go to 'Tasks' → Click '+' → Enter details → Save.",
  },
  {
    title: "Syncing Across Devices",
    content: "Sign in with Google/GitHub to enable cloud sync.",
  },
  {
    title: "Keyboard Shortcuts",
    content: "Ctrl+K (Cmd+K on Mac) to open command palette.",
  },
];

export const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="help-center">
      <h2>Help Center</h2>
      <div className="help-topics">
        {helpTopics.map((topic, index) => (
          <div key={index} className="help-topic">
            <button onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
              {topic.title}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && <p>{topic.content}</p>}
          </div>
        ))}
      </div>
      <div className="contact-support">
        <h3>Still stuck?</h3>
        <a href="/contact">Contact Support</a>
      </div>
    </div>
  );
};