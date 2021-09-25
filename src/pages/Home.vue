<template>
  <div class="h-full w-full flex">
    <Grid v-if="dataLoaded" />
    <InitialPage v-else />
  </div>
</template>

<script>
// import { ref } from "vue";
import Grid from "../components/Grid.vue";
import InitialPage from "../components/InitialPage.vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: { Grid, InitialPage },
  setup() {
    const store = useStore();
    // const dataLoaded = computed(() => {
    //   return store.state.table_data.length > 0;
    // });
    const dataLoaded = computed(() => {
      return store.state.isDataLoaded;
    });

    return { dataLoaded };
  },
};
</script>
