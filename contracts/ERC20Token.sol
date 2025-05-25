// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    struct Drop {
        address addr;
        uint amount;
    }

    enum AirdropMethod {
        Mint,
        Transfer
    }

contract ERC20Token is ERC20, Ownable {
    uint8 private _decimals;
    constructor(string memory _name, string memory _symbol, uint256 initialSupply, uint8 _dec) ERC20(_name, _symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
        _decimals = _dec;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function airdrop(Drop[] calldata recipients, AirdropMethod method) public onlyOwner {
        for (uint i; i < recipients.length; i++) {
            if (method == AirdropMethod.Mint) {
                super._mint(recipients[i].addr, recipients[i].amount);
            } else {
                super._transfer(msg.sender, recipients[i].addr, recipients[i].amount);
            }
        }
    }

    function mint(address account, uint value) public onlyOwner {
        super._mint(account, value);
    }

    function burn(address account, uint value) public onlyOwner {
        super._burn(account, value);
    }
}