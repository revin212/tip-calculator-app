const billInput = document.querySelector('#bill-input');
const pplInput = document.querySelector('#number-people');
const optionWrapper = document.querySelector('.option-wrapper');
const options = optionWrapper.getElementsByClassName('tip-option');
const customTip = document.querySelector('#custom-tip');
const result1 = document.querySelector('#result-1');
const result2 = document.querySelector('#result-2');
const resetButton = document.querySelector('#reset-btn');
const labelPpl = document.querySelector('#label-wrapper');

let bill = 0;
let ppl = 0;
let tip = 0;
let tipAmount = 0;
let total = 0;
const percent = {
    '5%': 0.05,
    '10%': 0.1,
    '15%': 0.15,
    '25%': 0.25,
    '50%': 0.5,
};


billInput.addEventListener('keyup', function(){
    bill = Number(billInput.value);
    optionWrapper.classList.add("parent-active");
    resetButton.classList.add("calc-active");
    //console.log('blurEvent')
    //console.log(bill, ppl, tip, tipAmount, total);
})

customTip.addEventListener('keyup', function(){
    tip = Number(customTip.value)/100;
    optionWrapper.classList.add("parent-active");
    resetButton.classList.add("calc-active");
    //console.log('blurEvent');
    //console.log(bill, ppl, tip, tipAmount, total);
})

pplInput.addEventListener('keyup', function(){
    optionWrapper.classList.add("parent-active");
    resetButton.classList.add("calc-active");
    let labels = labelPpl.getElementsByTagName('h3');
    if(pplInput.value === "" || pplInput.value == 0){
        for(let i=0; i<labels.length; i++){
            if(labels[i].classList.contains('input-alert')){
                labels[i].remove();
            }
        }
        let inputAlert = document.createElement('h3');
        inputAlert.classList.add('input-alert');
        inputAlert.innerText = "Can't be zero";
        pplInput.style.border = "solid 1px red";
        document.getElementById('label-wrapper').appendChild(inputAlert);
        //console.log('blurEvent-alert');
    }else{
        pplInput.style.border = "none";
        for(let i=0; i<labels.length; i++){
            if(labels[i].classList.contains('input-alert')){
                labels[i].remove();  
            }
        }
        ppl = Number(pplInput.value);
        //console.log('blurEvent');
        //console.log(bill, ppl, tip, tipAmount, total);
    }
})

for(let i=0; i<options.length; i++){
    options[i].addEventListener('click', function() {
        if(this.classList.contains("active")){
            this.classList.remove("active");
            tip = 0;
            //console.log('tip button toggle off');
        }else {
            this.parentElement.classList.add("parent-active");
            resetButton.classList.add("calc-active");
            for(let j=0; j<options.length; j++){
                if(options[j].classList.contains('active')){
                    options[j].classList.remove('active');
                }
            }            
            this.classList.add("active");
            customTip.value = "";
            tip = Number(percent[this.innerText]);
            //console.log('tip button toggle on');
        }
    })
}
customTip.addEventListener('click', function(){
    optionWrapper.classList.add("parent-active");
    resetButton.classList.add("calc-active");
    for(let j=0; j<options.length; j++){
        if(options[j].classList.contains('active')){
            options[j].classList.remove('active');
        }
    } 
    customTip.classList.add('active');
    tip = Number(customTip.value)/100;
    //console.log('tip button custom');
})

resetButton.addEventListener('click', function(){
    bill = 0;
    ppl = 0;
    tip = 0;
    tipAmount = 0;
    total = 0;
    optionWrapper.classList.remove("parent-active");
    resetButton.classList.remove("calc-active");
    pplInput.style.border = "none";
    for(let j=0; j<options.length; j++){
        if(options[j].classList.contains('active')){
            options[j].classList.remove('active');
        }
    }
    let labels = labelPpl.getElementsByTagName('h3');
    for(let i=0; i<labels.length; i++){
        if(labels[i].classList.contains('input-alert')){
            labels[i].remove();
            pplInput.style.outlineColor = "none";
        }
    }

    billInput.value = "";
    pplInput.value = "";
    customTip.value = "";
    //console.log('reset button clicked');
})

const calcTip = function() {
    tipAmount = bill*tip/ppl;
    tipAmount = tipAmount.toFixed(2);
    total = (bill/ppl) + Number(tipAmount);
    total = total.toFixed(2);
    
    if(optionWrapper.classList.contains("parent-active") && ppl>0){
        result1.innerText = `$${String(tipAmount)}`;
        result2.innerText = `$${String(total)}`;
    } else {
        result1.innerText = "$0.00";
        result2.innerText = "$0.00";
    }
}

setInterval(calcTip,100);