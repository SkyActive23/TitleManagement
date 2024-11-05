// components/AddTitleCard.tsx
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddTitleModal from '../modal/AddTitleModal';

interface AddTitleCardProps {
  onAdd: (title: string) => void;
}

export default function AddTitleCard({ onAdd }: AddTitleCardProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (title: string) => {
    onAdd(title);
    setShowAddModal(false); // Close modal after adding
  };

  return (
    <>
      <div
        onClick={() => setShowAddModal(true)}
        className=" p-4 border border-dashed border-neutral-light bg-background-accent rounded-lg shadow-sm cursor-pointer flex flex-col items-center justify-center"
      >
        <FaPlus className="w-12 h-12 text-primary-dark" />
        <p className="text-primary-dark font-semibold mt-2">Add New Title</p>
      </div>

      {showAddModal && (
        <AddTitleModal onClose={() => setShowAddModal(false)} onSave={handleAdd} />
      )}
    </>
  );
}
