import { allGetted, created, updated } from './../Config/StatusCodeFunctions'
import { BASE_URL } from './../Config/BaseURL'
import axios from "axios"
import StatusCode from "status-code-enum"
import { found } from "../Config/StatusCodeFunctions"

const getConfig = { validateStatus: found }

const savePostConfig = { validateStatus: created }

const updatePutConfig = { validateStatus: updated }

const getAllConfig = { validateStatus: allGetted }

const myAxios = axios.create({ baseURL: `${BASE_URL}`})

export const getByIdGenerator = <T>(route: string, dataKey: string) => {
  const func = async (id: string): Promise<T | null> => {
    const { data, status } = await myAxios(`${route}/${id}`, getConfig)
    if(status !== StatusCode.RedirectFound)
      return null 
    return data[dataKey] as T
  }
  return func
}

export const saveGenerator = <T>(route: string) => {
  const func = async (newItem: T): Promise<boolean> => {
    console.log(newItem);
    const { status } = await myAxios.post(`${route}`, newItem, savePostConfig)
    return status === StatusCode.SuccessCreated
  }
  return func 
}

export const updateGenerator = <T>(route: string) => {
  const update = async (newItem: T): Promise<boolean> => {
    const { status } = await myAxios.put(`${route}`, newItem, updatePutConfig)
    return status === StatusCode.SuccessOK
  }
  return update
}

export const getAllGenerator = <T>(route: string, dataKey: string) => {
  const getAll = async (): Promise<T[] | null> => {
    const { data, status } = await myAxios.get(route, getAllConfig)
    if(status !== StatusCode.SuccessOK)
      return null 
    return data[dataKey] as T[]
  }
  return getAll
}
