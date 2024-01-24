import {ref} from 'vue'

export default function useLoader() {
    const loader = ref(true)

    const loaderStart = () => loader.value = true
    const loaderStop = () => loader.value = false

    return {
        loader,
        loaderStart,
        loaderStop
    }
}