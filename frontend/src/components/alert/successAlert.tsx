import Swal from 'sweetalert2';

const SuccessAlert = ({ title = 'Success', message = 'Action completed successfully!' }) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    customClass: {
      popup: 'p-6 rounded-lg shadow-lg bg-white',
      title: 'text-xl font-semibold text-green-600',
      confirmButton: 'py-2 px-4 rounded font-bold bg-green-500 hover:bg-green-600 text-white'
    },
    confirmButtonColor: '#004e6b',
    buttonsStyling: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
};

export default SuccessAlert;
