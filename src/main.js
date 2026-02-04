import './styles/style.scss';

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

