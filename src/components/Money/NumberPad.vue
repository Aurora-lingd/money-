<template>
  <div class="numberPad">
    {{num}} {{count1}}
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">{{OK}}</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button @click="clear">清空</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    output = '0';
    OK = 'OK';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    num: Array<any> = [];
    count1 = 0;
    count2= 0

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent as string;
     if (input === '+' || input === '-') {
       if (this.output.indexOf('+') >= 0 || this.output.indexOf('-') >= 0) {
        this.count1 = 0
       }
       if (this.num.length === 0){
         this.num.push(this.output);
         this.OK = '=';
       }else {
         this.num.push(this.output);
       }
      this.count1 +=1
     } else if (this.output.indexOf('+') >= 0 || this.output.indexOf('-') >= 0) {
       this.output = input;
       return;
     }

     if(this.count1 >= 2){
      let result
      console.log('hi')
      console.log(this.num)
      const n = this.num.map(i=>parseFloat(i))
      this.num.length = 0
      if(input === '+'){
       result = (n[0]+n[1]).toString()
      }
      if (input === '-'){
       result = (n[0]-n[1]).toString()
      }
      console.log(n)
      this.num.push(result)
      this.output = this.num[0]
      this.count1 = 1
     }

      if (this.output.length === 16) {
        return;
      }
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }
      if (this.output.indexOf('+') >= 0 && input === '+') {
       this.num.pop();
        return;
      }
     if(this.output[0] == '-'  ){
      if(this.output.slice(1).indexOf('-') >= 0 && input === '-'){
       this.num.pop();
       console.log('fuck')
       return;
      }

     }else if (this.output.indexOf('-') >= 0 && input === '-'){
      this.num.pop();
      console.log('fuck')
      return;
     }

     // if(this.output.slice(1).indexOf('-')&& input === '+' ){
     //  this.output = this.output.replace('-','+')
     //  return;
     // }

      // if(this.output.indexOf('-')&& input === '+' ){
      //  this.output = this.output.replace('-','+')
      //  return;
      // }


     if(this.output.indexOf('+')&& input === '-' ){
      console.log(this.output);
      this.output = this.output.replace('+','-')
      console.log(this.output);
      if (this.output.indexOf('--')>=0){
       this.output = this.output.replace('--','-')
      }
      this.num.length = 1
     }


      this.output += input;

    }


    clear() {
      this.output = '0';
      this.num.length = 0;
      this.count1 = 0
    }

    ok() {
     if(this.OK === 'ok'){
      const  number = parseFloat(this.output)
      this.$emit('update:value',number)
      this.$emit('submit',number)
      this.output = '0'
     }
    }

  }
</script>

<style lang='scss' scoped>
  @import "~@/assets/style/helper.scss";

  .numberPad {
    .output {
      @extend %clearfix;
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      height: 72px;
    }

    .buttons {
      > button {
        width: 25%;
        height: 64px;
        float: left;
        background: transparent;
        border: none;

        &.ok {
          height: 64 * 2px;
          float: right;
        }

        $bg: rgb(250, 237, 175);

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2),
        &:nth-child(5) {
          background: darken($bg, 3%);
        }

        &:nth-child(3),
        &:nth-child(6),
        &:nth-child(9) {
          background: darken($bg, 3 * 2%);
        }

        &:nth-child(4),
        &:nth-child(7),
        &:nth-child(10),
        &:nth-child(13) {
          background: darken($bg, 3 * 3%);
        }

        &:nth-child(8),
        &:nth-child(11),
        &:nth-child(14) {
          background: darken($bg, 3 * 4%);
        }

        &:nth-child(15) {
          background: darken($bg, 3 * 5%);
        }

        &:nth-child(12) {
          background: darken($bg, 3 * 6%);
        }
      }
    }
  }
</style>