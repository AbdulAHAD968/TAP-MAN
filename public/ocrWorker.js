self.importScripts("https://cdn.jsdelivr.net/npm/tesseract.js");

self.onmessage = async function (e) {
    const { imageData } = e.data;

    try {
        const { data: { text } } = await Tesseract.recognize(imageData, "eng", {
            tessedit_char_whitelist: "0123456789",
            tessedit_pageseg_mode: 7,
        });

        self.postMessage({ text: text.replace(/\D/g, "") });
    }
    catch(error){
        console.error("Worker OCR Error:", error);
        self.postMessage({ text: "" });
    }
};
