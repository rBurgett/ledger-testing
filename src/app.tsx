import React, { useState } from 'react';
import { listen } from '@ledgerhq/logs';
import AppBtc from '@ledgerhq/hw-app-btc';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import AppPokt from 'hw-app-pokt';

export const App = () => {

  const [ bitcoinAddress, setBitcoinAddress ] = useState('');
  const [ poktAddress, setPoktAddress ] = useState('');

  const onConnectBitcoinClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const transport = await TransportWebHID.create();
      listen((log) => console.log(log.type + ': ' + log.message));
      const appBtc = new AppBtc({transport});
      const { bitcoinAddress } = await appBtc.getWalletPublicKey(
        `84'/0'/0'/0/4`,
        { verify: false, format: 'bech32'}
      );
      setBitcoinAddress(bitcoinAddress);
      await transport.close();
    } catch(err: any) {
      console.error(err);
    }
  };

  const onConnectPoktClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const transport = await TransportWebHID.create();
      listen((log) => console.log(log.type + ': ' + log.message));
      const appPokt = new AppPokt(transport);
      const signer = await appPokt.getSigner(`44'/635'/0'/0/0`);
      setPoktAddress(signer.getAddress());
      await transport.close();
    } catch(err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Ledger Testing</h1>

      <div>
        <button type={'button'} onClick={onConnectBitcoinClick}>Connect Bitcoin!</button>
      </div>
      {bitcoinAddress ?
        <p>
          <strong>Bitcoin Address:</strong> {bitcoinAddress}
        </p>
        :
        null
      }

      <div>
        <button type={'button'} onClick={onConnectPoktClick}>Connect POKT!</button>
      </div>
      {poktAddress ?
        <p>
          <strong>POKT Address:</strong> {poktAddress}
        </p>
        :
        null
      }

    </div>
  );
};
