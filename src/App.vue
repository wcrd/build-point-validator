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
  
  export default {
    name: 'App',
    components: {Home, NavigationHeader},
    setup() {
      const store = useStore();

      const loadUserInputFile = async () => {
        // store.commit("setIsLoading", true);
        // const data = await window.ipcRenderer.invoke('open-build-file')
        // store.dispatch('processTableData', data)
      }

      const validate = async () => {
        // get seletected column name
        const column = store.state.selectedColumn
        store.dispatch('validateTableData', column);
        
      }

      onMounted(async () => {
        // const data = await window.ipcRenderer.invoke('load-base-pointsRef')
        // store.commit('setPointsRef', data)
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


      window.debug = { validate, loadUserInputFile, store, getStore, clearStore, replaceStore }
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
