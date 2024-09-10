const form = document.querySelector('main section form');

const amount_input = document.getElementById('amount');
const term_input = document.getElementById('term');
const rate_input = document.getElementById('rate');
const rbtnRepayment = document.getElementById('repayment');
const rbtnInterest = document.getElementById('interest');

const monthlyPaymentRes = document.getElementById('monthly-repayment');
const totalPaymentRes = document.getElementById('over-term-repayment');

// Events
rbtnRepayment.addEventListener('click', () => {
    rbtnInterest.parentElement.style.backgroundColor = '#fff';
    rbtnRepayment.parentElement.style.backgroundColor = '	#f7f7d4';
})

rbtnInterest.addEventListener('click', () => {
    rbtnRepayment.parentElement.style.backgroundColor = '#fff';
    rbtnInterest.parentElement.style.backgroundColor = '	#f7f7d4';
})

document.querySelector('main header p.clear').addEventListener('click', () => {
    amount_input.value = '';
    term_input.value = '';
    rate_input.value = '';

    rbtnInterest.checked = false;
    rbtnRepayment.checked = false;
    rbtnInterest.parentElement.style.backgroundColor = '#fff';
    rbtnRepayment.parentElement.style.backgroundColor = '#fff';

    document.querySelector('section.result div.pre-calculating').classList.remove('hidden');
    document.querySelector('section.result div.after-calculating').classList.add('hidden');    
})

form.addEventListener('submit', (event) => {

    event.preventDefault();
    let isFormValid = true;

    // Check Mortgage Amount 
    if (!amount_input.value) {
        amount_input.parentElement.classList.add('invalid');
        document.querySelector('main section form div.amount p.error').classList.remove('hidden');

        isFormValid = false;
    }
    else {
        amount_input.parentElement.classList.remove('invalid');
        document.querySelector('main section form div.amount p.error').classList.add('hidden');
    }

    // Check Mortgage Term
    if (!term_input.value) {
        term_input.parentElement.classList.add('invalid');
        document.querySelector('main section form div.term p.error').classList.remove('hidden');

        isFormValid = false;
    }
    else {
        term_input.parentElement.classList.remove('invalid');
        document.querySelector('main section form div.term p.error').classList.add('hidden');
    }

    // Check Mortgage Rate
    if (!rate_input.value) {
        rate_input.parentElement.classList.add('invalid');
        document.querySelector('main section form div.rate p.error').classList.remove('hidden');

        isFormValid = false;
    }
    else {
        rate_input.parentElement.classList.remove('invalid');
        document.querySelector('main section form div.rate p.error').classList.add('hidden');
    }

    // Check Mortgage Type
    if (!rbtnRepayment.checked && !rbtnInterest.checked) {
        document.querySelector('main section form div.type p.error').classList.remove('hidden');

        isFormValid = false;
    }
    else {
        document.querySelector('main section form div.type p.error').classList.add('hidden');
    }

    if (isFormValid) {
        const amount = +(amount_input.value.split(',').join(''));
        const term = +(term_input.value.split(',').join(''));
        const rate = +(rate_input.value.split(',').join(''));
        let monthlyPayment, totalPayment;

        if (rbtnRepayment.checked) {
            const monthlyRate = (rate / 100) / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
        }

        if (rbtnInterest.checked) {
            monthlyPayment = (amount * rate / 100) / 12;
        }

        totalPayment = monthlyPayment * term * 12;

        monthlyPaymentRes.textContent = String(monthlyPayment.toFixed(2));
        totalPaymentRes.textContent = String(totalPayment.toFixed(2));

        // Show result
        document.querySelector('section.result div.pre-calculating').classList.add('hidden');
        document.querySelector('section.result div.after-calculating').classList.remove('hidden');
    }
    else {
        document.querySelector('section.result div.pre-calculating').classList.remove('hidden');
        document.querySelector('section.result div.after-calculating').classList.add('hidden');
    }
})