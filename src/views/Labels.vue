<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`" class="tag">
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-Wrapper">
        <Button class="createTag" @click="createTag">新建标签</Button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
 import {Component} from 'vue-property-decorator';
 import Button from '@/components/Button.vue';
 import TagHelper from '@/mixins/TagHelper';
 import {mixins} from 'vue-class-component';


 @Component({
  components: {Button},
 })
 export default class Labels extends mixins(TagHelper) {
  get tags(){
   return this.$store.state.tagList
  }
  created(){
   this.$store.commit('fetchTags')
  }


 }
</script>

<style lang='scss' scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    max-height:80vh ;
    overflow: auto;
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f6e0ae;

      svg {
        width: 22px;
        height: 22px;
        color: darksalmon;
        margin-right: 16px;
      }
    }
  }

  .createTag {

    &-Wrapper {
      max-height: 20vh;
      text-align: center;
      padding: 16px;
    }
  }
</style>