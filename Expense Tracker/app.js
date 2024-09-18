
        const SubmitBtn=document.querySelector(".Btn1")
        const clearBtn=document.querySelector(".Btn2")
        const form=document.querySelector("#form")
        const LIstdata=document.querySelector("#LIstData")

        let data=JSON.parse(localStorage.getItem("ProductData")) || []


        // let xyz=localStorage.getItem("ProductData")
        // let OBjData=JSON.parse(xyz)

        

    form.addEventListener("submit",AddIteams)
            
         function AddIteams(event){

            event.preventDefault()
            
            const itemName=document.querySelector("#IteamNAme").value
            const itemPrice=document.querySelector("#IteamPrice").value
            


            let UserData={
                id:Math.floor(Math.random() * 9999999),
                name:itemName,
                price:itemPrice
            }

            if(itemName !=="" && itemPrice !==""){
                data.push(UserData)
                localStorage.setItem("ProductData",JSON.stringify(data))
                document.querySelector("#IteamNAme").value=''
                document.querySelector("#IteamPrice").value=''
            }else{
                event.stopPropagation();
                alert("Iteam Name & Iteam Price must be filled out")
            }

            
            Iter()
            TotalAmount()
          
         }
        
               
        function Iter(){
            LIstdata.innerHTML=data.map((x)=>{
                return `
                    <tr ${x.id}>
                        <th>${x.name}</th>
                        <td>₹${x.price}</td>
                        <td><button  id="deletebtn" onclick='DeleteBtn(${x.id})'><i class="fa-solid fa-xmark"></i></button></td>
                    </tr>`
            }).join('')
            
        } 
        

    
        Iter()
       


        function TotalAmount(){
            let total=data.reduce((x,y)=>{
                return x + +y.price
            },0)
            Iter()
            document.querySelector("#TotalAmount").textContent=`Total Amount : ₹${total}`
            // return total
            
        }
        TotalAmount()

        
        function DeleteBtn(id){
            data=data.filter(x=> x.id !== id)
            localStorage.setItem("ProductData",JSON.stringify(data))
            location.reload()
            
            Iter()
            TotalAmount()
           
            
        }
        
       
        clearBtn.addEventListener("click",(event)=>{
            event.stopPropagation();
            console.log("clear")
        })


        function clearCart(event){
            event.stopPropagation()
            data = [];
            localStorage.setItem("ProductData",JSON.stringify(data))
            Iter()
            TotalAmount()
        }