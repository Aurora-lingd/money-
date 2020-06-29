<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <ol v-if="groupedList.length >0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span> </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{item.tags}}</span>
              <div class="content">
                <span class="notes">{{item.notes}}</span>
                <span>￥{{item.amount}}</span></div>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        目前没有相关记录
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
 import Vue from 'vue';
 import {Component} from 'vue-property-decorator';
 import Tabs from '@/components/Tabs.vue';
 import recordTypeList from '@/constants/recordTypeList';
 import dayjs from 'dayjs';
 import clone from '@/lib/clone';

 @Component({
  components: {Tabs}
 })
 export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  beautify(string: string) {
   return dayjs(string).format('YYYY年MM月DD日');
  }

  get recordList() {
   return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
   const {recordList} = this;
   const newList = clone(recordList).filter(r=>r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
   if (newList.length === 0) {
    return [] ;
   }
   type Result = {title: string;total?: number;items: RecordItem[]}[]
   const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items: [newList[0]]}];
   for (let i = 1; i < newList.length; i++) {
    const current = newList[i];
    const last = result[result.length - 1];
    if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
     last.items.push(current);
    } else {
     result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
    }
   }
   result.map(group=>{
    group.total = group.items.reduce((sum,item)=> sum+ item.amount,0)
   })
   return result
  }

  created() {
   this.$store.commit('fetchRecords');
  }
 }
</script>

<style lang='scss' scoped>
  .noResult{
    padding: 16px;
    text-align: center;
  }
  ::v-deep {
    .type-tabs-item {
      background: white;
      &.selected {
        background: #f8e484;
        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    background: whitesmoke;
    @extend %item;
    font-size: 14px;
  }

  .record {
    @extend %item;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }

  .content {
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
</style>