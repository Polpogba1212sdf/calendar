import styled from "styled-components";
import {CalendarGridHeader} from "../CalendarGridHeader";
import {MonthDaysList} from "../MonthDaysList";
import {TopRow} from "../TopRow";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${({isHeader}) => isHeader ? '#ecf0f3' : '#edf1f4'};
  border-bottom: ${({isTopRow}) => isTopRow && '1px solid #edf1f4'};
`

const CalendarGrid = ({startDay, today, totalDays, events, openFormHandler, setEvents, worldEvents}) => {
  return(
    <>
      <GridWrapper isHeader>
        <CalendarGridHeader />
      </GridWrapper>
      <GridWrapper isHeader isTopRow>
        <TopRow />
      </GridWrapper>
      <GridWrapper>
        <MonthDaysList
          startDay={startDay}
          totalDays={totalDays}
          events={events}
          openFormHandler={openFormHandler}
          today={today}
          setEvents={setEvents}
          worldEvents={worldEvents}
        />
      </GridWrapper>
    </>
  )
}



export { CalendarGrid }