import {ref} from 'vue'

export default function useHint() {
    const hint = ref(null)

    const showHint = id => hint.value === id
    const setHint = id => {
        hint.value === id ? hint.value = null : hint.value = id
    }
    const hideHint = _ => hint.value = null

    return {
        hideHint,
        showHint,
        setHint,
    }
}