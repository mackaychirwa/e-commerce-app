import Swal from 'sweetalert2';

const WarningAlert = ({ title, message }) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#004e6b'
  });
};

export default WarningAlert; 
