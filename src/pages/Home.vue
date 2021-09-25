<template>
  <div class="h-full w-full flex">
    <LoadingScreen/>
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
import LoadingScreen from "../components/LoadingScreen.vue";

export default {
  name: "Home",
  components: { Grid, InitialPage, LoadingScreen },
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
