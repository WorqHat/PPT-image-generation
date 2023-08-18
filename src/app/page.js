
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
  const [generatedLink, setGeneratedLink] = useState(''); // State to store the API response
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Move the API request logic here
    if (prompt && loading) {
      const data = JSON.stringify({
        "prompt": [prompt]
      });

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          setLoading(false); // Set loading to false after receiving the response
          //setResponseText(this.responseText); // Store the API response
          const response = JSON.parse(this.responseText);
          const content = response.content; // Extract the "content" value
          setGeneratedLink(content); // Store the generated link
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
    setGeneratedLink(''); // Clear the generatedLink when generating a new image
    setCopySuccess(false); // Reset the copy success state
    setCopySuccess(true);

  };


  const handleCopyImage = () => {

    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopySuccess(true); // Set copy success to true
      setTimeout(() => {
        setCopySuccess(false); // Reset copy success after 5 seconds
      }, 3000); // 5000 milliseconds = 5 seconds
    }
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
            <button
              className={`${styles.generateButton}`}
              onClick={() => {
                setLoading(true); // Set loading to true when button is clicked
                setPrompt(prompt); // Set the prompt and initiate the API request
              }}
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </button>

          </div>


          <h4 className={`${styles.boxSubTitle} ${styles.blackText} `}>
            Response
          </h4>
          <div className={`${styles.responseBox}`}>
            {/* Display the generated image */}
            <div className={`${styles.imageBox}`}>
              {generatedLink ? (
                <img
                  src={generatedLink}
                  alt="Generated Image"
                  className={`${styles.generatedImage}`}
                />
              ) : (
                <p className={`${styles.placeholderText} ${styles.blackText}`}>
                  Your image will display here</p>
              )
              }  </div>
            <button className={`${styles.generateButton}`}
              onClick={handleCopyImage}
            >
              Copy Image
            </button>
           
            {copySuccess && (
              <p className={`${styles.copySuccess} ${styles.blackText}`}>copied !</p>
            )}
          </div>
        </div>

      </div>
      © 2023 Worqhat. All rights reserved.

    </main>
  );
}
