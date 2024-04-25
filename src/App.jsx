
import React, { useState } from 'react'

// import FlashCard from './components/FlashCard'

export default function App ()  {
  const [items,setItems]=useState([]);
  

  function handleAddItems(item){
    setItems(items =>[...items,item])
   }
   function handleDeleteItem(id){
    console.log(id)
    
    setItems(items=>
      items.filter(item=>item.id !== id )
      )
  }
  function handleToggleItem(id){
    setItems((items)=>
    items.map((item)=>
    item.id===id ?{...item,packed:!item.packed}:item
    ))
  }
  return (
  //   
  <div>
    {/* <FlashCard/> */}
    <Logo/>
    <Form onAddItems={handleAddItems}/>
  <PackagingList 
  items={items} 
  onDeleteItem={handleDeleteItem}
  onToggleItems={handleToggleItem}
  />
    {/* <Item/> */}
    <Stat items={items}/>
  </div>
  )
}

function Logo(){
  return <h1> 🌴  Far Away 💼  </h1>
}
function Form({onAddItems}){
  const [description,setDescription]=useState('Test');
  const[quantity,setQuantity]=useState(10)
 

 
  function handleSubmit(e){
    e.preventDefault();
    if(!description) return;
    const newItem={description,quantity,packed:false,id:Date.now()}
    onAddItems(newItem)
    console.log(newItem)
    setDescription("");
    setQuantity(10)
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need 😍  for your trip?</h3>
      <select onChange={(e)=>setQuantity(Number(e.target.value))} value={quantity} name="" id="">
        {Array.from({length:20}, (_,i)=> i+1).map(num=><option value={num} key={num}>{num}</option>)}
      </select>
      <input value={description} 
      onChange={(e)=>setDescription(e.target.value)}
      type="text" placeholder='Item...' name="" id="" />
      <button >Add</button>
    </form>
  )
}
function PackagingList({items,onDeleteItem,onToggleItems}){
  const[sortBy,setSortBy]=useState("packed");
  let sortedItems;
  if(sortBy ==="input") sortedItems=items;
  if(sortBy=='description' ) sortedItems=items.slice().sort((a,b)=>a.description.localeComapre(b.description))
if(sortBy ==='packed') sortedItems=items.slice().sort((a,b)=>Number(a.packed)- Number(b.packed))
  return(
      <div className='list'>

      <ul >

      {sortedItems  .map((item)=>
      (
        
        <Item key={item.id}
        onToggleItems={onToggleItems}
        onDeleteItem={onDeleteItem}
        items={item}/>
       
        )
        )}
        </ul>
        <div className='actions'>
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="input">Sorty by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
        </div>
        </div>
   
  )
}

function Item({items,onDeleteItem,onToggleItems}){
  
  return(
  <li>
  <input type="checkbox"
  value={items.packed}
  onChange={() =>onToggleItems(items.id)}
  />
  <span style={items.packed ? {textDecoration:'line-through'}:{}}>
      {items.quantity}
    {items.description}
    </span>
    <button onClick={()=>onDeleteItem(items.id)}>✖ </button>
  </li>   
  )
}
function Stat({items}){
  if(!items.length) 
  return(
  <p className='stats'>
    <em>Start adding some items to your packing list 🚀  </em>
    </p>
    );
  const numItems=items.length;
  const numPacked=items.filter((item)=>item.packed).length;
  const percentage= Math.round((numPacked/numItems) * 100);
  return (
    <footer className='stats'>
       <em>
        {percentage === 100
         ? 'You got everthing! Ready to go ✈  '
        :`You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
        </em>
    </footer>
  )
}



