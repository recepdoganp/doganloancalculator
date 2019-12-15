// listen for submit

document.getElementById('loan-form').addEventListener('submit',(e)=>{
  //hide results
  document.getElementById('results').style.display = 'none'
  //show loader
  document.getElementById('loading').style.display = 'block'
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

//calculate results function
function calculateResults(){

  // UI vars
  const amount = document.getElementById('amount');
  const interest=document.getElementById('interest');
  const years=document.getElementById('years');
  const monthlyPayment=document.getElementById('monthly-payment');
  const totalPayment=document.getElementById('total-payment');
  const totalInterest=document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calcualtedPayments = parseFloat(years.value) * 12
  // compute monthly payment
  const x = Math.pow(1+calculatedInterest,calcualtedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1)

  if(isFinite(monthly)){
    monthlyPayment.value=monthly.toFixed(2);
    totalPayment.value=(monthly * calcualtedPayments).toFixed(2);
    totalInterest.value=((monthly*calcualtedPayments)-principal).toFixed(2);
    //show results
    document.getElementById('results').style.display = 'block'
    //hide loader
    document.getElementById('loading').style.display = 'none'
  } else{
    showError('Please check your numbers')
  }
}

// showError function

function showError(error){
  //show results
  document.getElementById('results').style.display = 'none'
  //hide loader
  document.getElementById('loading').style.display = 'none'

  // create an error div
  const errorDiv = document.createElement('div');
  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add class 
  errorDiv.className = 'alert alert-danger';

  // creat text node and append to div
  errorDiv.appendChild(document.createTextNode(error))

  // insert error above heading
  card.insertBefore(errorDiv, heading)
  //clear error after 3 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 1500);
}