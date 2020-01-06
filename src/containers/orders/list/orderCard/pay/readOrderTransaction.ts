import { ReadOrderTransaction as Action } from '@favid-inc/api/lib/app-customer';

import { apiClient } from '@src/core/utils/apiClient';

export async function readOrderTransaction(params: Action['Request']['params']): Promise<Action['Response']> {
  const request: Action['Request'] = {
    url: '/ReadOrderTransaction',
    method: 'GET',
    params,
  };

  const response = await apiClient.request<Action['Response']>(request);

  return response.data;
}
