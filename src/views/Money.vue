<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
      <Tabs :data-source="recordListType" :value.sync="record.type"/>
      <div class="notes">
        <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
      </div>
      <Tags />
    </Layout>
  </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import NumberPad from '@/components/Money/NumberPad.vue';
 import FormItem from '@/components/Money/FormItem.vue';
 import Tags from '@/components/Money/Tags.vue';
 import {Component} from 'vue-property-decorator';
 import recordTypeList from '@/constants/recordTypeList';
 import Tabs from '@/components/Tabs.vue';


 @Component({
  components: {Tabs, NumberPad,  FormItem, Tags},
 })
 export default class Money extends Vue {
  record: RecordItem = {
   tags: '衣', notes: '', type: '-', amount: 0
  };
  get recordList(){
   return this.$store.state.recordList
  }
  recordListType = recordTypeList
  created(){
   this.$store.commit('fetchRecords')
  }
  onUpdateNotes(value: string) {
   this.record.notes = value;
  }
  onUpdateAmount(value: string) {
   this.record.amount = parseFloat(value);
  }
  saveRecord() {
   this.$store.commit('createRecord',this.record)
  }
 }
</script>
<style lang='scss' scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>

<style lang='scss' scoped>
  @import "~@/assets/style/helper.scss";
</style>