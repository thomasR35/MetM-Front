import React from "react";

export default function KeywordManagement({
  keywords,
  loading,
  onAdd,
  onRemove,
}) {
  const [input, setInput] = React.useState("");

  return (
    <section className="keyword-management">
      <h2>Gestion des mots-clé</h2>
      <div className="add-keyword">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouveau mot-clé"
        />
        <button
          className="btn btn-primary"
          onClick={async () => {
            await onAdd(input);
            setInput("");
          }}
        >
          Ajouter
        </button>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : (
        <ul className="keyword-list">
          {keywords.map((kw) => (
            <li key={kw.id}>
              {kw.name}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  if (window.confirm(`Supprimer le mot-clé "${kw.name}" ?`)) {
                    onRemove(kw.id);
                  }
                }}
              >
                ❌
              </button>
            </li>
          ))}
          {keywords.length === 0 && <li>Aucun mot-clé trouvé.</li>}
        </ul>
      )}
    </section>
  );
}
