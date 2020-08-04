export default text => text
  .trim()
  .replace(/\n+/g, '\n') // Убрать несколько переносов строк подряд
  .replace(/ +/g, ' ') // Убрать двойные пробелы
