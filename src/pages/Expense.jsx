import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';

import ExpenseForm from '../components/expense-tracker/Form';
import ExpenseList from '../components/expense-tracker/List';
// ----------------------------------------------------------------------

export default function Expense() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Expenses Tracker | Uniwave </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Expenses Tracker
          </Typography>
        </Stack>
        <ExpenseForm />
        <ExpenseList />
      </Container>
    </>
  );
}
