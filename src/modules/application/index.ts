/* eslint-disable @typescript-eslint/camelcase */
import HttpClient from 'core/http-client';
import Base from 'modules/base';
import ApplicationSettings from 'types/application-settings';

/**
 * @description Handles all application related operations.
 *
 * @class Application
 * @extends {Base}
 */
export default class Application extends Base {
  constructor(http: HttpClient) {
    super(http, '/apps');
  }

  /**
   * @description Get settings for the current defined application.
   *
   * @return {Promise<ApplicationSettings>}
   */
  async getSettings(): Promise<ApplicationSettings> {
    const { data } = await this.http.request<ApplicationSettings>({
      url: `${this.baseUrl}/${this.http.options.appKey}/settings`
    }, false);

    // We need to overwrite variables from the API response into the correct expected data type.
    data.settings.allow_user_registration = Boolean(Number(data.settings.allow_user_registration));
    data.settings.public_images = Boolean(Number(data.settings.public_images));
    data.settings.show_notifications = Boolean(Number(data.settings.show_notifications));
    data.settings['user-settings'] = Boolean(Number(data.settings['user-settings']));

    return data;
  }
}