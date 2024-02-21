import PalettePreview from "./PalettePreview"


function PaletteList({palettes}) {
  return (
    <>
      {palettes && <>
        {palettes.map((palette, index) => (
          <PalettePreview key={palette.Id} palette={palette} index={index}/>
        ))}
      </>}
    </>
  )
}

export default PaletteList