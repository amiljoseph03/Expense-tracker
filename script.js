// register

function register() {
  detials = {
    username: uname.value,
    acnumber: anumber.value,
    passwoed: pswrd.value,
  };

  if (detials.acnumber in localStorage) {
    alert('already registered');
  } else {
    localStorage.setItem(detials.acnumber, JSON.stringify(detials));
    alert('registered successfully');
  }
}

// login

function login() {
  let theacno = document.getElementById('acno').value;
  let thepassword = document.getElementById('pswrd').value;

  let storedacno = localStorage.getItem(theacno);
  // let storedpassword=localStorage.getItem(passwoed)
  let user = JSON.parse(storedacno);

  if (user.passwoed === thepassword) {
    alert('success');
    window.location.assign('detials.html');
  } else {
    alert('faild');
  }
}

//  income


  let totalIncome = 0;
  let totalExpense = 0;
  let incomeTransactions = [];
  let expenseTransactions = [];

  function income() {
    let amount = parseFloat(document.getElementById('inamount').value);
    let type = document.getElementById('intype').value;

    if (!isNaN(amount) && amount > 0 && type !== '') {
      totalIncome += amount;
      incomeTransactions.push({ label: type, amount: amount, date: new Date() });

      document.getElementById('result').innerHTML = `
        <div style="border:1px solid green; padding:10px; margin-top:10px; border-radius:8px;">
          <h4>Total Income: ₹${totalIncome}</h4>
          <p>Last added: ${type} - ₹${amount}</p>
        </div>
      `;
      updateTables();
    } else {
      alert('Please enter valid income details');
    }

    document.getElementById('inamount').value = '';
    document.getElementById('intype').value = '';
  }

  function expense() {
    let amount = parseFloat(document.getElementById('expamount').value);
    let type = document.getElementById('exptype').value;

    if (!isNaN(amount) && amount > 0 && type !== '') {
      if (amount > totalIncome - totalExpense) {
        alert('Not enough balance for this expense!');
        return;
      }

      totalExpense += amount;
      expenseTransactions.push({ label: type, amount: amount, date: new Date() });

      document.getElementById('withdrawresult').innerHTML = `
        <div style="border:1px solid red; padding:10px; margin-top:10px; border-radius:8px;">
          <h4>Total Expense: ₹${totalExpense}</h4>
          <p>Last spent: ${type} - ₹${amount}</p>
          <h4>Remaining Balance: ₹${totalIncome - totalExpense}</h4>
        </div>
      `;
      updateTables();
    } else {
      alert('Please enter valid expense details');
    }

    document.getElementById('expamount').value = '';
    document.getElementById('exptype').value = '';
  }

  function updateTables() {
    let incomeTbody = document
      .getElementById('incomeTable')
      .getElementsByTagName('tbody')[0];
    let expenseTbody = document
      .getElementById('expenseTable')
      .getElementsByTagName('tbody')[0];

    incomeTbody.innerHTML = '';
    expenseTbody.innerHTML = '';

    let runningBalance = 0;

    // Fill Income Table
    incomeTransactions.forEach((t) => {
      runningBalance += t.amount;
      let row = incomeTbody.insertRow();
      row.insertCell(0).innerText = t.label;
      row.insertCell(1).innerText = '+' + t.amount; 
      row.insertCell(2).innerText = '₹' + runningBalance; 
      row.insertCell(3).innerText = t.date.toLocaleString(); 
    });

    runningBalance = totalIncome; 

    //  Expense Table
    expenseTransactions.forEach((t) => {
      runningBalance -= t.amount;
      let row = expenseTbody.insertRow();
      row.insertCell(0).innerText = t.label; 
      row.insertCell(1).innerText = '-' + t.amount; 
      row.insertCell(2).innerText = '₹' + runningBalance; 
      row.insertCell(3).innerText = t.date.toLocaleString(); 
    });

    document.getElementById('summaryBox').innerHTML = `
      <h4>Total Income: ₹${totalIncome} | Total Expense: ₹${totalExpense} | Balance: ₹${
      totalIncome - totalExpense
    }</h4>
    `;
  }

