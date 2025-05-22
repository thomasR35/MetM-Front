// EditUserModal.jsx
export default function EditUserModal({
  user,
  formData,
  setFormData,
  onClose,
  onUpdate,
}) {
  if (!user) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h3>Modifier utilisateur #{user.id}</h3>
        <form onSubmit={onUpdate}>
          <button type="submit" className="btn btn-success">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
