import Transaction from "./components/Transaction"
import './App.css'
import FormComponent from "./components/FormComponent"
import DataContex from "./data/DataContex"
import ReportComponent from "./components/ReportComponent"
import { useState,useEffect } from "react"
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";

function App() {
  const design = {color:'red',textAlign:'center',fontSize:'1.5rem'}

  const initData = [
    {id:1, title: "ค่าเดินทาง", amount: -3000},
    {id:2, title: "เงินเดือน", amount: 40000},
    {id:3, title: "ค่าเทอม", amount: -15000}
  ]

  const [items,setItems] = useState(initData)
  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)

  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem,...prevItem]
    })
  }
  useEffect(() => {
    const amounts = items.map(items => items.amount)
    const income = amounts.filter(e => e > 0).reduce((total,e)=>total+=e,0)
    const expense = (amounts.filter(e => e < 0).reduce((total,e)=>total+=e,0))*-1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  },[items,reportIncome,reportExpense])

  /*reducer state
  const [showReport,setShowReport] = useState(false)
  const reducer = (state,action) => {
    switch(action.type){
      case "SHOW" : 
        return setShowReport(true)
      case "HIDE" :
        return setShowReport(false)
    }
  }
  const [result,dispatch] = useReducer(reducer,showReport)*/
  /*
        <h1>{result}</h1>
        <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
        <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button>
  */
  
  return (
    <DataContex.Provider value={
      {
         income: reportIncome,
         expense: reportExpense
      }
    }>
      <div className="container">
        <h1 style={design}>แอปบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/"element={<ReportComponent/>}></Route>
              <Route path="/insert"element={
                <><FormComponent onAddItem={onAddNewItem}/> 
                <Transaction items={items}/> </>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    </DataContex.Provider>
    
  )
}

export default App;
