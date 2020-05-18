import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Cropper from 'cropperjs'
import PropTypes from 'prop-types'
import CropDetails from 'components/CropDetails'
import { connect } from 'react-redux'
import { setCropBoxDetails } from 'store/actions/cropDetails'

export class ImageCropper extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cropper: false
    }
  }

  componentDidMount () {
    console.log('mounted', new Date().getTime())

    const image = document.getElementById('imageCropper')

    this.cropper = new Cropper(image, {
      viewMode: 3,
      zoomOnWheel: false,
      responsive: true,
      ready: () => {
        // this.forceUpdate()
        if (!this.state.cropper) this.setState({ cropper: true })
        console.log('ready', new Date().getTime())
      },
      crop: (event) => {
        console.log(this.cropper.getCropBoxData())
        this.props.setCropBoxDetails(this.cropper.getCropBoxData())
      }
    })
  }

  componentDidUpdate () {
    this.cropper.replace(this.props.image.url)
    console.log('asdas')
  }

  downloadCroppedImage = () => {
    this.cropper.getCroppedCanvas().toBlob((blob) => {
      const { image } = this.props
      const link = document.createElement('a')

      link.setAttribute('href', URL.createObjectURL(blob))
      link.setAttribute('download', 'cropped_' + image.name)

      link.click()
    })
  }

  render () {
    const { image } = this.props

    return (
      <div>
        <Row>
          <Col md="8" className="p-0">
            <img id="imageCropper" src={image.url} alt="cropper" width="500px"></img>
          </Col>
          <Col md="4" className="px-4">
            <CropDetails image={image} cropper={this.cropper} downloadCroppedImage={this.downloadCroppedImage} onChangeImage={this.props.onChangeImage} />
          </Col>
        </Row>
      </div>
    )
  }
}

ImageCropper.propTypes = {
  image: PropTypes.object,
  onChangeImage: PropTypes.func,
  setCropBoxDetails: PropTypes.func
}

export default connect(() => ({}), {
  setCropBoxDetails
})(ImageCropper)
