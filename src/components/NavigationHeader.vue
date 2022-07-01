<template>
  <nav>
    <div class="flex justify-between items-center bg-blue-500 px-2 h-10">
      <div class="flex flex-row gap-3 items-center">
        <div>
          <p class="text-white">Build Point Validator</p>
        </div>
        <div class="ml-5 text-gray-300 italic overflow-hidden">
          <p><span class="font-bold">file: </span><span :title="filepath">{{ getBaseName(filepath) }}</span></p>
        </div>
      </div>
      <div class="flex flex-row space-x-2 text-white">
        <div>
          <button
            @click="loadFile"
            class="border border-blue-900 rounded px-5 bg-blue-400 font-medium"
          >
            <p v-if="!isLoading">Load File</p>
            <ClipLoader v-else size="15px" />
          </button>
        </div>
        <div>
          Column to Validate:
        </div>
        <div>
          <CustomSelectElement @input="setOption" :options="optionsData" :default="defaultColumn"/>
        </div>
        <div>
          <button
            @click="validate"
            class="border rounded px-5 font-medium bg-theme-red"
            :disabled="!isDataLoaded || isValidating"
          >
            <p v-if="!isValidating">Validate</p>
            <ClipLoader v-else size="15px" />
          </button>
        </div>
        <div>
          <button
            @click="exportData"
            class="border rounded px-2 bg-theme-main font-medium"
            :disabled="!isDataLoaded"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import dateGenerator from "../utils/dateGenerator";
import ClipLoader from "./spinners/ClipLoader.vue";
import CustomSelectElement from "./elements/CustomSelectElement.vue"
import { getBaseName } from "../utils/helpers";

export default {
  components: { ClipLoader, CustomSelectElement },
  data() {
    return {
      // table_data: "",
    };
  },
  computed: {
    isDataLoaded() {
      return this.$store.state.isDataLoaded;
    },
    isValidating() {
      return this.$store.state.isValidating;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    optionsData() {
      return this.$store.state.optionsData
    },
    defaultColumn(){
      return this.$store.state.defaultColumn
    },
    filepath(){
      return this.$store.state.filepath || "no file loaded"
    }
  },
  methods: {
    setOption: function(payload){
      this.$store.commit('setSelectedColumn', payload)
    },
    loadFile: function () {
      this.$emit("load-csv-data");
    },
    validate: function () {
      this.$emit("validate");
    },
    exportData: function () {
      const grid = document.querySelector("revo-grid");
      if (grid) {
        grid.getPlugins().then((plugins) => {
          plugins.forEach((p) => {
            if (p.exportFile) {
              const exportPlugin = p;
              const filename = dateGenerator();
              exportPlugin.exportFile({ filename: filename });
            }
          });
        });
      } else {
        console.log("No data available");
      }
    },
    getBaseName: getBaseName,
  },
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>