import moment from "moment/moment";
import {CellWrapper, RowInCell} from "../StyledComponents";

const CalendarGridHeader = () => (
  <>
    {
      [...Array(7)].map((_, i) => (
        <CellWrapper isHeader key={i}>
          <RowInCell isHeader pr={1}>
            {moment().day(i).format('ddd')}
          </RowInCell>
        </CellWrapper>
      ))
    }
  </>
)

export { CalendarGridHeader }