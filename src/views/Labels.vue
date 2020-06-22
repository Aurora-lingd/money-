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
 import Vue from 'vue';
 import {Component} from 'vue-property-decorator';
 import tagListModel from '@/models/tagListModel';
 import Button from '@/components/Button.vue';

 @Component({
  components: {Button}
 })
 export default class Labels extends Vue {
  tags = window.tagList;

  createTag() {
   const name = window.prompt('请输出标签名');
   if (name) {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
     window.alert('标签名重复');
    } else if (message === 'success') {
     window.alert('添加成功');
     window.scrollTo(0, 99999)//每次东西加载一次，就滚动一次
    }
   }
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