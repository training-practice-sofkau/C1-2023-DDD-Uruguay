import { ValueObjectBase, isString } from "../../../../../../../../../libs";


export class ClientNameValue extends ValueObjectBase<string>{
/**
 * The constructor function is a special function that is called when an object is created from a
 * class.
 * @param {string} [value] - The value of the input.
 */
   
  constructor(value?: string){
      super(value);
  }

/**
 * If the structure of the data is valid, then validate the data.
 */

  validateData(): void {
  // this.validateStructure()
  }

/* Validating the structure of the data. */

private validateStructure(): void {
  
    if(this.value && !isString(this.value) === false)
{
    const error = {
      field: 'Name',
      message: 'El dato ingresado en "name" no contiene una estructura valida '
    }
    this.setError(error)
  }
  

}
}