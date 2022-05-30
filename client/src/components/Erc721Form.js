import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function Erc721Form(props)  {

    const _contract = props.contract;
    const [contract, setContract] = useState("");

    useEffect( async () => {
        setContract(_contract);
      }, [_contract]);

    const mintHandler = () => {
        props.onMint();
    };
    
    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h3" sx={{color: "#002984"}}>
                    {contract.symbol}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" paddingTop="30px">
                <Typography  variant="button" sx={{color: "#002984"}}>
                    Token Count: 
                </Typography>
                <Chip icon={<CurrencyExchangeIcon/>} variant="filled" label={contract.ownedTokensCount} color="secondary"/>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" paddingTop="30px">
                <Button variant="contained" size="large" onClick={mintHandler} fullWidth padding={"10px"}>Mint</Button>
            </Box>
            &nbsp;
        </div>
    )
}