<template>
  <div
      :class="['hint', {'hint--show': show, 'hint--noTail': noTail}]"
      tabindex="0"
      ref=hint
      @blur="$emit('hideHint')"
      @click="changeSide"
  >
    <div class="hint__wrapper" :class="`hint__cnt---${goToUp}`">

      <div class="hint__icon">
        <div class="hint__icon__tail"/>

        <div :class="`hint__cnt---${goToUp}`">
          <slot name="icon">
            <img src="/icons/hint.svg" alt="hint"/>
          </slot>
        </div>
      </div>

      <div class="hint__cnt"
           :class="`hint__cnt---${hintSide} hint__cnt---${goToUp}`"
           :style="{minWidth: $attrs.width || 0, left:goToCenter || $attrs.left}"
      >
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['show', 'noTail'])

const hint = ref(null)
const hintLocation = ref('')
const hintSide = ref('')
const hintOffsetLeft = ref('')
const parentWidth = ref('')
const goToCenter = ref('')
const clientWidth = ref('')
const goToUp = ref('')

const leftOrRight = () => {
  hintOffsetLeft.value = hint.value?.offsetLeft
  parentWidth.value = hint.value?.offsetParent.clientWidth / 2
  hintLocation.value = parentWidth.value - hintOffsetLeft.value
  clientWidth.value = hint.value?.offsetParent?.offsetParent?.clientWidth
}

const upOrDown = (elem) => {

  const windowPosition = {
    top: window.pageYOffset,
    bottom: window.pageYOffset + document.documentElement.clientHeight
  }

  const targetPosition = {
    top: window.pageYOffset + elem.getBoundingClientRect().top,
    bottom: window.pageYOffset + elem.getBoundingClientRect().bottom
  }

  if (windowPosition.top - targetPosition.top > 160) {
    goToUp.value = 'up'

  } else if (windowPosition.bottom - targetPosition.bottom < 160) {
    goToUp.value = 'up'
  } else goToUp.value = 'down'
}

const changeSide = () => {

  upOrDown(hint.value)

  leftOrRight()

  if (clientWidth.value <= 340) {
    goToCenter.value = -hintOffsetLeft.value + 20 + 'px'
  } else if (clientWidth.value <= 480) {
    goToCenter.value = -hintOffsetLeft.value + 55 + 'px'
  } else {
    if (hintLocation.value > 40) {
      hintSide.value = 'right'
    } else {
      hintSide.value = 'left'
    }
  }
}

</script>

<style lang="scss" scoped>

.hint {
  display: inline-flex;
  align-items: flex-end;
  margin-left: 8px;

  &.hint--show {
    z-index: 1;

    .hint__cnt {
      display: block;
    }

    .hint__icon {
      .hint__icon__tail {
        &::before {
          display: block;
        }
      }
    }
  }

  &.hint--noTail {
    .hint__icon {
      .hint__icon__tail {
        &::before {
          display: none;
        }
      }
    }
  }

  .hint__wrapper {
    position: relative;
  }

  .hint__icon {
    height: 20px;
    width: 20px;
    z-index: 9;
    display: flex;

    .hint__icon__tail {
      // Tail parameters
      &::before {
        display: none;
        content: '';
        position: absolute;
        right: 3px;
        top: 28px;
        width: 14px;
        height: 14px;
        border-color: #EDF2F7;
        border-width: 1px;
        border-style: none none solid solid;
        background: white;
        transform: rotate(135deg);
        z-index: 11;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  .hint__cnt {
    z-index: 10;
    display: none;
    top: 15px;
    font-size: 13px;
    line-height: 16px;
    padding: 10px 18px;
    border: 1px solid #EDF2F7;
    background: white;
    border-radius: 10px;
    position: absolute;
  }

  .hint__cnt---left {
    left: -243px;
  }

  .hint__cnt---right {
    left: -30px;
  }

  .hint__cnt---up {
    transform: scale(1, -1)
  }

  .hint__cnt---down {
    transform: scale(1, 1)
  }

  &[variant="blackTheme"] {
    .hint__cnt {
      border-color: black;
      background: black;
      color: white;
    }
    .hint__icon__tail {
      &::before {
        border-color: black;
        background: black;
      }
    }
  }

}

</style>