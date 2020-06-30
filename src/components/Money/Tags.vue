<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          @click="toggle(tag.name)"
      >
        <div class="iconTag" :class="{selected:selected === tag.name}">
          <Icon :name="tag.iconName"></Icon>
        </div>
        <span>{{tag.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component({
  })
  export default class Tags extends mixins(TagHelper) {
    selected  = '';
    get tagList(){
     return this.$store.state.tagList
    }
    toggle(tag: string) {
      // const index = this.selectedTags.indexOf(tag);
      // if (index >= 0) {
      //   this.selectedTags.splice(index, 1);
      // } else {
      //   this.selectedTags.push(tag);
      // }
      this.selected = tag
      this.$emit('update:value',this.selected)
    }

    created(){
     this.$store.commit('fetchTags')
      if(this.$store.state.tagList){
        this.selected = this.$store.state.tagList[0].name
       this.$emit('update:value',this.selected)
      }
    }

  }
</script>

<style lang='scss' scoped>
  .tags {
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      overflow: auto;
      display: flex;
      flex-wrap: wrap;

      > li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 20%;
        margin-bottom: 10px;
        >.iconTag{
          width:40px ;
          height: 40px;
          border-radius: 50%;
          line-height: 40px;
          text-align: center;
          font-size: 24px;
          &.selected {
            background: #f8c34b;
            color: white;

          }
        }
      }

    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 3px;
      }
    }
  }
</style>