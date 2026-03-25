
import Link from "next/link";

export default function Admin() {
  return (
    <div style={{padding:40}}>
      <h1>Админка</h1>
      <Link href="/admin/banners">Баннеры</Link>
    </div>
  );
}
