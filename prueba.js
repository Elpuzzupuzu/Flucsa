#!/usr/bin/env node
/**
 * horario.js (versión sin dependencias externas)
 * Simula un horario y lo muestra por terminal.
 */

const SPEED = 600;     // ms entre cada tick
const STEP_MIN = 15;   // minutos que avanza cada tick
const DAYS = 5;        // cantidad de días
const START_HOUR = 7;  // hora inicio (7:00)
const END_HOUR = 22;   // hora fin (22:00)
const SLOT_MIN = 30;   // cada fila representa SLOT_MIN minutos

const DAYS_NAMES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].slice(0, DAYS);

// ANSI colors
const ansi = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  fg: { cyan: '\x1b[36m', white: '\x1b[37m' },
  bg: { cyan: '\x1b[46m' }
};

function generarEventosParaDia() {
  const eventos = [];
  const posibles = ['Clase', 'Trabajo', 'Reunión', 'Almuerzo', 'Estudio', 'Gym', 'Tarea', 'Descanso'];
  const n = 3 + Math.floor(Math.random() * 4);
  let cursor = START_HOUR * 60 + (Math.random() < 0.5 ? 0 : 30);

  for (let i = 0; i < n; i++) {
    const durOptions = [30, 60, 90, 120];
    const dur = durOptions[Math.floor(Math.random() * durOptions.length)];
    const start = cursor;
    const end = Math.min(start + dur, END_HOUR * 60);
    if (end - start >= 15) {
      eventos.push({
        title: posibles[Math.floor(Math.random() * posibles.length)],
        start, end
      });
    }
    cursor = end + (15 + Math.floor(Math.random() * 45));
    if (cursor >= END_HOUR * 60 - 15) break;
  }
  return eventos;
}

function generarHorario(days) {
  return Array.from({ length: days }, () => generarEventosParaDia());
}

function eventoEnMinutos(eventos, minuto) {
  return eventos.find(e => minuto >= e.start && minuto < e.end) || null;
}

function fm(h, m) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function renderTabla(horario, simMin) {
  console.clear();
  console.log(ansi.bright + 'Horario simulado' + ansi.reset);
  console.log(`Tiempo simulado: ${ansi.fg.cyan}${fm(Math.floor(simMin/60), simMin%60)}${ansi.reset}\n`);

  let header = 'Hora   ';
  for (let d = 0; d < DAYS; d++) header += `| ${DAYS_NAMES[d].padEnd(10)} `;
  console.log(header);
  console.log('-'.repeat(header.length));

  for (let minute = START_HOUR * 60; minute < END_HOUR * 60; minute += SLOT_MIN) {
    const horaLabel = fm(Math.floor(minute / 60), minute % 60);
    let row = horaLabel + '  ';
    for (let d = 0; d < DAYS; d++) {
      const e = eventoEnMinutos(horario[d], minute);
      let cell = e ? e.title.slice(0, 10).padEnd(10) : ''.padEnd(10);
      if (d === 0 && simMin >= minute && simMin < minute + SLOT_MIN) {
        row += `| ${ansi.bg.cyan}${ansi.fg.white}${cell}${ansi.reset} `;
      } else {
        row += `| ${cell} `;
      }
    }
    console.log(row);
  }
}

const horario = generarHorario(DAYS);
let simMin = START_HOUR * 60;
renderTabla(horario, simMin);

const interval = setInterval(() => {
  simMin += STEP_MIN;
  if (simMin >= END_HOUR * 60) simMin = START_HOUR * 60;
  renderTabla(horario, simMin);
}, SPEED);

process.on('SIGINT', () => {
  clearInterval(interval);
  console.log('\nSimulación terminada.');
  process.exit(0);
});
