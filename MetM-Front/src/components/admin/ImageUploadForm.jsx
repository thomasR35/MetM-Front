import React, { useState } from "react";

export default function ImageUploadForm({
  onUpload,
  keywords,
  onAddKeyword,
  onRemoveKeyword,
  kwLoading,
}) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [kwInput, setKwInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Image et titre requis.");
      return;
    }
    setError("");
    await onUpload(file, title, kwInput);
    setFile(null);
    setTitle("");
    setKwInput("");
    document.getElementById("file").value = "";
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre de l’image</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="file">Sélectionner un fichier</label>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <label htmlFor="keywords">Mots-clé (séparés par virgules)</label>
        <input
          id="keywords"
          value={kwInput}
          onChange={(e) => setKwInput(e.target.value)}
          placeholder="chat,nature,…"
        />

        <button type="submit" className="btn btn-primary">
          Uploader
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}
