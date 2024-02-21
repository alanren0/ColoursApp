import { Link } from "react-router-dom"

// small version of palette on home screen
function PalettePreview({ palette, index }) {
  return (
    <div className="preview-container">
      <Link to={`/view`} state={{ start: index}}>
        <h2>{palette.Title}</h2>

        <div className="preview-colour-container">
          {palette.Colours.map((colour, index) => (
            <div key={index} className="preview-colour" style={{backgroundColor: "#" + colour}}></div>
          ))}
        </div>
      </Link>
    </div>
  )
}

export default PalettePreview