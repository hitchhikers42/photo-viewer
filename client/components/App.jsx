import React from 'react';
import axios from 'axios';

/* import styles */
import { AppStyle } from './styles/AppStyle.jsx'
import { ModalClose, ImageStyle } from './styles/ModalStyle.jsx';
/* import components */
import { MainImage } from './MainImage.jsx';
import { Carousell } from './Carousell.jsx'


import Modal from 'react-modal';

Modal.setAppElement('#photo-viewer')


const modalStyle = {
  content : {
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    zIndex: '2',
    backgroundColor: 'rgba(119, 119, 119, 0.5)'
  }
};


class PhotoViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      image: '',
      width: 1200,
      height: 1200,
      modalIsOpen: false

    }
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.updateImageSize = this.updateImageSize.bind(this)

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /* Once components are mounted,
     retrieve images from database */
  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    const productIds = [
      'BES870XL',
      'IVFWCT242DBWH',
      'TOB-135N',
      'XBOX1X'

    ]
    var random = Math.floor(Math.random() * productIds.length)

    var ID = productIds[random];
    axios.get('/images' + ID)
    .then(({ data }) => {
      this.setState({
        images: data,
        image: data[0]
      });
      return data[0]
    })
    .then(data=> {
      return this.updateImageSize(data)
    });
  }

  updateImageSize(image) {
    var img = new Image();
    img.src = image || this.state.image;
    var width = img.naturalWidth || 1200;
    var height = img.naturalHeight || 1200;

    this.setState({ width, height })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  /* Handle thumbnail click inside carousell */
  handleThumbnailClick(id, modal=false) {
    var image = this.state.images[id];
    this.setState({
      image
    })
    this.updateImageSize(image);
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyle}
        >
          <ModalClose
            onClick={this.closeModal}> ⤬ </ModalClose>
          <ImageStyle
            src={this.state.image}
          />

          <Carousell
            images={this.state.images}
            handleClick={this.handleThumbnailClick}
            showModal={true}
          />
        </Modal>

        <AppStyle style={ this.state.modalIsOpen ? { display: 'none' } : { display: ''}}>
          <MainImage
            image={this.state.image}
            handleClick={this.openModal}
            w={this.state.width}
            h={this.state.height}
          />

          <Carousell
            images={this.state.images}
            selected={this.state.image}
            handleClick={this.handleThumbnailClick}
          />

        </AppStyle>
      </div>
    )
  }

}
export default PhotoViewer;