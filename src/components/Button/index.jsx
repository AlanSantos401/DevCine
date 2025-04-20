import { ButtonRed, ButtonWite } from "./styles";

function Button({children, red}) {
    return (
      <>
      if{ red ? ( 
        <ButtonRed>{children}</ButtonRed>
      ) : (
        <ButtonWite>{children}</ButtonWite>
      )} 
      </>
    )
}

export default Button;