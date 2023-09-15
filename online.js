const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');

function updateStatus(online) {
    if (online) {
        statusIndicator.style.backgroundColor = 'green';
        statusText.textContent = '在线';
    } else {
        statusIndicator.style.backgroundColor = 'red';
        statusText.textContent = '掉线';
    }
}

// 监听网络状态的变化
window.addEventListener('online', () => {
    updateStatus(true);
});

window.addEventListener('offline', () => {
    updateStatus(false);
});

// 页面加载时初始状态
updateStatus(navigator.onLine);