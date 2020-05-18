import { SET_CROP_BOX_DETAILS } from 'store/types'

const initialState = {
  cropBox: {
    top: 0,
    left: 0,
    height: 0,
    width: 0
  }
}

const counter = (state = initialState, action) => {
  switch (action.type) {
    case SET_CROP_BOX_DETAILS:
      return { cropBox: action.payload }

    default:
      return state
  }
}

export default counter
