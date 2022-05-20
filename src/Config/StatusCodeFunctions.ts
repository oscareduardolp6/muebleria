import StatusCode from "status-code-enum";

export const created = (status: number) => 
  status === StatusCode.ClientErrorNotAcceptable || status === StatusCode.SuccessCreated

export const found = (status: number) => 
  status === StatusCode.ClientErrorNotFound || status === StatusCode.RedirectFound

export const updated = (status: number) => 
  status === StatusCode.SuccessOK || status === StatusCode.ClientErrorNotFound

export const allGetted = (status: number) => 
  status === StatusCode.SuccessOK || status === StatusCode.ClientErrorNotFound 