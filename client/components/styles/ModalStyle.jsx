import styled from 'styled-components';


export const ModalClose = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  font-size: 1.5em;
  border: none;
  font-weight: bold;
  :hover {
    color: red;
    cursor: url('https://professionalmorondotcom.files.wordpress.com/2018/11/blob.png?w=24') 12 12, auto;
    text-shadow: 0 0 2px black;
  };
  :active {
    outline: none;
    text-shadow: 0 0 5px black;
  };
  :focus {
    outline: none;
  }
`
export const ImageStyle = styled.img`
z-index: 3;
display: block;
margin: 3% auto;
margin-bottom: 20px;
width: 80%;
height: 80%;
object-fit: scale-down;
border-radius: 5px;
`