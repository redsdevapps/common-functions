export const hex = {
  enconde: (str:string) => str.split('').map(char => char.charCodeAt(0).toString(16)).join(''),
  decode: (str:string) => str.split(/(..)/).filter(char => char).map(char => String.fromCharCode(parseInt(char, 16))).join('')
}

export const capitalize = (word: string) => {
  return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
}