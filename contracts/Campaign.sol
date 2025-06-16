// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaign {
    address public manager;
    uint public minimumContribiution;
    address[] public approvers;
    mapping(address => uint) public balances;

    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribiution = minimum;
    }

    function contribiute(uint donation) public minimumDonation(donation) {
        approvers.push(msg.sender);
    }

    function getApprovers() public view returns (address[] memory) {
        return approvers;
    }

    modifier minimumDonation(uint donation) {
        require(donation >= minimumContribiution);
        _;
    }

}