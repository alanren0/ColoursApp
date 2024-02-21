
import HeaderTop from "./HeaderTop";

// header for the close up page
function Header({ index, setIndex, animate, setAnimate, setForwards, palettes }) {

  const handleNext = () => {
    setIndex(index + 1);
    setAnimate(true);
    setForwards(true);
  }

  const handlePrev = () => {
    setIndex(index - 1);
    setAnimate(true);
    setForwards(false);
  }

  return (
    <div className="header">
      <HeaderTop text="Explore Colour Palettes!"/>
      <div className="header-buttons-container">
        <button className="header-button" disabled={animate || index === 0} onClick={() => handlePrev()}>&lt; Prev</button>
        <button className="header-button" disabled={animate || index === palettes.length - 1} onClick={() => handleNext()}>Next &gt; </button>
      </div>
      <div className="header-bottom-space"></div>
    </div>
  )
}

export default Header