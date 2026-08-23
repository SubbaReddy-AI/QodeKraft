import { Edit3, Trash2 } from "lucide-react";

export default function DataTable({
  columns,
  data = [],
  loading = false,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
}) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}

            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1}>
                Loading records...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row)
                      : row[column.key] ?? "-"}
                  </td>
                ))}

                {(onEdit || onDelete) && (
                  <td>
                    <div className="table-actions">
                      {onEdit && (
                        <button
                          type="button"
                          className="table-action-edit"
                          onClick={() => onEdit(row)}
                          aria-label="Edit record"
                        >
                          <Edit3 size={16} />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          className="table-action-delete"
                          onClick={() => onDelete(row)}
                          aria-label="Delete record"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}