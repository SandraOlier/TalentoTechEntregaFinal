async function listaImagenes() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

    try {
        const card = document.querySelector(".cardRecetas");

        for (let i = 0; i < 5; i++) { // Cambia el número 5 por la cantidad de recetas que quieras mostrar
            let fetchImagen = await fetch(url);
            let datosImagenes = await fetchImagen.json();

            console.log(datosImagenes);

            datosImagenes.meals.forEach(elemento => {
                const contenido = `
                    <li class="card">
                        <img class="card__image" src="${elemento.strMealThumb}" alt="imagen">
                        <h3 class="card__title">${elemento.strMeal}</h3>
                    </li>
                `;

                card.innerHTML += contenido;
            });
        }
    } catch (error) {
        console.log(error);
    }
}

listaImagenes();


