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
        modalKey = key;//indice do json

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
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);   //condição
        //Verificando qual dos identifier do carringo é igual ao novo identifier criado e igual
        //caso ache retorna o idenx se nao achar -1
    // let key = cart.findIndex((item)=>{
    //     return item.identifier = identifier
    //     //Verificando qual dos identifier do carringo é igual ao novo identifier criado e igual
    //     //caso ache retorna o idenx se nao achar
    // });
    
    if(key > -1){//se ele achar o item
        cart[key].qt += modalQt
    }else{
        //pegando do json qual e a pizza seleciondada e pegando o id da selecionada
        cart.push({//modalKey esta passando apenas o indice da pizza selecioadna que é passada para o json buscar as infos
            identifier,
            id:pizzaJson[modalKey].id,
            size,//ou size: size
            qt:modalQt
        });
    }
    updateCart();
    closeModal(); 
});

function updateCart() {
    if(cart.length > 0){//Caso tenha itens no carrinho
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';//ira sempre zerar e mostrar a list dos itens/ primeiro zera dps o append
        for(let i in cart ){
            //Acesadno o json e procura o itens que tenham os mesmos ids que tem nos temos
            //Find chama o item e retorna para ele :        busca
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id)//Se tem o id do item e ira procurar o id dentro do json e retorna o item inteiro
            // let pizzaItem = pizzaJson.find((item)=>{//item == itens do json //Find chama o item e retorna para ele :
            //     return item.id = cart[id].id;})

            let cartItem = c('.models .cart--item').cloneNode(true);//Selecionando a class e a clonando todos os itens dentro para dps exibir
            
            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            //Adicionado as informaçoes 
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;


            c('.cart').append(cartItem);//Add a cart os itens clonados de cart item// a classe acima cart--item é apenas um model que fica oculto
        }

    }else{
        c('aside').classList.remove('show');
    }
}
