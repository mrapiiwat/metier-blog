'use client'
import { FiAlertCircle, FiX } from 'react-icons/fi'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type: 'error' | 'confirm'
  onConfirm?: () => void
}

export const Modal = ({ isOpen, onClose, title, message, type, onConfirm }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-2 rounded-full ${type === 'error' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}
          >
            <FiAlertCircle size={20} />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>

        <div className="flex gap-3">
          {type === 'confirm' && (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
            >
              ยกเลิก
            </button>
          )}
          <button
            onClick={type === 'confirm' ? onConfirm : onClose}
            className={`flex-1 py-2.5 text-sm font-semibold text-white rounded-xl ${type === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {type === 'confirm' ? 'ยืนยัน' : 'ตกลง'}
          </button>
        </div>
      </div>
    </div>
  )
}
