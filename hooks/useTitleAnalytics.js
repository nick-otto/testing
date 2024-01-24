export default function useTitleAnalytics() {

    const getTitleAnalytics = async (params = {}) => {
        try {
            const data = await $fetch(`/api/analytics-header`, {
                params
            })

            return data?.items || data
        } catch (error) {
            return console.log(error)
        }
    }

    return {
        getTitleAnalytics
    }
}