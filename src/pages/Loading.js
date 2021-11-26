import style from './Loading.module.css'
import {withRouter} from 'react-router-dom'
import React, {Component} from 'react';
import {uploadInterval} from '../utils/storage'

class Loading extends Component {
  
  componentDidMount(){
    // const currentTable = JSON.parse(localStorage.getItem('xoddCurrentTable'))
    const packagePorter = JSON.parse(localStorage.getItem('xoddPackagePorter'))
    const tempFiles = JSON.parse(localStorage.getItem('tempFiles'));

    // if(currentTable === null){
    //   localStorage.setItem('xoddCurrentTable', JSON.stringify({id: '', table: []}))
    // }
    if(packagePorter === null){
      localStorage.setItem('xoddPackagePorter', JSON.stringify({id: '', table: []}))
    }
    if(tempFiles === null){
      localStorage.setItem('xoddPackagePorter', JSON.stringify([]))
    }
    localStorage.setItem('xoddNewTable', JSON.stringify([]))

    setTimeout( ()=> { 
      this.switchPage(); 
    } , 2000)

    uploadInterval()
  }
  
  switchPage = () =>{
    this.props.history.push('/home');
  }

  
  render(){

  
  return ( 
    <div className={style.grid}>
      <h1 className={style.logo}>X0dd</h1>
    </div>
   );
  }
}
 
export default withRouter(Loading);