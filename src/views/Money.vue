<template>
  <div>
    <Layout class-prefix="layout">
      {{recordList}}
      <NumberPad  @update:value="onUpdateAmount" @submit="saveRecord"/>
      <Types :value.sync="record.type" />
      <Notes @update:value="onUpdateNotes"/>
      <Tags :data-source.sync="tags" :value.sync="record.tags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

const tagList = tagListModel.fetch();

const recordList= recordListModel.fetch();

  @Component({
    components: {NumberPad, Types, Notes, Tags}
  })
  export default class Money extends Vue {
    tags = tagList;
    recordList: RecordItem[] = recordList;
    record: RecordItem = {
      tags:'衣',notes:'',type:'-',amount:0
    }

    onUpdateNotes(value: string) {
      this.record.notes = value
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value)
    }
    saveRecord(){
      const record2: RecordItem = recordListModel.clone(this.record)
      record2.createdAt = new Date()
      this.recordList.push(record2)
    }

    @Watch('recordList')
    onRecordListChange(){
      recordListModel.save(this.recordList)
    }


  }
</script>
<style lang='scss'>
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang='scss' scoped>
  @import "~@/assets/style/helper.scss";
</style>