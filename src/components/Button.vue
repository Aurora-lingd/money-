<template>
  <button class="button" @click="$emit('click',$event)" ><slot/> </button>
</template>

<script>
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }
</script>

<style lang='scss' scoped>
  .button {
    background: rgba(119, 164, 245, 0.98);
    color: whitesmoke;
    border-radius: 4px;
    border: none;
    height: 34px;
    padding: 0 12px;

    &-Wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>