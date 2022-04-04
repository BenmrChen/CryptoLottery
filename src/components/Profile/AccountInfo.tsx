import * as React from 'react'
import { useAccount } from 'wagmi'
import { Box, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const AccountInfo = () => {
    const [{ data: accountData }, disconnect] = useAccount();
    return (
      <div className="AccountInfo">
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
            <AccountCircleIcon fontSize='large'/>
            <Box sx={{ml: 1}}>
                <Typography
                color="neutral.400"
                variant="body2"
                >
                {accountData?.address}
                </Typography>
            </Box>
        </Box>
        </div>
    )
  }