
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const r = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e){
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({login,password})
    });
    if(res.ok){ r.push("/admin") } else { alert("Ошибка") }
  }

  return (
    <form onSubmit={submit} style={{padding:40}}>
      <h2>Admin Login</h2>
      <input placeholder="login" onChange={e=>setLogin(e.target.value)} />
      <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
      <button>Войти</button>
    </form>
  );
}
