import { useState } from "react";
import HeaderTop from "./HeaderTop";

// header for the create page
function CreateHeader({handleSave, setMode, colourInput, setColourInput, fetchColours}) {

  const [modes, setModes] = useState([
    {val: "monochrome", selected: true},
    {val: "monochrome-dark", selected: false}, 
    {val: "monochrome-light", selected: false}, 
    {val: "analogic", selected: false}, 
    {val: "complement", selected: false}, 
    {val: "analogic-complement", selected: false}, 
    {val: "triad", selected: false}, 
    {val: "quad", selected: false}
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchColours();
  }

  const handleText = (e) => {
    let s = e.target.value
    while (s.charAt(0) === "#") {
      s = s.substring(1);
    }

    setColourInput(s)
  }

  const handleModes = (position) => {
    // mode didn't change
    if (modes[position].selected === true) {
      return;
    }

    // update selected mode
    const updated = modes.map((item, index) => {
      if (index === position) {
        return {
          val: item.val,
          selected: true
        };
      } else {
        return {
          val: item.val,
          selected: false
        };
      }
    })

    setMode(modes[position].val)
    setModes(updated); 
  }
  
  

  return (
    <div className="header">
      <HeaderTop text="Create a Palette!"/>
      <div className="create-header-container">

        {/* input colour form */}
        <div className="create-header-search">
          <div className="create-header-search-space"></div>
          <form onSubmit={handleSubmit}>
            <input type="text" value={colourInput} placeholder="hex colour eg. 2C80D3" onChange={handleText}/>
            <input type="submit" value="Create!"/>
          </form>
          <button onClick={handleSave}>Save</button>
          <div className="create-header-search-space"></div>
        </div>

        {/* modes buttons */}
        <div className="create-header-modes" style={{borderBottom: `3px solid #${colourInput}`}}>
          {modes.map((mode, index) => (
            <button key={mode.val} onClick={() => handleModes(index)} className={`header-button ${mode.selected ? "btn-selected": ""}`} style={{fontSize: "14px"}}>{mode.val}</button>
          ))}
        </div>

      </div>

      {/* empty space */}
      <div className="header-bottom-space"></div>
    </div>
  )
}

export default CreateHeader
