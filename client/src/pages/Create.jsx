import { useEffect, useState } from "react"
import CreateHeader from "../components/CreateHeader";
import Palette from "../components/Palette";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";


function Create() {

  const [title, setTitle] = useState("")
  const [palette, setPalette] = useState();
  const [animate, setAnimate] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [colour, setColour] = useState("");
  const [colourInput, setColourInput] = useState("");
  const [mode, setMode] = useState("");
  const [saveMsg, setSaveMsg] = useState("");


  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector('body').style.height = '100%';
    document.querySelector('html').style.height = '100%';
    document.querySelector('#root').style.height = '100%';
  }, [navigate]);

  useEffect(() => {
    setAnimate(true);
  }, [palette]);

  useEffect(() => {
    fetchInitial();
  }, []);

  const fetchInitial = async () => {
    try {
      const res = await fetch(`https://www.thecolorapi.com/scheme?hex=2C80D3&format=json&mode=monochrome&count=4`);

      const data = await res.json();

      // make data of just colours
      const temp = []
      temp.push(data.seed.hex.clean)
      for (let i = 0, n=data.colors.length; i < n; i++) {
        temp.push(data.colors[i].hex.clean);
      }

      setPalette({
        Title: title,
        Colours: temp
      });
    } catch(err) {
      console.error("Error:", err)
    }
  }

  const fetchColours = async () => {
    if (colourInput === "") {
      return
    }

    try {
      const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${colourInput}&format=json&mode=${mode}&count=4`);

      const data = await res.json();

      // make data of just colours
      const temp = []
      temp.push(data.seed.hex.clean)
      for (let i = 0, n=data.colors.length; i < n; i++) {
        temp.push(data.colors[i].hex.clean);
      }

      setPalette({
        Title: title,
        Colours: temp
      });
    } catch(err) {
      console.error("Error:", err)
    }

  }

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3001/palettes/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Title: title,
            Colours: palette?.Colours
          })
      });
      
      // toast message
      if (res.ok) {
        setSaveMsg(`Created palette: ${title}`)
      } else {
        setSaveMsg("Unable to create palette")
      }

      setSavedToast(true);
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <>
      <CreateHeader 
        handleSave={handleSave}
        colourInput={colourInput}
        setColourInput={setColourInput}
        setMode={setMode}
        fetchColours={fetchColours}
      />

      {palette &&
        <Palette 
          palette={palette} 
          animate={animate} 
          setAnimate={setAnimate} 
          setIsToastVisible={setIsToastVisible} 
          setColour={setColour} 
          forwards={true}
          editable={true}
          title={title}
          setTitle={setTitle}
        />
      }

      {isToastVisible && colour &&
        <Toast text={`#${colour} copied to clipboard`} setIsToastVisible={setIsToastVisible}/>
      }

      {savedToast && 
        <Toast text={saveMsg} setIsToastVisible={setSavedToast}/>
      }

    </>
  )
}

export default Create