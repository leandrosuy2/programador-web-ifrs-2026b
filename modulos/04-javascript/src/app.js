const averageForm = document.querySelector('#average-form');
const averageResult = document.querySelector('#average-result');
const bmiForm = document.querySelector('#bmi-form');
const bmiResult = document.querySelector('#bmi-result');
const sourceText = document.querySelector('#source-text');

function calculateAverage(values) {
  if (!values.length || values.some((value) => !Number.isFinite(value) || value < 0 || value > 10)) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function calculateBmi(weight, height) {
  if (!Number.isFinite(weight) || !Number.isFinite(height) || weight <= 0 || height <= 0) return null;
  return weight / (height * height);
}

averageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const raw = new FormData(averageForm).get('grades').trim();
  const values = raw.split(',').map((part) => part.trim() === '' ? Number.NaN : Number(part.trim()));
  const average = calculateAverage(values);
  averageResult.textContent = average === null ? 'Use notas numéricas de 0 a 10, separadas por vírgula.' : `Média: ${average.toFixed(2)}`;
});

bmiForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bmiForm);
  const bmi = calculateBmi(Number(formData.get('weight')), Number(formData.get('height')));
  bmiResult.textContent = bmi === null ? 'Informe peso e altura maiores que zero.' : `IMC: ${bmi.toFixed(1)} (resultado apenas informativo).`;
});

document.querySelector('#uppercase-button').addEventListener('click', () => {
  document.querySelector('#text-result').textContent = sourceText.value.toLocaleUpperCase('pt-BR');
});

document.querySelector('#word-count-button').addEventListener('click', () => {
  const words = sourceText.value.trim().split(/\s+/).filter(Boolean);
  document.querySelector('#text-result').textContent = `Palavras: ${words.length}`;
});

document.querySelector('#confirm-button').addEventListener('click', () => {
  document.querySelector('#event-result').textContent = window.confirm('Deseja confirmar esta ação?') ? 'Ação confirmada.' : 'Ação cancelada.';
});

document.querySelector('#repeat-button').addEventListener('click', () => {
  const sequence = [];
  for (let number = 1; number <= 5; number += 1) sequence.push(number);
  document.querySelector('#event-result').textContent = `Sequência: ${sequence.join(', ')}`;
});

document.querySelector('#live-input').addEventListener('input', (event) => {
  document.querySelector('#input-result').textContent = `Você digitou: ${event.currentTarget.value}`;
});

document.querySelector('#hover-target').addEventListener('mouseenter', () => {
  document.querySelector('#event-result').textContent = 'Evento de ponteiro detectado.';
});

window.addEventListener('load', () => {
  document.querySelector('#event-result').textContent = 'Página carregada. Experimente os eventos.';
});

export { calculateAverage, calculateBmi };