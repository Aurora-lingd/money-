<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-Wrapper">
      <FormItem field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script>
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from "@/models/tagListModel";
  import FormItem from "@/components/Money/FormItem";
  import Button from "@/components/Button";

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    created() {
      const id = this.$route.params.id
      tagListModel.fetch
      const tags = tagListModel.data
      const tag = tags.filter(t => t.id === id)[0]
      if (tag) {
        console.log(tag);
      } else {
        this.$router.replace('/404')
      }
    }
  }
</script>

<style lang='scss' scoped>
.navBar{
text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gainsboro;
  >.title{

  }
  >.leftIcon{
    width: 24px;
    height: 24px;
    color: darksalmon;
  }
  .rightIcon{
    width: 24px;
    height: 24px;

  }
}
  .form-Wrapper{
    background: white;
  }
  .button-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>