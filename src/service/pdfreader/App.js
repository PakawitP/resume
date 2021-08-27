import React, { useState, useRef } from "react";
import "./styles.css";
import PdfUrlViewer from "./PdfUrlViewer";
import pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = "https://d2v5g.csb.app/pdf.worker.js";

export default function App(props) {
  const [scale, setScale] = useState(1);
  const [page, setPage] = useState(1);
  const windowRef = useRef();

  const { url } = props

  const scrollToItem = () => {
    windowRef.current && windowRef.current.scrollToItem(page - 1, "start");
  };

  return (
    <div className="App">
      <div>
        <input value={page} onChange={e => setPage(e.target.value)} />
        <button type="button" onClick={scrollToItem}>
          goto
        </button>
        Zoom
        <button type="button" onClick={() => setScale(v => v + 0.1)}>
          +
        </button>
        <button type="button" onClick={() => setScale(v => v - 0.1)}>
          -
        </button>
      </div>
      <br />
      <PdfUrlViewer url={url} scale={scale} windowRef={windowRef} />
    </div>
  );
}
