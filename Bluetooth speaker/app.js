const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const gainRange = document.getElementById("gainRange");
const gainValue = document.getElementById("gainValue");
const statusEl = document.getElementById("status");
const meterBar = document.getElementById("meterBar");

let audioContext;
let micStream;
let micSource;
let gainNode;
let analyserNode;
let rafId;

function getLegacyGetUserMedia() {
  return (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
}

function getUserMediaCompat(constraints) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  const legacyGetUserMedia = getLegacyGetUserMedia();
  if (!legacyGetUserMedia) {
    return Promise.reject(new Error("BROWSER_NOT_SUPPORTED"));
  }

  return new Promise((resolve, reject) => {
    legacyGetUserMedia.call(navigator, constraints, resolve, reject);
  });
}

function isSecureForMic() {
  return (
    window.isSecureContext ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  );
}

function setStatus(text) {
  statusEl.textContent = `状态：${text}`;
}

function updateGain() {
  const value = Number(gainRange.value);
  gainValue.textContent = `${value.toFixed(2)}x`;
  if (gainNode) {
    gainNode.gain.value = value;
  }
}

function drawMeter() {
  if (!analyserNode) return;

  const data = new Uint8Array(analyserNode.fftSize);
  analyserNode.getByteTimeDomainData(data);

  let sum = 0;
  for (let i = 0; i < data.length; i += 1) {
    const normalized = (data[i] - 128) / 128;
    sum += normalized * normalized;
  }
  const rms = Math.sqrt(sum / data.length);
  const percent = Math.min(100, rms * 300);
  meterBar.style.width = `${percent}%`;

  rafId = requestAnimationFrame(drawMeter);
}

async function startAmplifier() {
  startBtn.disabled = true;

  const legacyGetUserMedia = getLegacyGetUserMedia();
  if (!navigator.mediaDevices && !legacyGetUserMedia) {
    setStatus("当前浏览器不支持麦克风接口，请换 Chrome/Safari 最新版");
    startBtn.disabled = false;
    return;
  }

  if (!isSecureForMic() && !legacyGetUserMedia) {
    setStatus("当前是非 HTTPS 页面，浏览器已禁用麦克风。请用 HTTPS 域名访问");
    startBtn.disabled = false;
    return;
  }

  setStatus("正在请求麦克风权限...");

  try {
    micStream = await getUserMediaCompat({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      },
      video: false,
    });

    audioContext = new window.AudioContext({ latencyHint: "interactive" });
    await audioContext.resume();

    micSource = audioContext.createMediaStreamSource(micStream);
    gainNode = audioContext.createGain();
    analyserNode = audioContext.createAnalyser();

    analyserNode.fftSize = 512;
    gainNode.gain.value = Number(gainRange.value);

    micSource.connect(gainNode);
    gainNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    stopBtn.disabled = false;
    setStatus("扩音中（请保持手机音频输出为蓝牙）");
    drawMeter();
  } catch (error) {
    console.error(error);
    if (error && error.name === "NotAllowedError") {
      setStatus("未授予麦克风权限，请在浏览器设置中允许后重试");
    } else if (error && error.name === "NotFoundError") {
      setStatus("未检测到可用麦克风设备");
    } else if (error && error.message === "BROWSER_NOT_SUPPORTED") {
      setStatus("浏览器不支持麦克风采集，请换 Chrome/Safari");
    } else {
      setStatus(`启动失败：${error.message || "请检查浏览器权限/HTTPS"}`);
    }
    startBtn.disabled = false;
  }
}

function stopAmplifier() {
  cancelAnimationFrame(rafId);
  meterBar.style.width = "0%";

  if (micSource) {
    micSource.disconnect();
    micSource = null;
  }

  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }

  if (analyserNode) {
    analyserNode.disconnect();
    analyserNode = null;
  }

  if (micStream) {
    micStream.getTracks().forEach((track) => track.stop());
    micStream = null;
  }

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  stopBtn.disabled = true;
  startBtn.disabled = false;
  setStatus("已停止");
}

gainRange.addEventListener("input", updateGain);
startBtn.addEventListener("click", startAmplifier);
stopBtn.addEventListener("click", stopAmplifier);

window.addEventListener("beforeunload", stopAmplifier);
updateGain();
