const cardValue = htmlNode.getElementById('value');
const card = htmlNode.getElementById('card_659qm0');
const healthBadge = htmlNode.getElementById('health-badge');
const chartSvg = htmlNode.getElementById('chart');
const valueField = data.series[0]?.fields[1];
const timeField = data.series[0]?.fields[0];

if (cardValue && valueField) {
  const length = valueField.values.length;
  if (length > 0) {
    const lastValue = valueField.values.get(length - 1);
    cardValue.textContent = lastValue.toFixed(2) + "%";

    // TRIGGER
    card.classList.remove('trigger');

    // HEALTH BADGE
    healthBadge.classList.remove('health-estavel', 'health-atencao', 'health-ruim');
    if (lastValue <= 50) {
      healthBadge.textContent = 'ESTÁVEL';
      healthBadge.classList.add('health-estavel');
    } else if (lastValue <= 79) {
      healthBadge.textContent = 'ATENÇÃO';
      healthBadge.classList.add('health-atencao');
    } else {
      healthBadge.textContent = 'RUIM';
      healthBadge.classList.add('health-ruim');
    }

    // CHART
    if (chartSvg && length > 1) {
      const values = [];
      for (let i = 0; i < length; i++) {
        values.push(valueField.values.get(i));
      }

      const w = 500;
      const h = 80;
      chartSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);

      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const range = maxVal - minVal || 1;
      const padTop = 5;
      const padBottom = 5;

      const points = values.map((v, i) => {
        const x = (i / (length - 1)) * w;
        const y = padTop + ((1 - (v - minVal) / range) * (h - padTop - padBottom));
        return `${x},${y}`;
      }).join(' ');

      // Linha de cor baseada no status
      let lineColor = '#32cd64';
      if (lastValue > 79) lineColor = '#ff4646';
      else if (lastValue > 50) lineColor = '#ffb400';

      // Área preenchida (gradiente)
      const fillPoints = `0,${h} ` + points + ` ${w},${h}`;

      chartSvg.innerHTML = `
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${lineColor}" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <polygon points="${fillPoints}" fill="url(#chartGrad)" />
        <polyline
          points="${points}"
          fill="none"
          stroke="${lineColor}"
          stroke-width="1.5"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      `;
    }
  }
}
