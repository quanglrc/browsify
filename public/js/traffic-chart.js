// Crosshair plugin
const crosshairPlugin = {
  id: 'crosshair',
  afterDraw(chart) {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      const x = chart.tooltip._active[0].element.x;
      const top = chart.scales.y.top;
      const bottom = chart.scales.y.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.stroke();
      ctx.restore();
    }
  }
};

// Data — sau này bạn có thể inject từ server xuống
const labels = ['0h','1h','2h','3h','4h','5h','6h','7h',
                 '8h','9h','10h','11h','12h','13h','14h','15h',
                 '16h','17h','18h','19h','20h','21h','22h','23h'];

const detected  = [4, 4, 4, 3, 3, 3, 3, 3, 4, 5, 7, 8, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
const mitigated = [1, 1, 2, 2, 3, 4, 5, 7, 8, 10, 10, 10, 9, 7, 7, 6, 6, 5, 5, 4, 4, 4, 3, 4];

new Chart(document.getElementById('trafficChart'), {
  type: 'line',
  plugins: [crosshairPlugin],
  data: {
    labels,
    datasets: [
      {
        label: 'Attacks Detected',
        data: detected,
        borderColor: '#1aae5a',
        backgroundColor: 'transparent',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#1aae5a',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Attacks Mitigated',
        data: mitigated,
        borderColor: '#ff5a1f',
        backgroundColor: 'transparent',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#ff5a1f',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        padding: { top: 10, bottom: 10, left: 14, right: 14 },
        cornerRadius: 6,
        displayColors: false,
        bodyFont: { size: 13, weight: '500' },
        bodySpacing: 10,
        callbacks: {
          title: () => '',
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
          labelTextColor: (ctx) => ctx.dataset.borderColor,
        }
      }
    },
    scales: {
      x: { 
        display: true,
        border: { display: false },
        ticks: { display: false },
        grid: { 
          display: true, 
          color: 'rgba(0,0,0,0.05)',
          drawTicks: false,
          borderDash: [5, 5] 
        } 
      },
      y: {
        display: true,
        border: { display: false },
        ticks: { display: false },
        min: 0, max: 12,
        grid: { 
          display: true, 
          color: 'rgba(0,0,0,0.05)',
          drawTicks: false,
          borderDash: [5, 5] 
        }
      }
    }
  }
});