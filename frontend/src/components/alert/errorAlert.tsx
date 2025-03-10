import { ErrorAlertType } from '@/types/ErrorAlertType';
import Swal from 'sweetalert2';

const ErrorAlert = ({ title, message }: ErrorAlertType) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#004e6b'
  });
};

export default ErrorAlert;
