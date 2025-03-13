import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "@/api/axiosConfig";
import "@/styles/pages/_admin.scss";

const ImagesManagement = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [allKeywords, setAllKeywords] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    url: "",
    keywords: "",
  });

  // 🔹 Charger les images et les mots-clés
  useEffect(() => {
    axios
      .get("/images")
      .then((response) => {
        console.log("📸 Images API reçues :", response.data);

        // ✅ Vérification et mise à jour correcte du state
        if (response.data && Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          console.error("❌ Réponse API invalide :", response.data);
          setImages([]);
        }
      })
      .catch((error) => {
        console.error("❌ Erreur de chargement des images :", error);
        setImages([]);
      });

    axios
      .get("/keywords")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAllKeywords(response.data);
        }
      })
      .catch((error) =>
        console.error("❌ Erreur de chargement des mots-clés :", error)
      );
  }, []);

  // 🔹 Gérer l'upload d'une image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setUploadError("Veuillez sélectionner une image et saisir un titre.");
      return;
    }
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("keywords", keywords);

    const user = JSON.parse(localStorage.getItem("user"));
    formData.append("uploaded_by", user?.id || "1");

    try {
      const response = await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.id) {
        setImages((prevImages) => [...prevImages, response.data]);
        setTitle("");
        setKeywords("");
        setFile(null);
        document.getElementById("file").value = "";
      }
    } catch (error) {
      console.error("❌ Erreur lors du téléversement :", error.response?.data);
    }
  };

  // 🔹 Supprimer une image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/images/${id}`);
      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error("❌ Erreur lors de la suppression :", error.response?.data);
    }
  };

  // 🔹 Ouvrir la modale d'édition
  const openEditModal = (image) => {
    if (!image) return;
    setSelectedImage(image);
    setEditData({
      title: image.title || "",
      url: image.url || "",
      keywords: image.keywords || "",
    });
    setIsModalOpen(true);
  };

  // 🔹 Fermer la modale
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // 🔹 Gérer la mise à jour
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    const user = JSON.parse(localStorage.getItem("user"));

    const updatedData = {
      ...editData,
      uploaded_by: user?.id || "1",
    };

    try {
      const response = await axios.put(
        `/images/${selectedImage.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === selectedImage.id ? { ...img, ...updatedData } : img
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error.response?.data);
    }
  };

  return (
    <main>
      <h2>Gestion des images</h2>
      <section className="form-container">
        <form onSubmit={handleUpload}>
          <label htmlFor="title">Titre de l'image</label>
          <input
            id="title"
            type="text"
            placeholder="Titre de l'image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="keywords">Mots-clés (séparés par des virgules)</label>
          <input
            id="keywords"
            type="text"
            placeholder="Ex : chat, nature, paysage"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <label htmlFor="file">Sélectionner une image</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit" className="btn btn-primary">
            Téléverser
          </button>
        </form>
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
      </section>

      <section>
        <h2>Liste des images</h2>
        <p>{images.length} image(s) trouvée(s)</p>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aperçu</th>
              <th>Titre</th>
              <th>Mots-clés</th>
              <th>Ajouté par</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(images) && images.length > 0 ? (
              images.map((image) => (
                <tr key={image.id}>
                  <td>{image.id}</td>
                  <td>
                    <img
                      src={`http://metm-back.local${image.url}`}
                      alt={image.title}
                      className="image-thumbnail"
                    />
                  </td>
                  <td>{image.title}</td>
                  <td>
                    {image.keywords
                      ? image.keywords.split(",").join(", ")
                      : "Aucun"}
                  </td>
                  <td>{image.uploaded_by || "Inconnu"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => openEditModal(image)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(image.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Aucune image trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      {/* ✅ Modale d'édition avec mots-clés */}
      {isModalOpen &&
        selectedImage &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <h3>Modifier l'image</h3>

              <form onSubmit={handleUpdate}>
                <label>Titre</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  required
                />

                {/* ✅ Input pour modifier les mots-clés */}
                <label>Mots-clés (séparés par des virgules)</label>
                <input
                  type="text"
                  value={editData.keywords}
                  onChange={(e) =>
                    setEditData({ ...editData, keywords: e.target.value })
                  }
                  placeholder="Ex : chat, nature, paysage"
                />

                {/* ✅ Sélecteur de mots-clés existants */}
                <label>Ajouter un mot-clé existant</label>
                <select
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      keywords: prev.keywords
                        ? `${prev.keywords}, ${e.target.value}`
                        : e.target.value,
                    }))
                  }
                >
                  <option value="">-- Sélectionner un mot-clé --</option>
                  {allKeywords.map((kw) => (
                    <option key={kw.id} value={kw.name}>
                      {kw.name}
                    </option>
                  ))}
                </select>

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
};

export default ImagesManagement;
