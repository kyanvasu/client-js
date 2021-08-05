import HttpClient from 'core/http-client';
import Base from 'modules/base';

export default class FileSystem extends Base {
  public files: string[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient, '/filesystem');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public upload(file: Blob): Promise<any> {
    const formData = new FormData();
    formData.append('files', file);

    return this.http.request({
      url: `${this.baseUrl}`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  }
}