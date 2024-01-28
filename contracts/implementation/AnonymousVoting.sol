// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

import "./TicketSpender.sol";
import "../interfaces/IAnonymousVoting.sol";

struct VotingPeriod {
    uint256 start;
    uint256 end;
}


contract AnonymousVoting is IAnonymousVoting, TicketSpender {
    // Total number of elections
    uint256 public electionCount;
    // registered elections
    mapping(uint256 => Election) election;
    // election configuration
    mapping(uint256 => address[]) public voters;
    mapping(uint256 => address[]) public electionModerators;
    mapping(uint256 => VotingPeriod) votingPeriod;
    mapping(uint256 => Party[]) public electionParties;
    // Voter Election Map
    mapping(address => uint256[]) public voterElectionMap;
    // Vote History Time Series (electionId, Party, VoteBlock)
    mapping(uint256 => mapping(uint256 => VoteBlock[])) public voteHistory;
    // election ticket storage
    mapping(uint256 => uint256[]) public tickets;
    // election internal ticket requirements
    mapping(uint256 => mapping(address => bool)) internal registered;
    mapping(uint256 => mapping(uint256 => bool)) internal nullified;

    // votes indexed by (electionId, MerkleRoot, option)
    mapping(uint256 => mapping(uint256 => mapping(uint256 => uint256)))
        internal votes;

    // merkle root by election (ideally unique)
    mapping(uint256 => uint256) merkleRoots;
    mapping(uint256 => bool) sameRoots;

    event LeaderBoardUpdate (
        uint256 electionId,
        Party[] leaderboard
    );

    modifier beforeVotingPeriod(uint256 electionId) {
        require(
            block.timestamp < votingPeriod[electionId].start,
            "should be before the voting period"
        );
        _;
    }
    modifier duringVotingPeriod(uint256 electionId) {
        VotingPeriod memory electionVotingPeriod = votingPeriod[electionId];
        require(
            block.timestamp >= electionVotingPeriod.start &&
                block.timestamp < electionVotingPeriod.end,
            "should be inside the voting period"
        );
        _;
    }

    modifier afterVotingPeriod(uint256 electionId) {
        require(
            block.timestamp < votingPeriod[electionId].end,
            "should be after the voting period"
        );
        _;
    }

    modifier onlyVoters(uint256 electionId) {
        address[] memory electionVoters = voters[electionId];
        bool inside = false;
        for (uint256 i = 0; i < electionVoters.length; i++)
            if (msg.sender == electionVoters[i]) {
                inside = true;
                break;
            }
        require(inside, "sender has to be registered as a voter");
        _;
    }

    function addModerator(uint256 electionId, address moderator)
        external
        override
    {
        require(election[electionId].exists, "election not registered");
        require(election[electionId].creator == msg.sender, "sender must be creator");
        bool isExists = false;
        for (uint256 i = 0; i < electionModerators[electionId].length; i++) {
            if (electionModerators[electionId][i] == moderator) {
                isExists = true;
                break;
            }
        }
        require(!isExists, "moderator already exists");
        electionModerators[electionId].push(moderator);
    }

    function removeModerator(uint256 electionId, address moderator)
        external
        override
    {
        require(election[electionId].exists, "election not registered");
        require(election[electionId].creator == msg.sender, "sender must be creator");
        bool isExists = false;
        uint256 index = 0;
        for (uint256 i = 0; i < electionModerators[electionId].length; i++) {
            if (electionModerators[electionId][i] == moderator) {
                isExists = true;
                index = i;
                break;
            }
        }
        require(isExists, "moderator does not exists");
        electionModerators[electionId][index] = electionModerators[electionId][electionModerators[electionId].length - 1];
        electionModerators[electionId].pop();
    }

    function addVoter(uint256 electionId, address voter)
        external
        override
    {
        require(election[electionId].exists, "election not registered");
        bool isMod = false;
        for (uint256 i = 0; i < electionModerators[electionId].length; i++) {
            if (electionModerators[electionId][i] == msg.sender) {
                isMod = true;
                break;
            }
        }
        require(election[electionId].creator == msg.sender || isMod, "sender must be creator");
        bool isExists = false;
        for (uint256 i = 0; i < voters[electionId].length; i++) {
            if (voters[electionId][i] == voter) {
                isExists = true;
                break;
            }
        }
        require(!isExists, "voter already exists");
        voters[electionId].push(voter);
        voterElectionMap[voter].push(electionId);
    }

    function getElectionsByUser()
        external
        view
        override
        returns (Election[] memory)
    {
        uint256[] memory electionIDsByUser =  voterElectionMap[msg.sender];
        Election[] memory electionsByUser = new Election[](electionIDsByUser.length);
        for (uint256 i = 0; i < electionIDsByUser.length; i++) {
            electionsByUser[i] = election[electionIDsByUser[i]];
        }
        return electionsByUser;
    }

    function getAllActiveElections()
        external
        view
        override
        returns (Election[] memory)
    {
        // return all elections with end date after the current block date
        Election[] memory activeElections = new Election[](electionCount);
        uint256 activeElectionCount = 0;
        for (uint256 i = 0; i < electionCount; i++) {
            if (votingPeriod[i].end > block.timestamp) {
                activeElections[activeElectionCount] = election[i];
                activeElectionCount++;
            }
        }
        return activeElections;
    }
    

    function registerElection(
        string memory name,
        string memory description,
        address[] memory _voters,
        string[] memory _parties,
        uint256 start,
        uint256 end
    ) external override {
        uint256 electionId = electionCount;
        election[electionId] = Election(electionId, name, description, true, msg.sender);
        voters[electionId] = _voters;
        Party[] memory parties = new Party[](_parties.length);
        for (uint256 i = 0; i < _parties.length; i++) {
            parties[i] = Party(i, _parties[i], true, 0);
            electionParties[electionId].push(Party(i, _parties[i], true, 0));
        }
        for (uint256 i = 0; i < _voters.length; i++) {
            voterElectionMap[_voters[i]].push(electionId);
        }
        votingPeriod[electionId] = VotingPeriod(start, end);
        electionCount++;
    }

    function getElectionParties(uint256 electionId)
        external
        view
        override
        returns (Party[] memory)
    {
        require(election[electionId].exists, "election not registered");
        // msg sender must be creator of election or a voter
        bool isVoter = false;
        for (uint256 i = 0; i < voterElectionMap[msg.sender].length; i++) {
            if (voterElectionMap[msg.sender][i] == electionId) {
                isVoter = true;
                break;
            }
        }
        bool isMod = false;
        for (uint256 i = 0; i < electionModerators[electionId].length; i++) {
            if (electionModerators[electionId][i] == msg.sender) {
                isMod = true;
                break;
            }
        }
        require(
            msg.sender == election[electionId].creator ||
                isVoter,
            "sender must be creator or voter or moderator"
        );
        return electionParties[electionId];
    }

    function registerTicket(
        uint256 electionId,
        uint256 ticket
    ) external override duringVotingPeriod(electionId) onlyVoters(electionId) {
        require(election[electionId].exists, "election not registered");
        require(
            !registered[electionId][msg.sender],
            "voter already registered ticket"
        );  
        registered[electionId][msg.sender] = true;
        tickets[electionId].push(ticket);
    }

    function getElectionStatus(
        uint256 electionId,
        uint256 _merkleRoot
    ) external view override returns (Party[] memory) {
        require(election[electionId].exists, "election not registered");
        Party[] memory parties = new Party[](electionParties[electionId].length);
        for (uint256 i = 0; i < electionParties[electionId].length; i++) {
            parties[i] = electionParties[electionId][i];
            parties[i].votes = votes[electionId][_merkleRoot][i];
        }
        return parties;
    }

    function spendTicket(
        uint256 electionId,
        uint256 merkleRoot,
        uint256 option,
        uint256 serial,
        bytes memory proof
    ) external override duringVotingPeriod(electionId) {
        require(election[electionId].exists, "election not registered");
        require(!nullified[electionId][serial], "ticket already spent");
        require(
            option < electionParties[electionId].length,
            "option out of range"
        );
        bool result = this.verifyTicketSpending(
            option,
            serial,
            merkleRoot,
            proof
        );
        require(result == true, "incorrect proof");
        nullified[electionId][serial] = true;
        votes[electionId][merkleRoot][option]++;
        bool currentVoteBlockExists = false;
        for(uint256 i = 0; i < voteHistory[electionId][option].length; i++) {
            if(voteHistory[electionId][option][i].timestamp == block.timestamp) {
                currentVoteBlockExists = true;
                voteHistory[electionId][option][i].votes++;
                break;
            }
        }
        if(!currentVoteBlockExists) {
            voteHistory[electionId][option].push(VoteBlock(block.timestamp, 1));
        }
        Party[] memory parties = new Party[](electionParties[electionId].length);
        for (uint256 i = 0; i < electionParties[electionId].length; i++) {
            parties[i] = electionParties[electionId][i];
            parties[i].votes = votes[electionId][merkleRoot][i];
        }
        emit LeaderBoardUpdate(electionId, parties);
    }

    function getVoteHistoryByParty(uint256 electionId, uint256 partyId)
        external
        view
        override
        returns (VoteBlock[] memory)
    {
        require(election[electionId].exists, "election not registered");
        require(
            partyId < electionParties[electionId].length,
            "partyId out of range"
        );
        return voteHistory[electionId][partyId];
    }

    function getTickets(
        uint256 electionId
    ) external view override returns (uint256[] memory) {
        return tickets[electionId];
    }
}