// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(address => uint) public approversContributedAmount;
    Request[] public requests;
    uint public approversCount;

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable minimumDonation {
        if(!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
        approversContributedAmount[msg.sender] = msg.value;
    }

    function createRequest(string memory description, uint value, address recipient) public onlyManager {
        require(approvers[msg.sender]);
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender], "You aren't a part of campaign");
        require(!request.approvals[msg.sender], "You have already approved request");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public onlyManager {
        Request storage request = requests[index];

        require(!request.complete, "Request already completed");
        require(request.approvalCount * 2 >= approversCount, "Not enough approvals");
        require(address(this).balance >= request.value, "Not enough ethers in contract to finalize request which has this value");

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "You aren't a manager");
        _;
    }

    modifier minimumDonation() {
        require(msg.value >= minimumContribution, "You try to join to campaign with less contribution than is required");
        _;
    }

}