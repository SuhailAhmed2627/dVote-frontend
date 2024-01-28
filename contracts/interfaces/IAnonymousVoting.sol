// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

struct Election {
    uint256 electionId;
    string name;
    string description;
    bool exists;
    address creator;
}

struct Party {
    uint256 option;
    string name;
    bool exists;
    uint256 votes;
}

interface IAnonymousVoting {

    function registerElection(
        string memory name,
        string memory description,
        address[] memory _voters,
        string[] memory _parties,
        uint256 start,
        uint256 end
    ) external;

    function addModerator(uint256 electionID, address _moderator) external;

    function removeModerator(uint256 electionID, address _moderator) external;

    function addVoter(uint256 electionID, address _voter) external;

    function getElectionsByUser()  external view returns (Election[] memory);

    function getElectionParties(uint256 electionId) external view returns (Party[] memory);

    function getAllActiveElections()  external view returns (Election[] memory);
    
    function registerTicket(
        uint256 electionId,uint256 ticket
    ) external;

    function spendTicket(
        uint256 electionId, uint256 merkleRoot,
        uint256 option, uint256 serial, bytes memory proof
    ) external;

    function getElectionStatus(
        uint256 electionId, uint256 merkleRoot
    ) external view returns (Party[] memory);

    function getTickets(
        uint256 electionId
    ) external view returns (uint256[] memory);
}