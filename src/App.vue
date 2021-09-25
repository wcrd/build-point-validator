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
  import { buildFileLoader, loadBasePointsReference } from './utils/fileLoaders'
  
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

      onMounted(async () => {
        const data = loadBasePointsReference()
        store.commit('setPointsRef', data)
      })


      const getStore = () => {
        // return window.ipcRenderer.invoke('get-store')
      }
      const clearStore = () => {
        // return window.ipcRenderer.invoke('delete-store')
      }
      const replaceStore = () => {
        // return window.ipcRenderer.invoke('replace-store')
      }


      window.debug = { validate, loadUserInputFile, store, getStore, clearStore, replaceStore, loadBasePointsReference }
      return { loadUserInputFile, validate }
    }
  }
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
