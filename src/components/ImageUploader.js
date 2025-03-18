import React, { useRef } from "react";

const ImageUploader = ({ onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onImageUpload(e.target.result); // Send image to parent for OpenCV processing
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <button onClick={() => fileInputRef.current.click()}>📁 Upload Image</button>
    </div>
  );
};

export default ImageUploader;
