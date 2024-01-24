<template>
  <div class="switch" :class="{'switch--simple': simple}">
    <div class="switch__button"
         :class="{'switch__button--active': isEnabled}"
         @click="toggle"
    >
      <div class="switch__circle"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isEnabled: Boolean,
  simple: Boolean
})
const isEnabled = computed(() => props.isEnabled)
const simple = computed(() => true)

const emit = defineEmits(['toggle'])

const toggle = () => {
    emit('toggle', !isEnabled.value)
}
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  align-items: flex-start;

  &.switch--simple {
    align-items: center;
  }

  .switch__button {
    width: 40px;
    min-width: 40px;
    display: block;
    padding: 4px;
    border: 1px black;
    border-radius: 60px;
    transition: 0.5s;
    background: gray;

    &:hover {
      cursor: pointer;
    }

    &--active {
      background: #0B74B0;

      .switch__circle {
        transform: translateX(150%);
      }
    }

    .switch__circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: 1px black;
      background-color: white;
      border-radius: 50%;
      transition: 0.5s;
    }
  }
}
</style>