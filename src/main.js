import './styles/style.scss';

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

console.log(income);


