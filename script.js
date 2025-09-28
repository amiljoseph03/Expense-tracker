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

//  deposit

function deposit() {
  let amount = parseFloat(document.getElementById('depamount').value);
  let account = document.getElementById('acno').value;

  let stored = localStorage.getItem(account);

  let user = JSON.parse(stored);

  if (!user.balance) {
    user.balance = 0;
  }
  user.balance = user.balance + amount;

  localStorage.setItem(account, JSON.stringify(user));

  alert(`Deposit successful! New balance: ₹${user.balance}`);

  result.innerHTML = `
  <h3>Deposit successful! New balance: ₹${user.balance}</h3>
  `;

  document.getElementById('depamount').value = '';
  document.getElementById('acno').value = '';
}

// withdraw

function withdraw() {
  let amount = parseFloat(document.getElementById('withamount').value);
  let account = document.getElementById('withacno').value;

  let stored = localStorage.getItem(account);

  let user = JSON.parse(stored);

  if (!user.balance) {
    user.balance = 0;
  }

  if (user.balance >= amount) {
    user.balance -= amount;

    localStorage.setItem(account, JSON.stringify(user));
    alert('success');
    withdrawresult.innerHTML = `
        <h3>Withdrawal successful! New balance: ₹${user.balance}</h3>
        `;
  } else {
    document.getElementById('withdrawresult').innerHTML = `
        <h3>insufficient balance ! available balance is ₹${user.balance}</h3>`;
  }
}
