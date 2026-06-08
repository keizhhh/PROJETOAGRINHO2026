function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// ARQUIVO: sketch.js
// Quiz interativo sobre Força e Sustentabilidade no Agronegócio
// Cole este código no editor p5.js e rode!

let questions = [
  {
    question: "Qual prática agrícola ajuda a manter a fertilidade do solo e reduz a necessidade de fertilizantes químicos?",
    options: [
      "Monocultura intensiva",
      "Rotação de culturas",
      "Queimada controlada",
      "Desmatamento"
    ],
    answer: 1, // índice da resposta correta (B)
    explanation: "A rotação de culturas alterna espécies na mesma área, melhorando a estrutura do solo e reciclando nutrientes naturalmente."
  },
  {
    question: "O que é 'agricultura de precisão'?",
    options: [
      "Uso de tratores maiores para plantar mais rápido",
      "Aplicação de insumos (água, fertilizantes, defensivos) apenas onde e quando necessário",
      "Plantio manual sem máquinas",
      "Exportação de grãos para países desenvolvidos"
    ],
    answer: 1,
    explanation: "A agricultura de precisão usa sensores, GPS e dados para aplicar insumos de forma otimizada, reduzindo desperdício e impacto ambiental."
  },
  {
    question: "Qual dessas fontes de energia é mais sustentável para uso em fazendas?",
    options: [
      "Diesel",
      "Gasolina",
      "Energia solar",
      "Carvão mineral"
    ],
    answer: 2,
    explanation: "A energia solar é renovável, não emite poluentes durante a operação e pode ser instalada em telhados ou áreas ociosas da fazenda."
  },
  {
    question: "O que significa 'intensificação sustentável' no agro?",
    options: [
      "Produzir mais na mesma área sem aumentar o impacto ambiental",
      "Desmatar novas áreas para expandir a produção",
      "Usar o máximo de fertilizantes possíveis",
      "Exportar toda a produção sem processamento"
    ],
    answer: 0,
    explanation: "Intensificação sustentável busca aumentar a produtividade por hectare preservando recursos naturais e biodiversidade."
  },
  {
    question: "Qual equipamento ajuda a reduzir o consumo de água na irrigação?",
    options: [
      "Aspersor convencional",
      "Sistema de irrigação por gotejamento",
      "Mangueira aberta",
      "Pivô central sem controle"
    ],
    answer: 1,
    explanation: "O gotejamento entrega água gota a gota na raiz da planta, reduzindo perdas por evaporação e desperdício."
  },
  {
    question: "O que é ILPF (Integração Lavoura-Pecuária-Floresta)?",
    options: [
      "Sistema que separa completamente agricultura, pecuária e floresta",
      "Combinação de árvores, pastagens e culturas na mesma área ao longo do tempo",
      "Uso exclusivo de agrotóxicos na produção",
      "Exportação de carne bovina"
    ],
    answer: 1,
    explanation: "A ILPF integra diferentes atividades no mesmo espaço, melhorando o solo, sequestrando carbono e diversificando a renda do produtor."
  },
  {
    question: "Qual é o principal gás de efeito estufa emitido pela pecuária bovina?",
    options: [
      "Oxigênio",
      "Metano",
      "Nitrogênio",
      "Vapor d'água"
    ],
    answer: 1,
    explanation: "O metano (CH₄) é produzido pela digestão dos ruminantes (eructação) e tem potencial de aquecimento ~28x maior que o CO₂."
  }
];

let currentQ = 0;
let score = 0;
let answered = false;
let showExplanation = false;
let buttonRects = [];
let confetti = [];
let quizCompleted = false;

function setup() {
  createCanvas(800, 500);
  textFont('Arial', 18);

}

function draw() {
  background(230, 245, 235);
  
  // Título
  fill(30, 70, 30);
  textSize(28);
  textAlign(CENTER);
  text('🌾 Quiz: Força e Sustentabilidade no Agro', width/2, 50);
  
  if (quizCompleted) {
    drawCompletionScreen();
    return;
  }
  
  let q = questions[currentQ];
  
  // Barra de progresso
  drawProgress();
  
  // Pergunta
  fill(20, 50, 20);
  textSize(20);
  textAlign(LEFT);
  textWrap(WORD);
  text(q.question, 60, 100, width-120, 120);
  
  // Opções
  buttonRects = [];
  for (let i = 0; i < q.options.length; i++) {
    let x = 100;
    let y = 240 + i*70;
    let w = width - 200;
    let h = 55;
    
    // Botão com hover/selected
    if (answered && i === q.answer) {
      fill(70, 200, 90); // verde — resposta correta
    } else if (answered && i === selectedOption && i !== q.answer) {
      fill(220, 70, 60); // vermelho — resposta errada do usuário
    } else if (!answered && mouseOverRect(x, y, w, h)) {
      fill(100, 180, 100); // verde claro hover
    } else {
      fill(245, 245, 250); // cinza claro
    }
    
    stroke(80, 120, 80);
    strokeWeight(2);
    rect(x, y, w, h, 15);
    
    // Letra da alternativa
    textSize(18);
    fill(30, 70, 30);
    text(String.fromCharCode(65 + i) + ') ', x + 15, y + 35);
    
    // Texto da opção
    textSize(18);
    fill(30, 50, 30);
    text(q.options[i], x + 50, y + 35);
    
    buttonRects.push({x, y, w, h, index: i});
  }
  
  // Explicação (se já respondeu)
  if (showExplanation) {
    fill(60, 110, 140);
    stroke(60, 110, 140);
    rect(60, 400, width-120, 60, 10);
    
    fill(245, 245, 250);
    textSize(16);
    textAlign(LEFT);
    text('💡 ' + q.explanation, 80, 425, width-160, 40);
    
    // Próximo botão
    drawNextButton();
  }
  
  // Confetti animado (quando acerta)
  for (let p of confetti) {
    fill(p.c);
    noStroke();
    ellipse(p.x, p.y, p.r, p.r);
    p.y -= p.vy;
    p.x += p.vx;
    p.r *= 0.98;
  }
  // Remove confetti pequeno demais
  confetti = confetti.filter(p => p.r > 1);
}

function drawProgress() {
  // Barra de progresso
  let progress = (currentQ) / questions.length;
  noStroke();
  fill(200, 220, 200);
  rect(60, 65, width-120, 10, 5);
  fill(70, 180, 90);
  rect(60, 65, (width-120)*progress, 10, 5);
  
  // Texto de progresso
  fill(60, 90, 60);
  textSize(14);
  textAlign(LEFT);
  text(`Pergunta ${currentQ+1} de ${questions.length}`, 60, 85);
  text(`Acertos: ${score} de ${currentQ}`, width-180, 85);
}

function drawNextButton() {
  let x = width - 180;
  let y = 470;
  let w = 140;
  let h = 35;
  
  if (mouseOverRect(x, y, w, h)) {
    fill(255, 180, 60);
  } else {
    fill(255, 130, 40);
  }
  stroke(180, 90, 20);
  strokeWeight(2);
  rect(x, y, w, h, 10);
  
  fill(30, 70, 30);
  textSize(18);function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// ARQUIVO: sketch.js
// Quiz interativo sobre Força e Sustentabilidade no Agronegócio
// Cole este código no editor p5.js e rode!

let questions = [
  {
    question: "Qual prática agrícola ajuda a manter a fertilidade do solo e reduz a necessidade de fertilizantes químicos?",
    options: [
      "Monocultura intensiva",
      "Rotação de culturas",
      "Queimada controlada",
      "Desmatamento"
    ],
    answer: 1, // índice da resposta correta (B)
    explanation: "A rotação de culturas alterna espécies na mesma área, melhorando a estrutura do solo e reciclando nutrientes naturalmente."
  },
  {
    question: "O que é 'agricultura de precisão'?",
    options: [
      "Uso de tratores maiores para plantar mais rápido",
      "Aplicação de insumos (água, fertilizantes, defensivos) apenas onde e quando necessário",
      "Plantio manual sem máquinas",
      "Exportação de grãos para países desenvolvidos"
    ],
    answer: 1,
    explanation: "A agricultura de precisão usa sensores, GPS e dados para aplicar insumos de forma otimizada, reduzindo desperdício e impacto ambiental."
  },
  {
    question: "Qual dessas fontes de energia é mais sustentável para uso em fazendas?",
    options: [
      "Diesel",
      "Gasolina",
      "Energia solar",
      "Carvão mineral"
    ],
    answer: 2,
    explanation: "A energia solar é renovável, não emite poluentes durante a operação e pode ser instalada em telhados ou áreas ociosas da fazenda."
  },
  {
    question: "O que significa 'intensificação sustentável' no agro?",
    options: [
      "Produzir mais na mesma área sem aumentar o impacto ambiental",
      "Desmatar novas áreas para expandir a produção",
      "Usar o máximo de fertilizantes possíveis",
      "Exportar toda a produção sem processamento"
    ],
    answer: 0,
    explanation: "Intensificação sustentável busca aumentar a produtividade por hectare preservando recursos naturais e biodiversidade."
  },
  {
    question: "Qual equipamento ajuda a reduzir o consumo de água na irrigação?",
    options: [
      "Aspersor convencional",
      "Sistema de irrigação por gotejamento",
      "Mangueira aberta",
      "Pivô central sem controle"
    ],
    answer: 1,
    explanation: "O gotejamento entrega água gota a gota na raiz da planta, reduzindo perdas por evaporação e desperdício."
  },
  {
    question: "O que é ILPF (Integração Lavoura-Pecuária-Floresta)?",
    options: [
      "Sistema que separa completamente agricultura, pecuária e floresta",
      "Combinação de árvores, pastagens e culturas na mesma área ao longo do tempo",
      "Uso exclusivo de agrotóxicos na produção",
      "Exportação de carne bovina"
    ],
    answer: 1,
    explanation: "A ILPF integra diferentes atividades no mesmo espaço, melhorando o solo, sequestrando carbono e diversificando a renda do produtor."
  },
  {
    question: "Qual é o principal gás de efeito estufa emitido pela pecuária bovina?",
    options: [
      "Oxigênio",
      "Metano",
      "Nitrogênio",
      "Vapor d'água"
    ],
    answer: 1,
    explanation: "O metano (CH₄) é produzido pela digestão dos ruminantes (eructação) e tem potencial de aquecimento ~28x maior que o CO₂."
  }
];

let currentQ = 0;
let score = 0;
let answered = false;
let showExplanation = false;
let buttonRects = [];
let confetti = [];
let quizCompleted = false;

function setup() {
  createCanvas(800, 500);
  textFont('Arial', 18);

}

function draw() {
  background(230, 245, 235);
  
  // Título
  fill(30, 70, 30);
  textSize(28);
  textAlign(CENTER);
  text('🌾 Quiz: Força e Sustentabilidade no Agro', width/2, 50);
  
  if (quizCompleted) {
    drawCompletionScreen();
    return;
  }
  
  let q = questions[currentQ];
  
  // Barra de progresso
  drawProgress();
  
  // Pergunta
  fill(20, 50, 20);
  textSize(20);
  textAlign(LEFT);
  textWrap(WORD);
  text(q.question, 60, 100, width-120, 120);
  
  // Opções
  buttonRects = [];
  for (let i = 0; i < q.options.length; i++) {
    let x = 100;
    let y = 240 + i*70;
    let w = width - 200;
    let h = 55;
    
    // Botão com hover/selected
    if (answered && i === q.answer) {
      fill(70, 200, 90); // verde — resposta correta
    } else if (answered && i === selectedOption && i !== q.answer) {
      fill(220, 70, 60); // vermelho — resposta errada do usuário
    } else if (!answered && mouseOverRect(x, y, w, h)) {
      fill(100, 180, 100); // verde claro hover
    } else {
      fill(245, 245, 250); // cinza claro
    }
    
    stroke(80, 120, 80);
    strokeWeight(2);
    rect(x, y, w, h, 15);
    
    // Letra da alternativa
    textSize(18);
    fill(30, 70, 30);
    text(String.fromCharCode(65 + i) + ') ', x + 15, y + 35);
    
    // Texto da opção
    textSize(18);
    fill(30, 50, 30);
    text(q.options[i], x + 50, y + 35);
    
    buttonRects.push({x, y, w, h, index: i});
  }
  
  // Explicação (se já respondeu)
  if (showExplanation) {
    fill(60, 110, 140);
    stroke(60, 110, 140);
    rect(60, 400, width-120, 60, 10);
    
    fill(245, 245, 250);
    textSize(16);
    textAlign(LEFT);
    text('💡 ' + q.explanation, 80, 425, width-160, 40);
    
    // Próximo botão
    drawNextButton();
  }
  
  // Confetti animado (quando acerta)
  for (let p of confetti) {
    fill(p.c);
    noStroke();
    ellipse(p.x, p.y, p.r, p.r);
    p.y -= p.vy;
    p.x += p.vx;
    p.r *= 0.98;
  }
  // Remove confetti pequeno demais
  confetti = confetti.filter(p => p.r > 1);
}

function drawProgress() {
  // Barra de progresso
  let progress = (currentQ) / questions.length;
  noStroke();
  fill(200, 220, 200);
  rect(60, 65, width-120, 10, 5);
  fill(70, 180, 90);
  rect(60, 65, (width-120)*progress, 10, 5);
  
  // Texto de progresso
  fill(60, 90, 60);
  textSize(14);
  textAlign(LEFT);
  text(`Pergunta ${currentQ+1} de ${questions.length}`, 60, 85);
  text(`Acertos: ${score} de ${currentQ}`, width-180, 85);
}

function drawNextButton() {
  let x = width - 180;
  let y = 470;
  let w = 140;
  let h = 35;
  
  if (mouseOverRect(x, y, w, h)) {
    fill(255, 180, 60);
  } else {
    fill(255, 130, 40);
  }
  stroke(180, 90, 20);
  strokeWeight(2);
  rect(x, y, w, h, 10);
  
  fill(30, 70, 30);
  textSize(18);
  textAlign(CENTER);
  text('Próxima →', x + w/2, y + 23);
}

let selectedOption = -1;

function mousePressed() {
  if (quizCompleted) {
    // Reiniciar quiz se clicar no botão
    if (mouseOverRect(width/2 - 100, 350, 200, 50)) {
      resetQuiz();
    }
    return;
  }
  
  if (!answered) {
    // Verificar clique nas opções
    for (let btn of buttonRects) {
      if (mouseOverRect(btn.x, btn.y, btn.w, btn.h)) {
        selectedOption = btn.index;
        answered = true;
        showExplanation = true;
        
        let q = questions[currentQ];
        if (selectedOption === q.answer) {
          score++;
          spawnConfetti();
        }
        break;
      }
    }
  } else if (showExplanation) {
    // Clicar no botão "Próxima"
    let nx = width - 180;
    let ny = 470;
    let nw = 140;
    let nh = 35;
    if (mouseOverRect(nx, ny, nw, nh)) {
      currentQ++;
      answered = false;
      showExplanation = false;
      selectedOption = -1;
      
      if (currentQ >= questions.length) {
        quizCompleted = true;
      }
    }
  }
}

function mouseOverRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function spawnConfetti() {
  // Confetti colorido só se acertou
  for (let i = 0; i < 25; i++) {
    let c = [
      color(255, 200, 60), // amarelo
      color(70, 200, 90),  // verde
      color(60, 140, 255),  // azul
      color(255, 90, 130)   // rosa
    ][floor(random(4))];
    confetti.push({
      x: random(150, width-150),
      y: random(180, 320),
      r: random(8, 16),
      vx: random(-2, 2),
      vy: random(3, 6),
      c
    });
  }
}

function drawCompletionScreen() {
  background(30, 70, 30);
  
  fill(255, 245, 180);
  textSize(36);
  textAlign(CENTER);
  text('🎉 Quiz Concluído!', width/2, 80);
  
  // Resultado
  let percent = floor((score / questions.length) * 100);
  textSize(26);
  fill(255, 220, 80);
  text(`Você acertou ${score} de ${questions.length} perguntas`, width/2, 140);
  
  // Mensagem personalizada
  textSize(22);
  fill(180, 240, 190);
  let msg = '';
  if (percent >= 85) {
    msg = 'Excelente! Você domina os conceitos de sustentabilidade no agro.';
  } else if (percent >= 65) {
    msg = 'Bom desempenho! Conhece bem as práticas sustentáveis, mas sempre há mais a aprender.';
  } else if (percent >= 45) {
    msg = 'Razoável — vale a pena explorar mais sobre agricultura sustentável.';
  } else {
    msg = 'Que tal revisar os conceitos? A sustentabilidade é o futuro do agronegócio!';
  }
  text(msg, width/2, 200);
  
  // Botão reiniciar
  let x = width/2 - 100;
  let y = 350;
  let w = 200;
  let h = 50;
  
  if (mouseOverRect(x, y, w, h)) {
    fill(255, 180, 60);
  } else {
    fill(255, 130, 40);
  }
  stroke(180, 90, 20);
  strokeWeight(2);
  rect(x, y, w, h, 15);
  
  fill(30, 70, 30);
  textSize(22);
  textAlign(CENTER);
  text('Reiniciar Quiz', x + w/2, y + 28);
  
  // Dica final
  fill(200, 230, 200);
  textSize(16);
  text('💡 Sustentabilidade no agro = produtividade + preservação ambiental + prosperidade social', width/2, 450);
}

function resetQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  showExplanation = false;
  selectedOption = -1;
  confetti = [];
  quizCompleted = false;
}

  textAlign(CENTER);
  text('Próxima →', x + w/2, y + 23);
}

let selectedOption = -1;

function mousePressed() {
  if (quizCompleted) {
    // Reiniciar quiz se clicar no botão
    if (mouseOverRect(width/2 - 100, 350, 200, 50)) {
      resetQuiz();
    }
    return;
  }
  
  if (!answered) {
    // Verificar clique nas opções
    for (let btn of buttonRects) {
      if (mouseOverRect(btn.x, btn.y, btn.w, btn.h)) {
        selectedOption = btn.index;
        answered = true;
        showExplanation = true;
        
        let q = questions[currentQ];
        if (selectedOption === q.answer) {
          score++;
          spawnConfetti();
        }
        break;
      }
    }
  } else if (showExplanation) {
    // Clicar no botão "Próxima"
    let nx = width - 180;
    let ny = 470;
    let nw = 140;
    let nh = 35;
    if (mouseOverRect(nx, ny, nw, nh)) {
      currentQ++;
      answered = false;
      showExplanation = false;
      selectedOption = -1;
      
      if (currentQ >= questions.length) {
        quizCompleted = true;
      }
    }
  }
}

function mouseOverRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function spawnConfetti() {
  // Confetti colorido só se acertou
  for (let i = 0; i < 25; i++) {
    let c = [
      color(255, 200, 60), // amarelo
      color(70, 200, 90),  // verde
      color(60, 140, 255),  // azul
      color(255, 90, 130)   // rosa
    ][floor(random(4))];
    confetti.push({
      x: random(150, width-150),
      y: random(180, 320),
      r: random(8, 16),
      vx: random(-2, 2),
      vy: random(3, 6),
      c
    });
  }
}

function drawCompletionScreen() {
  background(30, 70, 30);
  
  fill(255, 245, 180);
  textSize(36);
  textAlign(CENTER);
  text('🎉 Quiz Concluído!', width/2, 80);
  
  // Resultado
  let percent = floor((score / questions.length) * 100);
  textSize(26);
  fill(255, 220, 80);
  text(`Você acertou ${score} de ${questions.length} perguntas`, width/2, 140);
  
  // Mensagem personalizada
  textSize(22);
  fill(180, 240, 190);
  let msg = '';
  if (percent >= 85) {
    msg = 'Excelente! Você domina os conceitos de sustentabilidade no agro.';
  } else if (percent >= 65) {
    msg = 'Bom desempenho! Conhece bem as práticas sustentáveis, mas sempre há mais a aprender.';
  } else if (percent >= 45) {
    msg = 'Razoável — vale a pena explorar mais sobre agricultura sustentável.';
  } else {
    msg = 'Que tal revisar os conceitos? A sustentabilidade é o futuro do agronegócio!';
  }
  text(msg, width/2, 200);
  
  // Botão reiniciar
  let x = width/2 - 100;
  let y = 350;
  let w = 200;
  let h = 50;
  
  if (mouseOverRect(x, y, w, h)) {
    fill(255, 180, 60);
  } else {
    fill(255, 130, 40);
  }
  stroke(180, 90, 20);
  strokeWeight(2);
  rect(x, y, w, h, 15);
  
  fill(30, 70, 30);
  textSize(22);
  textAlign(CENTER);
  text('Reiniciar Quiz', x + w/2, y + 28);
  
  // Dica final
  fill(200, 230, 200);
  textSize(16);
  text('💡 Sustentabilidade no agro = produtividade + preservação ambiental + prosperidade social', width/2, 450);function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// ARQUIVO: sketch.js
// Quiz interativo sobre Força e Sustentabilidade no Agronegócio
// Cole este código no editor p5.js e rode!

let questions = [
  {
    question: "Qual prática agrícola ajuda a manter a fertilidade do solo e reduz a necessidade de fertilizantes químicos?",
    options: [
      "Monocultura intensiva",
      "Rotação de culturas",
      "Queimada controlada",
      "Desmatamento"
    ],
    answer: 1, // índice da resposta correta (B)
    explanation: "A rotação de culturas alterna espécies na mesma área, melhorando a estrutura do solo e reciclando nutrientes naturalmente."
  },
  {
    question: "O que é 'agricultura de precisão'?",
    options: [
      "Uso de tratores maiores para plantar mais rápido",
      "Aplicação de insumos (água, fertilizantes, defensivos) apenas onde e quando necessário",
      "Plantio manual sem máquinas",
      "Exportação de grãos para países desenvolvidos"
    ],
    answer: 1,
    explanation: "A agricultura de precisão usa sensores, GPS e dados para aplicar insumos de forma otimizada, reduzindo desperdício e impacto ambiental."
  },
  {
    question: "Qual dessas fontes de energia é mais sustentável para uso em fazendas?",
    options: [
      "Diesel",
      "Gasolina",
      "Energia solar",
      "Carvão mineral"
    ],
    answer: 2,
    explanation: "A energia solar é renovável, não emite poluentes durante a operação e pode ser instalada em telhados ou áreas ociosas da fazenda."
  },
  {
    question: "O que significa 'intensificação sustentável' no agro?",
    options: [
      "Produzir mais na mesma área sem aumentar o impacto ambiental",
      "Desmatar novas áreas para expandir a produção",
      "Usar o máximo de fertilizantes possíveis",
      "Exportar toda a produção sem processamento"
    ],
    answer: 0,
    explanation: "Intensificação sustentável busca aumentar a produtividade por hectare preservando recursos naturais e biodiversidade."
  },
  {
    question: "Qual equipamento ajuda a reduzir o consumo de água na irrigação?",
    options: [
      "Aspersor convencional",
      "Sistema de irrigação por gotejamento",
      "Mangueira aberta",
      "Pivô central sem controle"
    ],
    answer: 1,
    explanation: "O gotejamento entrega água gota a gota na raiz da planta, reduzindo perdas por evaporação e desperdício."
  },
  {
    question: "O que é ILPF (Integração Lavoura-Pecuária-Floresta)?",
    options: [
      "Sistema que separa completamente agricultura, pecuária e floresta",
      "Combinação de árvores, pastagens e culturas na mesma área ao longo do tempo",
      "Uso exclusivo de agrotóxicos na produção",
      "Exportação de carne bovina"
    ],
    answer: 1,
    explanation: "A ILPF integra diferentes atividades no mesmo espaço, melhorando o solo, sequestrando carbono e diversificando a renda do produtor."
  },
  {
    question: "Qual é o principal gás de efeito estufa emitido pela pecuária bovina?",
    options: [
      "Oxigênio",
      "Metano",
      "Nitrogênio",
      "Vapor d'água"
    ],
    answer: 1,
    explanation: "O metano (CH₄) é produzido pela digestão dos ruminantes (eructação) e tem potencial de aquecimento ~28x maior que o CO₂."
  }
];

let currentQ = 0;
let score = 0;
let answered = false;
let showExplanation = false;
let buttonRects = [];
let confetti = [];
let quizCompleted = false;

function setup() {
  createCanvas(800, 500);
  textFont('Arial', 18);

}

function draw() {
  background(230, 245, 235);
  
  // Título
  fill(30, 70, 30);
  textSize(28);
  textAlign(CENTER);
  text('🌾 Quiz: Força e Sustentabilidade no Agro', width/2, 50);
  
  if (quizCompleted) {
    drawCompletionScreen();
    return;
  }
  
  let q = questions[currentQ];
  
  // Barra de progresso
  drawProgress();
  
  // Pergunta
  fill(20, 50, 20);
  textSize(20);
  textAlign(LEFT);
  textWrap(WORD);
  text(q.question, 60, 100, width-120, 120);
  
  // Opções
  buttonRects = [];
  for (let i = 0; i < q.options.length; i++) {
    let x = 100;
    let y = 240 + i*70;
    let w = width - 200;
    let h = 55;
    
    // Botão com hover/selected
    if (answered && i === q.answer) {
      fill(70, 200, 90); // verde — resposta correta
    } else if (answered && i === selectedOption && i !== q.answer) {
      fill(220, 70, 60); // vermelho — resposta errada do usuário
    } else if (!answered && mouseOverRect(x, y, w, h)) {
      fill(100, 180, 100); // verde claro hover
    } else {
      fill(245, 245, 250); // cinza claro
    }
    
    stroke(80, 120, 80);
    strokeWeight(2);
    rect(x, y, w, h, 15);
    
    // Letra da alternativa
    textSize(18);
    fill(30, 70, 30);
    text(String.fromCharCode(65 + i) + ') ', x + 15, y + 35);
    
    // Texto da opção
    textSize(18);
    fill(30, 50, 30);
    text(q.options[i], x + 50, y + 35);
    
    buttonRects.push({x, y, w, h, index: i});
  }
  
  // Explicação (se já respondeu)
  if (showExplanation) {
    fill(60, 110, 140);
    stroke(60, 110, 140);
    rect(60, 400, width-120, 60, 10);
    
    fill(245, 245, 250);
    textSize(16);
    textAlign(LEFT);
    text('💡 ' + q.explanation, 80, 425, width-160, 40);
    
    // Próximo botão
    drawNextButton();
  }
  
  // Confetti animado (quando acerta)
  for (let p of confetti) {
    fill(p.c);
    noStroke();
    ellipse(p.x, p.y, p.r, p.r);
    p.y -= p.vy;
    p.x += p.vx;
    p.r *= 0.98;
  }
  // Remove confetti pequeno demais
  confetti = confetti.filter(p => p.r > 1);
}

function drawProgress() {
  // Barra de progresso
  let progress = (currentQ) / questions.length;
  noStroke();
  fill(200, 220, 200);
  rect(60, 65, width-120, 10, 5);
  fill(70, 180, 90);
  rect(60, 65, (width-120)*progress, 10, 5);
  
  // Texto de progresso
  fill(60, 90, 60);
  textSize(14);
  textAlign(LEFT);
  text(`Pergunta ${currentQ+1} de ${questions.length}`, 60, 85);
  text(`Acertos: ${score} de ${currentQ}`, width-180, 85);
}

function drawNextButton() {
  let x = width - 180;
  let y = 470;
  let w = 140;
  let h = 35;
  
  if (mouseOverRect(x, y, w, h)) {
    fill(255, 180, 60);
  } else {
    fill(255, 130, 40);
  }
  stroke(180, 90, 20);
  strokeWeight(2);
  rect(x, y, w, h, 10);
  
  fill(30, 70, 30);
  textSize(18);
  textAlign(CENTER);
  text('Próxima →', x + w/2, y + 23);
}

let selectedOption = -1;

function mousePressed() {
  if (quizCompleted) {
    // Reiniciar quiz se clicar no botão
    if (mouseOverRect(width/2 - 100, 350, 200, 50)) {
      resetQuiz();
    }
    return;
  }
  
  if (!answered) {
    // Verificar clique nas opções
    for (let btn of buttonRects) {
      if (mouseOverRect(btn.x, btn.y, btn.w, btn.h)) {
        selectedOption = btn.index;
        answered = true;
        showExplanation = true;
        
        let q = questions[currentQ];
        if (selectedOption === q.answer) {
          score++;
          spawnConfetti();
        }
        break;
      }
    }
  } else if (showExplanation) {
    // Clicar no botão "Próxima"
    let nx = width - 180;
    let ny = 470;
    let nw = 140;
    let nh = 35;
    if (mouseOverRect(nx, ny, nw, nh)) {
      currentQ++;
      answered = false;
      showExplanation = false;
      selectedOption = -1;
      
      if (currentQ >= questions.length) {
        quizCompleted = true;
      }
    }
  }
}

function mouseOverRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function spawnConfetti() {
  // Confetti colorido só se acertou
  for (let i = 0; i < 25; i++) {
    let c = [
      color(255, 200, 60), // amarelo
      color(70, 200, 90),  // verde
      color(60, 140, 255),  // azul
      color(255, 90, 130)   // rosa
    ][floor(random(4))];
    confetti.push({
      x: random(150, width-150),
      y: random(180, 320),
      r: random(8, 16),
      vx: random(-2, 2),
      vy: random(3, 6),
      c
    });
  }
}

function drawCompletionScreen() {
  background(30, 70, 30);
  
  fill(255, 245, 180);
  textSize(36);
  textAlign(CENTER);
  text('🎉 Quiz Concluído!', width/2, 80);
  
  // Resultado
  let percent = floor((score / questions.length) * 100);
  textSize(26);
  fill(255, 220, 80);
  text(`Você acertou ${score} de ${questions.length} perguntas`, width/2, 140);
  
  // Mensagem personalizada
  textSize(22);
  fill(180, 240, 190);
  let msg = '';
  if (percent >= 85) {
    msg = 'Excelente! Você domina os conceitos de sustentabilidade no agro.';
  } else if (percent >= 65) {
    msg = 'Bom desempenho! Conhece bem as práticas sustentáveis, mas sempre há mais a aprender.';
  } else if (percent >= 45) {
    msg = 'Razoável — vale a pena explorar mais sobre agricultura sustentável.';
  } else {
    msg = 'Que tal revisar os conceitos? A sustentabilidade é o futuro do agronegócio!';
  }
  text(msg, width/2, 200);
  
  // Botão reiniciar
  let x = width/2 - 100;
  let y = 350;
  let w = 200;
  let h = 50;
  
  if (mouseOverRect(x, y, w, h)) {
    fill(255, 180, 60);
  } else {
    fill(255, 130, 40);
  }
  stroke(180, 90, 20);
  strokeWeight(2);
  rect(x, y, w, h, 15);
  
  fill(30, 70, 30);
  textSize(22);
  textAlign(CENTER);
  text('Reiniciar Quiz', x + w/2, y + 28);
  
  // Dica final
  fill(200, 230, 200);
  textSize(16);
  text('💡 Sustentabilidade no agro = produtividade + preservação ambiental + prosperidade social', width/2, 450);
}

function resetQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  showExplanation = false;
  selectedOption = -1;
  confetti = [];
  quizCompleted = false;
}

}

function resetQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  showExplanation = false;
  selectedOption = -1;
  confetti = [];
  quizCompleted = false;
}
