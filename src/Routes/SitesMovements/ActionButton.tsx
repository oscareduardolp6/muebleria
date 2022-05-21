import { CSSProperties, FC } from "react";
import { Button } from "../../Components/Button";
import { InputButtonProps } from "../../Types/TypesAliases";

const actionButtonStyle: CSSProperties = { paddingBottom: '2em' }

export const ActionButton:FC<InputButtonProps> = ({ className, children, ...rest}) => 
<Button
  className={`column is-1 ${className}`}
  style={actionButtonStyle} 
  {...rest}>
    { children }
</Button>