import { useEffect, useRef, useState } from 'react';
import { deleteApi, getApi, postApi, putApi } from './Api/api';
import { base_url, getData1, postData1, deleteData1, updateData1 } from './Api/fullapi';
import './App.css';

function App() {
  const [data, setdata] = useState([])
  // state for update
  const [putinput, setputinput] = useState({})
  const [index, setindex] = useState()

  const title = useRef();
  const author = useRef();

  useEffect(() => {
    getApi(base_url, getData1).then((res) => {
      setdata(res)
    });
  }, [])

  const submitData = () => {
    const result = {
      title: title.current.value,
      author: author.current.value,
    };
    postApi(base_url, postData1, result).then((res) => {
      setdata([...data, res])
    });
  }

  const delete_data = (id, index) => {
    console.log(id, index, "id and index from delete");
    deleteApi(base_url, deleteData1, id).then((res) => {
      setdata(data.filter((e) => e.id !== id)) // stopped from this error
    })
  }

  const update_data = (val, index) => {
    setputinput(val)
    setindex(index)
  }

  const handlePut = (e) => {
    setputinput({ ...putinput, [e.target.name]: e.target.value })
  }

  const finalUpdate = () => {
    putApi(base_url,updateData1,putinput.id,putinput).then((res)=>{
      data.splice(index,1,putinput);
      setdata([...data])
    })
  }

  return (
    <>
      <input type='text' name='title' ref={title} />
      <input type='text' name='author' ref={author} />
      <button onClick={submitData}>Submit</button>
      <input type='text' value={putinput.title} onChange={(e) => handlePut(e)} name='title' />
      <input type='text' value={putinput.author} name='author' />
      <button onClick={() => finalUpdate()}>Save Changes</button>
      {data?.map((v, i) => {
        return (
          <>
            <h1>{v.title}</h1>
            <p>{v.author}</p>
            <button onClick={() => delete_data(v.id, i)}>Delete</button>
            <button onClick={() => update_data(v, i)}>Update</button>
          </>
        )
      })
      }
    </>
  );
}

export default App;