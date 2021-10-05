export interface FileAttribute {
  atributes?: string;
  height: number;
  name?: string;
  orientation: string;
  relativePath?: string;
  type?: string;
  unique_name: string;
  width: number;
}

export interface File {
  id: number;
  filesystem_id?: number;
  name: string;
  field_name?: string;
  url: string;
  size: number;
  file_type: string;
  attributes: FileAttribute;
  created_at: string;
}


export interface RNMobileFileSignature {
  name: string; /* name from the file */
  type: string; /* mime type from the file */
  uri: string; /* file path */
}