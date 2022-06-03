import { FC } from "react";

export const RouteTitle:FC = ({children}) => (
  <>
    <h1 className="title is-1 mt-5 ml-6 has-text-primary">{children}</h1>
    <hr className='mx-6' />
  </>
)

