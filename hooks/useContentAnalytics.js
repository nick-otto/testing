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

    const updateContentAnalytics = async (id, status) => {
        try {
            const response = await $fetch(`/api/analytics-content/${id}`, {
                method: 'PATCH',
                body: status
            })
            return response
        } catch (error) {
            return console.log(error)
        }
    }

    return {
        getContentAnalytics,
        updateContentAnalytics
    }
}