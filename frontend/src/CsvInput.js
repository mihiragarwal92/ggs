import React, { useRef, useState } from "react";
import ProgressBar from "react-progressbar";

function CsvInput({ handleFileChange }) {
  const csvRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    var file = csvRef.current.files[0];
    if (!file) return;

    handleFileChange(file);
    simulateProgress();
  };

  const simulateProgress = () => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setProgress(0);
          }, 1000); 
          return prevProgress;
        }
      });
    }, 100); 
  };

  return (
    <form className="csv-form">
      <div className="csv-form-group">
        <input
          type="file"
          className="csv-form-control"
          id="file"
          accept=".csv"
          onChange={handleChange}
          ref={csvRef}
        />
      </div>
      {progress > 0 && <ProgressBar completed={progress} bgColor="#33CEFF" />}
    </form>
  );
}

export default CsvInput;
