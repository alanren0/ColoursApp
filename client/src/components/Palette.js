
// close up of palette
function Palette({ palette, animate, setAnimate, setIsToastVisible, setColour, forwards, editable, title, setTitle }) {

  // copy colour on click
  const handleOnClick = (colour) => {
    navigator.clipboard.writeText(`#${colour}`);
    setColour(colour);
    setIsToastVisible(true);
  }

  // for title input
  const handleText = (e) => {
    setTitle(e.target.value)
  }
  
  return (
    <div className="palette-container" >
        <div className="colour-container">
          {palette && <>
            {palette.Colours.map((colour, index) => {
              return (
                <div  
                  key={index}
                  onClick={() => handleOnClick(colour)}
                  className={`colour`} 
                  onAnimationEnd={() => setAnimate(false)}
                  style={{
                    backgroundColor: `#${colour}`,
                    animation: animate ? `bounce 1.2s ${forwards ? index*0.05 : 0.2 - index*0.05}s both` : "",
                    transformOrigin: "bottom center",
                  }}>
                  <p className="colour-text">#{colour}</p>
                </div>
              )
            })}
            <div className="title-box">
              {!editable  &&
                <h1>{palette.Title}</h1>
              }
              {editable &&
                <input type="text" value={title} placeholder="Title" onChange={handleText}/>
              }
            </div>
          </>}
      </div>
    </div>
  )
}

export default Palette;
