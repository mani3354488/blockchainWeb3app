// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract ImageNFT is ERC721, Ownable {
    using Counter for Counters.Counter; // auto incremental 
    using String for uint256;

    Counters.Counter _tokenIds; //set TokenIds to Counters.Counter 

    mapping(uint256 => string) _tokenURIs; // defining object _tokenURIs

    // schema of the object
    struct RenderToken {
        uint id;
        string uri;
        string space;
    }

    // constructor is happens as soon contract runs
    constructor() ERC721("ImageNFT", "INFT") {}

    // internal function > adding an key, value pair of id and uri
    function _setTokenURI(uint tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    // virtual override - 
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "URI does not exist on that ID");
        string memory _RUri = _tokenURIs(tokenId);
        return _RUri;
    }

    // 
    function getAlltoken() public view returns (RenderToken[] memory){
        uint256 latestId = _tokenIds.current(); // shows number of all the minted nfts
        RenderToken[] memory res = new RenderToken[](latestId); // res is an array of an objects, 
        for(uint256 i = 0; i <= latestId; i++){
            if(_exists(i)){
                string memory uri = tokenURI(i);
                
            }
        }

    }
}