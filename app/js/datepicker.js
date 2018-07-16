import $ from 'jquery'

const months = '一|二|三|四|五|六|七|八|九|十|十一|十二'.split('|').map(item => item.concat('月'))

const monthsHtml = `
<div class="row">
  <div class="item">一月</div>
  <div class="item">二月</div>
  <div class="item">三月</div>
</div>
<div class="row">
  <div class="item">四月</div>
  <div class="item">五月</div>
  <div class="item">六月</div>
</div>
<div class="row">
  <div class="item">七月</div>
  <div class="item">八月</div>
  <div class="item">九月</div>
</div>
<div class="row">
  <div class="item">十月</div>
  <div class="item">十一月</div>
  <div class="item">十二月</div>
</div>
`

class DatePicker {
  constructor (...options) {
    let defaulOptions = {
      format: 'YYYY-MM-DD',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      mode: ['year', 'month', 'date'][2]
    }

    // this.options = { ...defaulOptions, ...options }
    this.options = Object.assign(defaulOptions, options)
    this.init()
  }

  init () {
    let { year, month } = this.options
    let _lastDay = this.getLastDay(year, month)
    console.log('当月最后一天', _lastDay)

    this.calendar = $('.z-datepicker-wrapper')
    this.initCalendarHeader()
    this.initMonthCalendar()
    this.initEvent()
  }

  initEvent () {
    this.calendar.on('click', '.z-header .current', e => {
      if (this.options.mode === 'date') {
        // TODO: 生成12个月份的宫格
        $('.z-body').html(monthsHtml)
        this.options.mode = 'month'
        this.initCalendarHeader()
      }
    })
  }

  getLastDay (year, month) {
    return new Date(year, month, 0).getDate()
  }

  getDayInWeek (year, month, date) {
    return new Date(year, month - 1, date).getDay()
  }

  initCalendarHeader () {
    let { year, month, date, mode } = this.options

    if (mode === 'date') {
      $('.z-header .current').text(`${year}-${month}`)
    } else if (mode === 'month') {
      $('.z-header .current').text(`${year}`)
    }
  }

  initMonthCalendar () {
    let aDates = this.getMonthCalendarData()
    console.log(aDates)
    let rows = Math.ceil(aDates.length / 7)

    for (let row = 0; row < rows; row++) {
      // let frag = document.createDocumentFragment()
      let $row = $('<div class="row"></div>')

      for (let col = 0; col < 7; col++) {
        $row.append(`<div class="item">${aDates[row * 7 + col] || ''}</div>`)
      }
      $('.z-body').append($row)
    }

  }

  getMonthCalendarData () {
    let { year, month, date } = this.options
    let _firstDayInWeek = this.getDayInWeek(year, month, 1)
    let _lastDay = this.getLastDay(year, month)
    let prevDays = _firstDayInWeek

    let aDates = Array.from({ length: _lastDay },(v, k)=>k + 1)

    while (prevDays--) {
      aDates.unshift(0)
    }

    let restDays = 7 - (aDates.length % 7)
    if (restDays < 7) {
      while (restDays--) {
        aDates.push(0)
      }
    }

    return aDates

  }


}

export default DatePicker
