type RecordItem = {
 tags: string;
 notes: string;
 type: string;
 amount: number;
 createdAt?: string;
}
type RootState = {
 recordList: RecordItem[];
 createRecordError: Error | null;
 createTagError: Error | null;
 tagList: Tag[];
 currentTag?: Tag;
}
type Tag = {
 id: string;
 name: string;
 iconName: string;
}
type TagListModel = {
 data: Tag[];
 initDate: string;
 fetch: () => Tag[];
 create: (name: string) => 'success' | 'duplicated';
 update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
 remove: (id: string) => boolean;
 save: () => void;
}
