import Swal from 'sweetalert2'

export function useFlash() {
  function flash(message) {
    return new Swal('Success', message, 'success')
  }

  return { flash }
}
