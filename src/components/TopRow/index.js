import {CellWrapper, RowInCell} from "../StyledComponents";

const TopRow = () => (
  <>
    {
      [...Array(7)].map((_, i) => (
        <CellWrapper isSelectedMonth key={i} isTopRow>
          <RowInCell />
        </CellWrapper>
      ))
    }
  </>
)

export { TopRow }