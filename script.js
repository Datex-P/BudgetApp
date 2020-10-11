
let spinner = document.querySelector('.spinner');
let registerAndLoginContainer = document.querySelector('#registerAndLoginContainer');
let balanceDisplay = document.getElementById('balanceDisplay');
let expensesDisplay = document.getElementById('expensesDisplay');
let budgetDisplay = document.getElementById('budgetDisplay');
let loginPage = document.querySelector('#loginPage');
let password = document.getElementById('userPassWord');
let loginName = document.getElementById('userNameInput');
let mainMenuContainer = document.getElementById('mainMenuContainer');
let registerPageContainer = document.querySelector('#registerPageContainer')
let welcomeMessage = document.getElementById('welcomeMessage');
let newUserLoginName = document.getElementById('newUserLoginName');
let registerButton = document.getElementById('registerButton');
let name = '';
let currentlyLoggedIn = '';

let userDataBase = {
	testUser:{
		budget: 1000,
    balance: 800,
		expenses: 200,
		history:[
			{name:'taxi',value:50},
			{name:'taxi',value:50},
			{name:'taxi',value:50},
			{name:'taxi',value:50}
		],
    password: '12345'
	}
}
//very important!!!
/*currentlyLoggedIn  is important so that the clear button works and the budget, balanceDisplay of the current user can be reset*/


document.getElementById('loginButton').onclick = function () {
	let userNameExists = userDataBase[loginName.value];
	if (userNameExists && userNameExists.password === password.value) {
		startRender(userNameExists,loginName.value)
    currentlyLoggedIn = loginName.value;
	}else{
		alert('Invalid username or password.')
	}
}



document.querySelector('#signUpNow').onclick = function(){
	loginPage.style.display='none'
	registerPageContainer.style.display='flex'
}



document.querySelector('#backToSignIn').onclick = function () {
  loginPage.style.display='flex';
  registerPageContainer.style.display='none'
  document.getElementById('passwordRequirements').style.display='none';
  document.getElementById('newUserPassword').value = '';
  newUserLoginName.value = '';
  registerButton.style.marginTop="90px";
}



document.getElementById('backButton').onclick = function(){
	registerAndLoginContainer.style.display='flex';
  loginPage.style.display='flex';
	registerPageContainer.style.display = 'none';
	mainMenuContainer.style.display = 'none';
  loginName.value = '';
  password.value = '';
  currentlyLoggedIn = '';
  document.getElementById('passwordRequirements').style.display='none';
  document.getElementById('newUserPassword').value = '';
  newUserLoginName.value = '';
  registerButton.style.marginTop="90px";

}

function hide(event) {
  event.style.display='none';
  registerButton.style.marginTop="90px";
}

registerButton.onclick = function () {

  let newUserPassword = document.getElementById('newUserPassword').value;
  document.querySelector('#oneNumberSrc').src = 'redCross.svg';
  document.querySelector('#eightCharactersSrc').src = 'redCross.svg';
  document.querySelector('#capitalLetterSrc').src = 'redCross.svg';
 
  let onlyCapitalMeet = /(?=.*[A-Z])/;
  let onlyLengthMeet =  /(?=.{8,}$)/;
  let onlyNumberMeet =  /(?=.*[0-9])/;

  // let capitalAndLengthMeet = /^(?=.{8,}$)(?=.*[A-Z])(?!.*[0-9])/;
  // let capitalAndNumberMeet = /^(?!.{8,}$)(?=.*[A-Z])(?=.*[0-9])/;

  // let lengthAndNumberMeet = /^(?=.{8,}$)(?!.*[A-Z])(?=.*[0-9])/;
	
  let allMeet = /^(?=.{8,}$)(?=.*[A-Z])(?=.*[0-9])/;

  let passWordContainer =  document.querySelector('#passwordRequirements');

  if (userDataBase[newUserLoginName.value]) {
    alert ('User name is already taken.')
  } else {
		if (allMeet.test(newUserPassword)) {
			passWordContainer.style.display = 'flex';
			document.querySelector('#oneNumberSrc').src = 'checkmark.svg';
			document.querySelector('#eightCharactersSrc').src = 'checkmark.svg';
			document.querySelector('#capitalLetterSrc').src = 'checkmark.svg';

			userDataBase[newUserLoginName.value]={
				budget: 0,
				expenses: 0,
				history:[],
				password: newUserPassword.value
			}
		
			document.getElementById('innerRegisterPage').style.display='none';

			spinner.style.display='block';
			welcomeMessage.innerHTML = `Hello ${newUserLoginName.value}, your account gets activated`;
			
			setTimeout(function(){
				startRender(userDataBase[newUserLoginName.value],newUserLoginName.value);
				currentlyLoggedIn =  newUserLoginName.value;
				newUserLoginName.value = '';
				newUserPassword.value = '';
				spinner.style.display='none';
				welcomeMessage.innerHTML = '';
				document.getElementById('innerRegisterPage').style.display='block';
			}, 2000);
		
			document.querySelector('#oneNumberSrc').src = 'redCross.svg';
			document.querySelector('#eightCharactersSrc').src = 'redCross.svg';
			document.querySelector('#capitalLetterSrc').src = 'redCross.svg';
		
		} else {

			passWordContainer.style.display = 'flex';
			registerButton.style.marginTop = '5px';

     	if (onlyCapitalMeet.test(newUserPassword)) {
				document.querySelector('#capitalLetterSrc').src = 'checkmark.svg';
			}
			if (onlyLengthMeet.test(newUserPassword)) {
				document.querySelector('#eightCharactersSrc').src = 'checkmark.svg';
			}
			if (onlyNumberMeet.test(newUserPassword)) {
				document.querySelector('#oneNumberSrc').src = 'checkmark.svg';
			} 
			// else if (capitalAndLengthMeet.test(newUserPassword)) {
			// 	document.querySelector('#eightCharactersSrc').src = 'checkmark.svg';
			// 	document.querySelector('#capitalLetterSrc').src = 'checkmark.svg';
			// } else if (capitalAndNumberMeet.test(newUserPassword)) {
			// 	document.querySelector('#capitalLetterSrc').src = 'checkmark.svg';
			// 	document.querySelector('#oneNumberSrc').src = 'checkmark.svg';
			// } else if (lengthAndNumberMeet.test(newUserPassword)) {
			// 	document.querySelector('#oneNumberSrc').src = 'checkmark.svg';
			// 	document.querySelector('#eightCharactersSrc').src = 'checkmark.svg';
			// }
			
		}
	}
}

function startRender(user,loginName){
	
  mainMenuContainer.style.display = 'block';
	registerAndLoginContainer.style.display='none';

	name = loginName;

	generateExpensesHistory(user.history);
	budgetDisplay.innerText = user.budget+'$';
	expensesDisplay.innerText = user.expenses+'$';
	balanceDisplay.innerText = ((user.budget-user.expenses)>0 ? (user.budget-user.expenses) : 0) + '$'; 
}




document.getElementById('calculateButton').onclick = function () {
	let budgetInput = document.getElementById('budgetInp');
  if (isNaN(budgetInput.value)) {
    alert('Please enter a valid number')
    budgetInput.value = '';
  } else if (Number(budgetInput.value) ===0) {
    alert('Please enter a number bigger than 0.')
  }else {
    userDataBase[name].budget += Number(budgetInput.value)
    budgetDisplay.innerText = userDataBase[name].budget+'$'
    balanceDisplay.innerText = userDataBase[name].budget - userDataBase[name].expenses+ '$'
    budgetInput.value = ''
  }
}



document.getElementById('expButton').onclick = function () {
	let expAmount = document.getElementById('expenseAmount');
	let expenseInput = document.getElementById('expenseName');
	let expenseAmount = Number(expAmount.value);
  let expenseName = expenseInput;
  
	if (isNaN(expenseAmount)) {
			alert('Please enter a valid number')
			expAmount.value = '';
	} else if (!isNaN(expenseName)) {
    alert('The amount goes below')
  }else{
		if(expenseAmount>userDataBase[name].budget){
			alert("Expenses can't be bigger than budget")
			//budgetInput.focus()
		}else{
			userDataBase[name].expenses += expenseAmount
    	userDataBase[name].budget -= expenseAmount
			userDataBase[name].history.push({
				name: [expenseName.value],
				value: expenseAmount
			})

			generateExpensesHistory(userDataBase[name].history)


			expensesDisplay.innerText = userDataBase[name].expenses +'$'	
  		balanceDisplay.innerText = userDataBase[name].budget+'$';
      expAmount.value = '';
      expenseName = ''; 
		}
	}
}



function deleteItem(name,idx){
	let list = userDataBase[name].history
	let removedItem = list.splice(idx,1)
	userDataBase[name].expenses -= +removedItem[0].value
	userDataBase[name].balanceDisplay += +removedItem[0].value
	userDataBase[name].history = list
	startRender(userDataBase[name],name)
}

function save(e,index){
	e.target.parentNode.querySelector('img').src = 'edit-solid.svg';

	e.target.parentNode.parentNode.querySelectorAll('input').forEach(input=>input.disabled=true);

	let newName = e.target.parentNode.parentNode.querySelector('input[name="name"]').value;

	let newValue = e.target.parentNode.parentNode.querySelector('input[name="value"]').value;

	userDataBase[name].history[index] = {
		name: newName,
		value: +newValue
	}
	userDataBase[name].expenses = userDataBase[name].history.reduce((sum,item)=>sum+= +item.value,0)
	userDataBase[name].balance = userDataBase[name].budget - userDataBase[name].expenses
	startRender(userDataBase[name],name)
	event.target.parentNode.onclick = function(){
		activateEdit(event,index)
	}
}

function activateEdit(event,index) {
	event.target.parentNode.querySelector('img').src = 'save-solid.svg'
	event.target.parentNode.onclick = function(){
		save(event,index)
	}
  event.target.parentNode.parentNode.querySelectorAll('input').forEach(input=>input.disabled=false)
}



function generateExpensesHistory(arr){
	let containerExpenseTable = document.querySelector('table tbody')
	containerExpenseTable.innerHTML = '';
	
	arr.forEach((item,idx)=>{
    
		containerExpenseTable.innerHTML+=`
			<tr class= "tr_el">
				<td>
					<input name='name' value='${item.name}' style= "background-color: #B5D6B2; text-align: center" disabled />
				</td>
				<td>
					<input name='value' value='${item.value}' style= "background-color: #B5D6B2; text-align: center" disabled />
				</td>
		    <td onclick = 'activateEdit(event,${idx})'>
					<img src="edit-solid.svg" style="margin-top: 1px; width:12px; margin-left: 2px">  
				</td>
				<td class= "td_el" onclick='deleteItem("${name}",${idx})'>
					<img src="trash-alt-solid.svg" style="margin-top: 1px; margin-left: 2px; width:11px">
				</td>
			</tr>
		`
	})
}









document.getElementById('saveButton').onclick = function () {
  mainMenuContainer.style.display='none'
  let goodByeScreen = document.getElementById('goodbye');
  let goodByeMessage = document.getElementById('goodbyeMessage');
  goodByeScreen.style.display='flex';
  
  document.getElementById('passwordRequirements').style.display='none';
  document.getElementById('newUserPassword').value = '';
  newUserLoginName.value = '';
  registerButton.style.marginTop="90px";

  goodByeMessage.innerHTML = `Hello ${currentlyLoggedIn},`;

 
	
  setTimeout(function() {
    
    registerAndLoginContainer.style.display = 'flex';
    registerPageContainer.style.display='none';
    loginPage.style.display = 'flex';
    password.value = ''
    loginName.value = '';
    currentlyLoggedIn = '';
    goodByeScreen.style.display='none';
  }, 6000)
 }



 document.getElementById('clearButton').onclick = function () {

   if (currentlyLoggedIn !== 'testUser') {
   document.querySelector('table tbody').innerHTML = '';
   budgetDisplay.innerHTML = '';
   balanceDisplay.innerText = '';
   expensesDisplay.innerText = '';
   
   userDataBase[name]={
			budget: 0,
			expenses: 0,
			history:[],
			password: password.value
		}
   
   } else {
   
   alert(" TestUser can't be resetted")
   }
 }

