import { Address, TonClient } from "@ton/ton";

async function main() {
  // Initializaing TON HTTP API Client
  const tonClient = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  });

  // Calling method on http api
  // full api: https://testnet.toncenter.com/api/v2/#/accounts/get_transactions_getTransactions_get
  const transactions = await tonClient.getTransactions(
    // Replace with your Testnet address to fetch transactions
    Address.parse('0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-'),
    {
      limit: 10,      //maximum ammount of recieved transactions
      archival: true, //search in all history
    },
  );

  const firstTx = transactions[0];
  const { inMessage } = firstTx;

  console.log('Timestamp:', firstTx.now);
  if (inMessage?.info?.type === 'internal') {
    console.log('Value:', inMessage.info.value.coins);
    console.log('Sender:', inMessage.info.src.toString({ testOnly: true }));
  }
}

main();