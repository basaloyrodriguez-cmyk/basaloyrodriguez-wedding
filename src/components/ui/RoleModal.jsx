import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export function RoleModal({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger entry animation
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  if (!message) return null;

  // Resolve dynamic image from assets assuming picture_name is something like 'mate.jpg'
  // Using Vite's new URL feature for asset resolution.
  let imageUrl = null;
  if (message.picture_name) {
    try {
      imageUrl = new URL(`../../assets/${message.picture_name}`, import.meta.url).href;
    } catch (err) {
      console.error('Error loading image', message.picture_name);
    }
  }

  return (
    <div className={`role-modal-overlay ${isVisible ? 'visible' : ''}`}>
      <div className={`role-modal-content ${isVisible ? 'visible' : ''}`}>
        <button className="role-modal-close" onClick={handleClose}>
          <X size={20} />
        </button>

        {imageUrl && (
          <div className="role-modal-image-container">
            <img src={imageUrl} alt={message.title} className="role-modal-image" />
          </div>
        )}

        <div className="role-modal-body">
          <h2 className="role-modal-title">{message.title}</h2>
          <p className="role-modal-text">{message.content}</p>
          
          <Button variant="primary" className="btn--full mt-4" onClick={handleClose}>
            ¡Con mucho gusto!
          </Button>
        </div>
      </div>
    </div>
  );
}
