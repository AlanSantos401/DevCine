import { ButtonRed, ButtonWite } from "./styles";

function Button({children, red, ...props }) {
    return (
      <>
      if{ red ? ( 
        <ButtonRed {...props}>{children}</ButtonRed>
      ) : (
        <ButtonWite {...props}>{children}</ButtonWite>
      )} 
      </>
    )
}

export default Button;