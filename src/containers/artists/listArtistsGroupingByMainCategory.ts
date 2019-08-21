import { ListArtistsGroupingByMainCategory as Action } from '@favid-inc/api/lib/app-customer';

import { apiClient } from '@src/core/utils/apiClient';

export async function listArtistsGroupingByMainCategory(): Promise<Action['Response']> {
  const request: Action['Request'] = {
    url: '/ListArtistsGroupingByMainCategory',
    method: 'GET',
  };

  const response = await apiClient.request<Action['Response']>(request);

  return response.data;
}
