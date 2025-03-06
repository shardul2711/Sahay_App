// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SahayCrowdfunding {
    struct Campaign {
        address payable ngo;
        string description;
        uint256 goal;
        uint256 raisedAmount;
        bool receiptVerified;
        bool completed;
    }
    
    mapping(address => Campaign) public campaigns;
    mapping(address => mapping(address => uint256)) public contributions;
    address[] public campaignAddresses;
    
    event CampaignCreated(address ngo, uint256 goal, string description);
    event Funded(address campaignAddress, address donor, uint256 amount);
    event ReceiptVerified(address campaignAddress);
    event FundsReleased(address campaignAddress, uint256 amount);
    
    function createCampaign(string memory _description, uint256 _goal) external {
        require(_goal > 0, "Goal must be greater than 0");
        require(campaigns[msg.sender].ngo == address(0), "Campaign already exists for this address");
        
        campaigns[msg.sender] = Campaign({
            ngo: payable(msg.sender),
            description: _description,
            goal: _goal,
            raisedAmount: 0,
            receiptVerified: false,
            completed: false
        });
        campaignAddresses.push(msg.sender);
        
        emit CampaignCreated(msg.sender, _goal, _description);
    }
    
    function donate(address _campaignAddress, uint256 _amount) external payable {
        Campaign storage campaign = campaigns[_campaignAddress];
        require(!campaign.completed, "Campaign already completed");
        require(_amount > 0, "Donation must be greater than 0");
        require(msg.value == _amount, "Sent value must match the specified amount");
        
        campaign.raisedAmount += msg.value;
        contributions[_campaignAddress][msg.sender] += msg.value;
        
        emit Funded(_campaignAddress, msg.sender, msg.value);
    }
    
    function verifyReceipt(address _campaignAddress) external {
        Campaign storage campaign = campaigns[_campaignAddress];
        require(msg.sender == campaign.ngo, "Only NGO can verify");
        require(!campaign.completed, "Campaign already completed");
        
        campaign.receiptVerified = true;
        emit ReceiptVerified(_campaignAddress);
    }
    
    function releaseFunds(address _campaignAddress) external {
        Campaign storage campaign = campaigns[_campaignAddress];
        require(msg.sender == campaign.ngo, "Only NGO can release funds");
        require(campaign.receiptVerified, "Receipt must be verified first");
        require(!campaign.completed, "Campaign already completed");
        
        uint256 amount = campaign.raisedAmount;
        campaign.raisedAmount = 0;
        campaign.completed = true;
        campaign.ngo.transfer(amount);
        
        emit FundsReleased(_campaignAddress, amount);
    }
    
    function getCampaign(address _campaignAddress) external view returns (Campaign memory) {
        return campaigns[_campaignAddress];
    }
    
    function getAllCampaigns() external view returns (address[] memory) {
        return campaignAddresses;
    }
}
