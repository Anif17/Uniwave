// components/ExpenseForm.js
import React, { useState } from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAddTransaction } from '../../hooks/useAddTransaction';

const ExpenseForm = () => {
  const { addTransaction } = useAddTransaction();

  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && transactionAmount && transactionType) {
      const expense = { description, transactionAmount, transactionType }; // Updated variable name to expenseType
      addTransaction(expense);
      setDescription('');
      setTransactionAmount(0);
      setTransactionType('expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseForm;
