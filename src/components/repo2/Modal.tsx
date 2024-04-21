export default function Modal({ isOpen, onClose, id }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="md:ax-w-md mx-auto max-w-sm rounded-md bg-white p-5 shadow-lg">
          <button onClick={onClose}>Close</button>
          <div>This is my model</div>
        </div>
      </div>
    </>
  );
}
