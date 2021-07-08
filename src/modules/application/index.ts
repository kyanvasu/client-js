/* eslint-disable @typescript-eslint/camelcase */
import HttpClient from 'core/http-client';
import Base from 'modules/base';
import ApplicationSettings from 'types/application-settings';

export default class Application extends Base {
  constructor(http: HttpClient) {
    super(http);
  }

  async get(): Promise<ApplicationSettings> {
    const { data } = await this.http.request<ApplicationSettings>({
      url: `/apps/{}/settings`
    }, false);

    data.settings.allow_user_registration = Boolean(Number(data.settings.allow_user_registration));
    data.settings.public_images = Boolean(Number(data.settings.public_images));
    data.settings.show_notifications = Boolean(Number(data.settings.show_notifications));
    data.settings['user-settings'] = Boolean(Number(data.settings['user-settings']));

    return data;
  }
}