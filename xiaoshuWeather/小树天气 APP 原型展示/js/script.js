/**
 * 小树天气 APP - 脚本文件
 * 包含交互功能和模拟数据
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('小树天气 APP 原型加载完成');
    
    // 模拟天气数据
    const weatherData = {
        current: {
            location: '北京市',
            temperature: 23,
            weatherDesc: '晴',
            humidity: 45,
            windDirection: '东北风',
            windSpeed: '3级',
            updateTime: '2023-05-10 14:30'
        },
        forecast: {
            daily: [
                { date: '今天', high: 25, low: 15, weather: '晴', windDirection: '东北风', windSpeed: '3级', humidity: 45 },
                { date: '明天', high: 26, low: 16, weather: '多云', windDirection: '东风', windSpeed: '2级', humidity: 50 },
                { date: '后天', high: 24, low: 14, weather: '阴', windDirection: '东南风', windSpeed: '2级', humidity: 55 },
                { date: '周四', high: 23, low: 13, weather: '小雨', windDirection: '南风', windSpeed: '3级', humidity: 65 },
                { date: '周五', high: 22, low: 12, weather: '中雨', windDirection: '南风', windSpeed: '4级', humidity: 75 },
                { date: '周六', high: 21, low: 11, weather: '小雨', windDirection: '西南风', windSpeed: '3级', humidity: 70 },
                { date: '周日', high: 20, low: 10, weather: '多云', windDirection: '西风', windSpeed: '2级', humidity: 60 }
            ],
            hourly: [
                { time: '现在', temperature: 23, weather: '晴', windDirection: '东北风', windSpeed: '3级' },
                { time: '15:00', temperature: 24, weather: '晴', windDirection: '东北风', windSpeed: '3级' },
                { time: '16:00', temperature: 24, weather: '晴', windDirection: '东北风', windSpeed: '3级' },
                { time: '17:00', temperature: 23, weather: '晴', windDirection: '东风', windSpeed: '2级' },
                { time: '18:00', temperature: 22, weather: '晴', windDirection: '东风', windSpeed: '2级' },
                { time: '19:00', temperature: 20, weather: '晴', windDirection: '东风', windSpeed: '2级' },
                { time: '20:00', temperature: 19, weather: '晴', windDirection: '东南风', windSpeed: '2级' },
                { time: '21:00', temperature: 18, weather: '晴', windDirection: '东南风', windSpeed: '2级' },
                { time: '22:00', temperature: 17, weather: '多云', windDirection: '东南风', windSpeed: '2级' },
                { time: '23:00', temperature: 16, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '00:00', temperature: 15, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '01:00', temperature: 15, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '02:00', temperature: 15, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '03:00', temperature: 14, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '04:00', temperature: 14, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '05:00', temperature: 14, weather: '阴', windDirection: '南风', windSpeed: '2级' },
                { time: '06:00', temperature: 15, weather: '阴', windDirection: '南风', windSpeed: '2级' },
                { time: '07:00', temperature: 16, weather: '阴', windDirection: '南风', windSpeed: '2级' },
                { time: '08:00', temperature: 17, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '09:00', temperature: 18, weather: '多云', windDirection: '南风', windSpeed: '2级' },
                { time: '10:00', temperature: 19, weather: '多云', windDirection: '南风', windSpeed: '3级' },
                { time: '11:00', temperature: 21, weather: '晴', windDirection: '南风', windSpeed: '3级' },
                { time: '12:00', temperature: 22, weather: '晴', windDirection: '东南风', windSpeed: '3级' },
                { time: '13:00', temperature: 23, weather: '晴', windDirection: '东南风', windSpeed: '3级' }
            ]
        },
        air: {
            aqi: 75,
            category: '良',
            pm25: 35,
            pm10: 68,
            no2: 25,
            so2: 8,
            co: 0.8,
            o3: 96
        },
        lifeIndex: {
            comfort: { level: '舒适', desc: '白天温度适宜，风力不大，相信您在这样的天气里，应会感到比较清爽和舒适。' },
            dressing: { level: '较舒适', desc: '建议穿薄长袖类衣物，如T恤衫、衬衫，长裙等，年老体弱者应适当选择长袖衣物。' },
            coldRisk: { level: '低风险', desc: '感冒机率较低，避免长期处于空调屋中。' },
            ultraviolet: { level: '强', desc: '紫外线辐射强，建议涂擦SPF20以上、PA++的防晒霜。' },
            sport: { level: '适宜', desc: '天气较好，户外运动请注意防晒。' },
            carWashing: { level: '适宜', desc: '适宜洗车，未来持续两天无雨天气较好，适合擦洗汽车。' }
        },
        warning: {
            active: false,
            type: '',
            level: '',
            content: '',
            pubTime: ''
        }
    };

    // 保存数据到本地，以便各个页面使用
    window.weatherData = weatherData;

    // 添加原型页面的交互功能
    addPrototypeInteractions();
});

/**
 * 添加原型页面的交互功能
 */
function addPrototypeInteractions() {
    // 预报页面标签切换
    initForecastTabs();
    
    // 预警页面标签切换
    initAlertTabs();
    
    // 添加预警页面按钮交互
    initAlertButtons();
    
    // 位置搜索页面交互
    initLocationSearch();
}

/**
 * 初始化预报页面的标签切换功能
 */
function initForecastTabs() {
    const forecastTabs = document.querySelectorAll('.forecast-tab');
    const hour24Forecast = document.querySelector('.hour24-forecast');
    const daily7Forecast = document.querySelector('.daily7-forecast');
    
    if (forecastTabs.length > 0) {
        forecastTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // 切换标签激活状态
                forecastTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 切换内容显示
                if (index === 0) {
                    hour24Forecast.style.display = 'block';
                    daily7Forecast.style.display = 'none';
                } else {
                    hour24Forecast.style.display = 'none';
                    daily7Forecast.style.display = 'block';
                }
            });
        });
    }
}

/**
 * 初始化预警页面的标签切换功能
 */
function initAlertTabs() {
    const alertTabs = document.querySelectorAll('.alert-tab');
    const alertEmpty = document.querySelector('.alert-empty');
    const alertList = document.querySelector('.alert-list');
    
    if (alertTabs.length > 0) {
        alertTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // 切换标签激活状态
                alertTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 模拟切换内容显示
                // 当前预警标签：显示无预警状态
                // 历史预警标签：显示预警列表
                if (index === 0) {
                    alertEmpty.style.display = 'flex';
                    alertList.style.display = 'none';
                } else {
                    alertEmpty.style.display = 'none';
                    alertList.style.display = 'block';
                }
            });
        });
    }
}

/**
 * 初始化预警页面按钮交互
 */
function initAlertButtons() {
    const alertServiceButton = document.querySelector('.alert-service-button');
    
    if (alertServiceButton) {
        alertServiceButton.addEventListener('click', () => {
            // 模拟按钮点击效果
            alertServiceButton.style.backgroundColor = '#2980b9';
            setTimeout(() => {
                alertServiceButton.style.backgroundColor = '#3498db';
                alert('已开启预警通知服务，将在发生极端天气时通知您。');
            }, 200);
        });
    }
}

/**
 * 初始化位置搜索页面交互
 */
function initLocationSearch() {
    const searchInput = document.querySelector('.location-search-input');
    const searchClear = document.querySelector('.location-search-clear');
    const searchResults = document.querySelector('.location-search-results');
    const resultItems = document.querySelectorAll('.location-result-item');
    const hotCities = document.querySelectorAll('.location-hot-city');
    const locationItems = document.querySelectorAll('.location-item');
    
    // 搜索框交互
    if (searchInput && searchResults) {
        // 输入框获得焦点时显示结果
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length > 0) {
                searchResults.style.display = 'block';
            }
        });
        
        // 输入框内容变化时显示/隐藏结果
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim().length > 0) {
                searchResults.style.display = 'block';
                searchClear.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
                searchClear.style.display = 'none';
            }
        });
        
        // 清除按钮点击事件
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchResults.style.display = 'none';
                searchClear.style.display = 'none';
                searchInput.focus();
            });
        }
        
        // 点击空白处隐藏结果
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // 搜索结果项点击事件
    if (resultItems.length > 0) {
        resultItems.forEach(item => {
            item.addEventListener('click', () => {
                const cityName = item.querySelector('.location-result-name').textContent;
                alert(`已切换到城市：${cityName}`);
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
        });
    }
    
    // 热门城市点击事件
    if (hotCities.length > 0) {
        hotCities.forEach(city => {
            city.addEventListener('click', () => {
                const cityName = city.textContent;
                alert(`已切换到城市：${cityName}`);
            });
        });
    }
    
    // 城市列表项点击事件
    if (locationItems.length > 0) {
        locationItems.forEach(item => {
            item.addEventListener('click', () => {
                const cityName = item.querySelector('.location-item-name').textContent;
                alert(`已切换到城市：${cityName}`);
            });
        });
    }
}

/**
 * 获取天气图标类名
 * @param {string} weather 天气描述
 * @returns {string} 对应的图标类名
 */
function getWeatherIcon(weather) {
    const iconMap = {
        '晴': 'fa-sun',
        '多云': 'fa-cloud-sun',
        '阴': 'fa-cloud',
        '小雨': 'fa-cloud-rain',
        '中雨': 'fa-cloud-showers-heavy',
        '大雨': 'fa-cloud-showers-heavy',
        '暴雨': 'fa-cloud-showers-heavy',
        '雷阵雨': 'fa-bolt',
        '雪': 'fa-snowflake',
        '雾': 'fa-smog',
        '霾': 'fa-smog'
    };
    
    return iconMap[weather] || 'fa-cloud';
}

/**
 * 格式化日期时间
 * @param {string} dateTimeStr 日期时间字符串
 * @returns {string} 格式化后的日期时间
 */
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
} 