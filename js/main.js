/*!
 * Caculadora de Notas
 * Copyright(c) 2018 Ewerton Coutinho
 * Licensed under MIT (https://github.com/ewertoncoutinho/calculadora-de-notas/blob/master/LICENSE)
 */

let numInput = 3;
const minhasNotas = [];
const notasErr = [];
const decimal = numero => numero.toFixed(2);
const notaFinal = media => (50 - media * 6) / 4;
const getNota = minhasNotas => minhasNotas;
const soma = (total, atual) => total + atual;
const zeroLength = () => {
    minhasNotas.length = 0;
    notasErr.length = 0
};
const shakeAnime = () => {
    setTimeout(function () {
        $('#my-alert').addClass('shake-alert');
    });
    $('#my-alert').removeClass('shake-alert')
};
const timeEvent = (id, text) => {
    let qtd = document.querySelectorAll('#myTextAlert').length;
    if (qtd < 1) {
        myalert(id, text);
        shakeAnime()
    }
    else {
        document.querySelector('#myTextAlert').innerText = text;
        shakeAnime()
    }
    shakeAnime()
};
const notas = () => {
    let qtd = document.querySelectorAll('input').length;
    if (qtd < 6) {
        numInput += 1;
        elementoInput();
    }
    else {
        timeEvent('alert-warning', 'Você atingiu o limite de notas.');
    }
};
const resetNotas = () => {
    this.createInput = document.getElementById('inputnotas').innerHTML = '';
    for (numInput = 1; numInput <= 3; numInput++) {
        this.createInput = elementoInput();
    }
    numInput -= 1;
    document.getElementById('demo').innerHTML = ''
};
const elementoInput = () => {
    this.createInput = document.createElement('div');
    createInput.setAttribute('class', 'input-group mb-1 col-md-4 col-sm-12 col-lg-4');
    createInput.setAttribute('id', 'mygrup');
    let div = document.createElement('div');
    div.setAttribute('class', 'input-group-prepend');
    let span = document.createElement('span');
    span.setAttribute('class', 'input-group-text');
    span.innerText = `${numInput}ª Nota`;
    let input = document.createElement('input');
    input.placeholder = 'Digite sua Nota';
    input.setAttribute('name', 'my-input');
    input.setAttribute('type', 'number');
    input.setAttribute('class', 'form-control');
    createInput.appendChild(div).appendChild(span);
    createInput.appendChild(input);
    document.getElementById('inputnotas').appendChild(createInput)
};
const myalert = (id, text) => {
    let creatAlert = document.createElement('div');
    creatAlert.setAttribute('class', `alert ${id} myalert alert-dismissible fade show`);
    creatAlert.setAttribute('role', 'alert');
    let div = document.createElement('div');
    div.setAttribute('id', 'myTextAlert');
    div.innerText = text;
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'close');
    button.setAttribute('data-dismiss', 'alert');
    button.setAttribute('aria-label', 'close');
    let span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;';
    creatAlert.appendChild(div);
    document.getElementById('my-alert').appendChild(creatAlert).appendChild(button).appendChild(span)
};
const resultadoFinal = media => {
    if (media >= 0 && media < 4) {
        return `Sua média é <strong>${decimal(media)}</strong><br>Não foi desta vez. :(`
    }
    else if (media >= 7 && media <= 10) {
        return `Sua média é <strong>${decimal(media)}</strong><br>Parabéns! Você esta aprovado! :D`
    }
    else {
        return `Sua média é <strong>${decimal(media)}</strong><br>Você precisará de <strong>${decimal(notaFinal(media))}</strong> na avaliação final.`
    }
};
const validate = e => {
    let nota = parseFloat(e.value);
    console.log(!(isNaN(nota)));
    if (!(isNaN(nota))) {
        if (nota <= 10 && nota >= 0) {
            minhasNotas.push(nota)
        }
        else {
            console.log(notasErr);
            notasErr.push(nota)
        }
    }
};
const resultado = () => {
    document.getElementsByName('my-input').forEach(e => validate(e));
    if (minhasNotas.length >= 2 && notasErr.length === 0) {
        const totalNota = minhasNotas.map(getNota).reduce(soma);
        const media = totalNota / minhasNotas.length;
        document.getElementById('demo').innerHTML = resultadoFinal(media);
        $('.alert').alert('close');
        zeroLength()
    }
    else {
        if (notasErr.length > 0) {
            timeEvent('alert-warning', `Você informou ${notasErr.length} ${notasErr.length > 1 ? 'notas' : 'nota'} ${notasErr.length > 1 ? 'inválidas' : 'inválida'}. Por favor insira ${notasErr.length > 1 ? 'valores' : 'um valor'} entre 0 e 10`);
            zeroLength()
        }
        else {
            timeEvent('alert-warning', 'Você esqueceu de informar alguma nota.');
            zeroLength()
        }
    }
};