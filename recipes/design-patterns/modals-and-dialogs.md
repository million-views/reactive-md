# Modals and Dialogs

> Confirmations, forms, alerts, and overlay patterns.

## About This Recipe

Modals demand attention and should be used thoughtfully. This recipe explores patterns for confirmation dialogs, form modals, and alerts.

---

## Modal Gallery

```jsx live


export default function ModalGallery() {
  const [activeModal, setActiveModal] = React.useState(null);
  
  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-[scale-in_0.2s_ease-out]">
        {children}
      </div>
    </div>
  );
  
  return (
    <div className="space-y-4">
      {/* Triggers */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveModal('confirm')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Confirmation
        </button>
        <button
          onClick={() => setActiveModal('form')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Form Modal
        </button>
        <button
          onClick={() => setActiveModal('success')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Success Alert
        </button>
      </div>
      
      {/* Confirmation Modal */}
      {activeModal === 'confirm' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="p-6">
            <div className="text-5xl text-center mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-center mb-2">Delete Item?</h3>
            <p className="text-gray-600 text-center mb-6">
              This action cannot be undone. Are you sure you want to delete this item?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* Form Modal */}
      {activeModal === 'form' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Profile</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input className="w-full px-4 py-2 border rounded-lg" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="w-full px-4 py-2 border rounded-lg" defaultValue="john@example.com" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* Success Alert */}
      {activeModal === 'success' && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">Your changes have been saved successfully.</p>
            <button
              onClick={() => setActiveModal(null)}
              className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
