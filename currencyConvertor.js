const Base_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_TsJ1kvng8u3qUysBMOptwqrowc0cVAPKhio8AyPK";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
document.addEventListener("load",()=>{
     updateExchangeRate();
})

const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
const URL=Base_URL;
let response=await fetch(URL);
let data=await response.json();
let rateFrom = data.data[fromCurr.value].value; // Get the value for the 'from' currency
let rateTo = data.data[toCurr.value].value; // Get the value for the 'to' currency
let finalAmount = (amtVal / rateFrom) * rateTo; // Convert the amount
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();//default koi bhi kaam nhi hoga
    updateExchangeRate();
    
})