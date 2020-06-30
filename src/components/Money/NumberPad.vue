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
  type = '';
  output = '0';
  OK = 'OK';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  num: Array<any> = [];
  count1 = 0;
  count2 = 0;

  inputContent(event: MouseEvent) {
   const button = (event.target as HTMLButtonElement);
   const input = button.textContent as string;
   if (input === '+' || input === '-') {
    // if (this.output.indexOf('+') >= 0) {
    //  this.count1 = 0;
    // }
    // if (this.output.indexOf('-') >= 0) {
    //  this.count1 = 0;
    // }
    if (this.num.length === 0) {
     this.num.push(this.output);
    } else {
     this.num.push(this.output);
    }
   } else if (this.output.indexOf('+') >= 0 || this.output.indexOf('-') >= 0) {
    this.output = input;
    return;
   }

   if (this.output.indexOf('+') === -1 && input === '+') {
    if (this.count1 <= 1){
     this.num.push('+')
    }
    this.count1 += 1
   }
   if (this.output.slice(1).indexOf('-') === -1 && input === '-') {
    if (this.count1 <= 1){
     this.num.push('-')
    }
    this.count1 += 1
   }
   console.log(this.count1)


   if (this.num.indexOf('+') && input === '-' ){
    this.num[1] = '-'
    //this.num = this.num.slice(0,2)
    console.log(this.num)
    this.count1 = 1
   }
   if (this.count1 >= 2) {
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
    this.count1 = 1;
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
   if (this.output[0] == '-') {
    if (this.output.slice(1).indexOf('-') >= 0 && input === '-') {
     this.num.pop();
     return;
    }
   } else if (this.output.indexOf('-') >= 0 && input === '-') {
    this.num.pop();
    return;
   }

   // if (this.num.indexOf('+') >= 0) {
   //  if (input === '-') {
   //   console.log('fuck-----------------');
   //   this.output = this.output.replace('+', '');
   //   this.num.pop();
   //
   //  }
   // }
   if (this.output[0] !== '-' && this.output.indexOf('-') >= 0) {
    if (input === '+') {
     this.output = this.output.replace('-', '');
     this.num.pop();
    }
   }
   if (this.output[0] == '-' && this.output.indexOf('-') >= 0) {
    if (input === '+') {
     this.output = '-' + this.output.slice(1).replace('-', '');
     this.num.pop();
    }
   }
   console.log(this.num);


   this.output += input;

  }

  clear() {
   this.output = '0';
   this.num.length = 0;
   this.count1 = 0;
  }

  ok() {
   if (this.OK === 'OK') {
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number);
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