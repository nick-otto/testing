export default function useContentAnalytics() {

    const getContentAnalytics = async (params = {}) => {
        try {
            const data = await $fetch(`/api/analytics-content`, {
                params
            })

            return data?.items || data
        } catch (error) {
            return console.log(error)
        }
    }

    return {
        getContentAnalytics
    }
}