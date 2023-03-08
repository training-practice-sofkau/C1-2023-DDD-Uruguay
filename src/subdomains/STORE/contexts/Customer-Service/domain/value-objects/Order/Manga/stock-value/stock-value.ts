import { ValueObjectBase } from "src/libs/sofka/bases/object-value.base";
import { isStock } from "src/libs/validations/is-stock.validations";


export class StockValue extends ValueObjectBase<number>{
/**
 * The constructor function is a special function that is called when an object is created from a
 * class.
 * @param {string} [value] - The value of the input.
 */
   
  constructor(value?: number){
      super(value);
  }

/**
 * If the structure of the data is valid, then validate the data.
 */

  validateData(): void {
  this.validateStructure()
  }

/* Validating the structure of the data. */

private validateStructure(): void {
    
    if(this.value && !isStock(this.value) === false)
{
    const error = {
      field: 'Stock',
      message: 'El dato ingresado en "Stock" no contiene una estructura valida '
    }
    this.setError(error)
  }
  

}
}