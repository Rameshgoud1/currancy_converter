
const BASE_URL='https://v6.exchangerate-api.com/v6/8aa74562542a75077fb28a70/latest'

const dropdown=document.querySelectorAll('.dropdown select');
const button=document.querySelector('form button');
const formcurr=document.querySelector('.from select');
const tocurr=document.querySelector('.to select');
const msg=document.querySelector('.msg')
for(let select of dropdown){
    for(let currcode in countryList){
       let newoption=document.createElement('option');
       newoption.innerText=currcode;
       newoption.value=currcode;
       if(select.name==='from' && currcode==='USD') newoption.selected='selected';
       if(select.name==='to' && currcode==='INR') newoption.selected='selected';
       select.append(newoption);
    
}
select.addEventListener('change',(evt)=>{
      updateFlag(evt.target);
})
};
const updaterate= async()=>{
    let input=document.querySelector('.amount input');
    let inputval=input.value;
    if(inputval <1 && inputval===''){
        inputval=1;
        inputval.value='1';
    }
    const URL = `${BASE_URL}/${formcurr.value}`;

    let response= await fetch(URL);
    let data= await response.json();
    const rate=data.conversion_rates[tocurr.value];
    let finalamount=rate * inputval;
    msg.innerText=`${inputval} ${formcurr.value} = ${finalamount} ${tocurr.value}`;
    
}
button.addEventListener('click',(evt)=>{
    evt.preventDefault();
    updaterate();
    
})
window.addEventListener('load',()=>{
    updaterate();
})

const updateFlag=(ele)=>{
    let currCode=ele.value;
    let countrycode=countryList[currCode];
    let imgsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=ele.parentElement.querySelector('img');
    img.src=imgsrc;
   
};