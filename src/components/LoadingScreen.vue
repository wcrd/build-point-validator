<template>
  <div v-if="isUpdating">
      <section class="z-20 h-full w-full bg-gray-50 fixed top-0 opacity-50">
      </section>
      <div class="absolute inset-0">
          <div class="flex h-full">
              <div class="z-30 m-auto bg-white p-2 rounded shadow w-10/12 md:w-1/3 border border-blue-500">
                <p>Fetching new point validation reference file...</p>
                <ScaleLoader class="my-10"/>
                <p>{{ updateMessage }}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import ScaleLoader from './spinners/ScaleLoader.vue'

export default {
    components: { ScaleLoader },
    setup() {
        const store = useStore()
    
        const isUpdating = computed(() => {
            return store.state.isUpdatingPointsRef;
        })

        const updateMessage = computed(() => {
            const status = store.state.updateStatus;
            switch(status){
                case "pending":
                    return ""
                case "success":
                    return "Successfully updated points reference to latest version."
                case "failed":
                    return "Failed to update points ref. Using existing version."
                default:
                    return ""
            }
        })

        return { isUpdating, updateMessage }    
    }
}
</script>

<style>

</style>