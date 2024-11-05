// components/TitleCard.tsx
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface TitleCardProps {
    id: string;
    title: string;
    createdAt: string;
    onEdit: (uuid: string, title: string) => void;
    onDelete: (uuid: string) => void;
}

export default function TitleCard({ id, title, createdAt, onEdit, onDelete }: TitleCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <div className="relative p-4 border border-neutral-light bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-sm mb-4">
            <button
                onClick={toggleMenu}
                className="absolute top-2 right-0 text-neutral-light focus:outline-none"
            >
                <BsThreeDotsVertical className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-neutral">{title}</h2>
            <p className="text-neutral-light text-sm mt-2">{`Created on: ${new Date(createdAt).toLocaleDateString()}`}</p>

            {isMenuOpen && (
                <div className="absolute right-6 top-2 border border-neutral-light bg-background-accent p-2 rounded-lg shadow-lg z-10">
                    <button
                        onClick={() => { onEdit(id, title); setIsMenuOpen(false); }} // Call onEdit with title data
                        className="block font-semibold text-left w-full text-neutral hover:text-primary"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => { onDelete(id); setIsMenuOpen(false); }}
                        className="block text-left w-full font-semibold text-primary-dark hover:text-primary mt-2"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
