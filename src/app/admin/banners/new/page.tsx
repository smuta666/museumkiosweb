"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBannerPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const submit = async () => {
    await fetch("/api/admin/banners", {
      method: "POST",
      body: JSON.stringify({ title, imageUrl }),
    });

    router.push("/admin/banners");
  };

  return (
    <div className="max-w-xl">
      <div className="text-3xl font-bold text-white mb-6">
        Новый баннер
      </div>

      <div className="flex flex-col gap-4">
        <input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 rounded-xl bg-[#12332c] text-white"
        />

        <input
          placeholder="/static/park/park1.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-4 rounded-xl bg-[#12332c] text-white"
        />

        <button
          onClick={submit}
          className="mt-4 rounded-xl bg-[#4fc3b3] p-4 font-bold"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}