import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './Create';
import Closeup from './Closeup';
import Home from './Home';
import { useEffect, useState } from 'react';

function Pages() {

  const [palettes, setPalettes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchColours();
  }, []);

  const fetchColours = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`http://localhost:3001/palettes?offset=${palettes.length}`);
      const data = await res.json(res);

      setPalettes(data);

      setIsLoading(false);
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/view" element={<Closeup palettes={palettes} setPalettes={setPalettes} isLoading={isLoading} setIsLoading={setIsLoading}/>}></Route>
        <Route path="/" element={<Home palettes={palettes} setPalettes={setPalettes} isLoading={isLoading} setIsLoading={setIsLoading}/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Pages


