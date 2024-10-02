import axios from 'axios'
const baseUrl = 'https://backend-crud-as-tutorial.onrender.com/api/notes'
app.use(express.static('dist'))
const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting ={
    id:1000,
    content:"This note is been deleted",
    important:true
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, update }