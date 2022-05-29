import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import MalcolmERC20 from "./contracts/MalcolmERC20.json";
import MalcolmERC721 from "./contracts/MalcolmERC721.json"
import { Box, Typography } from "@mui/material/";
import Paper from "@mui/material/Paper";
import Erc20Form from "./components/Erc20Form";
import Erc721Form from "./components/Erc721Form";
import Grid from "@mui/material/Grid";

import "./App.css";

const App = () => {
  const [erc20Contract, setErc20Contract] = useState("");
  const [erc721Contract, setErc721Contract] = useState("");
  const [account, setAccount] = useState("");

  const loadAccount = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      //console.log(accounts);
      let _account = accounts[0];
      setAccount(_account);
    }
    
  }

  // "networks": {
  //   "3": {
  //     "events": {},
  //     "links": {},
  //     "address": "0x2A04AbE5DcD6ed1dba3145100b799870F8612Eb6",
  //     "transactionHash": "0x94538046045585170544623692a87ae593e5ee98a6df5e1ea698fc6ad99d7157"
  //    ...
  //   }
  const loadContracts = async (web3) => {
    const netId = await web3.eth.net.getId();
    const erc20Data = MalcolmERC20.networks[netId];
    const erc721Data = MalcolmERC721.networks[netId];

    const erc20Abi = MalcolmERC20.abi;
    const erc20Addr = erc20Data.address;
    const _erc20Contract = new web3.eth.Contract(erc20Abi, erc20Addr);
    setErc20Contract(_erc20Contract);

    const erc721Abi = MalcolmERC721.abi;
    const erc721Addr = erc721Data.address;
    const _erc721Contract = new web3.eth.Contract(erc721Abi, erc721Addr);
    setErc20Contract(_erc721Contract);

    const contracts = {
      erc20: _erc20Contract,
      erc721: _erc721Contract
    }

    console.log(contracts);
    return contracts;
    
  }

  const mintHandler = () => {}

  useEffect( async () => {
    const web3 = await getWeb3();
    await loadAccount(web3);
    const contracts = await loadContracts(web3);
  }, []);

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: "100px"
    }}>
      <Paper variant="outlined" elevation={3} sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
        <Grid container rowSpacing={1}>
          <Grid item xs = {5}>
            <Erc20Form></Erc20Form>
          </Grid>
          <Grid item xs = {2}>
          </Grid>
          <Grid item xs = {5}>
            <Erc721Form></Erc721Form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
    
  )
}

export default App;
