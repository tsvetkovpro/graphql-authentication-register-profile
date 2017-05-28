import localStorage from 'localStorage'
import router from './router'

export default {
    login(){
        return localStorage.getItem('id')
    },
    logout(){
        router.push('/auth')
        localStorage.clear()
    }
}
