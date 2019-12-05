import React from 'react';
import axios from 'axios';

/* import styles */
import { AppStyle } from './styles/AppStyle.jsx'

/* import components */
import { MainImage } from './MainImage.jsx';
import { Carousell } from './Carousell.jsx'
import { ImageModal } from './ImageModal.jsx';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      image: '',
      showModal: false
    }
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
  }

  /* Once components are mounted,
     retrieve images from database */
  componentDidMount() {
    const productIds = [
      'BES870XL',
      'IVFWCT242DBWH',
      'TOB-135N'
    ]
    var random = Math.floor(Math.random() * productIds.length)

    var ID = productIds[random];
    axios.get('/images' + ID)
    .then(({ data }) => {
      this.setState({
        images: data,
        image: data[0]
      });
    });
  }

  /* Handle thumbnail click inside carousell */
  handleThumbnailClick(id, modal=false) {
    var image = this.state.images[id];
    this.setState({
      image
    })
    if(modal) {
      this.setState({showModal: true})
    }
  }

  render() {
    return (
      <div>

        <ImageModal
        visible={this.state.showModal}
        image={this.state.image}
        images={this.state.images}
        handleClick={this.handleThumbnailClick}
        hideModal={() => this.setState({showModal: false})} />

        <AppStyle>
          <MainImage
          image={this.state.image}
          handleClick={() => this.setState({showModal: true})}/>

          <Carousell
            images={this.state.images}
            selected={this.state.image}
            handleClick={this.handleThumbnailClick} />

        </AppStyle>
      </div>
    )
  }

}