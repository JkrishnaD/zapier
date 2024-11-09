import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import base58 from "bs58";

const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/fVEJUnXkNlIX5N2L2vaNcVz-AFbhz6dJ"
);

export async function sendSolana(to: string, amount: string) {
  const keypair = Keypair.fromSecretKey(
    base58.decode(process.env.SOL_PRIVATE_KEY || "")
  );
  
  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: new PublicKey(to),
      lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
    })
  );

  await sendAndConfirmTransaction(connection, transferTransaction, [keypair]);
}
