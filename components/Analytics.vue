<template>
  <div class="analytics cnt">
    <div class="analytics-title__wrapper">
      <div class="analytics-title">
        Динамика рейтинга и отзывов за 30 дней
      </div>
      <UIHint
          :show="showHint('title')"
          :tabindex="1"
          :left="'-10px'"
          :no-tail="true"
          variant="blackTheme"
          class="analytics-title__hint"
          @hideHint="hideHint()"
          @click="setHint('title')"
      >
        <template #icon>
          <img src="/icons/hint.svg" alt="hint">
        </template>

        <template #content>
          Всплывающая подсказка про активность
        </template>
      </UIHint>
    </div>

    <template v-if="loader">
      Loading...
    </template>

    <template v-else>
      <UIBlock>
        <template #title>
          <div class="analytics-block-title">

            <div v-for="title in titleHeaders" :key="title.name" class="analytics-block-title__item">

              <div class="analytics-block-title__item__total" :style="`color: ${title.color}`">
                {{ title.total }}
              </div>
              <div class="analytics-block-title__item__name"
                   :style="title.summary? 'display: block; max-width: 75px' : ''"
              >
                <img v-if="title.summary" v-for="star in checkNumber(title.total)" src="/icons/star-full.svg"
                     alt="star">
                <img v-if="title.summary && halfPartStar" src="/icons/star-half.svg" alt="star">
                <div>{{ title.summary }} {{ title.name }}</div>

              </div>


            </div>
          </div>
        </template>

        <template #content>
          <div class="analytics-block-content">

            <UITable>
              <template #head>
                <td v-for="(head, headIndex) in tableHeaders" :key="headIndex">
                  <div class="analytics-block-content__table-head">
                    <div class="analytics-block-content__table-head__name">
                      {{ head.name }}

                      <UIHint
                          v-if="head.hint"
                          :show="showHint(headIndex)"
                          :left="'-10px'"
                          :no-tail="true"
                          variant="blackTheme"
                          class="analytics-block-content__table-head__name__hint"
                          @hideHint="hideHint"
                          @click="setHint(headIndex)"
                      >
                        <template #icon>
                          <img src="/icons/hint.svg" alt="hint">
                        </template>

                        <template #content>
                          {{ head.hint }}
                        </template>

                      </UIHint>
                    </div>

                    <div v-if="head.dateStart && head.dateFinish" class="analytics-block-content__table-head__dates">
                      <div>{{ head.dateStart }}</div>
                      <div>{{ head.dateFinish }}</div>
                    </div>
                  </div>

                </td>
              </template>

              <tr v-for="content in tableContent" :key="content.id">
                <td class="analytics-block-content__name">
                  <UISwitch
                      :id="content.id"
                      :isEnabled="content.status"
                      @toggle="content.status = $event"
                  />

                  <img
                      v-if="content.logo"
                      :src="`/logos/${content.logo}.svg`"
                      :alt="content.logo"
                      class="analytics-block-content__name__img"
                  />

                  <NuxtLink :to="`https://${content.link}`" target="_blank" class="analytics-block-content__name__text">
                    {{ content.name }}
                  </NuxtLink>
                </td>

                <td>
                  <div class="analytics-block-content__rating">
                    <div>
                      <div
                          class="analytics-block-content__rating__old"
                          :style="`background: ${checkRating(content.rating.old)}`"
                      >
                        {{ content.rating.old }}
                      </div>
                      <div class="analytics-block-content__rating__reviews">
                        {{ content.reviews.old }}
                      </div>
                    </div>
                    <div>
                      <div
                          class="analytics-block-content__rating__new"
                          :style="`background: ${checkRating(content.rating.new)}`"
                      >
                        {{ content.rating.new }}
                      </div>
                      <div class="analytics-block-content__rating__reviews">
                        {{ content.reviews.new }}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="analytics-block-content__boost">
                    <div
                        :style="`color: ${actualRating(content.rating.old, content.rating.new) > 0? '#219B60' : '#D8602A'}`">
                      {{ actualRating(content.rating.old, content.rating.new) }}
                    </div>
                    <div style="color: #9A9A9A">
                      {{ actualRating(content.reviews.old, content.reviews.new) }}
                    </div>
                  </div>
                </td>

                <td>
                  <div class="analytics-block-content__negative">
                    <div class="analytics-block-content__negative__percents">
                      {{ checkPercent(content.negativeReviews.actual, content.negativeReviews.total) }}%
                    </div>
                    <div class="analytics-block-content__negative__reviews__wrapper">
                      <div class="analytics-block-content__negative__reviews">
                        {{ pluralize(Number(content.negativeReviews.actual), ['отзыв', 'отзыва', 'отзывов']) }}
                      </div>
                      из {{ content.negativeReviews.total }}
                    </div>
                  </div>
                </td>

                <td>
                  <div class="analytics-block-content__city-place">
                    <div v-if="!content.cityPlace.now && !content.cityPlace.old"
                         class="analytics-block-content__city-place__text">
                      Скоро
                      <img src="/icons/up.svg" alt="up" class="analytics-block-content__city-place__img">
                      <img src="/icons/down.svg" alt="down" class="analytics-block-content__city-place__img">
                    </div>

                    <div v-else>
                      {{ content.cityPlace.now }} из {{ content.cityPlace.total }}
                      <img
                          v-if="actualPlace(content.cityPlace.old, content.cityPlace.now)"
                          :src="`/icons/${actualPlace(content.cityPlace.old, content.cityPlace.now)}.svg`"
                          alt="cityPlace"
                          class="analytics-block-content__city-place__img"
                      >
                    </div>
                  </div>
                </td>

              </tr>
            </UITable>
          </div>
        </template>
      </UIBlock>
    </template>

  </div>
</template>

<script setup>
//Hooks
import useHint from "~/hooks/useHint.js";
import useTitleAnalytics from "~/hooks/useTitleAnalytics.js";
import useContentAnalytics from "~/hooks/useContentAnalytics.js";
import useLoader from "~/hooks/useLoader.js";

// Utils
import pluralize from "~/utils/pluralize-ru.js";

const {
  showHint,
  setHint,
  hideHint
} = useHint()

const {
  getTitleAnalytics
} = useTitleAnalytics()

const {
  getContentAnalytics
} = useContentAnalytics()

const {
  loader,
  loaderStart,
  loaderStop
} = useLoader()

const titleHeaders = ref(null)
const tableContent = ref(null)
const halfPartStar = ref(false)

const tableHeaders = [
  {
    name: 'Площадки \n и их активность',
    hint: 'Всплывающая подсказка про активность',
    dateStart: '',
    dateFinish: ''
  },
  {
    name: 'Рейтинг и отзывы',
    hint: '',
    dateStart: '1 янв',
    dateFinish: '31 янв'
  },
  {
    name: 'Прирост отзывов \n и рейтинга',
    hint: '',
    dateStart: '',
    dateFinish: ''
  },
  {
    name: 'Доля негативных \n отзывов на сегодня',
    hint: '',
    dateStart: '',
    dateFinish: ''
  },
  {
    name: 'Место \n в городе',
    hint: '',
    dateStart: '',
    dateFinish: ''
  }
]
const getStats = async () => {
  try {
    loaderStart()
    const data = await getTitleAnalytics({})
    const request = await getContentAnalytics({})

    titleHeaders.value = data
    tableContent.value = request
  } catch (error) {
    return error
  } finally {
    setTimeout(() => loaderStop(), 3000)
  }
}

const actualRating = (oldValue, newValue) => {
  if (newValue > oldValue) {
    return '+' + (newValue - oldValue).toFixed(1)
  } else if (newValue < oldValue) {
    return "-" + (oldValue - newValue).toFixed(1)
  } else {
    return 0
  }
}

const actualPlace = (oldValue, newValue) => {
  if (!oldValue || oldValue === newValue) {
    return ''
  } else if (oldValue - newValue > 0) {
    return 'up'
  } else {
    return 'down'
  }
}

const checkNumber = (item) => {
  if (!Number.isInteger(item)) {
    halfPartStar.value = true
    return Math.floor(item)
  } else {
    return item
  }
}

const checkRating = (rating) => {
  if (rating < 3) {
    return '#FCF0EA' //red
  }
  if (rating < 4.2) {
    return '#FFFBD8' // yellow
  } else {
    return '#E9F6F0' // green
  }
}

const checkPercent = (actual, total) => {
  return Math.floor(actual / (total * 0.01))
}

onMounted(() => setTimeout(() => getStats(), 1500))
</script>

<style lang="scss" scoped>
.cnt {
  padding: 64px 56px;
  font-family: Inter, sans-serif;
}

.analytics {

  .analytics-title__wrapper {
    display: flex;
    align-items: center;

    .analytics-title {
      display: flex;
      align-items: center;
      margin-top: 16px;
      margin-bottom: 32px;
      font-family: Golos, sans-serif;
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
    }

    .analytics-title__hint {
      margin-bottom: 30px;
    }
  }

  .analytics-block-title {
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    .analytics-block-title__item {
      display: flex;
      align-items: center;
      margin-right: 40px;

      .analytics-block-title__item__total {
        margin-right: 8px;
        font-size: 36px;
        font-weight: 700;
        font-family: Golos, sans-serif;
      }

      .analytics-block-title__item__name {
        display: flex;
        align-items: center;
        font-size: 13px;
        max-width: 50px;
        margin-right: 8px;
      }
    }
  }

  .analytics-block-content {
    font-family: Inter, sans-serif;
    margin-top: -10px;

    .analytics-block-content__table-head {
      white-space: pre-line;

      .analytics-block-content__table-head__name {
        display: flex;

        .analytics-block-content__table-head__name__hint {
          font-weight: 400;
          font-size: 13px;
        }
      }

      .analytics-block-content__table-head__dates {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        font-weight: 400;
      }
    }

    .analytics-block-content__name {
      display: flex;
      align-items: center;

      .analytics-block-content__name__img {
        margin: 0 8px 0 16px;
      }

      .analytics-block-content__name__text {
        color: #0B74B0;
        text-decoration: underline;
      }
    }

    .analytics-block-content__rating {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      .analytics-block-content__rating__old {
        background: #E9F6F0;
        margin-right: 21px;
        max-width: max-content;
        border-radius: 5px;
        padding: 2px 8px;
      }

      .analytics-block-content__rating__reviews {
        color: #9A9A9A;
        padding: 0 8px;
      }

      .analytics-block-content__rating__new {
        background: #E9F6F0;
        margin-right: 21px;
        max-width: max-content;
        border-radius: 5px;
        padding: 2px 8px;
      }
    }

    .analytics-block-content__boost {
      font-weight: 600;
    }

    .analytics-block-content__negative {
      display: grid;
      grid-template-columns: 1fr 4fr;

      .analytics-block-content__negative__percents {
        background: #E9F6F0;
        width: max-content;
        border-radius: 5px;
        padding: 2px 8px;
      }

      .analytics-block-content__negative__reviews__wrapper {
        display: flex;
        align-items: center;

        .analytics-block-content__negative__reviews {
          color: #D8602A;
          margin-right: 5px;
        }
      }
    }

    .analytics-block-content__city-place {
      display: flex;
      align-items: center;

      .analytics-block-content__city-place__text {
        color: #9A9A9A;
      }

      .analytics-block-content__city-place__img {
        margin-left: 8px;
      }
    }

  }
}
</style>