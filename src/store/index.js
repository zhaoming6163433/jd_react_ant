import { init } from '@rematch/core'
import { count } from '@/models/index'
import { home } from '@/models/home'
 
const store = init({
  models:{
    home,
    count
  }
})
 
export default store
//                                                   // state = { count: 0 }
// // reducers
// dispatch({ type: 'count/increment', payload: 1 }) // state = { count: 1 }
// dispatch.count.increment(1)                       // state = { count: 2 }
 
// // effects
// dispatch({ type: 'count/incrementAsync', payload: 1 }) // state = { count: 3 } after delay
// dispatch.count.incrementAsync(1) 