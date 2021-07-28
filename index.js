var billAmount=0;
var tipAmount=0;
var tipPercent=0;
var numPerson=0;
const discounts = [5,10,15,25,50];
const frm=document.getElementById('frm')
var enabledIndex = -1;
const customTip=document.querySelector("#custom-tip")
const billBox=document.querySelector("#bill-amount")
const numPersonBox = document.querySelector("#num-of-people")
const cantBeZero = document.querySelector(".cant-be-zero");
const resetButton = document.querySelector(".reset-button");
const update = ()=>{
    if(numPerson==0)
    {   
        cantBeZero.textContent = "Cant be Zero";
    }
    else
    {
        var totalTip = tipPercent/100 * billAmount;
        tipAmount  = totalTip/numPerson;
        var totalBill = billAmount-totalTip;
        document.querySelector('.tip-amount').textContent='$'+tipAmount;
        document.querySelector('.total').textContent='$'+totalBill;
    }
}
const makeResetActive = ()=>{
    resetButton.classList.add('active');
}
billBox.addEventListener('focus',()=>{
    document.querySelectorAll('.input-bill')[0].classList.add("input-bill-active")
})
billBox.addEventListener('blur',()=>{
    document.querySelectorAll('.input-bill')[0].classList.remove("input-bill-active")
})
numPersonBox.addEventListener('focus',()=>{
    document.querySelectorAll('.input-bill')[1].classList.add("input-bill-active")
})
numPersonBox.addEventListener('blur',()=>{
    document.querySelectorAll('.input-bill')[1].classList.remove("input-bill-active")
})

billBox.addEventListener('change',(e)=>{

    billAmount = billBox.value
    console.log(billAmount)
    makeResetActive();
})
document.querySelector("#num-of-people").addEventListener('change',()=>{
    numPerson = document.querySelector("#num-of-people").value
    console.log(numPerson)
    update();
    makeResetActive();
})

var tipButtons = document.querySelectorAll(".grid-item");
tipButtons.forEach((button,index)=>{
    button.addEventListener("click", ()=>{
        button.classList.add("grid-item-active")
        tipPercent = discounts[index]
        var temp=enabledIndex;
        enabledIndex=index
        if(temp != -1)
        {
            tipButtons[temp].classList.remove("grid-item-active")
        }

        customTip.value=undefined
        update();
        makeResetActive();
    })
})

customTip.addEventListener("click",()=>{
    if(enabledIndex != -1)
    {
        tipButtons[enabledIndex].classList.remove("grid-item-active")
        enabledIndex=-1
    }
    tipPercent=customTip.value;
    update();
    makeResetActive();
})
customTip.addEventListener("change",()=>{
    tipPercent=customTip.value
    if(enabledIndex != -1)
    {
        tipButtons[enabledIndex].classList.remove("grid-item-active")
        enabledIndex=-1
    }
    update();
    makeResetActive();
})

resetButton.addEventListener('click', ()=>{
    if(resetButton.classList.contains("active"))
    {
        var billAmount=0;
        var tipAmount=0;
        var tipPercent=0;
        var numPerson=0;
        document.querySelector('.tip-amount').textContent='$'+0.00
        document.querySelector('.total').textContent='$'+0.00
        customTip.value=undefined
        billBox.value = 0;
        numPersonBox.value = 0 
        tipButtons.forEach((button)=>{
            button.classList.remove("grid-item-active")
        })
        cantBeZero.textContent = null
    }
})