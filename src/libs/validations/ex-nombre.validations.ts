
export function EsNombre(valor: string): boolean {

    const regex =/ ^ [a-zA-Z] + [a-zA-Z] + $ /;

    const matches = valor.match(regex);

    return matches != null ? true : false;
}
