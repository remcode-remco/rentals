const apiUrl = 'http://localhost:8000/php/'
const url_upload = apiUrl + 'upload.php'
const url_get_json = apiUrl + 'get_json.php?language='

export const VerifyPassword = async (password:string) => {
  const requestData = {
    password,
  }

  try {
    const response = await fetch(url_upload, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error uploading data:', error)
  }
}

export const SaveEdit = async (language:string,password:string|null,editingSection: number,data:any) => {
  if (password) {
    const requestData = {
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
        body: JSON.stringify(requestData),
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