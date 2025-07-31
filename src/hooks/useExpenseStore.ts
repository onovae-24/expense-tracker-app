import { useState, useEffect } from 'react';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  budget?: number;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#ef4444' },
  { id: '2', name: 'Transportation', color: '#f97316' },
  { id: '3', name: 'Shopping', color: '#eab308' },
  { id: '4', name: 'Entertainment', color: '#22c55e' },
  { id: '5', name: 'Bills & Utilities', color: '#3b82f6' },
  { id: '6', name: 'Healthcare', color: '#8b5cf6' },
  { id: '7', name: 'Other', color: '#6b7280' },
];

export const useExpenseStore = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [budget, setBudget] = useState<number>(1000);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedCategories = localStorage.getItem('categories');
    const savedBudget = localStorage.getItem('budget');

    console.log('useExpenseStore - Loading from localStorage');
    console.log('useExpenseStore - savedExpenses:', savedExpenses);

    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses);
      console.log('useExpenseStore - parsed expenses:', parsedExpenses);
      setExpenses(parsedExpenses);
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
    if (savedBudget) {
      setBudget(JSON.parse(savedBudget));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    console.log('useExpenseStore - addExpense called with:', expense);
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    console.log('useExpenseStore - Creating new expense:', newExpense);
    setExpenses(prev => {
      const updated = [newExpense, ...prev];
      console.log('useExpenseStore - Updated expenses array:', updated);
      console.log('useExpenseStore - Current date:', new Date().toISOString());
      console.log('useExpenseStore - Expense date:', newExpense.date);
      // Force localStorage update
      localStorage.setItem('expenses', JSON.stringify(updated));
      return updated;
    });
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...category, ...updates } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  // Calculate totals and budget progress
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const now = new Date();
    return expenseDate.getMonth() === now.getMonth() && 
           expenseDate.getFullYear() === now.getFullYear();
  });
  
  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetProgress = budget > 0 ? (thisMonthTotal / budget) * 100 : 0;
  const budgetAlert = budgetProgress > 100;

  return {
    expenses,
    categories,
    budget,
    totalExpenses,
    thisMonthTotal,
    thisMonthExpenses,
    budgetProgress,
    budgetAlert,
    addExpense,
    updateExpense,
    deleteExpense,
    addCategory,
    updateCategory,
    deleteCategory,
    setBudget,
  };
};