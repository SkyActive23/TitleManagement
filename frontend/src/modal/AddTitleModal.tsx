// components/AddTitleModal.tsx
import { useState } from 'react';

interface AddTitleModalProps {
  onClose: () => void;
  onSave: (title: string) => void;
}

export default function AddTitleModal({ onClose, onSave }: AddTitleModalProps) {
  const [newTitle, setNewTitle] = useState('');
  // const [newDetails, setNewDetails] = useState('');

  const handleSave = () => {
    if (newTitle.trim()) {
      onSave(newTitle);
      onClose(); // Close modal after saving
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="border border-primary-dark bg-gradient-to-r from-gray-900 to-gray-700 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-neutral-light mb-4">Add New Title</h2>

        <label className="block text-sm font-medium text-neutral-light mb-2">Title</label>
        <textarea
          // type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="mb-4 block w-full px-3 py-2 border border-neutral bg-background-accent rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
          placeholder="Enter title"
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
