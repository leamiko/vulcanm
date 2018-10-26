
export const GET_FORM = 'GET_FORM';
export const EDIT_FORM = 'EDIT_FORM';
export const DELETE_FORM = 'DELETE_FORM';
export const INSERT_FORM = 'INSERT_FORM';
export const INSERT_POSITION = 'INSERT_POSITION';
export const DELETE_POSITION = 'DELETE_POSITION';

// Store

export interface StateForm {
    form: Form[];
    positionForm: Position;
    newForm: NewForm;
}

// Models

export interface Form {

}

export interface NewForm {

}
