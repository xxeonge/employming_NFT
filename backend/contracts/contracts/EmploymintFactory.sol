// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Employmint} from "./Employmint.sol";

contract EmploymintFactory {

    event EmploymintDeployed(address);

    function deploy(string memory _name, string memory _symbol, uint256 _limit, address _owner, uint256 _salt) external returns (address employmint) {
        employmint = address(new Employmint{salt: bytes32(_salt)}(_name, _symbol, _limit, _owner));
        emit EmploymintDeployed(employmint);
    }
}