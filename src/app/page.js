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
 
  
  useEffect(() => {
    function handleFileInputChange(event) {
    const selectedFile = event.target.files[0]; // Get the selected file
    if (!selectedFile) {
      return;
    }
  
      const form = new FormData();
      form.append("audio", selectedFile);

      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk-3ce895380dec49f7ae3c220c1dc1c3fe',
          'Content-Type': 'multipart/form-data'
        },
        body:form,
      };

      // options.body = form;

      fetch('https://api.worqhat.com/api/ai/speech-text', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    }
  });

  return (

    <main className={styles.main}>
      <div className='logo' style={{ position: 'absolute', top: '0', left: '0', margin: '1%', fontSize: 'medium' }}>
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
      </div>
      <div className='social-icons' style={{ position: 'absolute', top: '0', right: '0', margin: '10px', fontSize: 'medium', display: 'flex' }}>
        {socialMediaLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>
            <Image src={link.icon} alt={link.name} width={30} height={40} />
          </a>
        ))}
      </div>

      <div className={`${styles.whiteBox}`}>


        <div className={`${styles.heading}`}>
          Speech Extraction
        </div>


        <div style={{ color: "gray", textAlign: "center", content: "center", marginTop: "30px", fontSize: "1.5rem", padding: "25px" }}>
          Our Speech Extraction API endpoint is used to extract text from audio files.</div>


        <div className={`${styles.headings}`}>Upload</div>
        <div className={`${styles.boxWithContent}`}>
          <div className={`${styles.centerContent}`}>
            <p className={` ${styles.ptags}`}>
              Drop an audio file here
            </p>
            <p className={`${styles.ptag}`}>
              or click to browse
            </p>
          </div>

        </div>
      <  div className={`${styles.centerContent}`}>
           
        <button className={`${styles.button}`} >
          Upload File
        </button>
</div>

        <div className={`${styles.headings}`}>Response</div>

        <div className={`${styles.boxWithContents}`}>
          <div className={`${styles.centerContent}`}>
            
            <p className={`${styles.ptag}`}>
              your text
            </p>
          </div>

        </div>
        <  div className={`${styles.centerContent}`}>
           
           <button className={`${styles.button}`} >
             copy text
           </button>
   </div>

      </div>
      <div className={`${styles.reserve}`}>
        © 2023 Worqhat. All rights reserved.
      </div>
    </main>
  );
}
