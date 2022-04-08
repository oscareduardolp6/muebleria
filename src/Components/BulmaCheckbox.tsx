import { FC } from "react";

export const BulmaCheckbox: FC<BulmaCheckboxProps> = ({children, className = 'has-text-primary is-size-5'}) => 
  <label className='checkbox'></label>

interface BulmaCheckboxProps{
  className?: string
}
