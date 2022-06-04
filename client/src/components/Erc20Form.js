import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function Erc20Form(props) {
    
    const _contract = props.contract;
    const [contract, setContract] = useState("");
    const [mintValue, setMintValue] = useState(0);
    const [transferValue, setTransferValue] = useState(0);
    const [transferAddress, setTransferAddress] = useState(0);
    const [burnValue, setBurnValue] = useState(0);
    const [mintInputError, setMintInputError] = useState(false);
    const [transferInputError, setTransferInputError] = useState(false);
    const [burnInputError, setBurnInputError] = useState(false);
    const [mintErrText, setMintErrText] = useState("");
    const [transferErrText, setTransferErrText] = useState("");
    const [burnErrText, setBurnErrText] = useState("");
    const mintInput = useRef(null);
    const transferAmountInput = useRef(null);
    const transferAddressInput = useRef(null);
    const burnInput = useRef(null);

    useEffect( async () => {
        setContract(_contract);
      }, [_contract]);

    const onMintChange = (event) => {
        let regex = new RegExp("^\\d+$");
        let isValid = regex.test(event.target.value);
        if (!isValid) {
            setMintInputError(true);
            setMintErrText("Invalid input");
        }
        else {
            setMintInputError(false)
            setMintErrText("");
            setMintValue(event.target.value);
        }
    };

    const mintHandler = () => {
        if (mintValue == null || mintValue == 0) {
            setMintInputError(true);
            setMintErrText("Invalid input");
        }
        else {
            props.onMint(Number(mintValue));
            setMintValue(null);
            mintInput.current.value = "";
        }
    };

    const onTransferChange = (event) => {
        let regex = new RegExp("^\\d+$");
        let isValid = regex.test(event.target.value);
        if (!isValid) {
            setTransferInputError(true);
            setTransferErrText("Invalid input");
        }
        else {
            setTransferInputError(false)
            setTransferErrText("");
            setTransferValue(event.target.value);
        }
    };

    const onTransferAddressChange = (event) => {
        setTransferAddress(event.target.value);
    };

    const transferHandler = () => {
        if (transferValue == null || transferValue == 0 || transferAddress == null || transferAddress === "") {
            setTransferInputError(true);
            setTransferErrText("Invalid input");
        }
        else {
            props.onTransfer(Number(transferValue), transferAddress)
            setTransferValue(null);
            setTransferAddress(null);
            transferAmountInput.current.value = "";
            transferAddressInput.current.value = "";
        }
    };

    const onBurnChange = (event) => {
        let regex = new RegExp("^\\d+$");
        let isValid = regex.test(event.target.value);
        if (!isValid) {
            setBurnInputError(true);
            setBurnErrText("Invalid input");
        }
        else {
            setBurnInputError(false)
            setBurnErrText("");
            setBurnValue(event.target.value);
        }
    };

    const burnHandler = () => {
        if (burnValue == null || burnValue == 0) {
            setBurnInputError(true);
            setBurnErrText("Invalid input");
        }
        else {
            props.onBurn(Number(burnValue));
            setBurnValue(null);
            burnInput.current.value = "";
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
                    Balances:
                </Typography>
                <Chip icon={<CurrencyExchangeIcon/>} variant="oulined" label={contract.balances} color="secondary"/>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"}>
                <Typography variant="button" sx={{color: "#002984"}}>
                    Mint Value: 
                </Typography>
                <TextField type="number" id="mintValue" size="small" onChange={onMintChange} inputRef={mintInput} variant="outlined" label="Amount" error={mintInputError} helperText={mintErrText}></TextField>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" size="large" onClick={mintHandler} fullWidth padding={"10px"}>Mint</Button>
            </Box>
            &nbsp;
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={"10px"}>
                <Typography variant="button" sx={{color: "#002984"}}>
                    Transfer Value: 
                </Typography>
                <TextField type="number" id="transferValue" size="small" onChange={onTransferChange} inputRef={transferAmountInput} variant="outlined" label="Amount" error={transferInputError} helperText={transferErrText}></TextField>
            </Box>
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
                <TextField type="number" id="transferValue" size="small" onChange={onBurnChange} inputRef={burnInput} variant="outlined" label="Amount" error={burnInputError} helperText={burnErrText}></TextField>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" size="large" onClick={burnHandler} fullWidth padding={"10px"}>Burn</Button>
            </Box>
            &nbsp;
        </div>
    )
}