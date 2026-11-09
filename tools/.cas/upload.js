new Promise(res => {
  const c = document.createElement('canvas'); c.width = 900; c.height = 600; const x = c.getContext('2d');
  const g = x.createLinearGradient(0,0,0,600); g.addColorStop(0,'#2b5d7a'); g.addColorStop(1,'#e9c38a'); x.fillStyle = g; x.fillRect(0,0,900,600);
  x.fillStyle = '#183a2a'; x.beginPath(); x.moveTo(0,600); for (let i=0;i<=900;i+=30) x.lineTo(i, 430 - 80*Math.sin(i/90) - 40*Math.sin(i/37)); x.lineTo(900,600); x.fill();
  x.fillStyle = '#fff3c4'; x.beginPath(); x.arc(640,180,60,0,7); x.fill();
  x.fillStyle = '#111'; x.font = 'bold 80px Georgia'; x.fillText('HELLO', 160, 300);
  c.toBlob(b => { const f = new File([b], 't.png', {type:'image/png'}); const dt = new DataTransfer(); dt.items.add(f); const inp = document.getElementById('file'); inp.files = dt.files; inp.dispatchEvent(new Event('change')); setTimeout(res, 1500); });
})
