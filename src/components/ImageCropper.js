import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Cropper from 'cropperjs'
import PropTypes from 'prop-types'
import CropDetails from 'components/CropDetails'
import { connect } from 'react-redux'
import { setCropBoxDetails } from 'store/actions/cropDetails'
import ViewOptions from 'components/ViewOptions'

export class ImageCropper extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cropper: false
    }
  }

  componentDidMount () {
    const image = document.getElementById('imageCropper')

    this.cropper = new Cropper(image, {
      viewMode: 3,
      responsive: true,
      guides: false,
      center: false,
      ready: () => {
        this.forceUpdate()
      },
      crop: (event) => {
        this.props.setCropBoxDetails(this.cropper.getCropBoxData())
      }
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.image.url !== prevProps.image.url) this.cropper.replace(this.props.image.url)
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
    const ratio = image.width / image.height

    return (
      <div>
        <Row>
          <Col md="8" className="d-flex flex-column align-items-center">
            <div className="mw-100 border-20 shadow">
              <div className="imagecropper-container" style={{
                width: ratio < 1 ? ratio * 500 : '100%',
                height: ratio > 1.5 && ratio < 2.5 ? (450 * ratio) / ratio : ratio > 2.5 ? (250 * ratio) / ratio : 'auto'
              }}>
                <img id="imageCropper" src={image.url} alt="cropper"></img>
              </div>
            </div>

            <ViewOptions image={image} />
          </Col>
          <Col md="4">
            <CropDetails image={image} cropper={this.cropper} downloadCroppedImage={this.downloadCroppedImage} onChangeImage={this.props.onChangeImage} hideGuides={this.hideGuides} />
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
