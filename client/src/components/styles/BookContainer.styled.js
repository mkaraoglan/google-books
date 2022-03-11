import styled from 'styled-components';

export const StyledCard = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  & .book {
    position: relative;
    display: flex;
    height: 150px;
    margin: 10px;
    width: 400px;
    flex-grow: 1;
    background-color: aliceblue;
  }

  & img {
    border: 1px solid #dadce0;
    heigh: auto;
    width: 100px;
    object-fit: contain;
  }

  & .bookInfo {
    margin: 5px;
    display: inline-block;
  }

  & .bookInfo > p {
    font-size: small;
    width: 100%;
    text-align: left;
  }

  & .bookInfo > h6 {
    text-align: center;
  }

  & .bookmarkBtn {
    position: absolute;
    bottom: 5px;
    width: 150px;
    left: 100px;
    right: 0px;
    margin: auto;
  }
`;
