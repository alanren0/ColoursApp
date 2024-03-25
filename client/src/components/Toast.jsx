

function Toast({text, setIsToastVisible}) {
  return (
    <div className="toast" onAnimationEnd={() => setIsToastVisible(false)}>
      <p>{text}</p>
    </div>
  )
}

export default Toast