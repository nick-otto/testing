export default defineEventHandler(async (event) => {

    const demoData = [
        {
            id: 1,
            name: 'Яндекс',
            logo: 'ya',
            link: 'ya.ru',
            status: true,
            rating: {
                old: 4.2,
                new: 4.3
            },
            reviews: {
                old: 46,
                new: 118
            },
            negativeReviews: {
                actual: 16,
                total: 391
            },
            cityPlace: {
                now: 5,
                old: 1,
                total: 2023
            }
        },
        {
            id: 2,
            name: 'Продокторов',
            logo: 'prodoctorov',
            link: 'prodoctorov.ru',
            status: false,
            rating: {
                old: 3.8,
                new: 2
            },
            reviews: {
                old: 135,
                new: 236
            },
            negativeReviews: {
                actual: 62,
                total: 391
            },
            cityPlace: {
                now: 1,
                old: 50,
                total: 2023
            }
        },
        {
            id: 3,
            name: 'Google',
            logo: 'google',
            link: 'google.com',
            status: true,
            rating: {
                old: 3.8,
                new: 4.5
            },
            reviews: {
                old: 167,
                new: 245
            },
            negativeReviews: {
                actual: 71,
                total: 400
            },
            cityPlace: {
                now: 1,
                old: 4,
                total: 200
            }
        },
        {
            id: 4,
            name: 'Zoon',
            logo: 'zoon',
            link: 'zoon.com',
            status: true,
            rating: {
                old: 1.2,
                new: 4.5
            },
            reviews: {
                old: 7,
                new: 31
            },
            negativeReviews: {
                actual: 56,
                total: 400
            },
            cityPlace: {
                now: '',
                old: '',
                total: 200
            }
        },
        {
            id: 5,
            name: '2ГИС',
            logo: '2gis',
            link: '2gis.ru',
            status: true,
            rating: {
                old: 2.2,
                new: 4.1
            },
            reviews: {
                old: 4,
                new: 7
            },
            negativeReviews: {
                actual: 80,
                total: 400
            },
            cityPlace: {
                now: 7,
                old: 14,
                total: 2023
            }
        },
        {
            id: 6,
            name: 'Yell',
            logo: 'yell',
            link: 'yell.ru',
            status: true,
            rating: {
                old: 4.1,
                new: 4.5
            },
            reviews: {
                old: 0,
                new: 3
            },
            negativeReviews: {
                actual: 80,
                total: 400
            },
            cityPlace: {
                now: 123,
                old: 125,
                total: 2023
            }
        }
    ]

    return {
        items: demoData
    }

})