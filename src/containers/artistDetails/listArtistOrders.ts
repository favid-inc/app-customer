import { ListArtistOrders as Action } from '@favid-inc/api/lib/app-customer';

import { apiClient } from '@src/core/utils/apiClient';

export async function listArtistOrders(params: Action['Request']['params']): Promise<Action['Response']> {
  const request: Action['Request'] = {
    url: '/ListArtistOrders',
    method: 'GET',
    params,
  };

  const response = await apiClient.request<Action['Response']>(request);

  return response.data;
}
