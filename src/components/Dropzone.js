import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Dropzone extends Component {
  constructor (props) {
    super(props)

    this.imageInput = React.createRef()
  }

  onChangeImage = async () => {
    const file = this.imageInput.current.files[0]

    this.props.onChangeImage(file)
  }

  render () {
    return (
      <div className="dropzone-container bg-white shadow">
        <div className="dropzone position-relative d-flex justify-content-center align-items-center h-100">
          <span className="position-absolute">
          Drag & drop file here
          </span>
          <input ref={this.imageInput} className="position-absolute h-100 w-100 cursor-pointer" type="file" name="image" id="dropzone" onChange={this.onChangeImage}/>
        </div>
      </div>
    )
  }
}

Dropzone.propTypes = {
  onChangeImage: PropTypes.func
}

export default Dropzone
