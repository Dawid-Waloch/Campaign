// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumContribiution;
    address[] public approvers;
    Request[] public requests;
    mapping(address => uint) public balances;

    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribiution = minimum;
    }

    function contribiute() public payable minimumDonation {
        approvers.push(msg.sender);
    }

    function createRequest(string memory description, uint value, address recipient) public onlyManager {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });
        
        requests.push(newRequest);
    }

    function getApprovers() public view returns (address[] memory) {
        return approvers;
    }

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    modifier minimumDonation() {
        require(msg.value >= minimumContribiution);
        _;
    }

}