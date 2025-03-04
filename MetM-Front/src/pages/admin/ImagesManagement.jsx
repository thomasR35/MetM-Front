import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "@/api/axiosConfig";
import "@/styles/pages/_admin.scss";

const ImagesManagement = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "", url: "" });

  // 🔹 Charger les images
  useEffect(() => {
    axios
      .get("/images")
      .then((response) => {
        console.log("📸 Images API reçues :", response.data);
        setImages(response.data);
      })
      .catch((error) => console.error("❌ Erreur de chargement", error));
  }, []);

  // 🔹 Gérer l'upload
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

    // ✅ Récupérer l'ID de l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem("user"));
    formData.append("uploaded_by", user?.id || "1"); // ✅ Associer l'admin connecté

    try {
      const response = await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Réponse API :", response.data);

      if (response.data && response.data.id) {
        setImages((prevImages) => [...prevImages, response.data]); // ✅ Mettre à jour immédiatement

        // ✅ Réinitialiser le formulaire après l'ajout
        setTitle("");
        setFile(null);
        document.getElementById("file").value = ""; // ✅ Réinitialiser l'input file
      } else {
        console.error("❌ Données invalides reçues :", response.data);
      }
    } catch (error) {
      console.error("❌ Erreur lors du téléversement", error.response?.data);
    }
  };

  // 🔹 Supprimer une image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/images/${id}`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("❌ Erreur lors de la suppression", error.response?.data);
    }
  };

  // 🔹 Ouvrir la modale d'édition
  const openEditModal = (image) => {
    if (!image) return;
    console.log("🟢 Ouverture de la modale pour l'image :", image);
    setSelectedImage(image);
    setEditData({ title: image.title || "", url: image.url || "" });
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

    console.log("🔄 Données envoyées :", updatedData);

    try {
      const response = await axios.put(
        `/images/${selectedImage.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Image mise à jour :", response.data);

      setImages(
        images.map((img) =>
          img.id === selectedImage.id ? { ...img, ...updatedData } : img
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour", error.response?.data);
    }
  };

  return (
    <main>
      <h2>Gestion des images</h2>
      {/* Section Formulaire d'upload */}
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

      {/* Section Affichage des images */}
      <section>
        <h2>Liste des images</h2>
        <p>{images.length} image(s) trouvée(s)</p>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aperçu</th>
              <th>Titre</th>
              <th>Ajouté par</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id}>
                <td>{image.id}</td>

                {/* ✅ Miniature bien visible */}
                <td>
                  <img
                    src={
                      image.url.startsWith("http")
                        ? image.url
                        : `http://metm-back.local${image.url}`
                    }
                    alt={image.title || "Aperçu de l'image"}
                    className="image-thumbnail"
                    onError={(e) => {
                      console.error(
                        "❌ Erreur de chargement de l'image :",
                        image.url
                      );
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                </td>

                {/* ✅ Texte tronqué avec "..." si trop long */}
                <td title={image.title || "Titre inconnu"}>
                  {image.title && image.title.length > 20
                    ? `${image.title.substring(0, 20)}...`
                    : image.title || "Titre inconnu"}
                </td>

                <td>{image.uploaded_by ? image.uploaded_by : "Inconnu"}</td>

                {/* ✅ Boutons mieux disposés */}
                <td className="table-actions">
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
            ))}
          </tbody>
        </table>
      </section>

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
                <label>ID</label>
                <input type="text" value={selectedImage.id} disabled />

                <label>Titre</label>
                <input
                  type="text"
                  placeholder="Titre de l'image"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  required
                />

                <label>Modifié par</label>
                <select
                  value={editData.uploaded_by}
                  onChange={(e) =>
                    setEditData({ ...editData, uploaded_by: e.target.value })
                  }
                >
                  <option value="1">Sronnok</option>
                  <option value="3">NewAdmin</option>
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
