// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

/// @title StackOS tokens used for running applications.
/**
 * @notice The StackOS token is used to get computation services from a
 * subnet.
 * It is a stablecoin which is tied to other stable coins
 * that the user can purchase.
 * It is possible to burn StackOS tokens and get back the
 * stablecoins used for purchasing the StackOS.
 */
contract StackOSToken is
    ERC20Upgradeable,
    AccessControlUpgradeable,
    ERC20BurnableUpgradeable,
    ERC20PausableUpgradeable
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BLOCKED_ROLE = keccak256("BLOCKED_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory name, string memory symbol) public initializer {
        __ERC20_init_unchained(name, symbol);
        __AccessControl_init_unchained();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    /**
     * @dev See {ERC20Upgradeable-mint}.
     * Only a caller with a MINTER_ROLE can mint the XCT tokens.
     **/
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20Upgradeable, ERC20PausableUpgradeable) {
        require(!hasRole(BLOCKED_ROLE, from), "'from' is blocked");
        require(!hasRole(BLOCKED_ROLE, to), "'to' is blocked");
        require(!hasRole(BLOCKED_ROLE, msg.sender), "caller is blocked");
        ERC20PausableUpgradeable._beforeTokenTransfer(from, to, amount);
    }

    function setRoleAdmin(bytes32 role, bytes32 adminRole) public onlyRole(getRoleAdmin(role)) {
        super._setRoleAdmin(role, adminRole);
    }

    function pause() public {
        _checkRole(PAUSER_ROLE, _msgSender());
        _pause();
    }

    function unpause() public {
        _checkRole(PAUSER_ROLE, _msgSender());
        _unpause();
    }
}
