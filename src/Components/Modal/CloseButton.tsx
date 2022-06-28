import { HTMLButtonProps } from "../../Types/TypesAliases";

export const CloseButton = (buttonProps: HTMLButtonProps) => 
  <>
    <button className="button is-danger is-outlined" {...buttonProps}>
      <span>Cerrar</span>
    </button>
  </>
  