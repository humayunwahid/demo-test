import { createSlice } from '@reduxjs/toolkit'
import {state} from './state'
import {setAttr} from '../../utilities/dom'

export const updateHtmlAttr = (value) => {
    // set direction
    setAttr('html', value)
}

export const SettingCustom = createSlice({
    name: "setting",
    initialState: state,
    reducers: { 
        theme_scheme_direction: (state, action) => {
            if(typeof action.payload !== typeof undefined) {
              state.theme_scheme_direction.value = action.payload
            }
            updateHtmlAttr({prop: 'dir',  value: state.theme_scheme_direction.value})
          },
          video_genres: (state,action) =>{
              state.video = action.payload
          }
    }
})


export default SettingCustom.reducer;