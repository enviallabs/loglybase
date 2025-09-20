export default function useUpload() {
  const uploadFile = async (file: File): Promise<string> => {
    const { uploadUrl, publicUrl } = await $fetch('/api/storage/upload', {
      method: 'POST',
      body: {
        filename: file.name,
        contentType: file.type,
      },
    })

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    })

    return publicUrl
  }

  const deleteFile = async (url: string): Promise<void> => {
    const fileName = url.split('/').pop()

    await $fetch('/api/storage/delete', {
      method: 'POST',
      body: {
        fileName,
      },
    })
  }

  return {
    uploadFile,
    deleteFile,
  }
}
