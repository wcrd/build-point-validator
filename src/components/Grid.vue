<template>
  <div class="flex-grow flex overflow-x-auto" id="grid">
    <v-grid
      ref="vgrid"
      theme="compact"
      :source="source"
      :columns="columns"
      :resize="true"
      :autoSizeColumn="columnSetup"
      :filter="true"
      :row-headers="true"
      :exporting="true"
    ></v-grid>
  </div>
</template>
 
<script>
import VGrid from "@revolist/vue3-datagrid";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
// import { onUpdated } from "vue";

export default {
  name: "Grid",
  setup() {
    const store = useStore();
    // const vgrid = ref(0);

    const columnSetup = {
      mode: "headerClickAutosize",
      allColumns: true,
    };

    const source = computed(() => store.state.table_data);
    const columns = computed(() => store.state.table_headers);

    return { columnSetup, source, columns };
  },
  components: {
    VGrid,
  },
};
</script>