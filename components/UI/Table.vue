<template>
  <div class="ui-table">

    <table
        class="ui-table__main"
        cellpadding="0"
        cellspacing="0"
    >

      <tr class="ui-table__main__head">
        <slot name="head"/>
      </tr>

      <slot/>

    </table>

  </div>
</template>

<script setup>

</script>

<style lang="scss">
.ui-table {
  width: 100%;

  a {
    color: var(--color-primary-1);

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }


  .ui-table__main {
    width: 100%;

    .ui-table__main__head {
      color: var(--color-text-muted);

      td {
        font-family: Inter, sans-serif;
        font-weight: 600;
        line-height: 20px;
      }
    }
  }

  td {
    border-bottom: 1px solid var(--color-border-light);
    padding: 14px 20px 14px 0;
  }
}
</style>