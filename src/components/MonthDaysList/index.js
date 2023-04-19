import {CalendarCell} from "../CalendarCell";
import {isDayContainCurrentEvent} from "../../helpers";

export const MonthDaysList = ({startDay, totalDays, events, openFormHandler, today, setEvents, worldEvents}) => {
  let day = startDay.clone().subtract(1, 'day')
  const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())

  return (
    <>
      {
        daysMap.map(dayItem => (
          <CalendarCell
            setEvents={setEvents}
            key={dayItem.unix()}
            dayItem={dayItem}
            today={today}
            openFormHandler={openFormHandler}
            events={events.filter(event => isDayContainCurrentEvent(event, dayItem))}
            worldEvents={worldEvents.filter(event => {
              const dateArray = event.date.split("-");
              const eventDate= new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
              const eventDateTimeStamp = eventDate.getTime() / 1000
              return eventDateTimeStamp >= dayItem.format('X') && eventDateTimeStamp <= dayItem.clone().endOf('day').format('X')
            })}
          />
        ))
      }
    </>
  )
}