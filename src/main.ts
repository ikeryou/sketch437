import { Contents } from './parts/contents'
import './style.css'

document.querySelectorAll('.js-main').forEach((el:any) => {
  new Contents({
    el: el,
  })
})
