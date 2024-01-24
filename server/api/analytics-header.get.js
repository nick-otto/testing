export default defineEventHandler(async (event) => {

    const demoData = [
        {
            name: 'запросов отправлено',
            color: 'black',
            total: 1720,
        },
        {
            name: 'прирост отзывов',
            color: '#219B60',
            total: 142,
        },
        {
            name: 'негатива перехвачено',
            color: '#D8602A',
            total: 22,
        },
        {
            name: 'отзывов',
            color: 'black',
            total: 3.1,
            summary: 629,
        }
    ]

    return {
        items: demoData
    }

})