// Modal/DeleteConfirmationModal.tsx
interface DeleteConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export default function DeleteConfirmationModal({
    title,
    message,
    onConfirm,
    onCancel,
  }: DeleteConfirmationModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
        <div className="border border-primary-dark bg-gradient-to-r from-gray-900 to-gray-700 p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-semibold text-neutral-light mb-4">{title}</h2>
          <p className="text-neutral-light mb-6">{message}</p>
          
          <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="px-4 py-2 bg-neutral-light text-black rounded-lg hover:bg-neutral-dark">
              Cancel
            </button>
            <button onClick={() => { 
              console.log("Delete confirmed in modal"); // Log delete confirmation
              onConfirm(); 
            }} className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  