import HeaderTop from "./HeaderTop"

// homepage header
function HomeHeader() {

  return (
    <div className="header" style={{position: "sticky", top: 0}}>
      <HeaderTop text="Explore Colour Palettes!"/>      
      <div className="header-buttons-container">
      </div>
      <div className="header-bottom-space"></div>
    </div>
  )
}

export default HomeHeader