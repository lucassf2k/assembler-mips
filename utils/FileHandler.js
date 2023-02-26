import { open, writeFile } from 'node:fs/promises'

class FileHandler {
  #filename
  #usefulLines
  constructor(filename) {
    this.#filename = filename
  }

  async read() {
    let fileHandle

    try {
      fileHandle = await open(this.#filename, 'r')
      const file = await fileHandle.readFile({ encoding: 'utf-8' })
      this.#usefulLines = file.split('\n').filter((line) => line.trim())
      fileHandle?.close()
    } catch (err) {
      console.log(err)
      fileHandle?.close()
    }

    return usefulLines
  }

  async write(data) {
    try {
      await writeFile(data)
    } catch (err) {
      console.log(err)
    }
  }

  formatFile() {
    let mountFile = []
    let hasRegister = true
    let str = ''

    this.#usefulLines.forEach((line) => {
      const lineInChar = line.split('')

      for (let i = 0; i < lineInChar.length; i++) {
        if (
          lineInChar[i] == '$' &&
          !(lineInChar[i+1] == 't' || lineInChar[i+1] == 's')
        ) {
          hasRegister = false
        }

        if (lineInChar[i] == '\t') {
          str += ' '
        } else if (lineInChar[i] == ',' && !(lineInChar[i+1] == ' ')) {
          str += ', '
        } else if (lineInChar[i] == '\r' || lineInChar[i] == '\r\n') {
          str += '\n'
        } else {
          str += lineInChar[i]
        }

        mountFile.push(str)
        str = ''
      }
    })

    return [mountFile, hasRegister]
  }

  getLabelsTable() {
    let labelsTable = []

    this.#usefulLines.forEach((line, index) => {
      if (line.includes(':')) {
        labelsTable.push({ 
          label: line.trim().split(' ')[0].split(':')[0],
          line: index,
        })
      }
    })

    return labelsTable
  }
}

export { FileHandler }
