// @ts-nocheck

import './styles/style.scss';
import categories from './categories.json';



let incomes = [];
let expenses = [];


const incomeForm = document.getElementById('income-form');

incomeForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const amount = Number(document.getElementById("income-amount").value);
  const description = document.getElementById("income-description").value;
  const category = document.getElementById("income-category").value;
  console.log(amount, description, category);

});

const income = {
  amount: Number(document.getElementById("income-amount").value),
  description: document.getElementById("income-description").value,
  category: document.getElementById("income-category").value
}

incomes.push(income);
console.log(income);



const expenseForm = document.getElementById('expense-form');

expenseForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const amount = Number(document.getElementById("expense-amount").value);
  const description = document.getElementById("expense-description").value;
  const category = document.getElementById("expense-category").value;
  console.log(amount, description, category);

});

const expense = {
  amount: Number(document.getElementById("expense-amount").value),
  description: document.getElementById("expense-description").value,
  category: document.getElementById("expense-category").value
}


expenses.push(expense);
console.log(expense);


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

console.log(categories);