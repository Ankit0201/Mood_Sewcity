// Fixed right side widgeet

const myFunction = () => {
  window.onscroll = () => myFunction();
let widgeet = document.getElementById("widgeet");
let comment = document.getElementById("comment");
let sticky = widgeet.offsetTop;
let commentsec = comment.offsetTop;
  if (window.pageYOffset > sticky && commentsec - 90 > window.pageYOffset) {
    widgeet.classList.add("widgeet");
  } else {
    widgeet.classList.remove("widgeet");
  }
}

// Total price according to Quantity
let total_price = document.getElementById('total');
const quantity = (quant, price,originalPrice) => {
  // debugger
  quant = document.getElementById(quant);
   price = document.getElementById(price);

  originalPrice=document.getElementById(originalPrice)
 

 price.innerHTML = originalPrice.innerHTML * quant.value;
 total();
}


// total quantity in Addiotinal cart
const total=()=>{
  let total_price=document.getElementById('total')

  let allitems=document.querySelectorAll('.dress__items-details span');
  var q=window.location.href.split('?')[1];
     total_amount=0;
     i=0
 allitems.forEach( (elem,index) =>{
   console.log(elem)
  if(i<3)
  { total_amount +=parseFloat(elem.innerHTML)
  };
  i++;

})

  total_price.innerText=(total_amount).toPrecision(4);
  if(q){
    total_price.innerText=parseFloat(q)
  }
 
  return total_price.innerText
}


// Dynamic comment
let alldata = []
const addComment = event => {
  event.preventDefault();
  let name = document.getElementById('fname');
  let text = document.getElementById('cnttxt');
 
  let d = new Date();
  let date = d. getDate();
   let month = d. getMonth() + 1;
   let dateStr = date + "/" + month;

  let data = { name: name.value, text: text.value ,date:dateStr};
  // Check Validation
   if(name.value === ''  ){
    alert("name not fill")
  }
  else if(text.value === ''){
    alert("comment not fill")
  }
  // Set data in Local Storage
else
{
    alldata.unshift(data);
    retainData=JSON.parse(localStorage.getItem("comment"))
    // If data is alreday in local storage ,So appenmding data
    if(retainData){
      retainData.push(data)
      localStorage.setItem("comment",JSON.stringify (retainData))
    }
    
      // If Local storage is null

    else{    
      localStorage.setItem("comment",JSON.stringify (alldata))
    };
    getData();
   }


}


// View comment in html
  const getData=()=>{
    let testonomial = document.getElementById('testomonials');
    // Get data from Local Storage
    var details=JSON.parse(localStorage.getItem('comment')); 
    let totalComment=document.getElementById('total-comment');
    console.log(totalComment)
     if(details){
      testonomial.innerHTML=""
      // Show Comments in HTML
      for (let i = 0; i <details.length ; i++)
      {
      testonomial.innerHTML += `
         <div class="comment__testomonials">
         <div>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfXL1iflbD4TSMWUsPxxVmAbqud5nrxacEQw&usqp=CAU"
             alt="">
     </div>
     <div>
         <small>${details[i].name}  .  ${details[i].date}</small>
         <strong>
             ${details[i].text}
         </strong>

         <small>Reply
         <span onclick="deleteComment(${i})" style="float: right;"><i class="far fa-trash-alt"></i></span>
         </small>
        
     </div></div>`
    }

    // Total comment
    totalComment.innerHTML=`<span>${details.length} Comments</span>`

}
}
//  Delete Comment 

          const deleteComment=(id)=>{
           let commentDetails=JSON.parse(localStorage.getItem("comment"))
           commentDetails.splice(id,1);  
            localStorage.setItem("comment",JSON.stringify(commentDetails))
            getData();
          }

// open cart page
const cartPage=()=>{
  total()
  let page=document.getElementsByClassName('dress__cart-container');
  let lilydress=document.getElementsByClassName('dress__lilydress-details')
  console.log(page)
  page[0].style.display="block";
  lilydress[0].style.display="none"
  
}
// close cart page
const closeCart=()=>{
  let page=document.getElementsByClassName('dress__cart-container');
   let lilydress=document.getElementsByClassName('dress__lilydress-details')
  console.log(page)
  page[0].style.display="none";
  lilydress[0].style.display="block"
  
}

// procced
const proceed=()=>{
 
  totalPrice=total();
 setData=[]; 
  let optionalAdd=document.querySelectorAll('.dress__cart-items');
  let allDetails=document.querySelectorAll('.dress__items-details')
  // console.log(allDetails)
  i=0;
      optionalAdd.forEach((element,index) =>{
   if(i<3)
         { let title=allDetails[index].querySelector('h4');
          let stokes=allDetails[index].querySelector('select');
          let price=allDetails[index].querySelector('span');
          let image=element.querySelector('img');
        setData.push({image:image.src,title:title.innerText ,stokes:stokes.value,price:price.innerText})}
        i++
  
      })
     localStorage.setItem("cart",JSON.stringify(setData))
   window.location.assign(`../html/add.html?${totalPrice}`);

}

// const reply=(rep)=>{

//   let reply=document.getElementById(rep);
//   console.log(rep)
//   reply.style.display="block"

// }



// Buy the detilasa and go to checkout page

const buyNow=()=>{

  setData=[]; 
  let optionalAdd=document.querySelectorAll('.dress__cart-items input ');
  let allDetails=document.querySelectorAll('.dress__items-details');
  let imageSelect=document.querySelectorAll('.dress__cart-items');
  let getCardData=JSON.parse(localStorage.getItem("cart"))
  // console.log(allDetails)
      optionalAdd.forEach((element,index) =>{
        if(element.checked){
        
          let title=allDetails[index].querySelector('h4');
          let stokes=allDetails[index].querySelector('select');
          let price=allDetails[index].querySelector('span');
          let image=imageSelect[index].querySelector('img');
          console.log(image)
          // apeend aditional data in local storage
        getCardData.push({image:image.src,title:title.innerText ,stokes:stokes.value,price:price.innerText})

        }
        
        
      })
    total()
     console.log(getCardData)
      localStorage.setItem("cart",JSON.stringify(getCardData))
  // window.location.assign('/html/index.html')
  checkoutPage();
}



// checkout page

const checkoutPage=()=>{
  let dressCart=document.getElementsByClassName('dress__cart');
  let totalitems=document.getElementById('totalItems');
  let finalProcess=document.getElementById('checkout')
  let cartPages=document.getElementsByClassName('checkout__page')
  dressCart[0].style.display="none";
  cartPages[0].style.display="block"
    finalProcess.innerHTML="";
  let cartData=JSON.parse(localStorage.getItem('cart'));
  totalitems.innerHTML=`Items  ${cartData.length}`
  subtotal=0
  cartData.forEach((data,index) =>{
    finalProcess.innerHTML+=`
    <div class="dress__checkout" style="display: grid;place-items: center;">
    <div class="dress__cart-items">
      <img src="${data.image}"
          alt="">
      <div class="dress__items-details">
          <h4>${data.title}</h4>
          <div >
              <select id="select1" onclick="quantity('select1','price1','originalprice1')">
                  <option>${data.stokes}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>

              </select>
              <p >$<span  id="price1">${data.price}</span>  ($<small id="originalprice1">0.74</small>/yard)</p>
             <div> <i class="far fa-trash-alt" onclick="deleteCart(${index})"></i></div>
     
          </div>
      </div>
  </div>
  </div>`
  console.log("data",data.price)
    subtotal+=(parseFloat(data.price))
    console.log("sub",subtotal)
  })


 let subTotalPrice=document.getElementById('subtotal');
 let orderTotal=document.getElementById('orderTotal');
 let totalWithTaxes=document.getElementById('totalWithTaxes');
 let shipping=document.getElementById('shipping')
 subTotalPrice.innerText="";
 totalWithTaxes.innerHTML=""
 subTotalPrice.innerText+=parseFloat(subtotal);

 orderTotal.innerHTML="$"+(parseFloat(shipping.innerText) + parseFloat(subtotal)).toPrecision(4);
 totalWithTaxes.innerHTML+=orderTotal.innerHTML +"(with Taxes)"
 

}

// Find subtotal
const subTotal=()=>{
  let allDetails=document.querySelectorAll('.dress__items-details')
let optionalAdd=document.querySelectorAll('.dress__cart-items input ');
optionalAdd.forEach((element,index) =>{
  if(element.checked){
    console.log("yes")
     price=allDetails[index].querySelector('span');
total_price.innerHTML=(parseFloat(total_price.innerText)+parseFloat(price.innerHTML)).toPrecision(4)
   }
   
})
return total_price.innerHTML
}


const deleteCart=(id)=>{
  
  console.log(id);
  let cartDetail=JSON.parse(localStorage.getItem("cart"));

  cartDetail.splice(id,1);  
  console.log(cartDetail)
    localStorage.setItem("cart",JSON.stringify(cartDetail))
   checkoutPage();
 }

 const sizeButton=size=>{

  let originalPrice1=document.getElementById("originalprice1");
   let originalPrice2=document.getElementById("originalprice2");
  let originalPrice3=document.getElementById("originalprice3");
  let price1=document.getElementById("price1");
  let price2=document.getElementById("price2");
  let price3=document.getElementById("price3");
  let quant1=document.getElementById('select1');
  let quant2=document.getElementById('select2')
  let quant3=document.getElementById('select3')
        
if(size==='S_size'){
  originalPrice1.innerHTML=8.88;
  originalPrice2.innerHTML=13.88;
  originalPrice3.innerHTML=9.86;
  price1.innerHTML= originalPrice1.innerHTML * quant1.value;
  price2.innerHTML= originalPrice2.innerHTML * quant2.value;
  price3.innerHTML= originalPrice3.innerHTML * quant3.value;
  

}
if(size==='L_size'){
  originalPrice1.innerHTML=10.66;
  originalPrice2.innerHTML=17.88;
  originalPrice3.innerHTML=11.27;
  price1.innerHTML= originalPrice1.innerHTML * quant1.value;
  price2.innerHTML= originalPrice2.innerHTML * quant2.value;
  price3.innerHTML= originalPrice3.innerHTML * quant3.value;
}
if(size==='M_size'){
  originalPrice1.innerHTML=9.99;
  originalPrice2.innerHTML=15.99;
  originalPrice3.innerHTML=10.49;
  price1.innerHTML= originalPrice1.innerHTML * quant1.value;
  price2.innerHTML= originalPrice2.innerHTML * quant2.value;
  price3.innerHTML= originalPrice3.innerHTML * quant3.value;
}


total();


 }


 





