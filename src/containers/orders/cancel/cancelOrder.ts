import { CancelOrder as Action } from '@favid-inc/api/lib/app-customer';

import { apiClient } from '@src/core/utils/apiClient';

export async function cancelOrder(data: Action['Request']['data']): Promise<Action['Response']> {
  const request: Action['Request'] = {
    url: '/CancelOrder',
    method: 'POST',
    data,
  };

  const response = await apiClient.request<Action['Response']>(request);

  return response.data;
}
