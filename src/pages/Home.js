import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import ImageCropper from 'components/ImageCropper'
import Dropzone from 'components/Dropzone'

export class Home extends Component {
  state = {
    image: null
  }

  setChangedImage = (image) => {
    this.setState({ image })
  }

  onChangeImage = (file) => {
    const setChangedImage = this.setChangedImage
    const objectURL = URL.createObjectURL(file)

    var img = new Image()
    let height = null
    let width = null

    img.onload = function () {
      height = this.height
      width = this.width

      const image = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: objectURL,
        height: height,
        width: width
      }

      console.log(image)

      setChangedImage(image)
    }
    img.src = objectURL
  }

  render () {
    const { image } = this.state

    return (
      <Container>
        <h1>Home</h1>

        {image
          ? <ImageCropper image={image} onChangeImage={this.onChangeImage} />
          : <Dropzone image={image} onChangeImage={this.onChangeImage} />}

      </Container>
    )
  }
}

export default Home
