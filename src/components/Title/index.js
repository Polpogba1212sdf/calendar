import styled from "styled-components";

const DivWrapper = styled('div')`
  background-color: #fc9200;
  height: 28px;
  color: white;
  padding: 5px;
`

const Title = () => {
  return(
    <DivWrapper>
      Calendar
    </DivWrapper>
  )
}

export { Title }