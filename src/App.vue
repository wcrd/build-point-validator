<template>
  <div class="flex h-screen flex-col">
    <NavigationHeader @load-csv-data="loadUserInputFile" @validate="validate"/>
    <Home />
  </div>
</template>

<script>
  import Home from './pages/Home.vue'
  import NavigationHeader from './components/NavigationHeader.vue'
  import { useStore } from 'vuex'
  import { onMounted } from 'vue'
  import { buildFileLoader, loadReferencePoints, updateReferencePoints, forage } from './utils/fileLoaders'
  import { listen } from '@tauri-apps/api/event'
  
  export default {
    name: 'App',
    components: {Home, NavigationHeader},
    setup() {
      const store = useStore();

      const loadUserInputFile = async () => {
        store.commit("setIsLoading", true);
        const data = await buildFileLoader();
        store.dispatch('processTableData', data)
      }

      const validate = async () => {
        store.commit("setIsValidating", true);
        // get seletected column name
        const column = store.state.selectedColumn
        store.dispatch('validateTableData', column);
        
      }

      const setReferencePoints = async () => {
        const data = await loadReferencePoints()
        store.commit('setPointsRef', data)
      }

      onMounted(async () => {
        setReferencePoints()
      })

      // Rust Event listener
      listen('update-point-ref', async () => {
        store.commit('setUpdateStatus', "pending");
        store.commit('setIsUpdatingPointsRef', true)
        const result = await updateReferencePoints();
        if(result){
            store.commit('setUpdateStatus', "success")
            await setReferencePoints();
          } else {
            store.commit('setUpdateStatus', 'failed')
          }
        setTimeout(() => {
          store.commit('setIsUpdatingPointsRef', false)
        }, 3000);
      } );


      window.debug = { validate, loadUserInputFile, store, loadReferencePoints, updateReferencePoints, forage }
      return { loadUserInputFile, validate }
    }
  }
</script>

<style>
</style>
