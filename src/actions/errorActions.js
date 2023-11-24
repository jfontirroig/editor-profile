import { VALIDAR_FORMULARIO, MOSTRAR_ERROR } from './types';

export const mostrarError = () => {
    return {
        type: MOSTRAR_ERROR
    }
}
export const validarFormulario = (estado) => {
    return {
        type: VALIDAR_FORMULARIO,
        payload: estado
    }
}
