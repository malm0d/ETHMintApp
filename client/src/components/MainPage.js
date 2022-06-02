import React, { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import MalcolmERC20 from "../contracts/MalcolmERC20.json";
import MalcolmERC721 from "../contracts/MalcolmERC721.json"
import Erc20Form from "./Erc20Form";
import Erc721Form from "./Erc721Form";
import { Box, Typography } from "@mui/material/";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function MainPage() {
    const { ethereum } = window;
    const [account1, setAccount1] = useState("");
    const [contracts, setContracts] = useState("");
    const [erc20Contract, setErc20Contract] = useState(
      {
        totalSupply: "",
        symbol: "",
        balances: ""
      }
    );
    const [erc721Contract, setErc721Contract] = useState(
      {
        ownedTokensCount: "",
        symbol: "",
      }
    );
    const [mintResponse, setMintResponse] = useState(null);
    const [erc20Balance, setErc20Balance] = useState(null);
    const [erc721Balance, setErc721Balance] = useState(null);
  
    const loadAccount = async (web3) => {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      if (accounts) {
        let _account1 = accounts[0];
        setAccount1(_account1);
        return _account1;
      }
      
    }
  
    // "networks": {
    //   "3": {
    //     "events": {},
    //     "links": {},
    //     "address": "...",
    //     "transactionHash": "..."
    //    ...
    //   }
    const loadContracts = async (web3, account) => {
      const netId = await web3.eth.net.getId();
      const erc20Data = MalcolmERC20.networks[netId];
      const erc721Data = MalcolmERC721.networks[netId];
  
      const erc20Abi = MalcolmERC20.abi;
      const erc20Addr = erc20Data.address;
      const _erc20Contract = new web3.eth.Contract(erc20Abi, erc20Addr);
      const erc20TotalSupply = await _erc20Contract.methods.totalSupply().call();
      const erc20Symbol = await _erc20Contract.methods.symbol().call();
      const erc20Balances = await _erc20Contract.methods.balanceOf(account).call();
      setErc20Balance(erc20Balances);
      setErc20Contract((prev) => {
        return {
          ...prev,
          totalSupply: erc20TotalSupply,
          symbol: erc20Symbol,
          balances: erc20Balances
        }
      });
  
      const erc721Abi = MalcolmERC721.abi;
      const erc721Addr = erc721Data.address;
      const _erc721Contract = new web3.eth.Contract(erc721Abi, erc721Addr);
      const erc721OwnedTokensCount = await _erc721Contract.methods.balanceOf(account).call()
      const erc721Symbol = await _erc721Contract.methods.symbol().call();
      setErc721Balance(erc721OwnedTokensCount);
      setErc721Contract((prev) => {
        return {
          ...prev,
          ownedTokensCount: erc721OwnedTokensCount,
          symbol: erc721Symbol
        }
      })
  
      const contracts = {
        erc20: _erc20Contract,
        erc721: _erc721Contract
      }
  
      console.log(contracts);
      return contracts;
      
    }

    const mintErc20 = async (value) => {
        console.log("mint");
        console.log(value);
        const res = contracts.erc20.methods.mint(account1, value).send({from: account1});
        console.log(res);
        setMintResponse(res);
    }

    const mintErc721 = async () => {
        console.log("mint");
        const res = contracts.erc721.methods.mint(account1).send({from: account1});
        console.log(res);
        setMintResponse(res);
    }

    const handleAccountChange = (...args) => {
      const accounts = args[0];
      if (accounts.length === 0) {
        console.log("Connect to MetaMask");
      }
      else if (accounts[0] !== account1) {
        setAccount1(accounts[0]);
        console.log(accounts[0]);
        window.location.reload(false);
      }
    };

    useEffect( async () => {
      const web3 = await getWeb3();
      const account = await loadAccount(web3);
      ethereum.on("accountsChanged", handleAccountChange);
      const contracts = await loadContracts(web3, account);
      const interval = setInterval(() => {
          loadContracts(web3, account);
      }, 10000);
      setContracts(contracts);
      return () => {
        clearInterval(interval);
        ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    }, [mintResponse, account1]);
  
    return (
    <Box>
        <Box sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "50px"
        }}>
            <Paper elevation={12} sx={{display: "flex", justifyContent: "space-between", width: "100%", padding: "75px" }} square={false}>
            <Grid container rowSpacing={2}>
                <Grid item xs = {5}>
                <Erc20Form contract={erc20Contract} onMint={mintErc20}></Erc20Form>
                </Grid>
                <Grid item xs = {2}>
                </Grid>
                <Grid item xs = {5}>
                <Erc721Form contract={erc721Contract} onMint={mintErc721}></Erc721Form>
                </Grid>
            </Grid>
            </Paper>
        </Box >
        <Box sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
        }}>
            <Typography variant="button" sx={{color: "#002984"}}>
            *Page refreshes every 10 seconds
            </Typography>
        </Box>
        <Box sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
        }}>
            <Typography variant="button" sx={{color: "#002984"}}>
            **It may take a moment for the supply and token count to be updated
            </Typography>
        </Box>
    </Box>
    )

}