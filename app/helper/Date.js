export function formatDate(dates, format, divider) {
  date = new Date(dates)
  today = new Date()

  divider = (divider) ? divider : '/'

  monthNames = (format == 'month-char') ? [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ] : [
      "01", "02", "03",
      "04", "05", "06", "07",
      "08", "09", "10",
      "11", "12"
    ]

  day = ((today.getDate() == date.getDate()) && (today.getFullYear() == date.getFullYear()) && (today.getMonth() == date.getMonth())) ? "Hari ini" : date.getDate();
  monthIndex = date.getMonth();
  year = "20" + date.getFullYear().toString().substr(-2);
  hour = (date.getHours().toString().length == 1) ? "0" + date.getHours() : date.getHours()
  minute = (date.getMinutes().toString().length == 1) ? "0" + date.getMinutes() : date.getMinutes()

  if ((today.getDate() == date.getDate()) && (today.getFullYear() == date.getFullYear()) && (today.getMonth() == date.getMonth())) {
    fullDate = day + ", " + hour + ":" + minute
  } else {
    fullDate = day + " " + monthNames[monthIndex] + " " + year 
    // + ", " + hour + ":" + minute
  }

  return fullDate;
}

export function formatDatePicker(dates) {
  date = new Date(dates)

  monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ]

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + "-" + monthNames[monthIndex] + "-" + year;
}

export function formatTime(dates) {
  date = new Date(dates)

  var hour = date.getHours();
  var minute = date.getMinutes();

  return hour + ":" + minute;
}

export function CountingDate(end) {
  now = new Date()
  end = new Date(end)
  oneDay = 24 * 60 * 60 * 1000;

  diffDays = Math.round(Math.abs((now.getTime() - end.getTime()) / (oneDay)));

  return diffDays + " Hari Lagi"
}

export function CountAge(date) {
  today = new Date()

  monthNames = [
    "01", "02", "03",
    "04", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ]

  day = today.getDate();
  monthIndex = today.getMonth();
  month = monthNames[monthIndex]

  year = today.getFullYear();

  splitDate = date.split("-")
  diffMonth = month - splitDate[1]
  isMinus = Math.sign(diffMonth) !== -1
  monthDeduct = (isMinus ? parseInt(12 - parseInt(Math.abs(diffMonth))) : Math.abs(diffMonth))
  yearDeduct = (isMinus ? parseInt(year - 1) - splitDate[2] : year - splitDate[2])

  return yearDeduct
}
