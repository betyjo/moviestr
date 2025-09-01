'use client'
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [poster, setPoster] = useState(null);
  const [backdrop, setBackdrop] = useState(null);

  async function uploadToSigned(key, file) {
    const res = await fetch("/api/upload", { method: "POST", body: JSON.stringify({ key, contentType: file.type }) });
    const { url } = await res.json();
    await fetch(url, { method: "PUT", body: file });
    // return public path (without signature)
    return url.split("?")[0];
  }

  async function handleSubmit() {
    if (!file) return alert("select mp4");
    // 1) upload raw (for worker processing)
    const rawKey = `uploads/${Date.now()}_${file.name}`;
    const rawPath = await uploadToSigned(rawKey, file);

    // 2) upload poster & backdrop if present
    let posterPath, backdropPath;
    if (poster) posterPath = await uploadToSigned(`images/${Date.now()}_${poster.name}`, poster);
    if (backdrop) backdropPath = await uploadToSigned(`images/${Date.now()}_${backdrop.name}`, backdrop);

    // 3) create movie record (backend worker will transcode raw to HLS, generate trailer & preview)
    const res = await fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify({
        title,
        description: "",
        posterUrl: posterPath,
        backdropUrl: backdropPath,
        // store raw path so worker knows where file is
        rawPath,
        genreNames: genres.split(",").map(s=>s.trim()).filter(Boolean)
      })
    });
    const data = await res.json();
    alert("movie created: " + data.title + ". Worker will process raw file to generate HLS, trailer, preview.");
  }

  return (
    <main className="p-6">
      <div className="max-w-2xl mx-auto bg-black/60 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Upload movie (admin)</h2>
        <input className="w-full mb-2 p-2 bg-black/40" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="w-full mb-2 p-2 bg-black/40" placeholder="genres (comma separated)" value={genres} onChange={e=>setGenres(e.target.value)} />
        <label className="block mb-2">Poster</label>
        <input type="file" accept="image/*" onChange={e=>setPoster(e.target.files[0])} />
        <label className="block mb-2 mt-2">Backdrop</label>
        <input type="file" accept="image/*" onChange={e=>setBackdrop(e.target.files[0])} />
        <label className="block mb-2 mt-2">Raw MP4</label>
        <input type="file" accept="video/mp4" onChange={e=>setFile(e.target.files[0])} />
        <div className="mt-4 flex gap-2">
          <button onClick={handleSubmit} className="px-4 py-2 bg-silver text-black rounded-xl">Create & Upload</button>
        </div>
      </div>
    </main>
  );
}
