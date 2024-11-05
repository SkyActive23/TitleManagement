// components/EditTitleModal.tsx
import { useState } from 'react';

interface EditTitleModalProps {
  title: string;
  onClose: () => void;
  onSave: (updatedTitle: string) => void;
}

export default function EditTitleModal({ title, onClose, onSave }: EditTitleModalProps) {
  const [newTitle, setNewTitle] = useState(title);
  // const [newDetails, setNewDetails] = useState(details);

  const handleSave = () => {
    onSave(newTitle);
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="border border-primary-dark bg-gradient-to-r from-gray-900 to-gray-700 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-neutral-light mb-4">Edit Title</h2>

        <label className="block text-sm font-medium text-neutral-light mb-2">Title</label>
        <textarea
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="mb-4 block w-full px-3 py-2 bg-background-accent border border-bg-neutral-light rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
        />

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-neutral-light text-black rounded-lg hover:bg-neutral-dark">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
