import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import * as Vibrant from 'node-vibrant'

export class ViewOptions extends Component {
  state = {
    palette: null
  }

  componentDidMount () {
    this.getPalette()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.image.url !== this.props.image.url) this.getPalette()
  }

  getPalette = () => {
    Vibrant.from(this.props.image.url).getPalette((err, palette) => {
      this.setState({ palette })
      if (err) console.error(err)
    })
  }

  renderPalette = () => {
    const colors = []

    if (this.state.palette) {
      for (const [key, value] of Object.entries(this.state.palette)) {
        colors.push(<OverlayTrigger
          key={key}
          placement="bottom"
          trigger="focus"
          overlay={
            <Tooltip>
              Color Copied!
            </Tooltip>
          }
        >
          <Button variant="light" className="bg-white shadow-none p-0 border-1" onClick={() => {
            navigator.clipboard.writeText(value.getHex())
          }}>
            <span className="ico" style={{ background: value && value.getHex() }}></span>
          </Button>
        </OverlayTrigger>)
      }
    }

    return colors
  }

  toggleGuide3 = () => {
    const guideH = document.querySelector('.dashed-h')
    const guideV = document.querySelector('.dashed-v')

    const classes = ['guides-4', 'guides-golden']

    guideH.classList.remove(...classes)
    guideV.classList.remove(...classes)

    guideH.classList.toggle('cropper-hidden')
    guideV.classList.toggle('cropper-hidden')
  }

  toggleGuide4 = () => {
    const guideH = document.querySelector('.dashed-h')
    const guideV = document.querySelector('.dashed-v')

    guideH.classList.add('cropper-hidden', !guideH.classList.contains('cropper-hidden'))
    guideV.classList.add('cropper-hidden', !guideV.classList.contains('cropper-hidden'))

    guideH.classList.remove('guides-golden')
    guideV.classList.remove('guides-golden')

    guideH.classList.toggle('guides-4')
    guideV.classList.toggle('guides-4')
  }

  toggleGuideGolden = () => {
    const guideH = document.querySelector('.dashed-h')
    const guideV = document.querySelector('.dashed-v')

    guideH.classList.add('cropper-hidden', !guideH.classList.contains('cropper-hidden'))
    guideV.classList.add('cropper-hidden', !guideV.classList.contains('cropper-hidden'))

    guideH.classList.remove('guides-4')
    guideV.classList.remove('guides-4')

    guideH.classList.toggle('guides-golden')
    guideV.classList.toggle('guides-golden')
  }

  changeOutline = () => {
    const vewBox = document.querySelector('.cropper-view-box')

    vewBox.classList.toggle('dark-outline')
  }

  hideBackground = () => {
    const vewBox = document.querySelector('.cropper-modal')

    vewBox.classList.toggle('bg-white')
    vewBox.classList.toggle('opacity-0')
  }

  render () {
    return (
      <div className="d-flex w-100 pt-3">
        <div className="w-100 d-flex align-items-center justify-content-between view-options">
          <div>
            <Button variant="light" className="bg-white shadow-none p-0 border-1 mr-1" onClick={this.hideBackground}>
              <span className="ico ico-background"></span>
            </Button>

            <Button variant="light" className="bg-white shadow-none p-0 border-1 mr-5" onClick={this.changeOutline}>
              <span className="ico ico-outline"></span>
            </Button>

            <Button variant="light" className="bg-white shadow-none p-0 border-1 mr-1" onClick={this.toggleGuide3}>
              <span className="ico ico-guides-3"></span>
            </Button>

            <Button variant="light" className="bg-white shadow-none p-0 border-1 mr-1" onClick={this.toggleGuide4}>
              <span className="ico ico-guides-4"></span>
            </Button>

            <Button variant="light" className="bg-white shadow-none p-0 border-1 mr-1" onClick={this.toggleGuideGolden}>
              <span className="ico ico-guides-golden"></span>
            </Button>
          </div>

          <div>
            {this.renderPalette()}
          </div>
        </div>
      </div>
    )
  }
}

ViewOptions.propTypes = {
  image: PropTypes.object
}

export default ViewOptions
