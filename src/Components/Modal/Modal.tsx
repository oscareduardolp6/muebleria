import { FC } from "react"
import { createPortal } from "react-dom";
import { Column } from "../Column";
import { Row } from "../Row";
import Backdrop from "./Backdrop";
import { CloseButton } from "./CloseButton";
import RawModal from "./Modal/index"

const MyModal:FC = ({children}) => 
  <Backdrop>
    <RawModal>
      {children}
    </RawModal>
  </Backdrop>

export const Modal:FC<ModalProps> = ({portalId, isVisible, onClose, children}) => {
  const portalElement = document.getElementById(portalId) as HTMLElement;
  if(!isVisible) return <></>
  return (
    <div>
      {createPortal(
        <MyModal>
          <Row>
            <Column className='is-offset-10'>
              <CloseButton onClick={onClose}/>
            </Column>
          </Row>
          {children}
        </MyModal>, 
        portalElement 
      )}
    </div>
  )
}

export interface ModalProps {
  isVisible: boolean
  onClose: any
  portalId: string
}