
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './page.module.css'

const socialMediaLinks = [
  { name: 'Instagram', icon: '/instagram-icon.svg', url: 'https://instagram.com/worqhat' },
  { name: 'Discord', icon: '/discord-icon.svg', url: 'https://discord.gg/KHh9mguKBx' },
  { name: 'LinkedIn', icon: '/linkedin-icon.svg', url: 'https://linkedin.com/company/worqhat' },
  { name: 'Twitter', icon: '/twitter-icon.svg', url: 'https://twitter.com/worqhat' },
  { name: 'GitHub', icon: '/github-icon.svg', url: 'https://github.com/worqhat' },
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Move the API request logic here
    if (prompt&& loading) {
      //setLoading(true); // Set loading to true before sending the request

      const data = JSON.stringify({
        "prompt": [prompt]
      });

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          setLoading(false); // Set loading to false after receiving the response
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "https://api.worqhat.com/api/ai/images/generate/v2");
      xhr.setRequestHeader("Authorization", "Bearer sk-3ce895380dec49f7ae3c220c1dc1c3fe");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.send(data);
    }
  }, [prompt, loading]);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleGenerateImage = () => {
    setLoading(true); // Set loading to true when "Generate Image" button is clicked
  };

  return (

    <main className={styles.main}>
      <div className='logo' style={{ position: 'absolute', top: '0', left: '0', margin: '1%', fontSize: 'medium' }}>
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
      </div>
      <div className='social-icons' style={{ position: 'absolute', top: '0', right: '0', margin: '10px', fontSize: 'medium', display: 'flex' }}>
        {socialMediaLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>
            <Image src={link.icon} alt={link.name} width={30} height={50} />
          </a>
        ))}
      </div>

      <div className={`${styles.whiteBox}`}>
        <h1 className={`${styles.boxTitle} ${styles.blackText}`
        }>
          <strong>AI Image Generator by WorqHat</strong>
        </h1>
        <hr className={`${styles.titleLine}`} />
        <div className={`${styles.insieBox}`}>
          <h4 className={`${styles.boxSubTitle} ${styles.blackText}`}>
            User Input
          </h4>
          <div className={`${styles.inputBox}`}>
            <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Write Instruction to Generate Image using our AI "
              className={`${styles.inputField}`}
              style={{ color: 'black' }}
            />
            {/*     <button className={`${styles.generateButton}`} onClick={() => setPrompt(prompt)}> */}
            <button
              className={`${styles.generateButton}`}
              onClick={() => {
                setLoading(true); // Set loading to true when button is clicked
                setPrompt(prompt); // Set the prompt and initiate the API request
              }}
            >
              Generate Image
            </button>
            {loading && <p className={`${styles.blackText}`} >Loading...</p>}
          </div>

          <h4 className={`${styles.boxSubTitle} ${styles.blackText} `}>
            Response
          </h4>
          <div className={`${styles.inputBox}`}>
            <textarea
              type="text"
              placeholder="Here you will get the  url"
              className={`${styles.inputField}`}
              readOnly
            />
            <button className={`${styles.generateButton}`}>
              Copy Image
            </button>

          </div>
        </div>

      </div>
      © 2023 Worqhat. All rights reserved.

    </main>
  )
}
