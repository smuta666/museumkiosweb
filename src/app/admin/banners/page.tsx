
"use client";
import { useEffect, useState } from "react";

export default function Page(){
  const [data,setData]=useState([]);
  const [title,setTitle]=useState("");
  const [imageUrl,setImageUrl]=useState("");

  async function load(){
    const res=await fetch("/api/admin/banners");
    setData(await res.json());
  }

  useEffect(()=>{load()},[]);

  async function create(){
    await fetch("/api/admin/banners",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title,imageUrl})});
    setTitle("");setImageUrl("");
    load();
  }

  async function remove(id){
    await fetch("/api/admin/banners/"+id,{method:"DELETE"});
    load();
  }

  return (
    <div style={{padding:40}}>
      <h1>Баннеры</h1>

      <div style={{marginBottom:20}}>
        <input placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="image url" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
        <button onClick={create}>Добавить</button>
      </div>

      {data.map((b:any)=>(
        <div key={b.id}>
          <img src={b.imageUrl} width="200"/>
          <div>{b.title}</div>
          <button onClick={()=>remove(b.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}
