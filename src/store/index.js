import { init } from '@rematch/core'
import { count } from '@/models/index'
import { home } from '@/models/home'
import { echartData } from '@/models/echart'
import { Loading } from '@/models/loading'
const store = init({
  models:{
    home,
    count,
    echartData,
    Loading
  }
})
export default store;