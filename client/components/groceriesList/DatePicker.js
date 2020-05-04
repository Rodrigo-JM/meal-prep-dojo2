import React, {useState} from 'react'
import Calendar from 'react-calendar'

export const DatePicker = props => {
  const [date, setDate] = useState(new Date())

  const pastHauls = props.hauls.map(haul => {
    let date = toDateTime(haul.timestamp.seconds)

    date.setHours(0, 0, 0, 0)

    return date.getDate()
  })

  const checkForPastHauls = e => {
    return pastHauls.includes(e.date.getDate())
  }

  const onChange = date => {
    setDate(date)
    props.setDate(date)
    props.mapRequirements(date, true)
  }
  console.log(pastHauls)
  return (
    <div>
      <Calendar
        minDate={new Date()}
        tileDisabled={checkForPastHauls}
        onChange={onChange}
        value={date}
        className={['disabledNav']}
        showNavigation={false}
        tileClassName={['calendar-tile']}
      />
      {date.toString()}
    </div>
  )
}

function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}
