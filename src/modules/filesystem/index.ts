import HttpClient from 'core/http-client';
import Base from 'modules/base';
import { File, RNMobileFileSignature } from 'types/file.interface';

export default class FileSystem extends Base {
  public files: string[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient, '/filesystem');
  }

  public async upload(file: Blob, fieldName?: string): Promise<File[]> 
  public async upload(file: Blob[], fieldName?: string): Promise<File[]> 
  public async upload(files: Blob | Blob[], fieldName: string = 'files'): Promise<File[]> {
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
      data: formData
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