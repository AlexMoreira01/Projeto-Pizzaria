// função  anonima
const c = (el)=>document.querySelector(el);
    
/* Criando uma array function */
pizzaJson.map((item, index)=>{
    //Selecioanndo a div item e pegando a .pizza-item           clona item html  
    let pizzaItem = c('.models .pizza-item').cloneNode(true);// true nao so para pegar o item e sim tudo dentro dele
    //pizza item agora é um clone da div

    // acessando itens dentro da div como no css e atribuindo a src da img a imagem das pizza
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;// formatando
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    //Preencher as informações em pizza item
    c('.pizza-area').append( pizzaItem);
})