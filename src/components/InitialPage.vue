<template>
  <section class="w-full h-full">
    <div class="w-full h-full flex">
      <div v-if="!isLoading" class="m-auto border rounded px-4 py-2">
        <h1>Please load a Build CSV file</h1>
      </div>
      <div v-else class="m-auto border rounded px-4 py-2">
        <h1>Loading. Please wait...</h1>
        <ScaleLoader />
      </div>
    </div>
  </section>
</template>

<script>
import ScaleLoader from "./spinners/ScaleLoader.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: { ScaleLoader },
  setup() {
    const store = useStore();
    const isLoading = computed(() => {
      return store.state.isLoading;
    });

    return { isLoading };
  },
};
</script>

<style>
</style>