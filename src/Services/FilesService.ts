import axios from "axios"
import { BASE_URL } from "../Config/BaseURL"

const myAxios = axios.create({ baseURL: `${BASE_URL}/files`})

export const loadFileToServer = async (selectedFiles: File) => {
  if(!selectedFiles) return
  const formData = new FormData()
  formData.append('file', selectedFiles)
  myAxios
    .post('', formData)
    .then(res => alert('archivo cargado con éxito'))
    .catch(error => alert('Problema al cargar el archivo'))
}