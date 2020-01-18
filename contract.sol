pragma solidity 0.5.9;

/**
 * @title POE
 * @dev The contract store the hashes of files and returns date by hash
 */
contract POE {
    mapping(bytes32 => uint256) private hashes;
    event HashAdded(bytes32 hash);

    function addHash(bytes32 _hash) external {
        require(hashes[_hash] == 0, "This hash was already added");

        hashes[_hash] = block.timestamp;
        emit HashAdded(_hash);
    }

    function getHashTimestamp(bytes32 _hash) external view returns (uint256) {
        return hashes[_hash];
    }
}