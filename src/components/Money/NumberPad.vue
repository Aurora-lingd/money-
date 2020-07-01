<template>
  <div class="numberPad">
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
      <button class="ok" @click="ok">OK</button>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  num: Array<any> = [];
  count = 0;

  inputContent(event: MouseEvent) {
   const button = (event.target as HTMLButtonElement);
   const input = button.textContent as string;

    if ((this.output.indexOf('+') >= 0 || this.output.indexOf('-') >= 0) && input !== '-' && input !== '+') {
     this.output = input;
     this.count = 1
     return;
    }
    if (this.output.indexOf('+') >= 0 && input === '-' ){
     return;
    }else if (this.output.indexOf('-') >= 0 && input === '+' ) {
     return;
    } else if (this.output.indexOf('+') >= 0 && input=== '+' ){
     console.log(this.num)
     this.count = 1
     return;
    }else if (this.output.indexOf('-') >= 0 && input=== '-' ) {
     console.log(this.num)
     this.count = 1
     return;
    } else {
    if (this.output.indexOf('+') >= 0 || this.output.indexOf('-') >= 0) {
     this.output = input;
     this.count = 1
     return;
    }
    if (input === '+' || input === '-') {
     this.num.push(this.output);
    }

    if (this.output.indexOf('+') === -1 && input === '+') {
     if (this.count <= 1){
      this.num.push('+')
     }
     this.count += 1
    }
    if (this.output.slice(1).indexOf('-') === -1 && input === '-') {
     if (this.count <= 1){
      this.num.push('-')
     }
     this.count += 1
    }
   }

   if (this.count >= 2) {
    let result;
    let n
    if (this.num.slice(0,3).indexOf('+') >= 0) {
     n = this.num.slice(0,3).join('').split('+').map(i => parseFloat(i))
     this.num = this.num.slice(3)
     result = (n[0] + n[1]).toString();
    }
    if (this.num.slice(1,3).indexOf('-') >= 0) {
     n = this.num.slice(0,3).join('').split('-').map(i => parseFloat(i))
     this.num = this.num.slice(3)
     result = (n[0] - n[1]).toString();
    }
    this.num.unshift(result);
    this.output = this.num[0];
    this.count = 1;
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
   this.output += input;

  }
  clear() {
   this.output = '0';
   this.num.length = 0;
   this.count = 0;
  }

  ok() {
   console.log(this.num.length);
   console.log(this.num);

   if (this.output.indexOf('+') >=0 || this.output.slice(1).indexOf('-') >= 0){
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number);
    this.output = '0';
   }else {
    this.num.push(this.output);
    let result;
    let n
    if (this.num.slice(0,3).indexOf('+') >= 0) {
     n = this.num.slice(0,3).join('').split('+').map(i => parseFloat(i))
     this.num = this.num.slice(3)
     result =n[0] + n[1]
    }
    if (this.num.slice(1,3).indexOf('-') >= 0) {
     n = this.num.slice(0,3).join('').split('-').map(i => parseFloat(i))
     this.num = this.num.slice(3)
     result = n[0] - n[1]
    }
    this.$emit('update:value', result);
    this.$emit('submit', result);
    this.output = '0';
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