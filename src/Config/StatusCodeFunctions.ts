import StatusCode from "status-code-enum";

export const created = (status: number) => 
  status === StatusCode.ClientErrorNotAcceptable || status === StatusCode.SuccessCreated
