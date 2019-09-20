import { init } from '@rematch/core'
import { count } from '@/models/index'
import { home } from '@/models/home'
import { echartData } from '@/models/echart'
const store = init({
  models:{
    home,
    count,
    echartData
  }
})
export default store;