import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function Erc20Form(props) {
    
    const _contract = props.contract;
    const [contract, setContract] = useState("");
    const [mintValue, setMintValue] = useState(0);
    const [inputError, setInputError] = useState(false);
    const [errText, setErrText] = useState("");
    const textInput = useRef(null);

    useEffect( async () => {
        setContract(_contract);
      }, [_contract]);

    const onChange = (event) => {
        let regex = new RegExp("^\\d+$");
        let isValid = regex.test(event.target.value);
        if (!isValid) {
            setInputError(true);
            setErrText("Invalid input");
        }
        else {
            setInputError(false)
            setErrText("");
            setMintValue(event.target.value);
        }
    };

    const mintHandler = () => {
        if (mintValue == null || mintValue == 0) {
            setInputError(true);
            setErrText("Invalid input");
        }
        else {
        props.onMint(Number(mintValue));
        setMintValue(null);
        textInput.current.value = "";
        }
    };

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h3" sx={{color: "#002984"}}>
                    {contract.symbol}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"}>
                <Typography variant="button" sx={{color: "#002984"}}>
                    Supply:
                </Typography>
                <Chip icon={<CurrencyExchangeIcon/>} variant="filled" label={contract.totalSupply} color="secondary"/>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"}>
                <Typography variant="button" sx={{color: "#002984"}}>
                    Mint Value: 
                </Typography>
                <TextField type="number" id="mintValue" size="small" onChange={onChange} inputRef={textInput} variant="outlined" label="Amount" error={inputError} helperText={errText}></TextField>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" size="large" onClick={mintHandler} fullWidth padding={"10px"}>Mint</Button>
            </Box>
            &nbsp;
        </div>
    )
}