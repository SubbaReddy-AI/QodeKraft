import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="admin-modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="admin-modal-header">
          <h2>{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>

        <div className="admin-modal-body">{children}</div>
      </section>
    </div>
  );
}