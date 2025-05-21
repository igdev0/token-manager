// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    uint8 private _decimals;
    constructor(uint256 initialSupply, string memory  _name, string memory _symbol, uint8 _dec) ERC20(_name, _symbol) {
        _mint(msg.sender, initialSupply);
        _decimals = _dec;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}