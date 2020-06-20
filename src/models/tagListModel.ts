const localStorageKeyName = 'tagList';
type Tag = {
 id: string;
 name: string;
}
type TagListModel = {
 data: Tag[];
 initDate: string;
 fetch: () => Tag[];
 create: (name: string) => 'success' | 'duplicated';
 save: () => void;
}

const tagListModel: TagListModel = {
 data:[],
 initDate:'["衣","食","住","行"]',
 fetch() {
  this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
  return this.data
 },
 create(name){
  const names = this.data.map(item => item.name)
  if(names.indexOf(name)>=0){return 'duplicated'}
  this.data.push({id:name,name:name})
  this.save()
  return 'success'
 },
 save() {
  window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
 },

};

export default tagListModel;