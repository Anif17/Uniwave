/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */
import { useEffect, useState } from 'react';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });

  const transactionCollectionRef = collection(db, 'transactions');
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where('userID', '==', userID),
        orderBy('createdAt', 'desc')
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        const docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === 'income') {
            totalIncome += Number(data.transactionAmount);
          } else {
            totalExpenses += Number(data.transactionAmount);
          }
        });

        setTransactions(docs);

        const balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (err) {
      console.error(err);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};
