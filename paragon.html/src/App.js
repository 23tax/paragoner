import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';



function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textResult, setTextResult] = useState('');

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleTranscribe = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);

      const worker = await createWorker('pol' );
      const imageUrl = URL.createObjectURL(selectedImage);
      const result = await worker.recognize(imageUrl);

      setTextResult(result.data.text);
      console.log("twoj tekst skurwysynu:")
      console.log(result.data.text);

      await worker.terminate();
    } catch (error) {
      console.error("Błąd podczas rozpoznawania tekstu:", error);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="App">
      <h1>P A R A G O N A T O R</h1>
      
      <div className="input-wrapper">
        
        <input 
          type="file" 
          id="upload" 
          accept="image/*" 
          onChange={handleChangeImage} 
        />
      </div>
      
      {selectedImage && (
        <div>
          <button 
            onClick={handleTranscribe}
            disabled={isProcessing}
            style={{ margin: '10px', padding: '8px 16px' }}
          >
            {isProcessing ? 'Przetwarzanie...' : 'Rozpoznaj tekst'}
          </button>
          
          <div className="image-preview">
            <img 
              src={URL.createObjectURL(selectedImage)} 
              alt="Podgląd" 
              style={{ maxWidth: '400px', maxHeight: '300px' }} 
            />
          </div>
        </div>
      )}
      {textResult && (
        <div className="text-result">
          <h2>Wynik rozpoznania:</h2>
          <div className="text-result-content">
          <pre>{textResult}</pre>
        </div>
        </div>
      )

      }
      
      {isProcessing && (
        <div className="processing-info">
          przetwarzanie obrazu zara sie gowno wyswietli na dole
        </div>
      )}
    </div>
  );
}

export default App;
