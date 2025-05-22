// src/pages/admin/ImagesManagement.jsx
//=====================================
import { createPortal } from "react-dom";
import "@/styles/pages/_admin.scss";

import { useImageManagement } from "@/hooks/admin/adminImageManagement/useImageManagement";
import { useKeywordManagement } from "@/hooks/admin/adminImageManagement/useKeywordManagement";
import { useImageEditModal } from "@/hooks/admin/adminImageManagement/useImageEditModal";

import ImageUploadForm from "@/components/admin/ImageUploadForm";
import KeywordManagement from "@/components/admin/KeywordManagement";
import ImagesTable from "@/components/admin/ImageTable";
import EditImageModal from "@/components/admin/EditImageModal";

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
    isOpen,
    selected: selectedImage,
    editData,
    setEditData,
    open: openEditModal,
    close: closeEditModal,
  } = useImageEditModal();

  return (
    <main className="admin-images-management">
      <h2>Gestion des images</h2>

      {/* 1. Formulaire d’upload */}
      <ImageUploadForm
        onUpload={handleUpload}
        keywords={allKeywords}
        onAddKeyword={addKeyword}
        onRemoveKeyword={removeKeyword}
        kwLoading={kwLoading}
      />

      {/* 2. Gestion des mots-clé */}
      <KeywordManagement
        keywords={allKeywords}
        loading={kwLoading}
        onAdd={addKeyword}
        onRemove={removeKeyword}
      />

      {/* 3. Tableau des images */}
      <ImagesTable
        images={images}
        loading={imgLoading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {/* 4. Modale d’édition */}
      {isOpen &&
        selectedImage &&
        createPortal(
          <EditImageModal
            image={selectedImage}
            editData={editData}
            setEditData={setEditData}
            onClose={closeEditModal}
            onUpdate={handleUpdate}
          />,
          document.body
        )}
    </main>
  );
}
