import { Address, TonClient, TupleBuilder } from "@ton/ton";

async function main() {
  // Initializaing TON HTTP API client
  const tonClient = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  });

  // Building optional get method parameters list
  const builder = new TupleBuilder();

  // Replace with your address
  builder.writeAddress(Address.parse('0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-'));

  const accountAddress = Address.parse('kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy')

  // Calling HTTP API to run get method on specific contract
  const result = await tonClient.runMethod(
    accountAddress, // Address to call get method on
    'get_wallet_address', // Method name
    builder.build(), // Optional params list
  );

  // Deserializing get method result
  const rawAddress = result.stack.readAddress();

  console.log("Raw address:", rawAddress.toRawString());
  console.log("User-friendly address:", rawAddress.toString({ bounceable: true, urlSafe: true, testOnly: true}));

}

main();