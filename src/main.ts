// @ts-ignore


import './styles/style.scss';
import categories from './categories.json';
import { type IBudgetItem, type IBudgetData } from './models';


let incomes: IBudgetItem[] = [];
let expenses: IBudgetItem[] = [];

function saveData() {
  localStorage.setItem('budgetData', JSON.stringify({ incomes, expenses }));
}

function loadData() {
  const raw = localStorage.getItem('budgetData');
  if (!raw) return;
  try {
    const data: IBudgetData = JSON.parse(raw);
    incomes = data.incomes || [];
    expenses = data.expenses || [];
  } catch (e) {
    console.warn('Det finns inget sparat i localStorage', e);
  }
}

loadData();

const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');

if (incomeForm) {
  incomeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const amount = Number((document.getElementById('income-amount') as HTMLInputElement).value);
    const description = (document.getElementById('income-description') as HTMLInputElement).value;
    const category = (document.getElementById('income-category') as HTMLSelectElement).value;

    if (!amount || !description) return;

    const newIncome = { amount, description, category };
    incomes.push(newIncome);
    saveData();
    writeToScreen();

    (incomeForm as HTMLFormElement).reset();
  });
}

if (expenseForm) {
  expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const amount = Number((document.getElementById('expense-amount') as HTMLInputElement).value);
    const description = (document.getElementById('expense-description') as HTMLInputElement).value;
    const category = (document.getElementById('expense-category') as HTMLSelectElement).value;

    if (!amount || !description) return;

    const newExpense = { amount, description, category };
    expenses.push(newExpense);
    saveData();
    writeToScreen();

    (expenseForm as HTMLFormElement).reset();
  });
}

const incomeDropdown = document.querySelector('#income-category');
if (incomeDropdown && categories.income) {
  categories.income.forEach(category => {
    incomeDropdown.innerHTML += `<option value="${category.value}">${category.text}</option>`;
  });
}

const expenseDropdown = document.querySelector('#expense-category');
if (expenseDropdown && categories.expenses) {
  categories.expenses.forEach(category => {
    expenseDropdown.innerHTML += `<option value="${category.value}">${category.text}</option>`;
  });
}

const incomeListEl = document.querySelector('#income-list');
const expenseListEl = document.querySelector('#expense-list');

function writeToScreen() {
  // Incomes
  let incomeHtml = '<ul>';

  incomes.forEach((income, index) => {
    incomeHtml += `
      <li class="income-item">
        ${income.description} – ${income.amount} kr (${income.category})
        <button data-income-id="${index}">Delete</button>
      </li>
    `;
  });

  incomeHtml += '</ul>';
  if (incomeListEl) incomeListEl.innerHTML = incomeHtml;

  // Expenses
  let expenseHtml = '<ul>';

  expenses.forEach((expense, index) => {
    expenseHtml += `
      <li class="expense-item">
        ${expense.description} – ${expense.amount} kr (${expense.category})
        <button data-expense-id="${index}">Delete</button>
      </li>
    `;
  });

  expenseHtml += '</ul>';
  if (expenseListEl) expenseListEl.innerHTML = expenseHtml;

  const totalIncomeEl = document.querySelector('#total-income');
  const totalExpensesEl = document.querySelector('#total-expenses');
  const balanceEl = document.querySelector('#balance');

  const { totalIncome, totalExpenses, balance } = calculateTotals();

  if (totalIncomeEl) totalIncomeEl.textContent = totalIncome.toString();
  if (totalExpensesEl) totalExpensesEl.textContent = totalExpenses.toString();

  if (balanceEl) {
    balanceEl.textContent = balance.toString();
    balanceEl.classList.remove('positive', 'negative', 'neutral');
    if (balance > 0) {
      balanceEl.classList.add('positive');
    } else if (balance < 0) {
      balanceEl.classList.add('negative');
    } else {
      balanceEl.classList.add('neutral');
    }
  }

  // Add delete listeners
  document.querySelectorAll('[data-income-id]').forEach(btn => {
    btn.addEventListener('click', deleteIncome);
  });

  document.querySelectorAll('[data-expense-id]').forEach(btn => {
    btn.addEventListener('click', deleteExpense);
  });
}

function deleteIncome(e: Event) {
  const id = Number((e.target as HTMLElement).dataset.incomeId);
  incomes.splice(id, 1);
  saveData();
  writeToScreen();
}


function deleteExpense(e: Event) {
  const id = Number((e.target as HTMLElement).dataset.expenseId);
  expenses.splice(id, 1);
  saveData();
  writeToScreen();
}

function calculateTotals() {
  const totalIncome = incomes.reduce((sum, income) => {
    return sum + income.amount;
  }, 0);

  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const balance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, balance };
}

writeToScreen();

console.log(categories);
console.log(incomes, expenses);
