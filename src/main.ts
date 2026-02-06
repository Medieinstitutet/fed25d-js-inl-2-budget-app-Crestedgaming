// @ts-nocheck

import './styles/style.scss';
import categories from './categories.json';

let incomes = [];
let expenses = [];

function saveData() {
  localStorage.setItem('budgetData', JSON.stringify({ incomes, expenses }));
}

function loadData() {
  const raw = localStorage.getItem('budgetData');
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
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
      <li>
        ${income.description} – ${income.amount} kr (${income.category})
        <button data-income-id="${index}">Delete</button>
      </li>
    `;
  });

  incomeHtml += '</ul>';
  incomeListEl.innerHTML = incomeHtml;

  // Expenses
  let expenseHtml = '<ul>';

  expenses.forEach((expense, index) => {
    expenseHtml += `
      <li>
        ${expense.description} – ${expense.amount} kr (${expense.category})
        <button data-expense-id="${index}">Delete</button>
      </li>
    `;
  });

  expenseHtml += '</ul>';
  expenseListEl.innerHTML = expenseHtml;

  // Add delete listeners
  document.querySelectorAll('[data-income-id]').forEach(btn => {
    btn.addEventListener('click', deleteIncome);
  });

  document.querySelectorAll('[data-expense-id]').forEach(btn => {
    btn.addEventListener('click', deleteExpense);
  });
}

function deleteIncome(e) {
    const id = Number(e.target.dataset.incomeId);
    incomes.spliced(id, 1);
    saveData();
    writeToScreen();
}


function deleteExpense(e) {
    const id = Number(e.target.dataset.expenseId);
    expenses.spliced(id, 1);
    saveData();
    writeToScreen();
}

localData();
writeToScreen();

console.log(categories);
console.log(incomes, expenses);
