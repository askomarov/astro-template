import { initModals } from './modules/modals/init-modals'
import { mobileVhFix } from './utils/mobile-vh-fix'
import { initSlider } from './modules/init-slider';


mobileVhFix()
document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('hello astro')
    initModals()
    initSlider()
  },
  true
)
