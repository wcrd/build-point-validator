<template>
  <section class="w-full h-full">
    <div class="w-full h-full flex">
      <div v-if="!isLoading" class="m-auto border rounded px-4 py-2">
        <h1>Please load a Build CSV file</h1>
      </div>
      <div v-else class="m-auto border rounded px-4 py-2" :class="!loadingStatus && 'border-red-500'">
        <h1 class="mb-2">{{ loadingMessage }}</h1>
        <div v-if="loadingStatus">
          <ScaleLoader />
          <div class="border rounded-md border-red-500 bg-red-500 text-white text-center mt-2 cursor-pointer" @click="reloadWindow()">
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ScaleLoader from "./spinners/ScaleLoader.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { reloadWindow } from "../utils/helpers";

export default {
  components: { ScaleLoader },
  setup() {
    const store = useStore();
    const isLoading = computed(() => {
      return store.state.isLoading;
    });
    const loadingStatus = computed(() => {
      return store.state.loadingStatus == "loading"
    })

    // function forceReload(){
    //   console.log("Reload")
    //   location.reload()
    // }

    const loadingMessage = computed(() => {
            const status = store.state.loadingStatus;
            switch(status){
                case "loading":
                    return "Loading. Please wait..."
                case "success":
                    return "Successfully loaded file."
                case "failed":
                    return "Error loading file. Please check file is valid Build export."
                default:
                    return ""
            }
        })

    return { isLoading, loadingMessage, loadingStatus, reloadWindow };
  },
};
</script>

<style>
</style>