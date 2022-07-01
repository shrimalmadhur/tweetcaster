import axios from "axios";
import { providers, Contract, utils, ethers, Signer } from "ethers";
import { Dispatch } from "react";
import { Wallet } from "@ethersproject/wallet";
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import didJWT from "did-jwt";

const username = "madhur";

function getNode() {
  return new providers.AlchemyProvider(
    "rinkeby",
    "_06SoRRazZklNfQo4XpjLqj0iRJ2A2mr"
  );
}

async function getContract() {
  const REGISTRY_CONTRACT_ADDRESS =
    "0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1";
  const provider = getNode();
  const REGISTRY_ABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "previousAdmin",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newAdmin",
          type: "address",
        },
      ],
      name: "AdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "beacon",
          type: "address",
        },
      ],
      name: "BeaconUpgraded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "ChangeTrustedForwarder",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "username",
          type: "bytes32",
        },
      ],
      name: "DeregisterName",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "username",
          type: "bytes32",
        },
      ],
      name: "ModifyName",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "username",
          type: "bytes32",
        },
      ],
      name: "RegisterName",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "username",
          type: "bytes32",
        },
      ],
      name: "TransferName",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "implementation",
          type: "address",
        },
      ],
      name: "Upgraded",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "addressToUsername",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "username",
          type: "bytes32",
        },
      ],
      name: "deregister",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "username",
          type: "bytes32",
        },
      ],
      name: "getDirectoryUrl",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_forwarder",
          type: "address",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "forwarder",
          type: "address",
        },
      ],
      name: "isTrustedForwarder",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
      ],
      name: "modify",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "username",
          type: "bytes32",
        },
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
      ],
      name: "register",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_forwarder",
          type: "address",
        },
      ],
      name: "setTrustedForwarder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "transfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
      ],
      name: "upgradeTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newImplementation",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "upgradeToAndCall",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "idx",
          type: "uint8",
        },
      ],
      name: "usernameAtIndex",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "usernameToUrl",
      outputs: [
        {
          internalType: "string",
          name: "url",
          type: "string",
        },
        {
          internalType: "bool",
          name: "initialized",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "usernamesLength",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  return new Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_ABI, provider);
}

function verifyCast(body: any, hash: any) {
  const calculatedHash = utils.keccak256(
    utils.toUtf8Bytes(JSON.stringify(body))
  );

  if (calculatedHash !== hash) {
    //   const index = addressActivityResponse.indexOf(i);
    //   addressActivityResponse.splice(index, 1);
    return false;
  } else {
    return true;
  }
}

export async function getAllCastsAndSet(setCast: Dispatch<any>) {
  const casts = await getAllCasts()
  setCast(casts);
}

export async function getAllCasts() {
  const registryContract = await getContract();

  const directoryUrl = await registryContract?.getDirectoryUrl(
    utils.formatBytes32String(username)
  );
  console.log("directoryUrl", directoryUrl);

  const directoryResponse = await axios.get(
    "/api/directory/" + encodeURIComponent(directoryUrl)
  );
  const casts = await (
    await axios.get(
      "/api/casts/" +
        encodeURIComponent(directoryResponse?.data.body.addressActivityUrl)
    )
  ).data;
  casts.filter((c: any) => verifyCast(c.body, c.merkleRoot));
  return casts;
}

async function getUserData() {
  const registryContract = await getContract();

  const directoryUrl = await registryContract?.getDirectoryUrl(
    utils.formatBytes32String(username)
  );

  const user = await (await axios.get(directoryUrl)).data;

  return user;
}


export function generatePkFromSeed(seed: any) {
  console.log(seed);
  return ethers.Wallet.fromMnemonic(seed, `m/44'/60'/0'/0/1230940800`).privateKey;
}

export async function postCast(
  privateKey: string | undefined,
  text: string, 
  signer1: Signer | undefined | null
) {

  // if (!signer1){
  //   console.log("No signer")
  //   return null
  // }

  if (!privateKey) {
    console.log("No SEED passed");
    return null
  }

  const signer = new Wallet(privateKey);
  const casts = await getAllCasts();
  const lastCast = casts[0];
  
  const unsignedCast = {
    type: 'text-short',
    publishedAt: Date.now(),
    sequence: lastCast.body.sequence + 1,
    username: 'madhur',
    address: lastCast.body.address,
    data: {
      text: text,
    },
    prevMerkleRoot: lastCast.merkleRoot,
  }

  const serializedCast = 
    JSON.stringify({
    type: unsignedCast.type,
    publishedAt: unsignedCast.publishedAt,
    sequence: unsignedCast.sequence,
    username: unsignedCast.username,
    address: unsignedCast.address,
    data: {
      text: unsignedCast.data.text,
      // replyParentMerkleRoot: unsignedCast.data.replyParentMerkleRoot,
    },
    prevMerkleRoot: unsignedCast.prevMerkleRoot,
  })

  console.log("unsignedCast", unsignedCast)
  
  const merkleRoot = keccak256(toUtf8Bytes(serializedCast));

  const signedCast = {
    body: unsignedCast,
    merkleRoot,
    signature: await signer.signMessage(merkleRoot),
  };
  
  console.log("signedCast", signedCast)

  console.log(didJWT)

  const jwt = await didJWT.createJWT(
    { 
      exp: Math.floor(Date.now() / 1000) + 60 
    },
    {
      issuer: `did:ethr:rinkeby:${lastCast.body.address}`,
      signer: didJWT.ES256KSigner(didJWT.hexToBytes(privateKey)),
    },
    { 
      alg: "ES256K" 
    }
  );

  const headers = {
    authorization: `Bearer ${jwt}`,
  };

  try {
    const result = await axios.post("/api/casts/create", signedCast, {
      headers: headers
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
};

// async function getPreviewCasts() {
//   const casts = await getAllCasts();
//   const deletedCasts: any[] = [];

//   return casts
//     .map(c => {
//         if(c.body.data.text.includes("delete:farcaster://casts")) {
//         deletedCasts.push(c.body.data.text.split("delete:farcaster://casts/")[1]);
//         }
//       return c;
//     })
//     .filter(c =>
//  (!c.body.data.replyParentMerkleRoot || c.meta.replyParentUsername?.username === username)
//   &&
//   !(c.body.data.text.includes("delete:farcaster://casts")
//     ||
//     c.body.data.text.includes("recast:farcaster://casts")
//     ||
//     deletedCasts.includes(c.merkleRoot)
//    )
//   ).map(c => {
//     return {
//       text: c.body.data.text,
//     date: new Date(c.body.publishedAt).toString().split(' ').slice(0, 4).join(' ')
//     }
//   })
// }

// async function isThereNewCasts(db: any) {
//   const casts = await getAllCasts();
//   const lastDbHash = await db.get("lastMerkleRoot");

//   if (casts[0].merkleRoot === lastDbHash) {
//     console.log("no new casts :(")
//     return false;
//   } else {
//     console.log('new casts 🎉')
//     await db.set("lastMerkleRoot", casts[0].merkleRoot);
//     return true;
//   }
// }
