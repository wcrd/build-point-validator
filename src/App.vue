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
  import { reloadWindow } from './utils/helpers'
  import { listen } from '@tauri-apps/api/event'
  
  export default {
    name: 'App',
    components: {Home, NavigationHeader},
    setup() {
      const store = useStore();

      const loadUserInputFile = async () => {
        store.commit("setIsLoading", true);
        store.commit("setLoadingStatus", "loading");
        try {
          const { data, filepath } = await buildFileLoader();
          if(data){
            store.dispatch('processTableData', data)
            store.commit('setFilepath', filepath)
          } else {
            store.commit("setIsLoading", false);
            console.log("No path provided.")
          }
        } catch(e) {
          store.commit("setLoadingStatus", "failed")
          console.log("Error reading file")
          console.log(e)
          setTimeout(() => store.commit("setIsLoading", false), 2500)
        }
       
      }

      const validate = async () => {
        store.commit("setIsValidating", true);
        // get seletected column name
        const column = store.state.selectedColumn
        store.dispatch('validateTableData', column);
        
      }

      const setReferencePoints = async () => {
        const data = await loadReferencePoints()
        store.commit('setPointsRef', data.data)
        store.commit('setPointsRefVersion', data.metadata.version)
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

      listen('reload-app', () => {
        console.log("Reload request received...")
        reloadWindow();
      });


      window.debug = { validate, loadUserInputFile, store, loadReferencePoints, updateReferencePoints, forage }
      return { loadUserInputFile, validate }
    }
  }
</script>

<style>
</style>
