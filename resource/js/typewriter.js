document.addEventListener("DOMContentLoaded", function() {
  const words = ["视频制作", "软件编程", "个性定制", "大模型", "MCP 服务"];
  const typingSpeed = 100;
  const deletingSpeed = 100;
  const pauseDuration = 1000;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeWriter() {
    const el = document.getElementById("typewriter-text");
    if (!el) return;

    const currentWord = words[wordIndex];

    if (deleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWriter, 500);
      } else {
        setTimeout(typeWriter, deletingSpeed);
      }
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => {
          deleting = true;
          typeWriter();
        }, pauseDuration);
      } else {
        setTimeout(typeWriter, typingSpeed);
      }
    }
  }

  setTimeout(typeWriter, 1000);
});