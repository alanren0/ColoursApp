import { useEffect, useState } from "react";
import PaletteList from "../components/PaletteList"
import HomeHeader from "../components/HomeHeader";
import { useNavigate } from "react-router-dom";


function Home({ palettes, setPalettes, isLoading, setIsLoading}) {

  const [isEnd, setIsEnd] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector('body').removeAttribute("style");
    document.querySelector('html').removeAttribute("style");
    document.querySelector('#root').removeAttribute("style");
  }, [navigate]);

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

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || isEnd) {
      return;
    }
    fetchColours();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <>
      <HomeHeader/>
      <PaletteList palettes={palettes}/>
      {isLoading && <p>Loading...</p>}
      {isEnd && <p>End of list</p>}
    </>
  )
}

export default Home

