import { SET_CROP_BOX_DETAILS } from 'store/types'

export const setCropBoxDetails = (details) => (dispatch) => {
  console.log(details)
  dispatch({ type: SET_CROP_BOX_DETAILS, payload: details })
}
