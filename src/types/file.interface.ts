export interface FileAttribute {
  atributes: string;
  height: number;
  name: string;
  orientation: string;
  relativePath: string;
  type: string;
  unique_name: string;
  width: number;
}

export interface File {
  id: number;
  filesystem_id: number;
  name: string;
  field_name: string;
  url: string;
  size: number;
  file_type: string;
  attributes: FileAttribute;
  created_at: string;
}