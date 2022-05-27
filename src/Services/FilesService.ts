import axios from "axios"
import { BASE_URL } from "../Config/BaseURL"

const myAxios = axios.create({ baseURL: `${BASE_URL}/files`})

export const loadFileToServer = (selectedFiles: File) => {
  const formData = new FormData()
  formData.append('file', selectedFiles)
  console.log('Enviando');
  console.log();
  
  myAxios
    .post('', formData)
    .then(res => alert('archivo cargado con éxito'))
    .catch(error => alert('Problema al cargar el archivo'))
}