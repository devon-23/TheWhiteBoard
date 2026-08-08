(function() {
  const canvas = document.getElementById('whiteboard');
  const ctx = canvas.getContext('2d');
  let drawing = false, color = '#1a1a1a', size = 4;
  let writeX = 30, writeY = 80;
  let isWriting = false;
  let stepNum = 1;

  const schemes = [
    "7th inning skydive","Fake celebrity death","Host a fake funeral","Break into City Hall",
    "Start a cult","Fake a documentary crew","Pretend to be a famous band","Host a fake wedding",
    "Stage a hostage situation (with actors)","Become a street performer","Infiltrate a film festival",
    "Create a fake charity event","Pretend to be lost tourists","Start a food truck",
    "Become a crossing guard","Fake a meteor strike","Host a fake game show",
    "Pretend to be a delivery service","Start a protest","Become a mall Santa",
    "Fake a time machine","Start a pyramid scheme","Pretend to be ghost hunters",
    "Host a fake auction","Become a parking enforcement officer","Fake a UFO landing",
    "Start a fake podcast tour","Pretend to be health inspectors","Host a fake reunion","Become a subway busker"
  ];

  const SF = {
    'A':{w:0.65,s:[[[0.2,0.9],[0.5,0.1],[0.8,0.9]],[[0.35,0.55],[0.65,0.55]]]},
    'B':{w:0.65,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.1],[0.7,0.1],[0.7,0.45],[0.25,0.45]],[[0.25,0.45],[0.7,0.45],[0.7,0.9],[0.25,0.9]]]},
    'C':{w:0.65,s:[[[0.75,0.2],[0.3,0.2],[0.2,0.5],[0.3,0.8],[0.75,0.8]]]},
    'D':{w:0.7,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.1],[0.75,0.2],[0.75,0.8],[0.25,0.9]]]},
    'E':{w:0.6,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.1],[0.75,0.1]],[[0.25,0.5],[0.65,0.5]],[[0.25,0.9],[0.75,0.9]]]},
    'F':{w:0.6,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.1],[0.75,0.1]],[[0.25,0.5],[0.65,0.5]]]},
    'G':{w:0.7,s:[[[0.75,0.2],[0.3,0.2],[0.2,0.5],[0.3,0.8],[0.75,0.8]],[[0.75,0.5],[0.5,0.5],[0.5,0.8]]]},
    'H':{w:0.65,s:[[[0.25,0.1],[0.25,0.9]],[[0.75,0.1],[0.75,0.9]],[[0.25,0.5],[0.75,0.5]]]},
    'I':{w:0.4,s:[[[0.5,0.1],[0.5,0.9]],[[0.35,0.1],[0.65,0.1]],[[0.35,0.9],[0.65,0.9]]]},
    'J':{w:0.55,s:[[[0.75,0.1],[0.75,0.8],[0.5,0.9],[0.3,0.85]]]},
    'K':{w:0.65,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.5],[0.75,0.1]],[[0.25,0.5],[0.75,0.9]]]},
    'L':{w:0.55,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.9],[0.75,0.9]]]},
    'M':{w:0.8,s:[[[0.15,0.9],[0.15,0.1],[0.5,0.5],[0.85,0.1],[0.85,0.9]]]},
    'N':{w:0.65,s:[[[0.25,0.9],[0.25,0.1],[0.75,0.9],[0.75,0.1]]]},
    'O':{w:0.7,s:[[[0.5,0.1],[0.8,0.3],[0.8,0.7],[0.5,0.9],[0.2,0.7],[0.2,0.3],[0.5,0.1]]]},
    'P':{w:0.6,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.1],[0.7,0.1],[0.7,0.45],[0.25,0.45]]]},
    'Q':{w:0.7,s:[[[0.5,0.1],[0.8,0.3],[0.8,0.7],[0.5,0.9],[0.2,0.7],[0.2,0.3],[0.5,0.1]],[[0.6,0.7],[0.8,0.95]]]},
    'R':{w:0.65,s:[[[0.25,0.1],[0.25,0.9]],[[0.25,0.1],[0.7,0.1],[0.7,0.45],[0.25,0.45]],[[0.25,0.45],[0.75,0.9]]]},
    'S':{w:0.6,s:[[[0.75,0.2],[0.35,0.2],[0.3,0.45],[0.7,0.5],[0.65,0.8],[0.25,0.8]]]},
    'T':{w:0.65,s:[[[0.15,0.1],[0.85,0.1]],[[0.5,0.1],[0.5,0.9]]]},
    'U':{w:0.65,s:[[[0.25,0.1],[0.25,0.75],[0.5,0.9],[0.75,0.75],[0.75,0.1]]]},
    'V':{w:0.65,s:[[[0.25,0.1],[0.5,0.9],[0.75,0.1]]]},
    'W':{w:0.85,s:[[[0.15,0.1],[0.3,0.9],[0.5,0.4],[0.7,0.9],[0.85,0.1]]]},
    'X':{w:0.65,s:[[[0.2,0.1],[0.8,0.9]],[[0.8,0.1],[0.2,0.9]]]},
    'Y':{w:0.65,s:[[[0.25,0.1],[0.5,0.5],[0.75,0.1]],[[0.5,0.5],[0.5,0.9]]]},
    'Z':{w:0.65,s:[[[0.2,0.1],[0.8,0.1]],[[0.8,0.1],[0.2,0.9]],[[0.2,0.9],[0.8,0.9]]]},
    'a':{w:0.6,s:[[[0.65,0.55],[0.35,0.55],[0.3,0.7],[0.35,0.85],[0.65,0.85],[0.7,0.7],[0.65,0.55]],[[0.65,0.55],[0.65,0.95]]]},
    'b':{w:0.6,s:[[[0.3,0.2],[0.3,0.95]],[[0.3,0.55],[0.7,0.55],[0.7,0.85],[0.3,0.85]]]},
    'c':{w:0.55,s:[[[0.7,0.4],[0.35,0.4],[0.3,0.65],[0.35,0.85],[0.7,0.85]]]},
    'd':{w:0.6,s:[[[0.7,0.2],[0.7,0.95]],[[0.7,0.55],[0.3,0.55],[0.3,0.85],[0.7,0.85]]]},
    'e':{w:0.6,s:[[[0.7,0.55],[0.3,0.55],[0.25,0.7],[0.35,0.85],[0.7,0.85]],[[0.25,0.7],[0.65,0.7]]]},
    'f':{w:0.5,s:[[[0.5,0.2],[0.5,0.95]],[[0.3,0.45],[0.7,0.45]],[[0.5,0.2],[0.65,0.25],[0.65,0.4]]]},
    'g':{w:0.6,s:[[[0.7,0.55],[0.3,0.55],[0.3,0.85],[0.7,0.85]],[[0.7,0.85],[0.7,1.05],[0.4,1.05]]]},
    'h':{w:0.6,s:[[[0.3,0.2],[0.3,0.95]],[[0.3,0.55],[0.65,0.55],[0.65,0.85]]]},
    'i':{w:0.3,s:[[[0.5,0.5],[0.5,0.9]],[[0.5,0.3],[0.5,0.35]]]},
    'j':{w:0.4,s:[[[0.6,0.5],[0.6,0.95],[0.4,1.05]],[[0.6,0.3],[0.6,0.35]]]},
    'k':{w:0.55,s:[[[0.3,0.2],[0.3,0.95]],[[0.3,0.6],[0.65,0.5]],[[0.3,0.6],[0.65,0.9]]]},
    'l':{w:0.3,s:[[[0.5,0.2],[0.5,0.9]]]},
    'm':{w:0.8,s:[[[0.2,0.5],[0.2,0.85]],[[0.2,0.55],[0.45,0.55],[0.45,0.85]],[[0.45,0.55],[0.7,0.55],[0.7,0.85]]]},
    'n':{w:0.6,s:[[[0.3,0.5],[0.3,0.85]],[[0.3,0.55],[0.65,0.55],[0.65,0.85]]]},
    'o':{w:0.6,s:[[[0.5,0.55],[0.75,0.65],[0.75,0.8],[0.5,0.9],[0.25,0.8],[0.25,0.65],[0.5,0.55]]]},
    'p':{w:0.6,s:[[[0.3,0.5],[0.3,1.05]],[[0.3,0.55],[0.7,0.55],[0.7,0.85],[0.3,0.85]]]},
    'q':{w:0.6,s:[[[0.7,0.5],[0.7,1.05]],[[0.7,0.55],[0.3,0.55],[0.3,0.85],[0.7,0.85]]]},
    'r':{w:0.5,s:[[[0.3,0.5],[0.3,0.85]],[[0.3,0.55],[0.6,0.5]]]},
    's':{w:0.55,s:[[[0.7,0.45],[0.4,0.45],[0.35,0.6],[0.65,0.65],[0.6,0.85],[0.3,0.85]]]},
    't':{w:0.45,s:[[[0.3,0.45],[0.7,0.45]],[[0.5,0.3],[0.5,0.9]]]},
    'u':{w:0.6,s:[[[0.3,0.5],[0.3,0.8],[0.5,0.9],[0.7,0.8],[0.7,0.5]]]},
    'v':{w:0.55,s:[[[0.3,0.5],[0.5,0.9],[0.7,0.5]]]},
    'w':{w:0.75,s:[[[0.2,0.5],[0.35,0.9],[0.5,0.6],[0.65,0.9],[0.8,0.5]]]},
    'x':{w:0.55,s:[[[0.25,0.5],[0.75,0.9]],[[0.75,0.5],[0.25,0.9]]]},
    'y':{w:0.55,s:[[[0.3,0.5],[0.5,0.85],[0.7,0.5]],[[0.5,0.85],[0.4,1.05]]]},
    'z':{w:0.55,s:[[[0.25,0.5],[0.75,0.5]],[[0.75,0.5],[0.25,0.9]],[[0.25,0.9],[0.75,0.9]]]},
    '0':{w:0.6,s:[[[0.5,0.15],[0.75,0.35],[0.75,0.7],[0.5,0.9],[0.25,0.7],[0.25,0.35],[0.5,0.15]]]},
    '1':{w:0.4,s:[[[0.5,0.15],[0.5,0.9]],[[0.35,0.25],[0.5,0.15]],[[0.35,0.9],[0.65,0.9]]]},
    '2':{w:0.6,s:[[[0.25,0.3],[0.5,0.15],[0.75,0.3],[0.75,0.45],[0.3,0.9],[0.75,0.9]]]},
    '3':{w:0.6,s:[[[0.25,0.2],[0.7,0.2],[0.7,0.45],[0.4,0.45]],[[0.4,0.45],[0.7,0.45],[0.7,0.8],[0.25,0.8]]]},
    '4':{w:0.6,s:[[[0.65,0.15],[0.65,0.9]],[[0.25,0.55],[0.75,0.55]],[[0.25,0.55],[0.55,0.15]]]},
    '5':{w:0.6,s:[[[0.25,0.2],[0.7,0.2]],[[0.25,0.2],[0.25,0.5]],[[0.25,0.5],[0.7,0.5],[0.7,0.8],[0.25,0.8]]]},
    '6':{w:0.6,s:[[[0.65,0.2],[0.35,0.2],[0.25,0.5],[0.25,0.75],[0.5,0.9],[0.75,0.75],[0.75,0.55],[0.5,0.45],[0.25,0.55]]]},
    '7':{w:0.55,s:[[[0.2,0.2],[0.8,0.2]],[[0.7,0.2],[0.45,0.9]]]},
    '8':{w:0.6,s:[[[0.5,0.15],[0.75,0.3],[0.75,0.45],[0.5,0.55],[0.25,0.45],[0.25,0.3],[0.5,0.15]],[[0.5,0.55],[0.75,0.65],[0.75,0.8],[0.5,0.9],[0.25,0.8],[0.25,0.65],[0.5,0.55]]]},
    '9':{w:0.6,s:[[[0.5,0.15],[0.75,0.3],[0.75,0.5],[0.5,0.55],[0.25,0.5],[0.25,0.3],[0.5,0.15]],[[0.75,0.3],[0.75,0.9]]]},
    '.':{w:0.3,s:[[[0.5,0.85],[0.5,0.9]]]},
    ',':{w:0.3,s:[[[0.5,0.85],[0.5,0.95],[0.4,1.0]]]},
    '!':{w:0.3,s:[[[0.5,0.2],[0.5,0.75]],[[0.5,0.85],[0.5,0.9]]]},
    '?':{w:0.6,s:[[[0.25,0.25],[0.5,0.15],[0.75,0.3],[0.75,0.45],[0.55,0.55],[0.55,0.7]],[[0.55,0.85],[0.55,0.9]]]},
    ':':{w:0.3,s:[[[0.5,0.55],[0.5,0.6]],[[0.5,0.8],[0.5,0.85]]]},
    ';':{w:0.3,s:[[[0.5,0.55],[0.5,0.6]],[[0.5,0.8],[0.5,0.95],[0.4,1.0]]]},
    '-':{w:0.45,s:[[[0.2,0.65],[0.8,0.65]]]},
    "'":{w:0.25,s:[[[0.5,0.25],[0.5,0.35]]]},
    '"':{w:0.45,s:[[[0.4,0.25],[0.4,0.35]],[[0.6,0.25],[0.6,0.35]]]},
    '(':{w:0.4,s:[[[0.6,0.15],[0.3,0.45],[0.3,0.65],[0.6,0.95]]]},
    ')':{w:0.4,s:[[[0.4,0.15],[0.7,0.45],[0.7,0.65],[0.4,0.95]]]},
    ' ':{w:0.35,s:[]}
  };

  function measureStrokeText(text, letterSize) {
    let w = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const data = SF[ch] || SF[ch.toUpperCase()] || SF[ch.toLowerCase()];
      w += (data ? data.w * letterSize : letterSize * 0.5) + 2;
    }
    return w;
  }

  function drawStrokeChar(ch, cx, cy, letterSize, jitter) {
    const data = SF[ch] || SF[ch.toUpperCase()] || SF[ch.toLowerCase()];
    if (!data) return (letterSize * 0.5) + 2;
    for (const stroke of data.s) {
      ctx.beginPath();
      for (let j = 0; j < stroke.length; j++) {
        const pt = stroke[j];
        const px = cx + pt[0] * letterSize + (Math.random() - 0.5) * jitter;
        const py = cy + pt[1] * letterSize + (Math.random() - 0.5) * jitter;
        if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    return (data.w * letterSize) + 2;
  }

  function drawStrokeTextInstant(text, startX, startY, letterSize, jitter) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.lineWidth = size; ctx.globalAlpha = 0.92;
    let cx = startX, cy = startY;
    for (let i = 0; i < text.length; i++) {
      cx += drawStrokeChar(text[i], cx, cy, letterSize, jitter);
    }
    return cx;
  }

  async function drawStrokeTextAnimated(text, startX, startY, letterSize, jitter, delayMs) {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.lineWidth = size; ctx.globalAlpha = 0.92;
    let cx = startX, cy = startY;
    const marginRight = canvas.width - 30;
    const lineHeight = letterSize * 1.35;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const data = SF[ch] || SF[ch.toUpperCase()] || SF[ch.toLowerCase()];
      const charW = data ? data.w * letterSize : letterSize * 0.5;
      if (cx + charW > marginRight && ch !== ' ') { cx = 30; cy += lineHeight; }
      if (cy > canvas.height - 20) cy = canvas.height - 20;
      if (data) {
        for (const stroke of data.s) {
          ctx.beginPath();
          for (let j = 0; j < stroke.length; j++) {
            const pt = stroke[j];
            const px = cx + pt[0] * letterSize + (Math.random() - 0.5) * jitter;
            const py = cy + pt[1] * letterSize + (Math.random() - 0.5) * jitter;
            if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.stroke();
          await new Promise(r => setTimeout(r, delayMs));
        }
      }
      cx += charW + 2;
    }
    return { x: cx, y: cy };
  }

  function initCanvas() {
    ctx.fillStyle = '#f8f8f8'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const titleSize = 26;
    const titleText = 'The Plan:';
    const titleW = measureStrokeText(titleText, titleSize);
    const titleX = (canvas.width - titleW) / 2;
    drawStrokeTextInstant(titleText, titleX, 36, titleSize, 1.2);
    writeX = 30; writeY = 80; stepNum = 1;
  }
  initCanvas();

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - rect.left) * (canvas.width / rect.width), y: (cy - rect.top) * (canvas.height / rect.height) };
  }
  function startDraw(e) { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.lineWidth = size; ctx.globalAlpha = 0.95; }
  function draw(e) { if (!drawing) return; e.preventDefault(); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); }
  function endDraw() { drawing = false; ctx.closePath(); }
  canvas.addEventListener('mousedown', startDraw); canvas.addEventListener('mousemove', draw); canvas.addEventListener('mouseup', endDraw); canvas.addEventListener('mouseleave', endDraw);
  canvas.addEventListener('touchstart', startDraw, {passive: false}); canvas.addEventListener('touchmove', draw, {passive: false}); canvas.addEventListener('touchend', endDraw);

  document.querySelectorAll('.wb-color-btn').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('.wb-color-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); color = btn.dataset.color; });
  });
  const sizeInput = document.getElementById('brushSize');
  const sizeDot = document.getElementById('sizeDot');
  sizeInput.addEventListener('input', (e) => { size = parseInt(e.target.value, 10); sizeDot.style.width = size + 'px'; sizeDot.style.height = size + 'px'; });

  document.getElementById('clearBtn').addEventListener('click', () => { if (confirm('Erase the whole board?')) initCanvas(); });
  document.getElementById('downloadBtn').addEventListener('click', () => { const a = document.createElement('a'); a.download = 'the-plan-rivoli.png'; a.href = canvas.toDataURL('image/png'); a.click(); });
  document.getElementById('newSchemeBtn').addEventListener('click', () => { document.getElementById('schemeText').textContent = schemes[Math.floor(Math.random() * schemes.length)]; initCanvas(); });

  async function writeStep(text) {
    if (isWriting) return; isWriting = true;
    const writeBtn = document.getElementById('writeBtn');
    writeBtn.style.opacity = '0.5'; writeBtn.style.pointerEvents = 'none'; writeBtn.textContent = 'Writing...';
    const letterSize = 20;
    const lineHeight = letterSize * 1.35;
    const prefix = stepNum + '.) ';
    const fullText = prefix + text;

    const result = await drawStrokeTextAnimated(fullText, 30, writeY, letterSize, 1.3, 10);

    writeX = 30;
    writeY = result.y + lineHeight;
    if (writeY > canvas.height - 30) writeY = canvas.height - 30;
    stepNum++;

    isWriting = false;
    writeBtn.style.opacity = '1'; writeBtn.style.pointerEvents = ''; writeBtn.textContent = 'Write';
  }

  document.getElementById('writeBtn').addEventListener('click', () => {
    const input = document.getElementById('typeInput');
    const text = input.value.trim();
    if (!text) return;
    writeStep(text);
    input.value = '';
  });
  document.getElementById('typeInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('writeBtn').click(); });
})();