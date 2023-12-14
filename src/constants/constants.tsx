export const apiUrl = 'http://localhost:8000/php/'
const url_upload = apiUrl + 'upload.php'
const url_delete = apiUrl + 'delete_image.php'
const url_get_json = apiUrl + 'get_json.php?language='

export const VerifyPassword = async (password:string) => {
  const dataSending = {
    password,
  }

  try {
    const response = await fetch(url_upload, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSending),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error uploading data:', error)
  }
}

export const SaveEdit = async (language:string,password:string|null,editingSection: number,data:any) => {
  if (password) {
    const dataSending = {
      language,
      password,
      editingSection,
      jsonData: data,
    }

    try {
      const response = await fetch(url_upload, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSending),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error uploading data:', error)
    }
  }
}

export const DeleteImage = async (password:string|null,filename:string) => {
  if (password) {
    const dataSending = {
      password,
      filename
    }

    try {
      const response = await fetch(url_delete, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSending),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error uploading data:', error)
    }
  }
}

export const FetchData = async (language:string) => {
  let url = url_get_json + language
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching JSON data:', error)
  }
}