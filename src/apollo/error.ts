import { toast } from 'react-toastify'

export function toastError(error: Error) {
  toast.warn(error.message, { autoClose: 5000 })
}
