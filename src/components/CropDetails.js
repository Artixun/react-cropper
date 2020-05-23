import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Tabs, Tab } from 'react-bootstrap'
import classNames from 'classnames'

export class CropDetails extends Component {
  constructor (props) {
    super(props)

    this.imageInput = React.createRef()
  }

  state = {
    activeTab: 'auto',
    aspectRatio: 0,
    size: 0,
    position: ''
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab })
  }

  setAspectRatio =(ratio) => {
    console.log(ratio)
    this.setState({ aspectRatio: ratio })
    this.props.cropper.setAspectRatio(ratio)
  }

  setSize = (size) => {
    const { height, width } = this.props.cropper.getImageData()
    console.log(height, width)
    this.setState({ size: size })
    this.props.cropper.setCropBoxData({ width: width / size, height: height / size })
  }

  onCropBoxDataChange = (event) => {
    console.log({ [event.target.name]: parseInt(event.target.value) })
    this.props.cropper.setCropBoxData({ [event.target.name]: parseInt(event.target.value) })
  }

  onChangeImage = async () => {
    console.log('onChangeImage')

    const file = this.imageInput.current.files[0]

    if (file) {
      this.props.onChangeImage(file)

      console.log(this.props.image)
    }
  }

  setPosition = (pos) => {
    const { cropper } = this.props
    const cropBox = cropper.getCropBoxData()
    const container = cropper.getContainerData()

    console.log(cropBox, container)
    this.setState({ position: pos })

    switch (pos) {
      case 'left':
        cropper.setCropBoxData({ left: 0 })
        break

      case 'h-center':
        cropper.setCropBoxData({ left: (container.width / 2) - (cropBox.width / 2) })
        break

      case 'right':
        cropper.setCropBoxData({ left: container.width - cropBox.width })
        break

      case 'top':
        cropper.setCropBoxData({ top: 0 })
        break

      case 'v-center':
        cropper.setCropBoxData({ top: (container.height / 2) - (cropBox.height / 2) })
        break

      case 'bottom':
        cropper.setCropBoxData({ top: container.height - cropBox.height })
        break

      default:
        break
    }
  }

  render () {
    const { image, cropDetails: { cropBox }, downloadCroppedImage } = this.props
    const { activeTab, aspectRatio, size } = this.state

    return (
      <div className="h-100 d-flex flex-column align-content-between">
        <div className="flex-grow-1 pb-2">
          <span className="d-block">{image.name}</span>
          <span className="d-block">{image.width} × {image.height}</span>
          <span className="d-block">
            <label className="cursor-pointer text-primary" htmlFor="changeImageInput">Choose another file...</label>
            <input ref={this.imageInput} className="d-none" type="file" name="image" id="changeImageInput" onChange={this.onChangeImage} />
          </span>
          <span className="d-block">
            <b>Crop</b><br/>
            {Number(cropBox.height).toFixed(0)} × {Number(cropBox.width).toFixed(0)} (at {Number(cropBox.left).toFixed(0)}, {Number(cropBox.top).toFixed(0)})
          </span>
          <Button className="mt-2" onClick={downloadCroppedImage}>Download Cropped Image</Button>
        </div>

        <div>
          <Tabs defaultActiveKey="auto" activeKey={activeTab} onSelect={this.setActiveTab} variant="pills">
            <Tab eventKey="auto" title="Auto" tabClassName="mr-2 py-1">
              <div className="bg-dark text-white p-2 rounded my-2">
                <b className="d-block" >Aspect ratio</b>

                <Button className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 1,
                  'bg-dark': aspectRatio !== 1
                })}
                onClick={() => this.setAspectRatio(1)}>1:1</Button>

                <Button className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 4 / 3,
                  'bg-dark': aspectRatio !== 4 / 3
                })} onClick={() => this.setAspectRatio(4 / 3)}>4:3</Button>

                <Button className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 16 / 10,
                  'bg-dark': aspectRatio !== 16 / 10
                })} onClick={() => this.setAspectRatio(16 / 10)}>16:10</Button>

                <Button className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 16 / 9,
                  'bg-dark': aspectRatio !== 16 / 9
                })} onClick={() => this.setAspectRatio(16 / 9)}>16:9</Button><br/>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 1.2941,
                  'bg-dark': aspectRatio !== 1.2941
                })} onClick={() => this.setAspectRatio(1.2941)}>Letter</Button>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 1.414,
                  'bg-dark': aspectRatio !== 1.414
                })} onClick={() => this.setAspectRatio(1.414)}>A4</Button>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 3 / 2,
                  'bg-dark': aspectRatio !== 3 / 2
                })} onClick={() => this.setAspectRatio(3 / 2)}>3:2</Button>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 1.586,
                  'bg-dark': aspectRatio !== 1.586
                })} onClick={() => this.setAspectRatio(1.586)}>Credit card</Button><br/>

                <span className="text-muted py-1 px-2">Instagram</span>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 1.91,
                  'bg-dark': aspectRatio !== 1.91
                })} onClick={() => this.setAspectRatio(1.91)}>Wide</Button>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 1,
                  'bg-dark': aspectRatio !== 1
                })} onClick={() => this.setAspectRatio(1)}>Square</Button>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': aspectRatio === 4 / 5,
                  'bg-dark': aspectRatio !== 4 / 5
                })} onClick={() => this.setAspectRatio(4 / 5)}>Portrait</Button><br/>

                <b className="d-block mt-2">Crop Size</b>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': size === 2,
                  'bg-dark': size !== 2
                })} onClick={() => this.setSize(2)}>small</Button>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': size === 1.5,
                  'bg-dark': size !== 1.5
                })} onClick={() => this.setSize(1.5)}>medium</Button>

                <Button size="sm" className={classNames('border-dark shadow-none mr-1', {
                  'bg-secondary': size === 1.25,
                  'bg-dark': size !== 1.25
                })} onClick={() => this.setSize(1.25)}>big</Button>

              </div>
            </Tab>
            <Tab eventKey="manual" title="Manual" tabClassName="py-1">
              <div className="bg-dark text-white rounded my-2 p-2">
                <div className="d-flex">
                  <div className="col-3">left</div>
                  <div className="col-3 p-0">
                    <input className="w-100 border-0 bg-dark number-input text-white" type="number" name="left" id="left" value={Number(cropBox.left).toFixed(0)} onChange={this.onCropBoxDataChange}/>
                  </div>
                  <div className="col-3">top</div>
                  <div className="col-3 p-0">
                    <input className="w-100 border-0 bg-dark number-input text-white" type="number" name="top" id="top" value={Number(cropBox.top).toFixed(0)} onChange={this.onCropBoxDataChange}/>
                  </div>
                </div>

                <div className="d-flex border-bottom pb-1">
                  <div className="col-3">width</div>
                  <div className="col-3 p-0">
                    <input className="w-100 border-0 bg-dark number-input text-white" type="number" name="width" id="width" value={Number(cropBox.width).toFixed(0)} onChange={this.onCropBoxDataChange}/>
                  </div>
                  <div className="col-3">height</div>
                  <div className="col-3 p-0">
                    <input className="w-100 border-0 bg-dark number-input text-white" type="number" name="height" id="height" value={Number(cropBox.height).toFixed(0)} onChange={this.onCropBoxDataChange}/>
                  </div>
                </div>

                <div className="d-flex border-bottom py-1 mt-1">
                  <div className="col-5">Aspect Ratio</div>
                  <div className="col-7">
                    <input className="w-100 border-0 bg-dark number-input text-white" type="number" name="aspectRatio" id="aspectRatio" value={aspectRatio} onChange={(e) => this.setAspectRatio(e.target.value)}/>
                  </div>
                </div>

                <div className="py-1 mt-1">
                  <Button size="sm" className="border-dark shadow-none mr-1 bg-dark" onClick={() => this.setPosition('left')}>left</Button>
                  <Button size="sm" className="border-dark shadow-none mr-1 bg-dark" onClick={() => this.setPosition('h-center')}>h-center</Button>
                  <Button size="sm" className="border-dark shadow-none mr-1 bg-dark" onClick={() => this.setPosition('right')}>right</Button>
                  <Button size="sm" className="border-dark shadow-none mr-1 bg-dark" onClick={() => this.setPosition('top')}>top</Button>
                  <Button size="sm" className="border-dark shadow-none mr-1 bg-dark" onClick={() => this.setPosition('v-center')}>v-center</Button>
                  <Button size="sm" className="border-dark shadow-none mr-1 bg-dark" onClick={() => this.setPosition('bottom')}>bottom</Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

CropDetails.propTypes = {
  image: PropTypes.object,
  cropper: PropTypes.object,
  cropDetails: PropTypes.object,
  downloadCroppedImage: PropTypes.func,
  onChangeImage: PropTypes.func
}

const mapStateToProps = (state) => {
  return { cropDetails: state.cropDetails }
}

export default connect(mapStateToProps)(CropDetails)
