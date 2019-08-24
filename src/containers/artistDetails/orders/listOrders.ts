import { ListOrders as Action } from '@favid-inc/api/lib/app-customer';

import { apiClient } from '@src/core/utils/apiClient';

export async function listOrders(artistId: number): Promise<Action['Response']> {
  const request: Action['Request'] = {
    url: '/ListOrders',
    query: `?artistId=${artistId}`,
    method: 'GET',
  };

  const response = await apiClient.request<Action['Response']>(request);

  return response.data;
}
