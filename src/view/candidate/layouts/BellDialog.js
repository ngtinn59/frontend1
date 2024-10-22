import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function BellDialog({ show, setShow, current }) {
    const handleClose = () => {
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    {/* Header */}
                    <h4 className="text-2xl font-bold text-purple-700 text-center pb-3 border-b border-purple-200">
                        Thông báo quan trọng
                    </h4>

                    {/* Name */}
                    <div className="mt-4 text-lg font-medium text-pink-600">
                        {current.name}
                    </div>

                    {/* Title */}
                    <div className="mt-3 text-xl font-bold text-indigo-700 pl-3">
                        {current.title}
                    </div>

                    {/* Content */}
                    <div className="mt-4 p-4 bg-pink-100 border-2 border-pink-300 rounded-lg whitespace-pre-line text-gray-800">
                        {current.content}
                    </div>

                    {/* Button Close */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleClose}
                            className="px-6 py-2 text-lg font-bold text-pink-600 border-2 border-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
