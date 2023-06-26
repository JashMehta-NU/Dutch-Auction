import React, { useState } from 'react';
import contractAbi from "../contract/BasicDutchAuction.json";
import { ethers } from 'ethers';

const contractBytecode = "0x6101206040526000600155674563918244f400006002553480156200002357600080fd5b5060405162000f4e38038062000f4e833981810160405281019062000049919062000156565b43608081815250508260a081815250508160e081815250508060c0818152505060c05160e0516200007b9190620001e1565b60a0516200008a91906200022c565b600281905550436000819055503373ffffffffffffffffffffffffffffffffffffffff166101008173ffffffffffffffffffffffffffffffffffffffff168152505030600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505062000267565b600080fd5b6000819050919050565b62000130816200011b565b81146200013c57600080fd5b50565b600081519050620001508162000125565b92915050565b60008060006060848603121562000172576200017162000116565b5b600062000182868287016200013f565b935050602062000195868287016200013f565b9250506040620001a8868287016200013f565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620001ee826200011b565b9150620001fb836200011b565b92508282026200020b816200011b565b91508282048414831517620002255762000224620001b2565b5b5092915050565b600062000239826200011b565b915062000246836200011b565b9250828201905080821115620002615762000260620001b2565b5b92915050565b60805160a05160c05160e05161010051610c86620002c86000396000818161050b015261070c0152600081816103bb015261075d0152600081816107ac01526108150152600081816107840152610839015260006107f10152610c866000f3fe6080604052600436106100f35760003560e01c8063a6b513ee1161008a578063dfbf53ae11610059578063dfbf53ae146102db578063eaa9600b14610306578063f6b4dfb414610331578063fe24e86e1461035c576100f3565b8063a6b513ee1461022f578063c74465651461025a578063d3642a8814610285578063db2e1eed146102b0576100f3565b80636d26ec18116100c65780636d26ec18146101a45780638da5cb5b146101ae5780638e7ea5b2146101d9578063a035b1fe14610204576100f3565b806305062247146100f85780631d0806ae1461012357806325223bd41461014e5780633103ea6214610179575b600080fd5b34801561010457600080fd5b5061010d610387565b60405161011a9190610907565b60405180910390f35b34801561012f57600080fd5b5061013861038d565b6040516101459190610907565b60405180910390f35b34801561015a57600080fd5b50610163610393565b6040516101709190610963565b60405180910390f35b34801561018557600080fd5b5061018e6103b9565b60405161019b9190610907565b60405180910390f35b6101ac6103dd565b005b3480156101ba57600080fd5b506101c361070a565b6040516101d09190610963565b60405180910390f35b3480156101e557600080fd5b506101ee61072e565b6040516101fb9190610963565b60405180910390f35b34801561021057600080fd5b50610219610758565b6040516102269190610907565b60405180910390f35b34801561023b57600080fd5b506102446107e9565b6040516102519190610907565b60405180910390f35b34801561026657600080fd5b5061026f6107ef565b60405161027c9190610907565b60405180910390f35b34801561029157600080fd5b5061029a610813565b6040516102a79190610907565b60405180910390f35b3480156102bc57600080fd5b506102c5610837565b6040516102d29190610907565b60405180910390f35b3480156102e757600080fd5b506102f061085b565b6040516102fd9190610963565b60405180910390f35b34801561031257600080fd5b5061031b610881565b6040516103289190610907565b60405180910390f35b34801561033d57600080fd5b506103466108c2565b6040516103539190610963565b60405180910390f35b34801561036857600080fd5b506103716108e8565b60405161037e9190610907565b60405180910390f35b60005481565b60025481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b600073ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461046e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610465906109db565b60405180910390fd5b610476610758565b3410156104b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104af90610a47565b60405180910390fd5b33600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610501610758565b60058190555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1660055460405161054f90610a98565b60006040518083038185875af1925050503d806000811461058c576040519150601f19603f3d011682016040523d82523d6000602084013e610591565b606091505b50509050806105d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105cc90610b1f565b60405180910390fd5b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506005543411156107075760003373ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163160405161067f90610a98565b60006040518083038185875af1925050503d80600081146106bc576040519150601f19603f3d011682016040523d82523d6000602084013e6106c1565b606091505b5050905080610705576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fc90610b8b565b60405180910390fd5b505b50565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000437f000000000000000000000000000000000000000000000000000000000000000010156107aa577f000000000000000000000000000000000000000000000000000000000000000090506107e6565b7f0000000000000000000000000000000000000000000000000000000000000000436107d69190610bda565b6002546107e39190610c1c565b90505b90565b60055481565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631905090565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b6000819050919050565b610901816108ee565b82525050565b600060208201905061091c60008301846108f8565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061094d82610922565b9050919050565b61095d81610942565b82525050565b60006020820190506109786000830184610954565b92915050565b600082825260208201905092915050565b7f536f6d656f6e652068617320616c726561647920646f6e617465640000000000600082015250565b60006109c5601b8361097e565b91506109d08261098f565b602082019050919050565b600060208201905081810360008301526109f4816109b8565b9050919050565b7f4e6f7420656e6f7567682065746865722073656e742e00000000000000000000600082015250565b6000610a3160168361097e565b9150610a3c826109fb565b602082019050919050565b60006020820190508181036000830152610a6081610a24565b9050919050565b600081905092915050565b50565b6000610a82600083610a67565b9150610a8d82610a72565b600082019050919050565b6000610aa382610a75565b9150819050919050565b7f4574686572207472616e7366657220746f20646f6e6f7220616464727265737360008201527f206973206661696c656400000000000000000000000000000000000000000000602082015250565b6000610b09602a8361097e565b9150610b1482610aad565b604082019050919050565b60006020820190508181036000830152610b3881610afc565b9050919050565b7f436f756c646e27742073656e642072656d61696e696e67206574686572000000600082015250565b6000610b75601d8361097e565b9150610b8082610b3f565b602082019050919050565b60006020820190508181036000830152610ba481610b68565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610be5826108ee565b9150610bf0836108ee565b9250828202610bfe816108ee565b91508282048414831517610c1557610c14610bab565b5b5092915050565b6000610c27826108ee565b9150610c32836108ee565b9250828203905081811115610c4a57610c49610bab565b5b9291505056fea26469706673582212207a98dc1fdca68cffca4318f95ba4b6ddad49450c79194c9137b294329dad051864736f6c63430008110033"
const abi = contractAbi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractFactory = new ethers.ContractFactory(abi, contractBytecode, signer);

const ContractDeployer = () => {
    const [param1, setParam1] = useState('');
    const [param2, setParam2] = useState('');
    const [param3, setParam3] = useState('');
    const [contractAddress, setContractAddress] = useState('');

    const deployContract = async () => {
        await window.ethereum.enable(); //depreciated


        // if (window.ethereum) {
        //     try {
        //         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //         setAccounts(accounts);
        //     } catch (error) {
        //         if (error.code === 4001) {
        //             // User rejected request
        //         }

        //         setError(error);
        //     }
        // }


        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = await contractFactory.deploy(param1, param2, param3);
        await contract.deployed();

        setContractAddress(contract.address);
    };

    return (
        <>
            <div>
                <input placeholder='Reserve Price' value={param1} onChange={(e) => setParam1(e.target.value)} />
                <input placeholder='Number of blocks auction is open' value={param2} onChange={(e) => setParam2(e.target.value)} />
                <input placeholder='Price decrement' value={param3} onChange={(e) => setParam3(e.target.value)} />
                <button onClick={deployContract}>Deploy</button>
                <p>Contract Address: {contractAddress}</p>
            </div>

        </>
    );
};

export default ContractDeployer;
