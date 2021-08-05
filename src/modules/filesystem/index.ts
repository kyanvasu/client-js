import HttpClient from 'core/http-client';
import Base from 'modules/base';
import { File } from 'types/file.interface';

export default class FileSystem extends Base {
  public files: string[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient, '/filesystem');
  }

  public async upload(file: Blob): Promise<File> {
    const formData = new FormData();
    formData.append('files', file);

    const { data } = await this.http.request<File>({
      method: 'POST',
      url: this.baseUrl,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });

    return data;
  }
}