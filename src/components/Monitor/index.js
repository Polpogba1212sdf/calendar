import styled from "styled-components";
import {selectOptions, SelectWrapper} from "../App";
import {useState} from "react";
import {MultiSelect} from "react-multi-select-component";
import {EventTitle} from "../StyledComponents";
import {url} from '../App/index'
import html2canvas from 'html2canvas';

const DivWrapper = styled('div')`
  display: flex;
  align-items: center;
  background-color: #ecf0f3;
  color: black;
  padding: 16px;
`

const TextWrapper = styled('span')`
  font-weight: bold;
  font-size: 18px;
`

const TitleWrapper = styled(TextWrapper)`
  margin-right: 8px;
`

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`

const CurrentMonthAndYear = styled('div')`
  margin-left: 400px;
`

const ButtonWrapper = styled('button')`
  border: unset;
  background-color: #dee2e5;
  height: 24px;
  width: 37px;
  margin-right: 4px;
  border-radius: 4px;
  color: black;
  padding: 3px;
  cursor: pointer;
`

const ButtonWrapperDown = styled(ButtonWrapper)`
  transform: rotate(-180deg);
`

const TodayButton = styled(ButtonWrapper)`
  padding: 0 6px;
  font-weight: bold;
  width: 60px;
`

const EventSearch = styled(EventTitle)`
  width: 250px;
`

const InputFile = styled(EventTitle)`
  padding-right: 359px;
`

const SearchButton = styled(TodayButton)`
  padding: 0 6px;
  font-weight: bold;
  width: 60px;
  margin-left: 10px;
  margin-top: 5px;
`


const Monitor = ({today, prevHandler, todayHandler, nextHandler, events, setEvents}) => {
  const [search, setSearch] = useState('')
  const [labels, setLabels] = useState([]);
  const searchHandler = (value) => {
    setSearch(value)
  }

  const searchClickHandler = () => {
    fetch(`${url}/events?q=${search}`)
      .then(res => res.json())
      .then(res => {
        setEvents(res)
      })
  }

  const filterByLabels = () => {
    setEvents(events.filter(event => {
      let isEqual = false
      labels.forEach(label => {
        if (event.labels.includes(label.value)) {
          isEqual = true
        }
      })
      return isEqual;
    }));
  }

  const exportToFile = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(events)], {type: 'application/json'}));
    a.download = "calendar.json";
    a.click();
  }

  const importFromFile = () => {
    let file = document.getElementById('import').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      setEvents(JSON.parse(reader.result).events)
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
  }

  const downloadScreen = () => {
    html2canvas(document.querySelector('#app')).then(canvas => {
      const link = document.createElement('a');
      if (typeof link.download === 'string') {
        link.href = canvas.toDataURL();
        link.download = 'calendar.png';
        link.click();
      }
    });
  }

  return(
    <DivWrapper>
      <div id='q'></div>
      <ButtonsWrapper>
        <TodayButton onClick={todayHandler}>today</TodayButton>
        <ButtonWrapper onClick={prevHandler}> ^ </ButtonWrapper>
        <ButtonWrapperDown onClick={nextHandler}> ^ </ButtonWrapperDown>
      </ButtonsWrapper>
      <EventSearch
        value={search}
        onChange={e => searchHandler(e.target.value)}
        placeholder="Search"
      />
      <SearchButton onClick={searchClickHandler}>search</SearchButton>
      <SelectWrapper>
        <MultiSelect
          options={selectOptions}
          value={labels}
          onChange={setLabels}
          labelledBy="Select"
        />
      </SelectWrapper>
      <SearchButton onClick={filterByLabels}>Filter</SearchButton>
      <SearchButton onClick={exportToFile}>Export</SearchButton>
      <SearchButton onClick={importFromFile}>Import</SearchButton>
      <InputFile type="file" id="import" name="import" accept="image/png, image/jpeg, json" />
      <SearchButton onClick={downloadScreen}>Screen</SearchButton>
      <CurrentMonthAndYear>
        <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
        <TextWrapper>{today.format('YYYY')}</TextWrapper>
      </CurrentMonthAndYear>
    </DivWrapper>
  )
}

export { Monitor }