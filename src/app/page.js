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
  const [generatedLink, setGeneratedLink] = useState(''); // Use the dummy link

  const [copySuccess, setCopySuccess] = useState(false);

  // Replace the useEffect and loading state with dummy image link
 //  const generatedLink = 'https://worqhat.s3.ap-south-1.amazonaws.com/outputs/1692603817264.png';

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
      //xhr.setRequestHeader("Authorization", "Bearer sk-5ad64bcfb0d441bdbd6c8ab9f07b3647");
xhr.setRequestHeader("Authorization", "Bearer sk-65b07d20f9cf477c9e3096bdde28bc2a");

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
  // const handleDownloadImage = () => {
  //   if (generatedLink) {
  //     const link = document.createElement('a');
  //     link.href = generatedLink;
  //     link.download = 'generated_image.png'; // Set the desired file name
  //     link.target = '_blank';
  //     link.click();
  //   }
  // };

  const handleDownloadImage = () => {
    if (generatedLink) {
      fetch(generatedLink)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'generated_image.png'; // Set the desired file name
          link.click();
          URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error downloading image:', error);
          // Handle error if downloading fails
        });
    }
  };
  

  const handleCopylink = () => {

    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopySuccess(true); // Set copy success to true
      setTimeout(() => {
        setCopySuccess(false); // Reset copy success after 5 seconds
      }, 3000); // 5000 milliseconds = 5 seconds
    }
  };
  const handleCopyImage = () => {
    if (generatedLink) {
      fetch(generatedLink)
        .then(response => response.blob())
        .then(blob => {
          navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);

          setCopySuccess(true); // Set copy success to true
          setTimeout(() => {
            setCopySuccess(false); // Reset copy success after 5 seconds
          }, 3000); // 5000 milliseconds = 5 seconds
        })
        .catch(error => {
          console.error('Error copying image:', error);
          // Handle error if copying fails
        });
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
            <Image src={link.icon} alt={link.name} width={30} height={40} />
          </a>
        ))}
      </div>

      <div className={`${styles.whiteBox}`}>


        <div className={`${styles.heading}`}>
          AI Image Generator by WorqHat
        </div>

        <div className={`${styles.flex1}`}>

          <div className={`${styles.headings}`}>User Input</div>

          <div className={`${styles.inputBox}`}>
            {/* <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Describe what you want and directly click the 'Generate' button to  Generate Image"
              className={`${styles.inputField}`}
              
              style={{ color: 'black' }}
            /> */}
            <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              onFocus={() => {
                const inputField = document.querySelector(`.${styles.inputField}`);
                inputField.style.border = '1px solid #ff0000'; // Change to the desired border color
              }}
              onBlur={() => {
                const inputField = document.querySelector(`.${styles.inputField}`);
                inputField.style.border = '1px solid #000000'; // Change to the default border color
              }}
              placeholder="Describe what you want and directly click the 'Generate Image' button "
              className={`${styles.inputField}`}
              style={{ color: 'black' }}
            />

            <button
              className={`${styles.generateButton}`}
              onClick={() => {
                setLoading(true);
                setPrompt(prompt);
              }}
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          <div className={`${styles.headings}`}>Response</div>
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
                <p style={{ color: "gray", textAlign: "center", content: "center", marginTop: "20px" }}> Your image will display here</p>
              )
              }
            </div>
            <div className={`${styles.buton}`}>
              <button className={`${styles.generateButtons}`}
                onClick={handleCopyImage}
              >
                Copy Image
              </button>
              <button className={`${styles.generateButtons}`}
                onClick={handleDownloadImage}
              >
                Download Image
              </button>

              <button className={`${styles.generateButtons}`}
                onClick={handleCopylink}
              >
                Copy Image Link
              </button>

            </div>
          </div>


        </div>

      </div>
      <div className={`${styles.reserve}`}>
        © 2023 Worqhat. All rights reserved.
      </div>
    </main>
  );
}
