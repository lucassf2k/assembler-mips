class BaseConverter {
  #number;
  #size = 0;
  #baseFrom;
  #baseTo;

  constructor(number, size, baseFrom, baseTo) {
    this.#number = number
    this.#size = size
    this.#baseFrom = baseFrom
    this.#baseTo = baseTo
  }

  #baseConveter() {
    const binary = parseInt(this.#number, this.#baseFrom).toString(this.#baseTo)
    const calculatedSize = (this.#size - binary.length) < 0 ? 0 : (this.#size - binary.length)
    const zeroLeft = this.#size ? '0'.repeat(calculatedSize) : ''

    return `${zeroLeft}${binary}`
  }

  toConvertBinToDec() {
    if (number < 0) {
      return this.#findTwoscomplement(this.#baseConveter())
    }

    return this.#baseConveter()
  }

  #findTwoscomplement(str) {
    let size = str.length

    let i
    for (i = size - 1; i >= 0; i--) {
      if (str.charAt(i) === '1') {
        break
      }
    }

    if (i == -1) {
      return '1'.concat(str)
    }

    let k
    for (k = i - 1; k >= 0; k--) {
      if (str.charAt(k) === '1') {
        str = str.substring(0,k) + '0' + str.substring(k+1, str.length)
      } else {
        str = str.substring(0, k)+ '1' + str.substring(k+1, str.length)
      }
    }

    return str.toString()
  }
}

export { BaseConverter }
