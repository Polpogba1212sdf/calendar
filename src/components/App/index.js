import moment from "moment";
import {CalendarGrid} from "../CalendarGrid";
import {Monitor} from "../Monitor";
import styled from "styled-components";
import {Title} from "../Title";
import {useEffect, useState} from "react";
import {MultiSelect} from "react-multi-select-component";
import {EventTitle} from "../StyledComponents";

const ShadowWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`

const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgb(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  height: 500px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow: unset;
`

export const EventBody = styled('textarea')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

export const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonWrapper = styled('button')`
  color: ${({danger}) => danger ? '#f00' : '#27282A'};
  border: 1px solid ${({danger}) => danger ? '#f00' : '#27282A'};
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
`;

export const SelectWrapper = styled('div')`
  padding: 8px 14px;
  color: black;
`;

export const LabelWrapper = styled('label')`
  color: white;
  margin-right: 5px;
`;

export const url = process.env.API_URL ? process.env.API_URL : 'http://localhost:3001'
const totalDays = 49
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X')
}
export const selectOptions = [
  { label: "Green", value: "green" },
  { label: "Orange", value: "orange" },
  { label: "Yellow", value: "yellow" },
  { label: "Blue", value: "blue" },
  { label: "Aqua", value: "aqua" },
];

function App() {
  const [today, setToday] = useState(moment())
  const startDay = today.clone().startOf('month').startOf('week')

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'))

  const todayHandler = () => setToday(moment())
  const nextHandler = () => {setToday(today.clone().add(1, 'month'))}

  const [method, setMethod] = useState(null)
  const [labels, setLabels] = useState([]);
  const [isShowForm, setShowForm] = useState(false)
  const [event, setEvent] = useState(null)
  const [events, setEvents] = useState([])
  const [worldEvents, setWorldEvents] = useState([])
  const startDateQuery = startDay.clone().format('X')
  const endDateQuery = startDay.clone().add(totalDays, 'days').format('X')

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then(res => res.json())
      .then(res => {
        fetch(`https://date.nager.at/api/v3/NextPublicHolidaysWorldwide`)
          .then(resp => resp.json())
          .then(resp => {
            console.log(res);
            console.log(resp);
            setWorldEvents(resp)
          })
        setEvents(res)
      })

  }, [today])

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setShowForm(true)
    setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')})
    setMethod(methodName)
  }

  const cancelButtonHandler = () => {
    setShowForm(false)
    setEvent(null)
  }

  const changeEventHandler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }

  const eventFetchHandler = () => {
    const valuesFromLabels = labels.map(({value}) => value)
    const eventWithLabels = {...event, labels: valuesFromLabels}
    const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';
    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventWithLabels)
    })
      .then(res => res.json())
      .then(res => {
        if(method === 'Update') {
          setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl) )
        } else {
          setEvents(prevState => [...prevState, {...res, order: res.id}])
        }
        cancelButtonHandler()
      })
  }

  const removeEventHandler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = 'Delete';
    fetch(fetchUrl, {
      method: httpMethod
    })
      .then(res => res.json())
      .then(_ => {
        setEvents(prevState => prevState.filter(({id}) => id !== event.id))
        cancelButtonHandler()
      })
  }

  return (
    <div id="app">
      {
        isShowForm ? (
          <FormPositionWrapper onClick={cancelButtonHandler}>
            <FormWrapper onClick={e => e.stopPropagation()}>
              <EventTitle
                value={event.title}
                onChange={e => changeEventHandler(e.target.value, 'title')}
                placeholder="Title"
              />
              <EventBody
                value={event.description}
                onChange={e => changeEventHandler(e.target.value, 'description')}
                placeholder="Description"
              />
              <SelectWrapper>
                <LabelWrapper htmlFor="labels">Label color:</LabelWrapper>
                <MultiSelect
                  options={selectOptions}
                  value={labels}
                  onChange={setLabels}
                  labelledBy="Select"
                />
              </SelectWrapper>
              <ButtonsWrapper>
                <ButtonWrapper onClick={cancelButtonHandler}>Cancel</ButtonWrapper>
                <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                {method === 'Update' ? <ButtonWrapper danger onClick={removeEventHandler}>Remove</ButtonWrapper> : null}
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
        ) : null
      }
      <ShadowWrapper className="App">
        <Title />
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          events={events}
          setEvents={setEvents}
        />
        <CalendarGrid
          startDay={startDay}
          today={today}
          totalDays={totalDays}
          events={events}
          setEvents={setEvents}
          openFormHandler={openFormHandler}
          worldEvents={worldEvents}
        />
      </ShadowWrapper>
    </div>
  );
}

export default App;
