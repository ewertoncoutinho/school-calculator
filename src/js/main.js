/*!
 * Caculadora de Notas
 * Copyright(c) 2018 Ewerton Coutinho
 * Licensed under MIT (https://github.com/ewertoncoutinho/calculadora-de-notas/blob/master/LICENSE)
 */
let numInput = 3;
const minhasNotas = [];
const notasError = [];
const decimal = numero => numero.toFixed(2);
const notaFinal = media => (50 - media * 6) / 4;
const getNota = minhasNotas => minhasNotas;
const sum = (total, atual) => total + atual;
document.querySelector('[result]').onclick = function () {
    resultado()
};
document.querySelector('[reset-notas]').onclick = function () {
    resetNotas()
};
document.querySelector('[add-notas]').onclick = function () {
    notas()
};
const shakeAnimation = () => {
    setTimeout(function () {
        $('#my-alert').addClass('shake-animation')
    });
    $('#my-alert').removeClass('shake-animation')
};
const alerta = (id, text) => {
    let qtdIdAlert = document.querySelectorAll('#myTextAlert').length;
    if (qtdIdAlert < 1) {
        myalert(id, text);
        shakeAnimation()
    }
    else {
        document.querySelector('#myTextAlert').innerText = text;
        shakeAnimation()
    }
};
const notas = () => {
    let qtdInput = document.querySelectorAll('input').length;
    if (qtdInput < 6) {
        numInput += 1;
        elementoInput()
    }
    else {
        alerta('alert-warning', 'Você atingiu o limite de notas.')
    }
};
const resetNotas = () => {
    window.createInput = document.getElementById('inputnotas').innerHTML = '';
    for (numInput = 1; numInput <= 3; numInput++) {
        window.createInput = elementoInput();
    }
    document.getElementById('demo').innerHTML = '';
    numInput -= 1
};
const elementoInput = () => {
    window.createInput = document.createElement('div');
    createInput.setAttribute('class', 'input-group mb-1 col-md-4 col-sm-12 col-lg-4');
    createInput.setAttribute('id', 'mygrup');
    let divInput = document.createElement('div');
    divInput.setAttribute('class', 'input-group-prepend');
    let spanInput = document.createElement('span');
    spanInput.setAttribute('class', 'input-group-text');
    spanInput.innerText = `${numInput}ª Nota`;
    let myInput = document.createElement('input');
    myInput.placeholder = 'Digite sua Nota';
    myInput.setAttribute('name', 'my-input');
    myInput.setAttribute('type', 'number');
    myInput.setAttribute('class', 'form-control');
    createInput.appendChild(divInput).appendChild(spanInput);
    createInput.appendChild(myInput);
    document.getElementById('inputnotas').appendChild(createInput)
};
const myalert = (id, text) => {
    return document.getElementById('my-alert').innerHTML = `<div class="alert ${id} myalert alert-dismissible fade show" role="alert"><div id="myTextAlert">${text}</div><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">×</span></button></div>`
};
const resultadoFinal = media => {
    if (media >= 0 && media < 4) {
        return `Sua média é <strong>${decimal(media)}</strong><br><span class="h6">Não foi desta vez. :(</span>`
    }
    else if (media >= 7 && media <= 10) {
        return `Sua média é <strong>${decimal(media)}</strong><br><span class="h6">Parabéns! Você esta aprovado! :D</span>`
    }
    else {
        return `Sua média é <strong>${decimal(media)}</strong><br><span class="h6">Você precisará de <strong>${decimal(notaFinal(media))}</strong> na avaliação final.</span>`
    }
};
const validate = e => {
    let nota = parseFloat(e.value);
    if (!(isNaN(nota))) {
        if (nota <= 10 && nota >= 0) {
            minhasNotas.push(nota)
        }
        else {
            notasError.push(nota)
        }
    }
};

const display = (valor) => {
    return `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Resultado</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><div class="mt-3 col h5">${valor}</div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`
};

const resultado = () => {
    document.getElementsByName('my-input').forEach(e => validate(e));
    if (minhasNotas.length >= 2 && notasError.length === 0) {
        console.log('err');
        const totalNota = minhasNotas.map(getNota).reduce(sum);
        const media = totalNota / minhasNotas.length;
        console.log(resultadoFinal(media));
        document.getElementById('demo').innerHTML = display(resultadoFinal(media));
        $('.alert').alert('close');
        minhasNotas.length = 0
    }
    else {
        if (notasError.length > 0) {
            alerta('alert-warning', `Você informou ${notasError.length} ${notasError.length > 1 ? 'notas' : 'nota'} ${notasError.length > 1 ? 'inválidas' : 'inválida'}. Por favor insira ${notasError.length > 1 ? 'valores' : 'um valor'} entre 0 e 10`);
            notasError.length = 0
        }
        else {
            alerta('alert-warning', 'Você esqueceu de informar alguma nota.');
            minhasNotas.length = 0
        }
    }
};