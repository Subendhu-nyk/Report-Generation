
        
let currentlyEditingId = null;
async function OnSubmit(event){
    event.preventDefault();

    if (currentlyEditingId !== null) {
        await updateExpense();
    } else {
 const name=document.getElementById('name').value
 const price=document.getElementById('price').value
 const date=document.getElementById('date').value
 const category=document.getElementById('select').value

 const obj={
     name,
     price,
     date,
     category
 }
 console.log(obj)
 try{
   
     const response=await axios.post('http://localhost:2000/user/add-expense',obj)
     console.log(obj)
     console.log(response.data.newexpenseDetail)
     showdetails()

 }
 catch(error){
     console.log(error)
 }      
}
}


async function showdetails() {
    try {
        const response = await axios.get('http://localhost:2000/user/get-expense');
        const data = response.data.allExpenses;
        const tableBody = document.getElementById('expense-table-body');
        tableBody.innerHTML = '';

        data.forEach(object => {
            const row = document.createElement('tr');
            

            const nameCell = document.createElement('td');
            nameCell.textContent = object.Itemname;
            row.appendChild(nameCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = object.price;
            row.appendChild(priceCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = object.date;
            row.appendChild(dateCell);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = object.category;
            row.appendChild(categoryCell);
            tableBody.appendChild(row);

    const deletebutton=document.createElement('button')
     deletebutton.type="button"
     deletebutton.textContent="delete"
     deletebutton.style.color='White'
     deletebutton.style.marginTop='5px'    
     deletebutton.style.marginLeft="15px",
     deletebutton.style.padding = '5px'
     deletebutton.classList.add('btn', 'btn-danger')
     row.appendChild(deletebutton)
     deletebutton.onclick= async ()=>{
         try{
             const response=await axios.delete(`http://localhost:2000/user/delete-expense/${object.id}`)
             tableBody.removeChild(row)                       
         }
         catch(error){
             console.log(error)
         }
     }  
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateExpense() {
    try {
        
        const newItem = document.getElementById('item').value;
        const newPrice = document.getElementById('price').value;
        const newCategory = document.getElementById('category').value;

        const updatedObject = {
            item: newItem,
            price: newPrice,
            category: newCategory,
        };

        console.log(updatedObject);

        const response = await axios.put(`http://localhost:2000/user/update-expense/${currentlyEditingId}`, updatedObject);
        if (response.status === 200) {
            // Reset currentlyEditingId after successful update
            currentlyEditingId = null;
            showdetails();
        }
    } catch (error) {
        console.log(error);
    }
}



showdetails();

   