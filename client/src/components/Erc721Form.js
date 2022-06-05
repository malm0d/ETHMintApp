import React, { useState, useEffect, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { TextField } from "@mui/material";

export default function Erc721Form(props)  {

    const _contract = props.contract;
    const [contract, setContract] = useState("");
    const [transferAddress, setTransferAddress] = useState(0);
    const transferAddressInput = useRef(null);

    useEffect( async () => {
        setContract(_contract);
      }, [_contract]);

    const mintHandler = () => {
        props.onMint();
    };

    const onTransferAddressChange = (event) => {
        setTransferAddress(event.target.value);
    };

    const transferHandler = () => {
        props.onTransfer(transferAddress)
        setTransferAddress(null);
        transferAddressInput.current.value = "";
    };

    const burnHandler = () => {
        props.onBurn();
    };
    
    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h3" sx={{color: "#002984"}}>
                    {contract.symbol}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"} paddingTop={"30px"}>
                <Typography  variant="button" sx={{color: "#002984"}}>
                    Token Count: 
                </Typography>
                <Chip icon={<CurrencyExchangeIcon/>} variant="filled" label={contract.ownedTokensCount} color="secondary"/>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"} paddingTop={"30px"}>
                <Typography variant="button" sx={{color: "#002984"}}>
                    Mint 
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" paddingTop="10px">
                <Button variant="contained" size="large" onClick={mintHandler} fullWidth padding={"10px"}>Mint</Button>
            </Box>
            &nbsp;
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"}>
                <Typography variant="button" sx={{color: "#002984"}}>
                    Transfer Address: 
                </Typography>
                <TextField id="transferAddress" size="small" onChange={onTransferAddressChange} inputRef={transferAddressInput} variant="outlined" label="Address"></TextField>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" size="large" onClick={transferHandler} fullWidth padding={"10px"}>Transfer</Button>
            </Box>
            &nbsp;
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"}>
                <Typography variant="button" sx={{color: "#002984"}}>
                    Burn 
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" size="large" onClick={burnHandler} fullWidth padding={"10px"}>Burn</Button>
            </Box>
            &nbsp;
        </div>
    )
}