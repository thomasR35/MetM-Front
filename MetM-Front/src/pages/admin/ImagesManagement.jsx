// src/pages/admin/ImagesManagement.jsx
import React from "react";
import { createPortal } from "react-dom";

import "@/styles/pages/_admin.scss";

import { useImageManagement } from "@/hooks/adminImageManagement/useImageManagement";
import { useKeywordManagement } from "@/hooks/adminImageManagement/useKeywordManagement";
import { useImageEditModal } from "@/hooks/adminImageManagement/useImageEditModal";

// On récupère "http://metm-back.local/api" puis on enlève le "/api" final
const API_BASE = import.meta.env.VITE_API_URL.replace(/\/api\/?$/i, "");

export default function ImagesManagement() {
  const {
    images,
    loading: imgLoading,
    handleUpload,
    handleDelete,
    handleUpdate,
  } = useImageManagement();

  const {
    keywords: allKeywords,
    loading: kwLoading,
    addKeyword,
    removeKeyword,
  } = useKeywordManagement();

  const {
    isOpen: isModalOpen,
    selected: selectedImage,
    editData,
    setEditData,
    open: openEditModal,
    close: closeEditModal,
  } = useImageEditModal();

  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [kwInput, setKwInput] = React.useState("");
  const [uploadError, setUploadError] = React.useState("");

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setUploadError("Image et titre requis.");
      return;
    }
    setUploadError("");
    try {
      await handleUpload(file, title, kwInput);
      setFile(null);
      setTitle("");
      setKwInput("");
      document.getElementById("file").value = "";
    } catch (err) {
      console.error(err);
      setUploadError("Échec du téléversement.");
    }
  };

  const onAddKeyword = async () => {
    try {
      await addKeyword(kwInput);
      setKwInput("");
    } catch {
      // silent
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;
    try {
      await handleUpdate(selectedImage.id, editData);
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="admin-images-management">
      <h2>Gestion des images</h2>

      {/* Upload */}
      <section className="form-container">
        <form onSubmit={onUpload}>
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
        {uploadError && <p className="error-text">{uploadError}</p>}
      </section>

      {/* Mots-clé */}
      <h2>Gestion des mots-clé</h2>
      <section className="keyword-management">
        <div className="add-keyword">
          <input
            value={kwInput}
            onChange={(e) => setKwInput(e.target.value)}
            placeholder="Nouveau mot-clé"
          />
          <button className="btn btn-primary" onClick={onAddKeyword}>
            Ajouter
          </button>
        </div>

        {kwLoading ? (
          <p>Chargement…</p>
        ) : (
          <ul className="keyword-list">
            {allKeywords.map((kw) => (
              <li key={kw.id}>
                {kw.name}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeKeyword(kw.id)}
                >
                  ❌
                </button>
              </li>
            ))}
            {allKeywords.length === 0 && <li>Aucun mot-clé trouvé.</li>}
          </ul>
        )}
      </section>

      {/* Liste des images */}
      <section>
        <h2>Images ({images.length})</h2>
        {imgLoading ? (
          <p>Chargement…</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Aperçu</th>
                <th>Titre</th>
                <th>Mots-clé</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img) => (
                <tr key={img.id}>
                  <td>{img.id}</td>
                  <td>
                    <img
                      src={`${API_BASE}${img.url}`}
                      alt={img.title}
                      className="image-thumbnail"
                    />
                  </td>
                  <td>{img.title}</td>
                  <td>
                    {img.keywords ? img.keywords.split(",").join(", ") : "—"}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => openEditModal(img)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(img.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {images.length === 0 && (
                <tr>
                  <td colSpan="5">Aucune image trouvée.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Modale d’édition */}
      {isModalOpen &&
        selectedImage &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-btn" onClick={closeEditModal}>
                &times;
              </button>
              <h3>Modifier l’image #{selectedImage.id}</h3>
              <form onSubmit={onUpdate}>
                <label>Titre</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((d) => ({ ...d, title: e.target.value }))
                  }
                  required
                />

                <label>URL</label>
                <input
                  type="text"
                  value={editData.url}
                  onChange={(e) =>
                    setEditData((d) => ({ ...d, url: e.target.value }))
                  }
                  required
                />

                <label>Mots-clé</label>
                <input
                  type="text"
                  value={editData.keywords}
                  onChange={(e) =>
                    setEditData((d) => ({ ...d, keywords: e.target.value }))
                  }
                />

                <button type="submit" className="btn btn-success">
                  Mettre à jour
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
