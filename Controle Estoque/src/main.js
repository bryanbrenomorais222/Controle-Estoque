var produto = document.getElementById("produto"); 
var quantidade = document.getElementById("quantidade"); 
var preço = document.getElementById("preço"); 

function verificar() { 
    if (produto.value == "" && quantidade.value == 0 && preço.value <= 0) {
        window.alert('Preencha todos os campos para adicionar um produto/item no estoque!'); 

    } else if (produto.value == "") {
        window.alert('Preencha o "Nome do Item" para adicionar um produto/item no estoque!');

    } else if (quantidade.value == 0) {
        window.alert('Preencha a "Quantidade" para adicionar um produto/item no estoque!');

    } else if (preço.value <= 0) {
        window.alert('Preencha o campo "Preço" para adicionar um produto/item no estoque!');
    };

};

function excluir() { 

    if (confirm('Tem certeza que deseja excluir todos os produtos/itens do estoque?')) { 

        if (localStorage.length === 0) { 
            window.alert('Estoque vazio!');

        } else {
            localStorage.removeItem("estoqueItens"); 
            window.alert('Estoque excluído!');
        };
        
    } else {
        return false; 
    };
    
};

function adicionar() { 

    var novo = document.getElementById("produto").value; 
    var qtd = document.getElementById("quantidade").value; 
    var prç = document.getElementById("preço").value;

    if (!novo) { 
        return false;

    } else if (!qtd) {
        return false; 

    } else if (!prç) {
        return false; 
    };

    var item = { 
        nome: novo, 
        quant: qtd,
        valor: prç,
    };
    
    if (localStorage.getItem('estoqueItens') === null) { 

        var itens = []; 
        itens.push(item); 
        localStorage.setItem('estoqueItens', JSON.stringify(itens)); 

    } else {

        var itens = JSON.parse(localStorage.getItem('estoqueItens')); 
        itens.push(item);
        localStorage.setItem('estoqueItens', JSON.stringify(itens));

    };

};

function removerItem(nome) { 
    
    var itens = JSON.parse(localStorage.getItem('estoqueItens')); 
    
    for (var i = 0; i < itens.length; i++) { 
        
        if (itens[i].nome === nome) {
            itens.splice(i, 1); // 
        };
        
        localStorage.setItem('estoqueItens', JSON.stringify(itens));
        
    };

    mostrarResultado(); 
    
};

function mostrarResultado() { 
    
    var itens = JSON.parse(localStorage.getItem('estoqueItens')); 
    var resultadoItens = document.getElementById('resultados'); 
    
    resultadoItens.innerHTML = ''; 
    
    for (var i = 0; i < itens.length; i++) { 
        
        var nome =  itens[i].nome;
        var quant = itens[i].quant;
        var valor = itens[i].valor;
          
        resultadoItens.innerHTML += '\
            <tr>\
                <td style="word-wrap: break-word;">' + nome + '</td>\
                <td style="word-wrap: break-word;">' + quant + '</td>\
                <td style="word-wrap: break-word;">' + valor + '</td>\
                <td><button class="botoes-tabela" onclick="removerItem(\'' + nome + '\')">X</button></td>\
            </tr>';           
            
        
        produto.value = ''; 
        quantidade.value = '';
        preço.value = '';
        produto.focus(); 

    };
    
};

