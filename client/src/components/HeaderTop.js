
import { Link } from 'react-router-dom'

// top header portion 
function HeaderTop({text}) {
  return (
    <div className="header-top">
      <p><Link to="/">Home</Link></p>
      <div className="header-spacer"><h3 style={{textAlign: "center", margin: "10px 0 10px 0"}}>{text}</h3></div>
      <p><Link to="/create">Create</Link></p>
    </div>
  )
}

export default HeaderTop