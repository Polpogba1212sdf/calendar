import {isFirstOrLastDayOfMonth, isSelectedMonth} from "../../helpers";
import {CellWrapper, RowInCell} from "../StyledComponents";
import styled from "styled-components";

const DayWrapper = styled.div`
  display: flex;
  padding: 5px 5px 0 5px;
`

const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;


const EventListItemWrapper = styled('li')`
	padding: 5px;
	margin: 5px;
	display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
`;

const WorldEventListItemWrapper = styled(EventListItemWrapper)`
  background-color: yellow;
`;

const EventItemWrapper = styled('button')`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 159px;
  border: unset;
  color: #6d6d6d;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: white;
`;

const MonthInCell = styled.div`
  margin-right: 3px;
`

const EventsNumber = styled.span`
  margin-left:3px;
  font-weight: normal;
  font-size: 15px;
  color: darkgray;
`

const LabelsWrapper = styled.div`
  display: flex;
`

const LabelWrapper = styled.div`
  height: 10px;
  width: 40px;
  background-color: ${({color}) => color};
  border-radius: 40px;
  &:not(:last-child){
    margin-right: 2px;
  }
`

export const CalendarCell = ({dayItem, today, openFormHandler, events, worldEvents}) => {

  return (
    <CellWrapper
      isSelectedMonth={isSelectedMonth(dayItem, today)}
      onDoubleClick={() => openFormHandler('Create', null, dayItem)}
    >
      <RowInCell
        justifyContent={'flex-end'}
      >
        <DayWrapper>
          {isFirstOrLastDayOfMonth(dayItem) ? <MonthInCell>{dayItem.format('MMM')}</MonthInCell> : null}
          {dayItem.format('D')}
          {!!events.length ?
            <div>
              <EventsNumber>{events.length}</EventsNumber>
              <EventsNumber>{events.length === 1 ? 'card' : 'cards'}</EventsNumber>
            </div> : null
          }
        </DayWrapper>
        <EventListWrapper>
          {
            worldEvents
              .map((event, key) =>
                <WorldEventListItemWrapper
                  key={key}
                >
                  <EventItemWrapper>
                    {event.name}
                  </EventItemWrapper>
                </WorldEventListItemWrapper>
              )
          }
        </EventListWrapper>
        <EventListWrapper>
          {
            events
              .map(event =>
                <EventListItemWrapper
                  key={event.id}
                  onDoubleClick={e => {e.stopPropagation(); openFormHandler('Update', event)}}
                >
                  <LabelsWrapper>
                    {event.labels?.map((label, i) => <LabelWrapper color={label} key={i}></LabelWrapper>)}
                  </LabelsWrapper>
                    <EventItemWrapper>
                      {event.title}
                    </EventItemWrapper>
                </EventListItemWrapper>
              )
          }
        </EventListWrapper>
      </RowInCell>
    </CellWrapper>
  )
}