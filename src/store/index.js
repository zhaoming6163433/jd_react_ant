import { init } from '@rematch/core'
import * as models from '../models/index'
 
const store = init({
  models,
})
 
export default store
//                                                   // state = { count: 0 }
// // reducers
// dispatch({ type: 'count/increment', payload: 1 }) // state = { count: 1 }
// dispatch.count.increment(1)                       // state = { count: 2 }
 
// // effects
// dispatch({ type: 'count/incrementAsync', payload: 1 }) // state = { count: 3 } after delay
// dispatch.count.incrementAsync(1) 