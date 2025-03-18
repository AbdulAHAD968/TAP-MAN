import React, { useState, useEffect } from "react";

const OCRProcessor = ({ imageSrc, onTextExtracted }) => {
    const [loading, setLoading] = useState(false);
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        const newWorker = new Worker("/ocrWorker.js");
        newWorker.onmessage = (e) => {
            onTextExtracted(e.data.text);
            setLoading(false);
        };
        setWorker(newWorker);

        return () => {
            newWorker.terminate();
        };
    }, [onTextExtracted]);

    const preprocessImage = (imageSrc) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = imageSrc;
            img.crossOrigin = "Anonymous";
    
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
    
                // Resize for better OCR performance
                const scaleFactor = 2; // Scale up for better OCR
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;
    
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let pixels = imageData.data;
    
                // Convert to grayscale and enhance contrast
                for (let i = 0; i < pixels.length; i += 4) {
                    let avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                    
                    // Increase contrast
                    avg = avg < 100 ? 0 : 255; // Thresholding to remove shadows/noise
    
                    pixels[i] = pixels[i + 1] = pixels[i + 2] = avg;
                }
    
                ctx.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL()); // Return processed image
            };
        });
    };
    

    const processImage = async () => {
        setLoading(true);
        const processedImage = await preprocessImage(imageSrc);
        if (worker) {
            worker.postMessage({ imageData: processedImage });
        }
    };

    return (
        <div>
            <button onClick={processImage} disabled={loading || !imageSrc}>
                {loading ? "Processing..." : "Extract Numbers"}
            </button>
        </div>
    );
};

export default OCRProcessor;
