import FORTU_ABI from '../abis/fortupool.json';
import USDE_ABI from '../abis/usde.json';
import FORTU_RECEIVER from '../abis/fortureceiver.json'
const abis = {
    FORTU_POOL: {
        address: `0xDd6A3589d26ED19A59E333E95b1e7F8AF63aF188`,
        abi: FORTU_ABI
    },
    USDE: {
        address: `0x9e06Ac052e5929744485F2D350A9b98e2F74e1A4`,
        abi: USDE_ABI
    },
    FORTU_RECEIVER: {
        address: `0x4a7e391f1c436d27f01C308120A3DE8aBA839F2d`,
        abi: FORTU_RECEIVER
    }
};

export default abis;