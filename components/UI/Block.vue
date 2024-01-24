<template>
  <div class="block">
    <slot name="title"/>
    <slot name="content"/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.block {
  padding: 32px 24px;
  border-radius: 10px;
  border: 1px solid #D2D2D2;
}
</style>