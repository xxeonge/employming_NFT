// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Employmint} from "./Employmint.sol";

interface IEmploymint {
    function mintTo(address recipient) external returns (uint256);
}

contract EmploymintFactory {

    mapping(address => address[]) public list;
    event EmploymintDeployed(address);

    function deploy(string memory _name, string memory _symbol, uint256 _limit, address _owner, uint256 _salt, string memory _url) external returns (address employmint) {
        employmint = address(new Employmint{salt: bytes32(_salt)}(_name, _symbol, _limit, _owner,_url));
        list[_owner].push(employmint);
        IEmploymint(employmint).mintTo(_owner); // 민팅
        emit EmploymintDeployed(employmint);
        
    }
    
    function getList() external view returns(address[] memory){
        return list[msg.sender];
    }
}