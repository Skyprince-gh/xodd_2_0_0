import { addDocument, setDocument } from '../Firebase/firebase'
import { Convert } from '../utils/firebaseConverter'


//check if packager storage is available on the computer.
let interval = 30000
let packagePorter = JSON.parse(localStorage.getItem('xoddPackagePorter'));
let currentTable = JSON.parse(localStorage.getItem('xoddCurrentTable'));

//upload the package porter at intervals set by the user if there are any changes.
export const uploadInterval = (time = interval) => {
  setInterval(() => {
    upload()

  }, time)
}

//create package porter and set current table contents to package porter contents.
//This only happens if package porter is null
if (packagePorter === null) {
  console.log('package porter is null')
  if (currentTable === null) {
    localStorage.setItem('xoddCurrentTable', JSON.stringify([]))
    console.log('set current table')
  }
  if (currentTable.table !== null && currentTable.table.length > 0) {
    localStorage.setItem('xoddPackagePorter', JSON.stringify(currentTable));
    uploadInterval();
    console.log('current table is not null  uploading at intervals')
  }
}
else {
  uploadInterval();
  console.log('uploading at interval regardless')
}


//Just upload at once when you notice any changes inside of the currentTable and package porter
const upload = () => {
  let package_porter = JSON.parse(localStorage.getItem('xoddPackagePorter'));
  let current_table = JSON.parse(localStorage.getItem('xoddCurrentTable'));

  // console.log('logging both objects to compare: ', package_porter, current_table)

  if (package_porter.id === current_table.id) {
    // console.log('they have the same id\'s will check for changes in data')
    // const regEx = new RegExp(JSON.stringify(package_porter.table))

    // console.log('changes have been detected uploading data', regEx.test(JSON.stringify(current_table.table)))
    // console.log('no changes detected: ', regEx.test(JSON.stringify(current_table.table)))

    if (JSON.stringify(package_porter.table) !== JSON.stringify(current_table.table)) {
      localStorage.setItem('xoddPackagePorter', JSON.stringify(current_table))

      const porter = JSON.parse(localStorage.getItem('xoddPackagePorter'))
      const convertedTable = Convert(porter.table)

      setDocument('match_event_tables', package_porter.id, convertedTable).then(response => {
        // console.log('updated data: ', convertedTable, new Date());
        localStorage.setItem('xoddPackagePorter', JSON.stringify(current_table))
      })
    }
    // else exit.
    else if (JSON.stringify(package_porter.table) === JSON.stringify(current_table.table)) {
      console.log('no data has been changed: ', package_porter)
      return;
    }
    // else return
  }

  //If ID's are different try to create new record batch.
  else if (package_porter.id !== current_table.id) {
    //Leave this part inactive as it will not be necessary. Will update the code when it is due.
    // alert('data has changed will upload new table to firebase instead')
    localStorage.setItem('xoddPackagePorter', JSON.stringify(current_table))

    if (current_table.id.trim() !== '') {
      //check if the package porter item exists in firebase 
      //if yes update it by setting it. 
      const porter = JSON.parse(localStorage.getItem('xoddPackagePorter'))
      const convertedTable = Convert(porter.table)
      setDocument('match_event_tables', porter.id, convertedTable).then(response => {
      })
    }

    return
  }
  //upload to firebase  
}
