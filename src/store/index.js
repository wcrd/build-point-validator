import { createStore } from 'vuex'
const POINT_NAME_COLUMNS = ['Point Name', 'PointName', 'Point_Name', 'Point-Name', 'Sensor Name', 'Sensor_Name']

export default createStore({
  state: {
    table_data: [],
    table_headers: [],
    isDataLoaded: false,
    isLoading: false,
    isValidating: false,
    pointsRef: {},
    selectedColumn: '',
    optionsData: ['(No columns available)'],
    defaultColumn: null
  },
  mutations: {
    setTableData(state, payload) {
      state.table_data = payload
    },
    setHeaderData(state, payload) {
      state.table_headers = payload
    },
    setIsDataLoaded(state, payload) {
      state.isDataLoaded = payload
    },
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setIsValidating(state, payload) {
      state.isValidating = payload
    },
    setPointsRef(state, payload){
      state.pointsRef = payload
    },
    setSelectedColumn(state, payload){
      state.selectedColumn = payload
    },
    setOptionsData(state, payload){
      state.optionsData = payload
    },
    setDefaultColumn(state, payload){
      state.defaultColumn = payload
    }
  },
  getters: {
    guessPointNameColumn: (state) => {
      const cols = [ ...state.optionsData]
      for (let name of POINT_NAME_COLUMNS){
        if ( cols.includes(name)){
          return name
        }
      }
      return null
    }
  },
  actions: {
    processTableData({ commit, dispatch }, csv_data) {
      
      // Properties for Validator column
      // const validatorColumnProperties = {}
      const validatorCellProperties = (props) => {
        const val = props.model[props.prop]
        let color;
        if (val == "Valid") {
          color = '#02ab92'
        } else if (val == "N/A") {
          color = 'lightgray'
        } else if (val == "") {
          color = "lightgray"
        } else {
          color = '#ff5d5d'
        }
        return {
          style: {
            ['background-color']: color
          },
        }
      };
      // generate header object for Revu Grid
      // generate options list for column selector
      const headers = [];
      const options = [];
      for (let name of Object.keys(csv_data[0])) {
        const columnConfig = {
          name,
          prop: name,
          sortable: true,
          size: 300,
          columnProperties: () => {
            return {
              style: {
                ['background-color']: '#f5f9ff'
              }
            }
          }
        }
        if (name == "::Validation::") {
          columnConfig.cellProperties = validatorCellProperties
          columnConfig.pin = 'colPinEnd'
          columnConfig.size = 200
          columnConfig.filter = false
        } else {
          options.push(name) // add to column selector dropdown
        }
        headers.push(columnConfig);
      }
      commit('setHeaderData', headers);
      commit('setTableData', csv_data);
      commit('setOptionsData', options)
      commit('setIsDataLoaded', true)
      commit("setIsLoading", false);
      dispatch("guessPointNameColumn")

    },
    validateTableData({commit, state }, columnToValidate){
      commit("setIsValidating", true);
      // validate header

      // validate
      const data = JSON.parse(JSON.stringify(state.table_data))
      for (let row in data){
        const cell_value = data[row][columnToValidate]
        if(cell_value == "" || cell_value == undefined){
            data[row]["::Validation::"] = "N/A"
        } else {
          if(Object.prototype.hasOwnProperty.call(state.pointsRef, cell_value)){
            data[row]["::Validation::"] = "Valid"
          } else {
            data[row]["::Validation::"] = "Not a valid point name"
          }
        }
      }

      // update state
      commit('setTableData', data)
      commit("setIsValidating", false);
    },
    guessPointNameColumn({commit, state}){
      const cols = [ ...state.optionsData]
      for (let name of POINT_NAME_COLUMNS){
        if ( cols.includes(name)){
          commit('setDefaultColumn', name)
          break
        }
      }
    },
    // Not used
    setValidatorHighlighting({ commit }, table_data) {
      for (const row in table_data) {
        if (Object.prototype.hasOwnProperty.call(table_data[row], "Validation::Validation")) {
          // check state
          if (table_data[row]["Validation::Validation"] == "Valid.") {
            table_data[row]["Validation::Validation"] += " CHECKED"
          }
        }
      }
      commit('setTableData', table_data)
    },

  },
  modules: {
  }
})
