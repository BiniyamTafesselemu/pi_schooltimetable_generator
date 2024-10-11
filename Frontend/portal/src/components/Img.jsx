import React from 'react'

const Img =({className, src, alt = "background image", ...restProps}) => {
  return (
    <img className={className} src={src} alt = {alt} {...restProps} loading={"lazy"}/>
  )
}

export default Img;
