import * as React from 'react';
import { useEffect, useState } from "react";
import { useProvider, useContractRead, useContractWrite, useAccount } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountInfo } from './AccountInfo'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Box, Typography } from '@mui/material'
import { account_contract } from "../../config/contract";


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
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState(0);
    const [isJoin, setIsJoin] = useState(true);

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
          // TODO: error handel
          return
      }

      if (accountContractData === undefined) {
          console.log('fetchMyAccount')
          setLoading(true);
          fetchMyAccount();
      } else {
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
        </Box>
    )
  }

  const JoinStatusInfo = () => {
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
            {isJoin ? (<CheckCircleIcon fontSize='medium'/>) : (<CancelIcon fontSize='medium'/>)}
            <Box sx={{ml: 1}}>
                <Typography
                color="neutral.400"
                variant="body2"
                >
                {isJoin ? "已參與此次抽獎活動" : "尚未參與此次抽獎活動"}
                </Typography>
            </Box>
        </Box>
    )
  }
  
  return (
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
                {/* <Box className="user-page-link"><JoinStatusInfo /></Box> */}
            </Stack>
        </Box>
    </div>
);
};

