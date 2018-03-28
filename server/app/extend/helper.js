const crypto = require('crypto')

module.exports = {
  isEmptyObject (obj) {
    for (var key in obj) {
      return false
    }
    return true
  },
  getDateNoSign (date) {
    let mon = date.getMonth() + 1
    let day = date.getDate()
    day = day ? `0${day}` : day
    mon = mon ? `0${mon}` : mon
    return `${date.getFullYear()}${mon}${day}`
  },
  getTimeNoSign (date) {
    let hours = date.getHours()
    let min = date.getMinutes()
    let seconds = date.getSeconds()
    hours = hours < 9 ? `0${hours}` : hours
    min = min < 9 ? `0${min}` : min
    seconds = seconds < 9 ? `0${seconds}` : seconds
    return `${hours}${min}${seconds}`
  },
  getDateTimeNoSign (date) {
    return `${this.getDateNoSign(date)}${this.getTimeNoSign(date)}`
  }
}
