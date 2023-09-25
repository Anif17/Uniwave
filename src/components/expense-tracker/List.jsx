/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
// components/ExpenseList.js

import React from 'react';
import { ListItem, ListItemText, Box } from '@mui/material';
import { useGetTransactions } from '../../hooks/useGetTransactions';

const ExpenseList = () => {
  const { transactions } = useGetTransactions();

  return (
    <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
      {transactions.map((transaction, index) => (
        <ListItem key={index}>
          <ListItemText primary={transaction.description} secondary={`RM ${transaction.transactionAmount}`} />
        </ListItem>
      ))}
    </Box>
  );
};

export default ExpenseList;
