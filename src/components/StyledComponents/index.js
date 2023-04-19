import styled from "styled-components";

export const CellWrapper = styled.div`
  min-height: ${({isHeader}) => isHeader ? 24 : 100}px;
  min-height: ${({isTopRow}) => isTopRow && 10}px;
  min-width: 180px;
  background-color: ${({isHeader}) => isHeader ? '#ecf0f3' : '#e2e6e9'};
  color: ${({isSelectedMonth}) => isSelectedMonth ? '#34383b' : '#8c9093'};
  ${({isSelectedMonth}) => isSelectedMonth && 'font-weight: bold'};
  cursor: pointer;
`

export const RowInCell = styled.div`
  display: flex;
  flex-direction: ${({isHeader}) => isHeader ? 'row' : 'column'};
  justify-content: center;
  ${({pr}) => pr && `padding-right: ${pr * 8}px`}
`

export const EventTitle = styled('input')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;