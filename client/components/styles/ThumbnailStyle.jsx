import styled from 'styled-components';

export const ThumbnailStyle = styled.img`
  width: 100px;
  margin: 5px;
  border-radius: 3px;
  user-drag: none;
  :active {
    transform: scale(0.95, 0.95)
  }
  :hover {
    box-shadow: 0 0 5px black;
    cursor: pointer;
  }

`