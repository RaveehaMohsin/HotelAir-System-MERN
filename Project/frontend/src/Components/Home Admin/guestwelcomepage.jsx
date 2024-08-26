import React, { useEffect } from 'react';
import image from '../../Assets/guest.png';

export default function Guestwelcomepage() {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.type = 'text/css';
    
    // Define keyframes
    const keyframes = `
      @keyframes moveUpDown {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
    `;

    // Append keyframes to the style element
    style.appendChild(document.createTextNode(keyframes));
    
    // Append the style element to the head of the document
    document.head.appendChild(style);

    // Clean up the style element on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.imageWrapper}>
        <img src={image} alt="Guest Welcome" style={styles.image} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80vh', // Full viewport height
    padding: '20px',
    boxSizing: 'border-box',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: '15px', // Rounded corners
    overflow: 'hidden', // Ensures rounded corners work with the image
    padding: '10px',
    boxShadow: '0 4px 8px rgba(255,0,150,0.5), 0 4px 8px rgba(0,204,255,0.5), 0 8px 16px rgba(0,0,0,0.5)', // Multi-color shadow
    animation: 'moveUpDown 2s ease-in-out infinite', // Animation for moving up and down
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block', // Removes bottom space of the image
  },
};
