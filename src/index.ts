function isValid(date: Date) {
  return Object.prototype.toString.call(date) === '[object Date]'
    && !Number.isNaN(date.getTime())
}
function ask() {
  return prompt('When is your birthday?') as string
}

function parse(birthday: string): Date | null {
  console.log('birthday: ', {
    birthday,
    type: typeof birthday
  });

  let date = new Date(birthday)
  
  if (!isValid(date)) {
    throw new RangeError('Enter a date in the form YYYY/MM/DD')
  }

  return date
}

let date = parse(ask())

if (date) {
  console.info('Date is', date.toISOString())
} else {
  alert('Error parsing date for some reason')
}