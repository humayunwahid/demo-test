import { configureStore } from '@reduxjs/toolkit'

// redure
import settingReducer from './setting/redure';
import SettingMedia from './media/redure';
import SettingBlog from './blog/redure';
import SettingShop from './shop/redure';

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    media: SettingMedia,
    blog: SettingBlog,
    shop: SettingShop
  },
})