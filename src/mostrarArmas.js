export default function mostrarArmas(data) {
    const armas = data.data  // quiero que mi data se llame armas       
    console.log(armas);
    const app = document.getElementById('app') // el div se llama app
    console.log(app) // imprime el div

    let costo = 0
    const totalCompra = document.createElement('h2')
    totalCompra.id = 'costo-compra'
    totalCompra.innerText = "Total de la compra:  $" + costo 
    app.appendChild(totalCompra);

     const armasGuardadas = localStorage.getItem('armasGuardadas') || '[]'
    const armasGuardadasList = JSON.parse(armasGuardadas)

    armas.forEach(unaArma => {
        // console.log(unaArma)
        // Cree un elemento p por cada arma
        const contenedorArma = document.createElement('div')
        contenedorArma.style = 'display: flex; flex-direction: column; align-items: center'
        contenedorArma.id = unaArma.uuid

        const tituloArma = document.createElement('p');
        tituloArma.textContent = unaArma.displayName // Asigne un texto dentro el p de cada arma

        const imagenArma = document.createElement('img')
        imagenArma.src = unaArma.displayIcon

        const botonComprar = document.createElement('button')
        botonComprar.innerText = "Comprar"

        contenedorArma.appendChild(tituloArma) // Agregar cada p dentro del div llamado app
        contenedorArma.appendChild(imagenArma)
        contenedorArma.appendChild(botonComprar)
        app.appendChild(contenedorArma)

        botonComprar.addEventListener('click', () => {
            costo = costo + unaArma.shopData.cost
            console.log(costo);

            const totalCompra = document.getElementById('costo-compra')
            totalCompra.innerText = "Total de la compra:  $" + costo 

            botonComprar.innerText = 'Comprado'
            botonComprar.disabled = true

            // Obtengo las ya guardadas, si no exise ningun registro guardado, por defecto guarde en armasGuardadas un arreglo vacio como string
            const armasGuardadas = localStorage.getItem('armasGuardadas') || '[]'
            const armasGuardadasList = JSON.parse(armasGuardadas) // Convierto de string de arreglo a arreglo
            console.log(armasGuardadasList)

            armasGuardadasList.push(unaArma.uuid) // Agrego un nuevo elemento al arreglo 
            console.log(armasGuardadasList)
            localStorage.setItem('armasGuardadas', JSON.stringify(armasGuardadasList)) // Guardo dentro del localStorage el nuevo arreglo
        })
    });


}
