export default interface KanvasStorage extends Storage {
  setItem(key: string, value: string, options?: object): void;
}