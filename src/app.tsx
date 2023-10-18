import React, { useState } from 'react';
import { listen } from '@ledgerhq/logs';
import AppBtc from '@ledgerhq/hw-app-btc';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

export const App = () => {

  const [ bitcoinAddress, setBitcoinAddress ] = useState('');

  const onConnectClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const transport = await TransportWebHID.create();
      listen((log) => console.log(log.type + ': ' + log.message));
      const appBtc = new AppBtc({transport});
      const { bitcoinAddress } = await appBtc.getWalletPublicKey(
        // `44'/0'/0'/0/0`,
        `84'/0'/0'/0/4`,
        { verify: false, format: 'bech32'}
      );
      setBitcoinAddress(bitcoinAddress);
    } catch(err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Ledger Testing</h1>
      <div>
        <button type={'button'} onClick={onConnectClick}>Connect Bitcoin!</button>
      </div>
      {bitcoinAddress ?
        <p>
          <strong>Bitcoin Address:</strong> {bitcoinAddress}
        </p>
        :
        null
      }
    </div>
  );
}
