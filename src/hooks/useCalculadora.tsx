import React, {useRef, useState} from 'react';
enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}
export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
  };
  const armarNumero = (numeroTexto: string) => {
    //No aceptar mas de un punto
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);

        // Evaluar si es otro cero y hay punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);

        //Evaluar si es diferente de cero y no tiene punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);

        //Evitar ceros a la izquierda
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };
  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    const len = numero.length;
    if (len === 1) {
      setNumero('0');
    } else if (len === 2) {
      if (numero.startsWith('-')) {
        setNumero('0');
      } else {
        setNumero(numero.slice(0, -1));
      }
    } else {
      setNumero(numero.slice(0, -1));
    }
  };

  const cambiarNumPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else if (numero.startsWith('I' || 'N')) {
      setNumero('0');
      setNumeroAnterior('0');
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };
  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };
  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };
  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);
    if (numeroAnterior === '0') {
      setNumero(`${num1}`);
    } else {
      switch (ultimaOperacion.current) {
        case Operadores.sumar:
          setNumero(`${num1 + num2}`);
          break;
        case Operadores.restar:
          setNumero(`${num2 - num1}`);
          break;
        case Operadores.multiplicar:
          setNumero(`${num1 * num2}`);
          break;
        case Operadores.dividir:
          setNumero(`${num2 / num1}`);
          break;
      }
    }
    setNumeroAnterior('0');
  };

  return {
    armarNumero,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
    limpiar,
    numero,
    numeroAnterior,
    positivoNegativo,
  };
};
