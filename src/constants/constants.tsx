export const VerifyPassword = async (password:string) => {
  const requestData = {
    password,
  }

  try {
    const response = await fetch('https://www.remcode.net/gite/upload.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    const data = await response.json()
    console.log('Server response:', data)
  } catch (error) {
    console.error('Error uploading data:', error)
  }
}

export const SaveEdit = async (password:string,editingSection: number,setEditingSection: { (editingSection: number): void; (arg0: any): void; },data:any) => {
  setEditingSection(editingSection)
  const requestData = {
    password,
    editingSection,
    jsonData: data,
  }

  try {
    const response = await fetch('https://www.remcode.net/gite/upload.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    const data = await response.json()
    console.log('Server response:', data)
  } catch (error) {
    console.error('Error uploading data:', error)
  }
}

export const FetchData = async (url:string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching JSON data:', error)
  }
}