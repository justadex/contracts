interface IVelodromeFactory {
    function isPair(address) external view returns (bool);

    function pairCodeHash() external view returns (bytes32);
}
