
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';
// import { Quill } from 'react-quill';


const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    

   async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        // console.log(files)
       const response = await fetch('http://localhost:4000/post', {
           method: 'POST',
           body: data,
           credentials: 'include'
       });
       if (response.ok) {
           setRedirect(true);
       }
    }

    

    // var toolbarOptions = [
    //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //     ['blockquote', 'code-block'],

    //     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //     [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    //     [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    //     [{ 'direction': 'rtl' }],                         // text direction

    //     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    //     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //     [{ 'font': [] }],
    //     [{ 'align': [] }],

    //     ['clean']                                         // remove formatting button
    // ];

    // var quill = new Quill('#editor', {
    //     modules: {
    //         toolbar: toolbarOptions
    //     },
    //     theme: 'snow'
    // });


    if (redirect) {
        return <Navigate to={'/'}/>
    }

   
  return (
      <form action="" onSubmit={createNewPost}>
          <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
          <input type="text" placeholder='Summary' value={summary} onChange={e=> setSummary(e.target.value)}/>
          <input type="file" placeholder='File'onChange={e => setFiles(e.target.files)} />
          <ReactQuill value={content} onChange={newValue => setContent(newValue)}modules={modules}formats={formats}/>
          <button style={{marginTop:'5px'}}>Create Post</button>
   </form>
  )
}

export default CreatePost