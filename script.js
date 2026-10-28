let totalExpenses = 0;
let initialBudget = 1000;
let expenses = [];

const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalExpensesDisplay = document.getElementById('total-expenses');
const balanceDisplay = document.getElementById('balance-display');

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategorySelect.value;

    // Błąd nr 6 w Issues: Brak walidacji – można dodać wydatek z pustą nazwą lub bez kwoty (NaN)
    
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);
    totalExpenses += amount;

    updateUI();
    
    // Błąd nr 7 w Issues: Formularz nie czyści pól po dodaniu wydatku
});

function updateUI() {
    totalExpensesDisplay.textContent = totalExpenses + ' zł';
    
    let balance = initialBudget - totalExpenses;
    balanceDisplay.textContent = balance + ' zł';

    expenseList.innerHTML = '';
    
    expenses.forEach(exp => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${exp.name}</strong> (${exp.category})</span>
            <span>${exp.amount} zł 
                <button onclick="removeExpense(${exp.id})" style="width: auto; padding: 2px 6px; margin-left: 10px; background: #e74c3c;">X</button>
            </span>
        `;
        expenseList.appendChild(li);
    });

    // Błąd nr 10 w Issues: Brak aktualizacji koloru balansu (np. zmiana na czerwony, gdy balans spada poniżej 0)
    if (balance < 0) {
        balanceDisplay.classList.remove('positive');
        balanceDisplay.classList.add('negative');
    } else {
        balanceDisplay.classList.remove('negative');
        balanceDisplay.classList.add('positive');
    }
}

function removeExpense(id) {
    const index = expenses.findIndex(exp => exp.id === id);
    if (index !== -1) {
        totalExpenses -= expenses[index].amount;
        expenses.splice(index, 1);
        updateUI();
    }
}
