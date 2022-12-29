const fs = require('fs')

const generateFolderLogs = (dynamicFolder, path) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const folderPath = `./${dynamicFolder}/${path}/${year}/${month}/${date}/`
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true, mode: 0o755 })
      return {
        folderPath
      }
    }
    return {
      folderPath
    }
  } catch (error) {
    return error
  }
}

exports.captureLog = (options) => {
  try {
    const { folderPath } = generateFolderLogs('logs', options?.type)
    const finalPath = `${__dirname}/${folderPath}/${options?.file_name}`
    return fs.createWriteStream(finalPath, {
      flags: 'a',
      mode: 0o755
    })
  } catch (error) {
    return error
  }
}
