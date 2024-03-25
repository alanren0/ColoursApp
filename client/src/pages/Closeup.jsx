
import Header from '../components/Header'
import Palette from '../components/Palette'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Toast from '../components/Toast';

function Closeup({ palettes, setPalettes, isLoading, setIsLoading }) {

  const location = useLocation()

  const { start } = location.state || {start: 0}
  
  const [isEnd, setIsEnd] = useState(false);
  const [index, setIndex] = useState(start || 0);
  const [animate, setAnimate] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [colour, setColour] = useState("");
  
  const [forwards, setForwards] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    // set height so colours extend through whole page
    document.querySelector('body').style.height = '100%';
    document.querySelector('html').style.height = '100%';
    document.querySelector('#root').style.height = '100%';
  }, [navigate]);

  useEffect(() => {
    // get more colours if nearing end of array
    if (index > palettes.length - 5 && !isLoading && !isEnd) {
      fetchColours();
    }
  }, [index]);

  useEffect(() => {
    // replay toast animation when different colour is selected
    setIsToastVisible(false);
    setTimeout(() => {
      setIsToastVisible(true);
    }, 10);
  }, [colour]);

  const fetchColours = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`http://localhost:3001/palettes?offset=${palettes.length}`);
      const data = await res.json(res);

      if (!data) {
        setIsEnd(true)
        setIsLoading(false);
        return
      }

      setPalettes([...palettes, ...data]);
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <>
      <Header 
        index={index} 
        setIndex={setIndex} 
        animate={animate} 
        setAnimate={setAnimate} 
        setForwards={setForwards} 
        palettes={palettes}
      />

      <Palette 
        palette={palettes[index]} 
        animate={animate} 
        setAnimate={setAnimate} 
        setIsToastVisible={setIsToastVisible} 
        setColour={setColour} 
        forwards={forwards}
      />

      {isToastVisible && colour &&
        <Toast text={`#${colour} copied to clipboard`} setIsToastVisible={setIsToastVisible}/>
      }
      
    </>
  )
}

export default Closeup

