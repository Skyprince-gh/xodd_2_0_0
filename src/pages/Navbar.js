import style from './Navbar.module.css'
import {Search} from '@material-ui/icons'
const Navbar = () => {
  return ( 
    <div className={style.grid}>
      <div className={style.logo}>
        X0dd
      </div>

      <div className={style.search}>
        <Search className={style.searchIcon}/>
        <input type="text" placeholder="search"/>
      </div>
    </div>
   );
}
 
export default Navbar;