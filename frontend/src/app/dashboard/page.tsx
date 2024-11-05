"use client";

import { useEffect, useState } from 'react';
import { addTitle, fetchTitles, deleteTitle, editTitle } from '../../services/title';
import AddTitleCard from '../../components/AddTitleCard';
import TitleCard from '../../components/TitleCard';
import DeleteConfirmationModal from '../../modal/DeleteConfirmationModal';
import { useMetaMask } from '../../context/MetaMaskContext';
import { setAuthToken } from '../../services/api';
import React from 'react';
import EditTitleModal from '@/modal/EditTitleModal';
import Skeleton from '@/components/Skeleton';


interface Title {
  [x: string]: Key | null | undefined;
  id: number;
  title: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { walletAddress } = useMetaMask();
  const [titles, setTitles] = useState<Title[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [titleToEdit, setTitleToEdit] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) setAuthToken(token);
    }

    if (walletAddress) {
      fetchTitles()
        .then((data) => {
          setTitles(data);
          setLoading(false); // Data loaded, stop showing skeleton
        })
        .catch((err) => {
          console.error('Error fetching titles:', err);
          setError('Failed to load titles. Please try again later.');
          setLoading(false);
        });
    }
  }, [walletAddress]);

  const handleAdd = async (title: string) => {
    try {
      const newTitle = await addTitle(title);
      setTitles((prevTitles) => [...prevTitles, newTitle]);
    } catch (error) {
      console.error('Error adding title:', error);
      setError('Failed to add title. Please try again.');
    }
  };

  const confirmDelete = (uuid: string) => {
  setSelectedTitleId(uuid);
  setShowDeleteModal(true);
};

const handleDelete = async () => {
  if (selectedTitleId) {
    try {
      await deleteTitle(selectedTitleId);
      setTitles((prevTitles) => prevTitles.filter((title) => title.uuid !== selectedTitleId));
      setShowDeleteModal(false); // Close modal after deletion
      setSelectedTitleId(null);  // Reset selected title
    } catch (error) {
      console.error('Error deleting title:', error);
      setError('Failed to delete title. Please try again.');
    }
  }
};


  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedTitleId(null);
  };

  const openEditModal = (uuid: string, title: string) => {
    console.log("Opening edit modal for title:", { uuid, title });
    setSelectedTitleId(uuid);
    setTitleToEdit(title);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedTitle: string) => {
    try {
      if (selectedTitleId) {
        const updatedData = await editTitle(selectedTitleId, updatedTitle);
        console.log("Title updated successfully:", updatedData);
  
        // Update state to reflect the edited title immediately
        setTitles((prevTitles) =>
          prevTitles.map((title) =>
            title.uuid === selectedTitleId
              ? { ...title, title: updatedTitle }
              : title
          )
        );
  
        // Close the edit modal and reset selected title ID
        setShowEditModal(false);
        setSelectedTitleId(null);
      }
    } catch (error) {
      console.error("Failed to update title:", error);
    }
  };
  


  return (
    <main className="container mx-auto py-8 px-4">
     {loading ? (
        // Show skeleton while loading
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : !walletAddress ? (
        // Show message if no wallet is connected after loading completes
        <p className="text-center text-red-500">Please connect your wallet to view titles.</p>
      ) : (
        // Show actual content once loaded and wallet is connected
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {titles.map((title) => {
            console.log("Mapping title object:", title); // Log each title object
            return (
              <TitleCard
                key={title.uuid}
                id={title.uuid} // Use uuid here instead of id
                title={title.title}
                createdAt={title.createdAt}
                onEdit={openEditModal}
                onDelete={() => confirmDelete(title.uuid)} // Pass uuid to confirmDelete
              />
            );
        })}


          <AddTitleCard onAdd={handleAdd} />
        </div>
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          title="Confirm Delete"
          message="Are you sure you want to delete this title?"
          onConfirm={handleDelete}
          onCancel={cancelDelete}
        />
      )}

      {showEditModal && (
        <EditTitleModal
          title={titleToEdit}

          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
    </main>
  );
}
