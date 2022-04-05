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
import { account_contract } from "../../config/contract";
import Button from '@mui/material/Button';
import Image from 'react-image-webp';
import waiting from '../../assets/imgs/waiting.webp'
import waitingDefault from '../../assets/imgs/wait-default.png'
import StorefrontIcon from '@mui/icons-material/Storefront';


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

    const [{ data: accountContractData }, fetchMyAccount] = useContractRead(
        {
          addressOrName: account_contract.address,
          contractInterface: account_contract.abi,
          signerOrProvider: provider,
        },
        "myAccount"
      ) as any;

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

      console.log("address ====  " + accountData?.address)
      if (accountContractData === undefined) {
          console.log('fetchMyAccount')
          setLoading(true);
          fetchMyAccount();
          // after fetching...
          setLoading(false);
      } else {
          setLoading(false);
          setCoins(accountContractData.coins);
          setIsJoin(accountContractData.isJoin);
      }

  }, [accountData?.address, accountContractData]);

  const CoinInfo = () => {
    return (
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
                color="neutral.400"
                variant="body2"
                >
                目前持有代幣數為: {coins}
                </Typography>
            </Box>
            <Box sx={{ml: 1}}>
            <Button className='white-paper-link'
            size="small"
            onClick={() => {
              setLoading(true)
              // TODO: 跳轉至購買代幣？
              // after fetching...
              setLoading(false);
            }}
            variant="outlined"
            >購買代幣</Button>
            </Box>
        </Box>
    )
  }

  const JoinStatusInfo = () => {
    return (
        isJoin ? (
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
                color="neutral.400"
                variant="body2"
                >已參與此次抽獎活動</Typography>
            </Box></Box>) : 
        (<Box
        sx={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
            py: '11px',
            }}
            >
            <CancelIcon fontSize='large'/>
            <Box sx={{ml: 1}}>
            <Typography
            color="neutral.400"
            variant="body2"
            >尚未參與抽獎活動</Typography>
            </Box>
            <Box sx={{ml: 1}}>
            <Button className='white-paper-link'
            size="small"
            onClick={() => {
              setLoading(true)
              // TODO: call 參加抽獎
              // after fetching...
              setLoading(false);
            }}
            variant="outlined"
            disabled={coins < 200 || (isStakeNFT && coins < 160)}
            >參加抽獎</Button></Box></Box>)
    )
  }

  const NFTInfo = () => {
    return (
      isOwnNFT ? 
      (<Grid item xs={12} sm={6} md={4} color="#fff" >
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
              <CardActions>
                  <Button size="small" color='primary' variant="outlined" disabled={isStakeNFT} onClick={() => {
                    setLoading(true)
                    // TODO: call 質押 NFT
                    // after fetching...
                    setLoading(false);
                  }}>質押 NFT</Button>
                  <Button size="small" color='primary' variant="outlined" disabled={!isStakeNFT} onClick={() => {
                    setLoading(true)
                    // TODO: call 領取代幣獎勵
                    // after fetching...
                    setLoading(false);
                  }}>領取獎勵</Button>
              </CardActions>
          </Card>
      </Grid>) :
      <Button 
      sx={{px: 3,
        ml: 3,
        py: '11px'}} 
        className="user-page-link" size="large" variant="outlined" startIcon={<StorefrontIcon />} onClick={() => {
          setLoading(true)
          // TODO: call Buy NFT
          // after fetching...
          setLoading(false);
      }}>購買 NFT</Button>
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
                <Box className="user-page-link"><AccountInfo /></Box>
                <Box className="user-page-link"><CoinInfo /></Box>
                <Box className="user-page-link"><JoinStatusInfo /></Box>
                <Box className="user-page-link"><NFTInfo /></Box>
            </Stack>
        </Box>
    </div>
);
};

