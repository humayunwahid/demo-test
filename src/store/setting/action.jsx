import {SettingCustom} from './redure'
import { upcommmingMovies } from '../../StaticData/data'

export const {theme_scheme_direction,video_genres}= SettingCustom.actions

export const getMoviesAsync = () => (dispatch) => {
    dispatch(video_genres(upcommmingMovies))
}


export default SettingCustom.actions
