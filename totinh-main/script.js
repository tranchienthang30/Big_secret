document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startBtn');
  const intro = document.getElementById('intro');
  const mainContent = document.getElementById('mainContent');
  const lineElement = document.getElementById('line');
  const finalBlock = document.getElementById('final');
  const msgYes = document.getElementById('msgYes');
  const bgMusic = document.getElementById('bgMusic');
  const btnNo = document.getElementById('btnNo');

  const lines = [
  "Ngay từ khoảnh khắc đầu tiên gặp em, anh đã cảm nhận được điều gì đó rất đặc biệt.",
  "Một cảm giác tưởng chừng đã ngủ yên, bỗng dưng thức dậy trong tim anh.",
  "Từ đó, từng tin nhắn, từng nụ cười của em... đều khiến trái tim anh rung động.",
  "Anh bắt đầu thấy nhớ, thấy thương, và mong được ở cạnh em mỗi ngày.",
  "Anh đã suy nghĩ rất nhiều... liệu có nên giữ mãi trong lòng không.",
  "Nhưng nếu không nói ra, anh sợ sẽ đánh mất một điều quý giá nhất trong đời.",
  "Vì vậy hôm nay, anh gom hết can đảm để thổ lộ một điều...",
  "Anh yêu em Trang à"
];


  let currentLine = 0;
  let heartInterval;

  startButton.addEventListener('click', () => {
    intro.classList.remove('active');
    mainContent.classList.add('active');
    playBackgroundMusic();
    showLine(lines[currentLine]);
    heartInterval = setInterval(createHeart, 300);
  });

  function playBackgroundMusic() {
    bgMusic.play().catch((error) => {
      console.error('Lỗi phát nhạc:', error);
    });
  }

  function showLine(text) {
    lineElement.innerHTML = '';
    let charIndex = 0;
    const p = document.createElement('p');
    p.style.margin = '12px 0';
    lineElement.appendChild(p);

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        p.innerHTML += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => fadeOutCurrentLine(() => {
          currentLine++;
          if (currentLine < lines.length) {
            showLine(lines[currentLine]);
          } else {
            lineElement.style.display = 'none';
            finalBlock.classList.add('active');
          }
        }), 850);
      }
    }, 70);
  }

  function fadeOutCurrentLine(callback) {
    lineElement.classList.add('fade-out');
    setTimeout(() => {
      lineElement.classList.remove('fade-out');
      lineElement.innerHTML = '';
      callback();
    }, 1000);
  }

  document.getElementById('btnYes').addEventListener('click', () => {
    finalBlock.classList.remove('active');
    msgYes.classList.add('active');
    bgMusic.pause();
    bgMusic.currentTime = 0;
    clearInterval(heartInterval);
  });

  // GIỮ NGUYÊN LOGIC NÚT "KHÔNG"
  btnNo.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${Math.random() * maxX}px`;
    btnNo.style.top = `${Math.random() * maxY}px`;
  });

  btnNo.addEventListener('click', () => {
    alert('Thôi mà, bấm lại nút "Đồng ý" nhaaa~');
  });

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
});
