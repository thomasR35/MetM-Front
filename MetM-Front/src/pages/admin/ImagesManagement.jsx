// src/pages/admin/ImagesManagement.jsx
//=====================================
import { useState } from "react";
import { useImageManagement } from "@/hooks/admin/adminImageManagement/useImageManagement";
import { useKeywordManagement } from "@/hooks/admin/adminImageManagement/useKeywordManagement";
import { useImageEditModal } from "@/hooks/admin/adminImageManagement/useImageEditModal";
import ImageUploadForm from "@/components/admin/ImageUploadForm";
import KeywordManagement from "@/components/admin/KeywordManagement";
import ImagesTable from "@/components/admin/ImageTable";
import EditImageModal from "@/components/admin/EditImageModal";
import ConfirmDialog from "@/components/ConfirmDialog";

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

  // État pour la modale de confirmation suppression
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    image: null,
    bulk: false,
    bulkIds: [],
    bulkOnDone: null,
  });

  // Appelé par ImagesTable — reçoit soit un objet image, soit { bulk, ids, onDone }
  const askDelete = (target) => {
    if (target?.bulk) {
      setConfirmState({
        isOpen: true,
        image: null,
        bulk: true,
        bulkIds: target.ids,
        bulkOnDone: target.onDone,
      });
    } else {
      setConfirmState({
        isOpen: true,
        image: target,
        bulk: false,
        bulkIds: [],
        bulkOnDone: null,
      });
    }
  };

  const confirmDelete = async () => {
    if (confirmState.bulk) {
      await Promise.all(confirmState.bulkIds.map((id) => handleDelete(id)));
      confirmState.bulkOnDone?.();
    } else {
      await handleDelete(confirmState.image.id);
    }
    setConfirmState({
      isOpen: false,
      image: null,
      bulk: false,
      bulkIds: [],
      bulkOnDone: null,
    });
  };

  const cancelDelete = () => {
    setConfirmState({
      isOpen: false,
      image: null,
      bulk: false,
      bulkIds: [],
      bulkOnDone: null,
    });
  };

  const confirmMessage = confirmState.bulk
    ? `Supprimer définitivement ${confirmState.bulkIds.length} image${confirmState.bulkIds.length > 1 ? "s" : ""} ? Cette action est irréversible.`
    : `Supprimer définitivement « ${confirmState.image?.title || `image #${confirmState.image?.id}`} » ? Cette action est irréversible.`;

  return (
    <main className="admin-images-management">
      <h2>Gestion des images</h2>

      {/* 1. Formulaire d'upload */}
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
        onDelete={askDelete}
      />

      {/* 4. Modale d'édition */}
      {isOpen && selectedImage && (
        <EditImageModal
          image={selectedImage}
          editData={editData}
          setEditData={setEditData}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
        />
      )}

      {/* 5. Modale de confirmation suppression */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Supprimer l'image"
        message={confirmMessage}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </main>
  );
}
