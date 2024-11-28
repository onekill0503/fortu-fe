import FORTU_ABI from '../abis/fortupool.json';
import USDE_ABI from '../abis/usde.json';
import FORTU_RECEIVER from '../abis/fortureceiver.json'
import SUSDE_ABI from '../abis/susde.json'
const abis = {
    FORTU_POOL: {
        address: `0x30625ef5B41D1830AE58572E7176CEfB1D7994a3`,
        abi: FORTU_ABI
    },
    USDE: {
        address: `0x9e06Ac052e5929744485F2D350A9b98e2F74e1A4`,
        abi: USDE_ABI
    },
    SUSDE: {
        address: `0x51fFD3785c15cb59a7287b7C18cb16C0F1d2915b`,
        abi: SUSDE_ABI
    },
    FORTU_RECEIVER: {
        address: `0x4a7e391f1c436d27f01C308120A3DE8aBA839F2d`,
        abi: FORTU_RECEIVER
    }
};

export default abis;