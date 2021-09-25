<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected overflow-x-hidden whitespace-nowrap" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="`${option}${i}`"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
        :title="option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  watch:{
      default: function(newVal){
          this.selected = newVal
      }
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  updated() {
    this.$emit("input", this.selected);
  }
};
</script>

<style scoped>

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  /* height: 47px; */
  /* line-height: 47px; */
  /* line-height: 100% */
}

.custom-select .selected {
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #666666;
  color: black;
  padding-left: 0.5em;
  padding-right: 2em;
  cursor: pointer;
  user-select: none;
  width: 200px;
  overflow:hidden;
}

.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 40%;
  right: 0.5em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: dodgerblue transparent transparent transparent;
}

.custom-select .items {
  color: black;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 9999;
}

.custom-select .items div {
  color: black;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: lightblue;
}

.selectHide {
  display: none;
}
</style>