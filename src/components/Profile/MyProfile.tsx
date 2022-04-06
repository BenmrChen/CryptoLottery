import * as React from 'react';
import { useEffect, useState } from "react";
import { useProvider, useContractRead, useContractWrite, useAccount } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountInfo } from './AccountInfo'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Box, Typography } from '@mui/material'
import { Grid, Card, CardMedia, CardActions } from '@mui/material'
import { account_contract, lottery_game, lottery_nft, vendor_contract } from "../../config/contract";
import Button from '@mui/material/Button';
import Image from 'react-image-webp';
import waiting from '../../assets/imgs/waiting.webp'
import waitingDefault from '../../assets/imgs/wait-default.png'
import StorefrontIcon from '@mui/icons-material/Storefront';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7cc0d8",
      contrastText: "#24586c"
    },
    action: {
      focus: "#525879",
      active: "#525879",
      disabledBackground: "#7e878e80",
      disabled: "#52878e40"
    },
    text: {
      primary: "#eee"
    }
  }
});

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primary: true;
  }
}

export const MyProfile = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const provider = useProvider();
    const [{ data: accountData }] = useAccount({
        fetchEns: true,
    });

    const [nftList, setNftList] = useState([]);
    const [curretSelect, setCurretSelect] = useState<NFTObject>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsWait, setIsWait] = useState(false);
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(0);
    const [isJoin, setIsJoin] = useState(false);
    const [isOwnNFT, setIsOwnNFT] = useState(false);
    const [isStakeNFT, setIsStakeNFT] = useState(false);

  const [{ data: accountContractData }, cFetchAccountBalance] = useContractRead(
    {
      addressOrName: account_contract.address,
      contractInterface: account_contract.abi,
      signerOrProvider: provider,
    },
    "getAccountBalance"
  ) as any;

  const [{ data: tokenSupplyData }, cTokenSupply] = useContractRead(
    {
      addressOrName: vendor_contract.address,
      contractInterface: vendor_contract.abi,
      signerOrProvider: provider,
    },
    "tokenSupply"
  );

  const [{}, cEnterGame] = useContractWrite(
    {
      addressOrName: lottery_game.address,
      contractInterface: lottery_game.abi,
      signerOrProvider: provider,
    },
    "enter"
  )
  
  const [{ data: clTokenData, error }, cBuyTokens] = useContractWrite(
    {
      addressOrName: vendor_contract.address,
      contractInterface: vendor_contract.abi,
      signerOrProvider: provider,
    },
    "buyTokens"
  )

  const [{ data }, cMintLotteryNFT] = useContractWrite(
    {
      addressOrName: lottery_nft.address,
      contractInterface: lottery_nft.abi,
      signerOrProvider: provider,
    },
    "safeMintSender"
  );

  const joinLotteryGame = async () => {
    setLoading(true)
    const result = await cEnterGame();
    console.log("joinLotteryGame result = ", result);
    setLoading(false);
  };

  const buyToken = async () => {
    setLoading(true)
    const result = await cBuyTokens({
      overrides: {
        gasLimit: 2030000,
        gasPrice: 60000000000,
        value: 10
      },
    });
    console.log("buyToken result = ", result);

    const supp = await cTokenSupply();
    console.log("tokenSupplyData result = ", result);
    setLoading(false);
  };

  const buyLotteryNFT = async () => {
    setLoading(true)
    const result = await cMintLotteryNFT();
    console.log("buyLotteryNFT result = ", result);
    setLoading(false);
  };

  const fetchBalance = async () => {
    setLoading(true)
    const result = await cFetchAccountBalance();
    console.log("fetchBalance result = ", result);
    setLoading(false);
  };

  const OnSelectNFT = (x: NFTObject) => {
    setCurretSelect(x);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
      if (!accountData?.address) {
          setLoading(false);
          // TODO: error handel
          return
      }
      
      console.log('tokenSupplyData === ' + tokenSupplyData)
      console.log('clTokenData === ' + clTokenData)
      console.log("address ====  " + accountData?.address)
      if (accountContractData === undefined) {
          fetchBalance();
      } else {
          setLoading(false);
          setCoins(accountContractData.coins);
          setIsJoin(accountContractData.isJoin);
      }

  }, [accountData?.address, accountContractData]);

  const CoinInfo = () => {
    return (
      <ThemeProvider theme={theme}>
        <Box
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: '11px',
          }}
          >
          <MonetizationOnIcon fontSize='large'/>
          <Box sx={{ml: 1}}>
              <Typography
              color="text.primary"
              variant="body1"
              >
              目前持有代幣數為: {coins}
              </Typography>
          </Box>
          <Box sx={{ml: 1}}>
          <Button color='primary'
          size="small"
          onClick={buyToken}
          variant="outlined"
          >購買代幣</Button>
          </Box>
        </Box>
        </ThemeProvider>
    )
  }

  const JoinStatusInfo = () => {
    return (

      
        isJoin ? (<ThemeProvider theme={theme}>
          <Box 
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
            py: '11px',
            }}
            >
            <CheckCircleIcon fontSize='large'/>
            <Box sx={{ml: 1}}>
                <Typography
                color="text.primary"
                variant="body1"
                >已參與此次抽獎活動</Typography>
            </Box></Box>
        </ThemeProvider>) : 
        (<ThemeProvider theme={theme}>
          <Box
          sx={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: '11px',
              }}
              >
              <CancelIcon fontSize='large' />
              <Box sx={{ml: 1}}>
              <Typography
              color="text.primary"
              variant="body1"
              >尚未參與抽獎活動</Typography>
              </Box>
              <Box sx={{ml: 1}}>
              <Button color='primary'
              size="small"
              onClick={() => {
                joinLotteryGame()
                // setLoading(true)
                // if (isOwnNFT) {
                //   // TODO: call api Lottery.buyLotteryWithNFT
                // } else {
                //   // TODO: call api Lottery.buyLottery
                // }
                // // after fetching...
                // setLoading(false);
              }}
              variant="outlined"
              disabled={coins < 200 || (isStakeNFT && coins < 160)}
              >參加抽獎</Button></Box>
          </Box>
        </ThemeProvider>)
    )
  }

  const NFTInfo = () => {
    return (
      isOwnNFT ? 
      (<Grid sx={{ml: 3}} item xs={12} sm={6} md={4} color="#000000" >
          <Card
              sx={{ width: '30%', display: 'flex', flexDirection: 'column' }}
          >
              <CardMedia
                  component="img"
                  sx={{
                      pt: '0',
                  }}
                  image="https://source.unsplash.com/random"
              />
              <ThemeProvider theme={theme}>
              <CardActions >
                  <Button size="small" color='primary' variant="outlined" disabled={isStakeNFT} onClick={() => {
                    setLoading(true)
                    // TODO: call api NFT.stakeNFT
                    // after fetching...
                    setLoading(false);
                  }}>質押 NFT</Button>
                  <Button size="small" color='primary' variant="outlined" disabled={!isStakeNFT} onClick={() => {
                    setLoading(true)
                    // TODO: call api Token.rewardDailyToken
                    // after fetching...
                    setLoading(false);
                  }}>領取獎勵</Button>
              </CardActions>
              </ThemeProvider>
          </Card>
      </Grid>) :
      <ThemeProvider theme={theme}>
      <Button 
      sx={{px: 3,
        ml: 3,
        py: '11px'}} 
        color='primary' size="large" variant="outlined" startIcon={<StorefrontIcon />} onClick={buyLotteryNFT}>購買 NFT</Button></ThemeProvider>
    )
  }
  
  return (
    loading ? (<div className="confirm-loading flex-c">
      <div>
        <Image
          src={waitingDefault}
          webp={waiting}
        />
        wait loading data...
      </div>
    </div>) :
    <ThemeProvider theme={theme}>
    <div className="left">
        <Box sx={{
            alignItems: 'left',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
            py: '11px',
            }}>
            <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={0}
            >
                <Box className="user-page-link" color='text.primary'><AccountInfo /></Box>
                <Box className="user-page-link"><CoinInfo /></Box>
                <Box className="user-page-link"><JoinStatusInfo /></Box>
                <Box className="user-page-link"><NFTInfo /></Box>
            </Stack>
        </Box>
    </div>
    </ThemeProvider>
);
};

