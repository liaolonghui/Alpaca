export function toNonExponential(num) {
  num = new Number(num)
  const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)

  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}