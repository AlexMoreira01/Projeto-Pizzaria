let modalQt = 1;
let cart = [];//carrinho de compras
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

/*LISTAGENS DAS PIZZAS Criando uma arrow function */
pizzaJson.map((item, index)=>{// função  anonima
    //pizza item agora é um clone da div
    //Selecioanndo a div item e pegando a .pizza-item           clona item html  
    let pizzaItem = c('.models .pizza-item').cloneNode(true);// true nao so para pegar o item e sim tudo dentro dele
    
    pizzaItem.setAttribute('data-key', index ); //Inseriu em pizza item qual é a chave da pizza especifica aparece no html

    // acessando itens dentro da div como no css e atribuindo a src da img a imagem das pizza
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;// formatando
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    //EVENTO DE CLICK PARA ABRIR O MODAL
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{//recebe e == evento
        //Quando ouver o click para o modal
        e.preventDefault();//Bloquear ação do a

        //agora se tem acesso a pizza especificas quando sao clicadas  porque pega a referencia de cada uma do json
        let key = e.target.closest('.pizza-item').getAttribute('data-key');//Ache o elemnto mais proximo a partir da tag a tanto antes ou depois
        modalQt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        //item q possui duas class
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{//Para cada um dos intens ele ira rodar uma função  || ela ira receber o proprio item
            if(sizeIndex == 2){//resentando o modal para toda vez q for aberto marca a grande
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{// animação para mostrar o modal
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200)
        c('.pizzaWindowArea').style.display = 'flex';// essa div esta com display none e ao clicar e add o flex
        
    });
    
    //Preencher as informações em pizza item
    c('.pizza-area').append( pizzaItem);
});

// EVENTOS DO MODAL
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{// animação tirar o modal
        c('.pizzaWindowArea').style.display = 'none';
    }, 500)
}
//Pode ser usado onclick mas essa é outra forma
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

// BOTOES + e -
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

// BOTOES DE TAMANHO DA PIZZA
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected'); 
    });
});

//AÇÂO ADD CARRINHO
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //reunir as infos para add no carrinho quando clicar
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));//Pegando o tamanho que foi selecionado

    //pegando do json qual e a pizza seleciondada e pegando o id da selecionada
    cart.push({
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt
    });
   closeModal(); 
    
});