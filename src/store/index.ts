import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
 state: {
  recordList: [],
  createRecordError: null,
  createTagError: null,
  tagList: [],
  currentTag: undefined
 } as RootState,
 mutations: {
  fetchRecords(state) {
   state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
  },
  createRecord(state, record: RecordItem) {
   const record2 = clone(record);
   record2.createdAt = new Date().toISOString();
   state.recordList.push(record2);
   store.commit('saveRecords');
  },
  saveRecords(state) {
   window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
  },
  fetchTags(state) {
   state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
   if (!state.tagList || state.tagList.length === 0) {
    store.state.tagList = [
     {id: '1', name: '日常', iconName: '日用品',},
     {id: '2', name: '餐饮', iconName: '餐饮',},
     {id: '3', name: '服饰', iconName: '服饰',},
     {id: '4', name: '交通', iconName: '交通',},
     {id: '5', name: '社交', iconName: '娱乐',},
     {id: '6', name: '医疗', iconName: '医疗健康',},
     {id: '7', name: '其他', iconName: '其他',}


    ]
    // store.commit('createTag', '日常');
    // store.commit('createTag', '餐饮');
    // store.commit('createTag', '服饰');
    // store.commit('createTag', '交通');
   }
  },
  createTag(state, name: string) {
   state.createTagError = null
   const names = state.tagList.map(item => item.name);
   if (names.indexOf(name) >= 0) {
    state.createTagError = new Error('tag name duplicated');
    return;
   }
   const id = createId().toString();
   state.tagList.push({id, name: name,iconName:'自定义'});
   store.commit('saveTags');
  },
  saveTags(state) {
   window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
  },
  setCurrentTag(state, id: string) {
   state.currentTag = state.tagList.filter(t => t.id === id)[0];
  },
  updateTag(state, payload: { id: string; name: string }) {
   const {id, name} = payload;
   const idList = state.tagList.map(item => item.id);
   if (idList.indexOf(id) >= 0) {
    const names = state.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
     window.alert('标签名重复');
    } else {
     const tag = state.tagList.filter(item => item.id === id)[0];
     tag.name = name;
     store.commit('saveTags');
    }
   }
  },
  removeTag(state, id: string) {
   let index = -1;
   for (let i = 0; i < state.tagList.length; i++) {
    if (state.tagList[i].id === id) {
     index = i;
     break;
    }
   }
   if (index >= 0) {
    state.tagList.splice(index, 1);
    store.commit('saveTags');
    router.back();
   } else {
    window.alert('删除失败');
   }

  },
 }
});

export default store;
