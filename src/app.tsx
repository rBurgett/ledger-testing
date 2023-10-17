import React from 'react';
import { listen } from '@ledgerhq/logs';
import AppBtc from '@ledgerhq/hw-app-btc';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

export const App = () => {

  const onConnectClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const transport = await TransportWebHID.create();
      listen((log) => console.log(log.type + ': ' + log.message));

    } catch(err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Ledger Testing</h1>
      <div>
        <button type={'button'} onClick={onConnectClick}>Connect!</button>
      </div>
    </div>
  );
}
