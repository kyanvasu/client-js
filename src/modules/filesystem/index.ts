import HttpClient from 'core/http-client';
import Base from 'modules/base';
import { File, RNMobileFileSignature } from 'types/file.interface';

export interface UploadOptionsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUploadProgress?: (event: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDownloadProgress?: (event: any) => void;
}

export default class FileSystem extends Base {
  public files: string[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient, '/filesystem');
  }

  /**
   * @description handle the file uploading to the server
   * @param file {Blob | Blob[]} file to be uploaded
   * @param fieldName {string | undefined} name of the file to be upload
   * @param options {UploadOptionsInterface | undefined} custom options to get from the file upload
   */
  public async upload(file: Blob, fieldName?: string, options?: UploadOptionsInterface): Promise<File[]> 
  public async upload(file: Blob[], fieldName?: string, options?: UploadOptionsInterface): Promise<File[]> 
  public async upload(files: Blob | Blob[], fieldName: string = 'files', options?: UploadOptionsInterface): Promise<File[]> {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((item, index)  => {
        formData.append(`${fieldName}-${index}`, item);
      })
    } else {
      formData.append(fieldName, files);
    }
    const { data } = await this.http.request<File[]>({
      method: 'POST',
      url: this.baseUrl,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
      onUploadProgress: options?.onUploadProgress,
      onDownloadProgress: options?.onDownloadProgress,
    });

    return data;
  }

  /**
   * @description - File upload used on mobile devices (React Native)
   * @param file {RNMobileFileSignature} | RNMobileFileSignature[] - React Native file signature
   * @returns Promise<File[]>
   */
  public async uploadFromMobile(
    f: RNMobileFileSignature | RNMobileFileSignature[],
    fieldName?: string
  ): Promise<File[]> {
    if (Array.isArray(f)) {
      return this.upload(f as unknown as Blob[], fieldName);
    } else {
      return this.upload(f as unknown as Blob, fieldName);
    }
    
  }
}