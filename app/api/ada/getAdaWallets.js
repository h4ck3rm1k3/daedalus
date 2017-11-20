// @flow
import type { ApiWallets } from 'daedalus-client-api';
import { request } from './lib/request';

export type GetAdaWalletParams = {
  ca: string,
};

export const getAdaWallets = (
  { ca }: GetAdaWalletParams
  ): Promise<ApiWallets> => (
  request({
    hostname: 'localhost',
    method: 'GET',
    path: '/api/wallets',
    port: 8090,
    ca,
  })
);