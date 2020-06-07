import React, { ChangeEvent } from 'react';
import axios from 'axios';

function App() {
  // const [ title, setTitle] = useState('')
  // const postData = {
  //   title: 'my title',
  //   body: 'hellp man'
  // }
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts')
  //     .then(res => {
  //       if (res.data) {
  //         setTitle(res.data.title)   
  //       }
  //     })
  // })
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then (res => {
        console.log(res);
      })
    }
  }
  return (
    <div className="App">
      {/* <h1>{title}</h1> */}
      <input type="file" name="myFile" id="" onChange={handleFileChange}/>
    </div>
  );
}

export default App;
 