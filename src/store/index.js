import { init } from '@rematch/core'
import { count } from '@/models/index'
import { home } from '@/models/home'
import { exampleData } from '@/models/example'
import { Loading } from '@/models/loading'
const store = init({
  models:{
    home,
    count,
    exampleData,
    Loading
  }
})
export default store;