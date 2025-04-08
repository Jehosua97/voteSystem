<template>
  <q-page class="q-pa-sm">
    <table-actions class="q-mt-lg"></table-actions>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';

export default defineComponent({
  name: "Tables",
  components: {
    TableActions: defineAsyncComponent(() => import('components/tables/TableActions.vue'))
  },
})
</script>

<style>

</style>
