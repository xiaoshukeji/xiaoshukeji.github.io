/**
 * 小树天气 APP - 脚本文件
 * 包含交互功能和模拟数据
 */

// 和风天气API配置
const WEATHER_API_CONFIG = {
    key: '3946fc1f364742b18bebdb37431fbb4d', // 和风天气API密钥
    baseUrl: 'https://devapi.qweather.com/v7', // 天气API基础URL
    geoApiUrl: 'https://geoapi.qweather.com/v2', // 地理位置API基础URL
    iconBaseUrl: 'https://a.hecdn.net/img/common/icon/c/', // 图标基础URL
    iconSuffix: '.png' // 图标文件后缀
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('小树天气 APP 加载完成');
    
    // 模拟天气数据（作为初始数据和后备数据）
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

    // 初始化APP
    initApp();
    
    // 检查是否是从缓存加载的页面
    if (performance.navigation.type === 1) {
        // 页面刷新时显示加载动画
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.display = 'flex';
        }
    }
    
    // 尝试自动获取用户位置和天气
    setTimeout(() => {
        getCurrentLocation(); // 获取用户当前位置并更新天气
    }, 500); // 稍微延迟以确保DOM已完全加载
});

/**
 * 初始化真实天气数据
 * @param {string} cityName 城市名称
 */
async function initRealWeatherData(cityName) {
    try {
        // 先获取城市ID
        const cityData = await fetchCityInfo(cityName);
        if (!cityData || cityData.length === 0) {
            console.error('未找到城市信息');
            return;
        }
        
        // 获取第一个匹配的城市
        const cityId = cityData[0].id;
        console.log(`获取到城市ID: ${cityId}`);
        
        // 并行获取所有天气数据
        const [currentWeather, dailyForecast, hourlyForecast, airQuality, lifeIndices] = await Promise.all([
            fetchCurrentWeather(cityId),
            fetchDailyForecast(cityId),
            fetchHourlyForecast(cityId),
            fetchAirQuality(cityId),
            fetchLifeIndices(cityId)
        ]);
        
        // 更新全局天气数据
        updateWeatherData(currentWeather, dailyForecast, hourlyForecast, airQuality, lifeIndices, cityName);
        
        // 重新渲染所有页面
        renderHomePage();
        initForecastPage();
        initAirPage();
        initLifePage();
        
        console.log('天气数据更新完成');
    } catch (error) {
        console.error('获取天气数据失败:', error);
        // 使用本地模拟数据作为后备
    }
}

/**
 * 更新全局天气数据对象
 */
function updateWeatherData(currentWeather, dailyForecast, hourlyForecast, airQuality, lifeIndices, cityName) {
    // 这里根据API返回的数据格式进行适配
    // 以下是示例代码，实际实现需要根据和风天气API的响应格式调整
    
    // 更新当前天气
    if (currentWeather && currentWeather.now) {
        window.weatherData.current = {
            location: cityName,
            temperature: parseInt(currentWeather.now.temp),
            weatherDesc: currentWeather.now.text,
            humidity: parseInt(currentWeather.now.humidity),
            windDirection: currentWeather.now.windDir,
            windSpeed: `${currentWeather.now.windScale}级`,
            updateTime: formatDateTime(new Date())
        };
    }
    
    // 更新每日预报
    if (dailyForecast && dailyForecast.daily) {
        const days = ['今天', '明天', '后天', '周四', '周五', '周六', '周日'];
        window.weatherData.forecast.daily = dailyForecast.daily.map((day, index) => ({
            date: days[index],
            high: parseInt(day.tempMax),
            low: parseInt(day.tempMin),
            weather: day.textDay,
            windDirection: day.windDirDay,
            windSpeed: `${day.windScaleDay}级`,
            humidity: parseInt(day.humidity)
        })).slice(0, 7);
    }
    
    // 更新小时预报
    if (hourlyForecast && hourlyForecast.hourly) {
        window.weatherData.forecast.hourly = hourlyForecast.hourly.map(hour => ({
            time: hour.fxTime.substring(11, 16),
            temperature: parseInt(hour.temp),
            weather: hour.text,
            windDirection: hour.windDir,
            windSpeed: `${hour.windScale}级`
        }));
        
        // 设置第一个为"现在"
        if (window.weatherData.forecast.hourly.length > 0) {
            window.weatherData.forecast.hourly[0].time = '现在';
        }
    }
    
    // 更新空气质量
    if (airQuality && airQuality.now) {
        window.weatherData.air = {
            aqi: parseInt(airQuality.now.aqi),
            category: airQuality.now.category,
            pm25: parseInt(airQuality.now.pm2p5),
            pm10: parseInt(airQuality.now.pm10),
            no2: parseInt(airQuality.now.no2),
            so2: parseInt(airQuality.now.so2),
            co: parseFloat(airQuality.now.co),
            o3: parseInt(airQuality.now.o3)
        };
    }
    
    // 更新生活指数
    if (lifeIndices && lifeIndices.daily) {
        const indices = {};
        lifeIndices.daily.forEach(index => {
            switch (index.type) {
                case '8': // 舒适度
                    indices.comfort = { level: index.category, desc: index.text };
                    break;
                case '3': // 穿衣
                    indices.dressing = { level: index.category, desc: index.text };
                    break;
                case '9': // 感冒
                    indices.coldRisk = { level: index.category, desc: index.text };
                    break;
                case '5': // 紫外线
                    indices.ultraviolet = { level: index.category, desc: index.text };
                    break;
                case '1': // 运动
                    indices.sport = { level: index.category, desc: index.text };
                    break;
                case '2': // 洗车
                    indices.carWashing = { level: index.category, desc: index.text };
                    break;
            }
        });
        
        // 更新生活指数数据
        Object.assign(window.weatherData.lifeIndex, indices);
    }
}

/**
 * 搜索城市信息
 * @param {string} keyword 城市名称关键词
 * @returns {Promise<Array>} 城市信息数组
 */
async function fetchCityInfo(keyword) {
    try {
        // 确保API配置存在
        if (!WEATHER_API_CONFIG || !WEATHER_API_CONFIG.key) {
            console.error('API配置缺失');
            return [];
        }
        
        // 和风天气城市查询API
        const url = `${WEATHER_API_CONFIG.geoApiUrl}/city/lookup?key=${WEATHER_API_CONFIG.key}&location=${encodeURIComponent(keyword)}&range=cn`;
        
        console.log('城市查询URL:', url); // 调试信息
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('城市查询返回数据:', data); // 调试信息
        
        // 检查API返回的状态码
        if (data.code === '200') {
            return data.location || [];
        } else {
            console.error('城市查询API返回错误:', data.code, data.codeReason || '未知错误');
            return [];
        }
    } catch (error) {
        console.error('城市查询失败:', error);
        return [];
    }
}

/**
 * 获取当前天气
 * @param {string} cityId 城市ID
 * @returns {Promise<Object>} 当前天气数据
 */
async function fetchCurrentWeather(cityId) {
    const url = `${WEATHER_API_CONFIG.baseUrl}/weather/now?key=${WEATHER_API_CONFIG.key}&location=${cityId}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('获取当前天气失败:', error);
        return null;
    }
}

/**
 * 获取天气预报（7天）
 * @param {string} cityId 城市ID
 * @returns {Promise<Object>} 天气预报数据
 */
async function fetchDailyForecast(cityId) {
    const url = `${WEATHER_API_CONFIG.baseUrl}/weather/7d?key=${WEATHER_API_CONFIG.key}&location=${cityId}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('获取天气预报失败:', error);
        return null;
    }
}

/**
 * 获取逐小时预报（24小时）
 * @param {string} cityId 城市ID
 * @returns {Promise<Object>} 逐小时预报数据
 */
async function fetchHourlyForecast(cityId) {
    const url = `${WEATHER_API_CONFIG.baseUrl}/weather/24h?key=${WEATHER_API_CONFIG.key}&location=${cityId}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('获取逐小时预报失败:', error);
        return null;
    }
}

/**
 * 获取空气质量
 * @param {string} cityId 城市ID
 * @returns {Promise<Object>} 空气质量数据
 */
async function fetchAirQuality(cityId) {
    const url = `${WEATHER_API_CONFIG.baseUrl}/air/now?key=${WEATHER_API_CONFIG.key}&location=${cityId}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('获取空气质量失败:', error);
        return null;
    }
}

/**
 * 获取生活指数
 * @param {string} cityId 城市ID
 * @returns {Promise<Object>} 生活指数数据
 */
async function fetchLifeIndices(cityId) {
    // 获取所有生活指数: 1-16表示所有生活指数类型
    const url = `${WEATHER_API_CONFIG.baseUrl}/indices/1d?key=${WEATHER_API_CONFIG.key}&location=${cityId}&type=1,2,3,5,8,9`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('获取生活指数失败:', error);
        return null;
    }
}

/**
 * 初始化APP
 */
function initApp() {
    // 绑定导航事件
    initNavigation();
    
    // 渲染主页数据
    renderHomePage();
    
    // 初始化预报页面
    initForecastPage();
    
    // 初始化空气质量页面
    initAirPage();
    
    // 初始化生活指数页面
    initLifePage();
    
    // 初始化位置搜索页面
    initLocationSearch();
    
    // 添加各页面交互功能
    addPrototypeInteractions();
    
    // 初始化深色模式切换
    initDarkModeToggle();
    
    // 初始化下拉刷新
    initPullToRefresh();
    
    // 初始化刷新按钮
    initRefreshButton();
    
    // 初始化城市列表
    renderCityList();
    
    // 尝试获取真实天气数据
    refreshWeatherData(false);
    
    // 隐藏加载动画
    setTimeout(() => {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }, 1500);
}

/**
 * 初始化导航功能
 */
function initNavigation() {
    // 绑定底部导航切换事件
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });
    
    // 绑定返回按钮事件
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetPage = this.getAttribute('data-target');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });
    
    // "更多"页面中的菜单项点击事件
    const moreItems = document.querySelectorAll('.more-item');
    moreItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });
}

/**
 * 切换页面
 * @param {string} pageId 目标页面ID
 */
function switchPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新导航状态
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });
}

/**
 * 渲染主页数据
 */
function renderHomePage() {
    const data = window.weatherData;
    
    // 更新当前天气
    document.getElementById('current-location').textContent = data.current.location;
    document.getElementById('update-time').textContent = `更新于 ${data.current.updateTime.split(' ')[1]}`;
    document.getElementById('current-temperature').textContent = `${data.current.temperature}°`;
    document.getElementById('current-weather-desc').textContent = data.current.weatherDesc;
    document.getElementById('current-humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('current-wind-direction').textContent = data.current.windDirection;
    document.getElementById('current-wind-speed').textContent = data.current.windSpeed;
    
    // 设置当前天气图标
    const weatherIconClass = getWeatherIcon(data.current.weatherDesc);
    document.getElementById('current-weather-icon').className = `fas ${weatherIconClass} weather-icon`;
    
    // 生成小时预报
    const hourlyContainer = document.getElementById('hourly-forecast-container');
    hourlyContainer.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const hourData = data.forecast.hourly[i];
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        
        const iconClass = getWeatherIcon(hourData.weather);
        
        hourlyItem.innerHTML = `
            <div class="hourly-time">${hourData.time}</div>
            <i class="fas ${iconClass} hourly-icon"></i>
            <div class="hourly-temp">${hourData.temperature}°</div>
        `;
        
        hourlyContainer.appendChild(hourlyItem);
    }
}

/**
 * 初始化预报页面
 */
function initForecastPage() {
    const data = window.weatherData;
    
    // 生成24小时预报
    const hour24Container = document.getElementById('hour24-container');
    hour24Container.innerHTML = '';
    
    for (let i = 0; i < Math.min(data.forecast.hourly.length, 24); i++) {
        const hourData = data.forecast.hourly[i];
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hour24-item';
        
        const iconClass = getWeatherIcon(hourData.weather);
        const height = 70 + hourData.temperature * 2; // 简单的温度条高度计算
        
        hourlyItem.innerHTML = `
            <div class="hour24-temp">${hourData.temperature}°</div>
            <i class="fas ${iconClass} hour24-icon"></i>
            <div class="hour24-bar" style="height: ${height}px;"></div>
            <div class="hour24-time">${hourData.time}</div>
        `;
        
        hour24Container.appendChild(hourlyItem);
    }
    
    // 生成7天预报
    const daily7Container = document.getElementById('daily7-container');
    daily7Container.innerHTML = '';
    
    const days = ['今天', '明天', '后天', '周四', '周五', '周六', '周日'];
    const dates = ['5月10日', '5月11日', '5月12日', '5月13日', '5月14日', '5月15日', '5月16日'];
    
    for (let i = 0; i < Math.min(data.forecast.daily.length, 7); i++) {
        const dayData = data.forecast.daily[i];
        const dailyItem = document.createElement('div');
        dailyItem.className = 'daily7-item';
        
        const iconClass = getWeatherIcon(dayData.weather);
        const barWidth = (dayData.high - dayData.low) * 5; // 温差条宽度
        
        dailyItem.innerHTML = `
            <div class="daily7-date">
                <div class="daily7-date-day">${days[i]}</div>
                <div class="daily7-date-full">${dates[i]}</div>
            </div>
            <div class="daily7-weather">
                <i class="fas ${iconClass} daily7-weather-icon"></i>
                <div class="daily7-weather-desc">
                    <div class="daily7-weather-text">${dayData.weather}</div>
                    <div class="daily7-weather-wind">${dayData.windDirection} ${dayData.windSpeed}</div>
                </div>
            </div>
            <div class="daily7-temp">
                <div class="daily7-temp-low">${dayData.low}°</div>
                <div class="daily7-temp-bar" style="width: ${barWidth}px;"></div>
                <div class="daily7-temp-high">${dayData.high}°</div>
            </div>
        `;
        
        daily7Container.appendChild(dailyItem);
    }
}

/**
 * 初始化空气质量页面
 */
function initAirPage() {
    const data = window.weatherData.air;
    const location = window.weatherData.current.location;
    
    // 更新页面城市位置信息
    const airQualityTitle = document.querySelector('.air-quality-title');
    if (airQualityTitle) {
        airQualityTitle.textContent = `${location} - 空气质量指数`;
    }
    
    // 更新空气质量数据
    document.getElementById('aqi-value').textContent = data.aqi;
    document.getElementById('aqi-category').textContent = data.category;
    
    // 更新污染物数据
    document.getElementById('pm25-value').textContent = data.pm25;
    document.getElementById('pm10-value').textContent = data.pm10;
    document.getElementById('no2-value').textContent = data.no2;
    document.getElementById('so2-value').textContent = data.so2;
    document.getElementById('co-value').textContent = data.co;
    document.getElementById('o3-value').textContent = data.o3;
    
    // 根据AQI值设置标记位置
    let markerPosition = 0;
    if (data.aqi <= 50) {
        markerPosition = data.aqi / 50 * (100/6); // 优
    } else if (data.aqi <= 100) {
        markerPosition = (100/6) + (data.aqi - 50) / 50 * (100/6); // 良
    } else if (data.aqi <= 150) {
        markerPosition = (200/6) + (data.aqi - 100) / 50 * (100/6); // 轻度
    } else if (data.aqi <= 200) {
        markerPosition = (300/6) + (data.aqi - 150) / 50 * (100/6); // 中度
    } else if (data.aqi <= 300) {
        markerPosition = (400/6) + (data.aqi - 200) / 100 * (100/6); // 重度
    } else {
        markerPosition = (500/6) + (data.aqi - 300) / 200 * (100/6); // 严重
    }
    
    // 限制在0-100%范围内
    markerPosition = Math.min(100, Math.max(0, markerPosition));
    
    const marker = document.querySelector('.aqi-scale-marker');
    if (marker) {
        marker.style.left = `${markerPosition}%`;
    }
    
    // 根据空气质量更新建议
    const advice = document.querySelector('.air-advice-content p');
    if (advice) {
        let adviceText = '';
        if (data.aqi <= 50) {
            adviceText = '空气质量优，适合户外活动，呼吸新鲜空气有益健康。';
        } else if (data.aqi <= 100) {
            adviceText = '空气质量可接受，但对少数异常敏感人群可能存在轻度影响。';
        } else if (data.aqi <= 150) {
            adviceText = '敏感人群需注意防护，建议适当减少户外活动，出行佩戴口罩。一般人群可正常活动。';
        } else if (data.aqi <= 200) {
            adviceText = '所有人群应减少户外活动，敏感人群尽量避免外出，外出时应佩戴口罩。';
        } else if (data.aqi <= 300) {
            adviceText = '所有人群应避免户外活动，必须外出时需佩戴防霾口罩。建议关闭门窗，开启空气净化器。';
        } else {
            adviceText = '所有人群应避免户外活动，外出需佩戴专业防霾口罩。建议关闭门窗，开启空气净化器。';
        }
        advice.textContent = adviceText;
    }
}

/**
 * 初始化生活指数页面
 */
function initLifePage() {
    const data = window.weatherData.lifeIndex;
    const location = window.weatherData.current.location;
    
    // 更新页面标题位置信息
    const lifeLocation = document.querySelector('.life-location span');
    if (lifeLocation) {
        lifeLocation.textContent = location;
    }
    
    // 更新日期信息
    const lifeDate = document.querySelector('.life-date span');
    if (lifeDate) {
        const now = new Date();
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const dateStr = `${months[now.getMonth()]}${now.getDate()}日 ${days[now.getDay()]}`;
        lifeDate.textContent = dateStr;
    }
    
    // 更新各项生活指数数据
    updateLifeIndex('穿衣指数', data.dressing);
    updateLifeIndex('运动指数', data.sport);
    updateLifeIndex('洗车指数', data.carWashing);
    updateLifeIndex('紫外线指数', data.ultraviolet);
    updateLifeIndex('感冒指数', data.coldRisk);
    updateLifeIndex('舒适度指数', data.comfort);
}

/**
 * 更新单个生活指数卡片
 * @param {string} indexName 指数名称
 * @param {Object} indexData 指数数据对象，包含level和desc属性
 */
function updateLifeIndex(indexName, indexData) {
    if (!indexData) return;
    
    // 根据名称查找对应卡片
    const cards = document.querySelectorAll('.life-index-card');
    for (const card of cards) {
        const title = card.querySelector('.life-index-title');
        if (title && title.textContent === indexName) {
            // 更新指数等级
            const level = card.querySelector('.life-index-level');
            if (level) {
                level.textContent = indexData.level;
            }
            
            // 更新指数描述
            const desc = card.querySelector('.life-index-desc');
            if (desc) {
                desc.textContent = indexData.desc;
            }
            
            break;
        }
    }
}

/**
 * 添加各页面交互功能
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
    
    // 增强城市管理页面
    enhanceLocationPage();
    
    // 更多页面的深色模式开关
    initDarkModeToggle();
    
    // 初始化设置页面
    initSettingsPage();
    
    // 初始化关于页面
    initAboutPage();
    
    // 初始化分享功能
    initShareWeather();
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
    let resultItems = document.querySelectorAll('.location-result-item');
    const hotCities = document.querySelectorAll('.location-hot-city');
    const locationItems = document.querySelectorAll('.location-item');
    const noResultsMsg = document.createElement('div');
    
    noResultsMsg.className = 'location-no-results';
    noResultsMsg.innerHTML = '<i class="fas fa-info-circle"></i> 未找到相关城市，请更换关键词';
    noResultsMsg.style.padding = '15px';
    noResultsMsg.style.textAlign = 'center';
    noResultsMsg.style.color = '#7f8c8d';
    noResultsMsg.style.display = 'none';
    
    if (searchResults) {
        searchResults.appendChild(noResultsMsg);
    }
    
    // 搜索框交互
    if (searchInput && searchResults) {
        // 初始状态下隐藏清除按钮
        if (searchClear) {
            searchClear.style.display = 'none';
        }
        
        // 输入框获得焦点时显示结果
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length > 0) {
                searchResults.style.display = 'block';
                searchClear.style.display = 'block';
            }
        });
        
        // 输入框内容变化时显示/隐藏结果
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim().length > 0) {
                searchClear.style.display = 'block';
                
                // 调用和风天气API搜索城市
                searchCity(searchInput.value.trim());
            } else {
                searchResults.style.display = 'none';
                searchClear.style.display = 'none';
            }
        });
        
        // 输入框键盘事件，按下回车键触发搜索
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim().length > 0) {
                searchCity(searchInput.value.trim());
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
    
    // 热门城市点击事件
    if (hotCities.length > 0) {
        hotCities.forEach(city => {
            city.addEventListener('click', () => {
                const cityName = city.textContent;
                switchToCity(cityName);
            });
        });
    }
    
    // 城市列表项点击事件
    if (locationItems.length > 0) {
        locationItems.forEach(item => {
            item.addEventListener('click', () => {
                const cityName = item.querySelector('.location-item-name').textContent;
                switchToCity(cityName);
            });
        });
    }
    
    // 添加当前位置点击事件
    const currentLocation = document.querySelector('.location-current');
    if (currentLocation) {
        currentLocation.addEventListener('click', () => {
            // 使用地理位置API获取当前位置
            getCurrentLocation();
        });
    }
}

/**
 * 搜索城市
 * @param {string} keyword 搜索关键词
 */
async function searchCity(keyword) {
    // 显示加载效果
    const searchResults = document.querySelector('.location-search-results');
    const noResultsMsg = document.querySelector('.location-no-results');
    
    if (searchResults) {
        searchResults.style.display = 'block';
        searchResults.innerHTML = '<div style="text-align: center; padding: 20px;"><div class="refresh-spinner" style="margin: 0 auto;"></div><div style="margin-top: 10px; color: #7f8c8d;">正在搜索城市...</div></div>';
    }
    
    try {
        // 调用和风天气API搜索城市
        const cityData = await fetchCityInfo(keyword);
        
        // 清空并更新搜索结果
        if (searchResults) {
            searchResults.innerHTML = '';
            
            // 添加无结果提示
            if (noResultsMsg) {
                searchResults.appendChild(noResultsMsg);
            }
            
            if (!cityData || cityData.length === 0) {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
                
                // 只显示前5个结果，避免结果过多
                const limitedResults = cityData.slice(0, 5);
                
                // 创建并添加搜索结果项
                limitedResults.forEach(city => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'location-result-item';
                    
                    // 创建主要内容
                    const mainContent = document.createElement('div');
                    mainContent.className = 'location-result-main';
                    mainContent.style.display = 'flex';
                    mainContent.style.alignItems = 'center';
                    mainContent.style.flex = '1';
                    mainContent.style.overflow = 'hidden';
                    mainContent.innerHTML = `
                        <i class="fas fa-map-marker-alt location-result-icon"></i>
                        <div class="location-result-info" style="overflow: hidden; text-overflow: ellipsis;">
                            <div class="location-result-name">${city.name}</div>
                            <div class="location-result-detail">${city.adm1}${city.adm1 !== city.adm2 ? ' · ' + city.adm2 : ''}</div>
                        </div>
                    `;
                    
                    // 创建操作按钮容器
                    const actionsContainer = document.createElement('div');
                    actionsContainer.className = 'location-result-actions';
                    actionsContainer.style.display = 'flex';
                    actionsContainer.style.marginLeft = '10px';
                    
                    // 创建切换按钮
                    const switchBtn = document.createElement('div');
                    switchBtn.className = 'location-result-switch';
                    switchBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                    switchBtn.style.padding = '8px';
                    switchBtn.style.cursor = 'pointer';
                    switchBtn.style.color = '#3498db';
                    switchBtn.title = '切换到此城市';
                    
                    // 创建添加按钮
                    const addBtn = document.createElement('div');
                    addBtn.className = 'location-result-add';
                    addBtn.innerHTML = '<i class="fas fa-plus"></i>';
                    addBtn.style.padding = '8px';
                    addBtn.style.cursor = 'pointer';
                    addBtn.style.color = '#27ae60';
                    addBtn.title = '添加到我的城市';
                    
                    // 添加切换按钮点击事件
                    switchBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        switchToCity(city.name);
                    });
                    
                    // 添加添加按钮点击事件
                    addBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        addCityToList(city.name);
                    });
                    
                    // 将按钮添加到操作容器
                    actionsContainer.appendChild(switchBtn);
                    actionsContainer.appendChild(addBtn);
                    
                    // 设置结果项的样式和布局
                    resultItem.style.display = 'flex';
                    resultItem.style.justifyContent = 'space-between';
                    resultItem.style.alignItems = 'center';
                    resultItem.style.padding = '10px 15px';
                    resultItem.style.borderBottom = '1px solid #f1f1f1';
                    resultItem.style.cursor = 'pointer';
                    
                    // 将主内容和操作按钮添加到结果项
                    resultItem.appendChild(mainContent);
                    resultItem.appendChild(actionsContainer);
                    
                    // 添加结果项点击事件（整行点击切换城市）
                    resultItem.addEventListener('click', () => {
                        switchToCity(city.name);
                    });
                    
                    searchResults.appendChild(resultItem);
                });
            }
        }
    } catch (error) {
        console.error('搜索城市失败:', error);
        if (searchResults) {
            searchResults.innerHTML = '<div style="text-align: center; padding: 20px; color: #e74c3c;"><i class="fas fa-exclamation-circle"></i> 搜索失败，请检查网络连接</div>';
        }
    }
}

/**
 * 切换到指定城市
 * @param {string} cityName 城市名称
 */
function switchToCity(cityName) {
    // 显示加载动画
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.style.display = 'flex';
    }
    
    // 更新当前位置显示
    const currentLocationElements = document.querySelectorAll('#current-location');
    currentLocationElements.forEach(el => {
        el.textContent = cityName;
    });
    
    // 获取并更新新城市的天气数据
    initRealWeatherData(cityName)
        .then(() => {
            // 切换到首页
            switchPage('home-page');
            
            // 更新时间
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('update-time').textContent = `更新于 ${hours}:${minutes}`;
            
            // 提示用户
            setTimeout(() => {
                alert(`已切换到城市：${cityName}`);
            }, 500);
        })
        .catch(error => {
            console.error('切换城市失败:', error);
            alert('获取城市天气数据失败，请检查网络连接后重试。');
        })
        .finally(() => {
            // 隐藏加载动画
            setTimeout(() => {
                if (loader) {
                    loader.style.display = 'none';
                }
            }, 1000);
        });
}

/**
 * 初始化深色模式切换
 */
function initDarkModeToggle() {
    // 获取所有深色模式开关，包括设置页面中的开关
    const darkModeToggles = document.querySelectorAll('#dark-mode-toggle');
    
    if (darkModeToggles) {
        // 检查本地存储中是否已保存深色模式状态
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // 初始化页面深色模式状态
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggles.forEach(toggle => toggle.classList.add('active'));
        }
        
        // 为所有深色模式开关添加点击事件
        darkModeToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                this.classList.toggle('active');
                
                // 检查是否已启用深色模式
                const isDarkMode = this.classList.contains('active');
                
                // 保存状态到本地存储
                localStorage.setItem('darkMode', isDarkMode);
                
                // 切换body的深色模式类
                if (isDarkMode) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
                
                // 同步其他深色模式开关的状态
                darkModeToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        if (isDarkMode) {
                            otherToggle.classList.add('active');
                        } else {
                            otherToggle.classList.remove('active');
                        }
                    }
                });
            });
        });
    }
}

/**
 * 初始化设置页面
 */
function initSettingsPage() {
    // 获取所有设置页面的开关
    const toggleContainers = document.querySelectorAll('.settings-page .toggle-container:not(#dark-mode-toggle)');
    
    // 为每个开关添加点击事件
    toggleContainers.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // 获取设置项标题
            const settingTitle = this.closest('.settings-item').querySelector('.settings-item-title').textContent;
            const isActive = this.classList.contains('active');
            
            // 根据不同设置项执行不同操作
            switch(settingTitle) {
                case '自动定位':
                    localStorage.setItem('autoLocation', isActive);
                    if (isActive) {
                        setTimeout(getCurrentLocation, 500);
                    }
                    break;
                case '启动时自动更新':
                    localStorage.setItem('autoUpdateOnStart', isActive);
                    break;
                case '后台刷新':
                    localStorage.setItem('backgroundRefresh', isActive);
                    break;
                case '天气预警通知':
                    localStorage.setItem('alertNotifications', isActive);
                    break;
                case '每日天气推送':
                    localStorage.setItem('dailyWeatherPush', isActive);
                    break;
            }
        });
    });
    
    // 处理温度单位和风速单位选择
    const tempUnitSelect = document.getElementById('temp-unit');
    const windUnitSelect = document.getElementById('wind-unit');
    
    if (tempUnitSelect) {
        // 加载保存的温度单位
        const savedTempUnit = localStorage.getItem('tempUnit') || 'c';
        tempUnitSelect.value = savedTempUnit;
        
        // 监听变化
        tempUnitSelect.addEventListener('change', function() {
            localStorage.setItem('tempUnit', this.value);
            // 这里可以添加更新界面上温度显示的逻辑
        });
    }
    
    if (windUnitSelect) {
        // 加载保存的风速单位
        const savedWindUnit = localStorage.getItem('windUnit') || 'kmh';
        windUnitSelect.value = savedWindUnit;
        
        // 监听变化
        windUnitSelect.addEventListener('change', function() {
            localStorage.setItem('windUnit', this.value);
            // 这里可以添加更新界面上风速显示的逻辑
        });
    }
    
    // 处理按钮点击事件
    const clearCacheButton = document.querySelector('.settings-button:nth-child(1)');
    const resetSettingsButton = document.querySelector('.settings-button:nth-child(2)');
    
    if (clearCacheButton) {
        clearCacheButton.addEventListener('click', function() {
            // 清除天气数据缓存
            localStorage.removeItem('lastWeatherData');
            localStorage.removeItem('lastUpdateTime');
            
            // 显示提示
            alert('缓存数据已清除！');
            
            // 重新加载天气数据
            refreshWeatherData(false);
        });
    }
    
    if (resetSettingsButton) {
        resetSettingsButton.addEventListener('click', function() {
            // 显示确认对话框
            if (confirm('确定要重置所有设置吗？这将恢复所有设置为默认值。')) {
                // 清除所有设置但保留城市列表
                const savedCities = localStorage.getItem('savedCities');
                
                // 清除所有设置
                localStorage.clear();
                
                // 恢复城市列表
                if (savedCities) {
                    localStorage.setItem('savedCities', savedCities);
                }
                
                // 重置所有开关
                document.querySelectorAll('.settings-page .toggle-container').forEach(toggle => {
                    if (toggle.id === 'dark-mode-toggle') {
                        toggle.classList.remove('active');
                        document.body.classList.remove('dark-mode');
                    } else if (['自动定位', '启动时自动更新', '天气预警通知'].includes(
                        toggle.closest('.settings-item').querySelector('.settings-item-title').textContent)) {
                        toggle.classList.add('active');
                    } else {
                        toggle.classList.remove('active');
                    }
                });
                
                // 重置选择框
                if (tempUnitSelect) tempUnitSelect.value = 'c';
                if (windUnitSelect) windUnitSelect.value = 'kmh';
                
                // 显示提示
                alert('所有设置已重置为默认值！');
            }
        });
    }
}

/**
 * 初始化关于页面
 */
function initAboutPage() {
    // 获取关于页面中的联系信息项
    const contactItems = document.querySelectorAll('.contact-item');
    
    // 为联系方式添加点击效果
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            // 根据不同的联系方式执行不同操作
            if (text.includes('@')) {
                // 邮箱地址
                alert(`即将发送邮件至: ${text}`);
                // 实际应用中可以使用 window.location.href = `mailto:${text}`;
            } else if (text.includes('www.')) {
                // 网址
                alert(`即将访问网站: ${text}`);
                // 实际应用中可以使用 window.open(text, '_blank');
            }
        });
        
        // 添加鼠标悬停效果
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f7ff';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
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

/**
 * 初始化下拉刷新功能
 */
function initPullToRefresh() {
    const homePageBody = document.querySelector('.home-page');
    const pullRefresh = document.getElementById('pull-refresh');
    let touchStartY = 0;
    let touchEndY = 0;
    const PULL_THRESHOLD = 70; // 下拉阈值
    let isPulling = false;
    
    // 开始触摸
    homePageBody.addEventListener('touchstart', (e) => {
        // 仅在主页顶部才能触发下拉刷新
        if (homePageBody.scrollTop <= 0) {
            touchStartY = e.touches[0].clientY;
            isPulling = true;
        }
    });
    
    // 触摸移动
    homePageBody.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        
        touchEndY = e.touches[0].clientY;
        const pullDistance = touchEndY - touchStartY;
        
        // 只有向下拉动才触发
        if (pullDistance > 0 && homePageBody.scrollTop <= 0) {
            // 计算下拉距离，使用阻尼效果
            const pullPercentage = Math.min(pullDistance / PULL_THRESHOLD, 1);
            const dampenedDistance = pullPercentage * 60; // 最大下拉60px
            
            // 更新下拉刷新指示器位置
            pullRefresh.style.transform = `translateY(${-60 + dampenedDistance}px)`;
            
            // 防止页面跟随滚动
            e.preventDefault();
        }
    });
    
    // 触摸结束
    homePageBody.addEventListener('touchend', () => {
        if (!isPulling) return;
        
        // 计算下拉距离
        const pullDistance = touchEndY - touchStartY;
        
        // 如果下拉距离超过阈值，触发刷新
        if (pullDistance > PULL_THRESHOLD && homePageBody.scrollTop <= 0) {
            refreshWeatherData();
            
            // 显示完整的刷新指示器
            pullRefresh.classList.add('active');
            
            // 2秒后隐藏刷新指示器
            setTimeout(() => {
                pullRefresh.classList.remove('active');
                pullRefresh.style.transform = '';
            }, 2000);
        } else {
            // 重置刷新指示器位置
            pullRefresh.style.transform = '';
        }
        
        isPulling = false;
    });
}

/**
 * 初始化刷新按钮功能
 */
function initRefreshButton() {
    const refreshButton = document.getElementById('refresh-button');
    
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            // 添加旋转动画效果
            const refreshIcon = refreshButton.querySelector('i');
            refreshIcon.style.transform = 'rotate(360deg)';
            
            // 刷新天气数据
            refreshWeatherData();
            
            // 重置按钮
            setTimeout(() => {
                refreshIcon.style.transform = '';
            }, 1000);
        });
    }
}

/**
 * 刷新天气数据
 * @param {boolean} showAlert 是否显示弹窗提示，默认为true
 */
function refreshWeatherData(showAlert = true) {
    // 显示加载动画
    const loader = document.getElementById('app-loader');
    loader.style.display = 'flex';
    
    // 获取当前位置
    const currentLocation = document.getElementById('current-location').textContent;
    
    // 调用API获取最新天气数据
    initRealWeatherData(currentLocation)
        .then(() => {
            // 更新时间
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('update-time').textContent = `更新于 ${hours}:${minutes}`;
            
            // 根据参数决定是否提示用户
            if (showAlert) {
                setTimeout(() => {
                    alert('天气数据更新成功！');
                }, 500);
            }
        })
        .catch(error => {
            console.error('刷新天气数据失败:', error);
            if (showAlert) {
                alert('天气数据更新失败，请检查网络连接后重试。');
            }
        })
        .finally(() => {
            // 隐藏加载动画
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        });
}

/**
 * 添加城市到我的城市列表
 * @param {Object} city 城市信息对象
 */
function addCityToList(city) {
    // 如果没有传入完整的城市对象，创建一个简单的城市对象
    if (typeof city === 'string') {
        city = {
            name: city,
            temp: '获取中...'
        };
        
        // 尝试获取实时温度
        fetchCurrentWeather(city.name)
            .then(data => {
                if (data && data.now) {
                    updateCityTemp(city.name, data.now.temp + '°');
                }
            })
            .catch(err => console.error('获取城市温度失败:', err));
    }
    
    // 从本地存储获取已保存的城市列表
    let myCities = getSavedCities();
    
    // 检查城市是否已经在列表中
    if (myCities.some(c => c.name === city.name)) {
        alert(`${city.name} 已经在您的城市列表中`);
        return;
    }
    
    // 添加新城市到列表
    myCities.push({
        name: city.name,
        temp: city.temp || '获取中...'
    });
    
    // 保存更新后的城市列表
    localStorage.setItem('myCities', JSON.stringify(myCities));
    
    // 更新城市列表显示
    renderCityList();
    
    alert(`已添加 ${city.name} 到您的城市列表`);
}

/**
 * 从城市列表中移除城市
 * @param {string} cityName 城市名称
 */
function removeCityFromList(cityName) {
    // 从本地存储获取已保存的城市列表
    let myCities = getSavedCities();
    
    // 移除指定城市
    myCities = myCities.filter(city => city.name !== cityName);
    
    // 保存更新后的城市列表
    localStorage.setItem('myCities', JSON.stringify(myCities));
    
    // 更新城市列表显示
    renderCityList();
    
    alert(`已从您的城市列表中移除 ${cityName}`);
}

/**
 * 从本地存储获取保存的城市列表
 * @returns {Array} 城市列表数组
 */
function getSavedCities() {
    const citiesJson = localStorage.getItem('myCities');
    return citiesJson ? JSON.parse(citiesJson) : [
        { name: '上海市', temp: '26°' },
        { name: '广州市', temp: '30°' },
        { name: '深圳市', temp: '31°' }
    ];
}

/**
 * 更新城市列表中某个城市的温度
 * @param {string} cityName 城市名称
 * @param {string} temp 温度值
 */
function updateCityTemp(cityName, temp) {
    const myCities = getSavedCities();
    const cityIndex = myCities.findIndex(c => c.name === cityName);
    
    if (cityIndex !== -1) {
        myCities[cityIndex].temp = temp;
        localStorage.setItem('myCities', JSON.stringify(myCities));
        
        // 更新UI显示
        const tempElement = document.querySelector(`.location-item[data-city="${cityName}"] .location-item-temp`);
        if (tempElement) {
            tempElement.textContent = temp;
        }
    }
}

/**
 * 渲染城市列表到UI
 */
function renderCityList() {
    const locationList = document.querySelector('.location-list');
    if (!locationList) return;
    
    // 获取保存的城市列表
    const myCities = getSavedCities();
    
    // 清空当前列表
    locationList.innerHTML = '';
    
    // 添加城市项到列表
    myCities.forEach(city => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        locationItem.setAttribute('data-city', city.name);
        
        locationItem.innerHTML = `
            <i class="fas fa-map-marker-alt location-item-icon"></i>
            <div class="location-item-name">${city.name}</div>
            <div class="location-item-temp">${city.temp}</div>
            <i class="fas fa-times location-item-remove"></i>
        `;
        
        // 为整个城市项添加点击事件（切换城市）
        locationItem.addEventListener('click', (e) => {
            // 如果点击的是删除按钮，不执行切换城市操作
            if (!e.target.classList.contains('location-item-remove')) {
                switchToCity(city.name);
            }
        });
        
        // 为删除按钮添加点击事件
        const removeBtn = locationItem.querySelector('.location-item-remove');
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.color = '#bdc3c7';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.padding = '5px';
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡到父元素
            if (confirm(`确定要从列表中移除 ${city.name} 吗？`)) {
                removeCityFromList(city.name);
            }
        });
        
        locationList.appendChild(locationItem);
    });
    
    // 为所有新创建的城市项重新添加点击事件
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach(item => {
        // 移除旧的点击事件（如果有）
        item.removeEventListener('click', window.cityItemClickHandler);
        
        // 添加新的点击事件
        window.cityItemClickHandler = (e) => {
            if (!e.target.classList.contains('location-item-remove')) {
                const cityName = item.querySelector('.location-item-name').textContent;
                switchToCity(cityName);
            }
        };
    });
}

/**
 * 增强位置搜索页面的交互功能
 */
function enhanceLocationPage() {
    const addCityBtn = document.createElement('div');
    addCityBtn.className = 'add-city-button';
    addCityBtn.innerHTML = '<i class="fas fa-plus"></i><span>添加到我的城市</span>';
    
    // 样式设置
    Object.assign(addCityBtn.style, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px',
        borderRadius: '10px',
        margin: '20px 0',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    });
    
    addCityBtn.addEventListener('mouseenter', () => {
        addCityBtn.style.backgroundColor = '#2980b9';
    });
    
    addCityBtn.addEventListener('mouseleave', () => {
        addCityBtn.style.backgroundColor = '#3498db';
    });
    
    // 添加点击事件
    addCityBtn.addEventListener('click', () => {
        const currentLocationName = document.querySelector('.location-current-name').textContent;
        addCityToList(currentLocationName);
    });
    
    // 查找放置按钮的位置
    const locationCurrent = document.querySelector('.location-current');
    if (locationCurrent && locationCurrent.parentNode) {
        locationCurrent.parentNode.insertBefore(addCityBtn, locationCurrent.nextSibling);
    }
}

/**
 * 获取浏览器当前位置并更新天气
 */
function getCurrentLocation() {
    // 显示加载动画
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.style.display = 'flex';
    }
    
    // 检查浏览器是否支持地理位置API
    if (navigator.geolocation) {
        // 显示正在获取位置的提示
        const statusInfo = document.createElement('div');
        statusInfo.id = 'location-status';
        statusInfo.style.position = 'fixed';
        statusInfo.style.bottom = '70px';
        statusInfo.style.left = '50%';
        statusInfo.style.transform = 'translateX(-50%)';
        statusInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statusInfo.style.color = 'white';
        statusInfo.style.padding = '10px 20px';
        statusInfo.style.borderRadius = '20px';
        statusInfo.style.zIndex = '1000';
        statusInfo.style.fontSize = '14px';
        statusInfo.innerText = '正在获取您的位置...';
        document.body.appendChild(statusInfo);
        
        // 获取位置
        navigator.geolocation.getCurrentPosition(
            // 成功回调
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`获取到当前位置: 经度 ${longitude}, 纬度 ${latitude}`);
                
                // 更新状态提示
                statusInfo.innerText = '正在获取位置天气信息...';
                
                try {
                    // 根据经纬度查询城市
                    const url = `${WEATHER_API_CONFIG.geoApiUrl}/city/lookup?key=${WEATHER_API_CONFIG.key}&location=${longitude},${latitude}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    // 清除状态提示
                    document.body.removeChild(statusInfo);
                    
                    if (data.code === '200' && data.location && data.location.length > 0) {
                        const city = data.location[0];
                        console.log('当前位置城市:', city.name);
                        
                        // 更新位置显示
                        const locationElements = document.querySelectorAll('#current-location, .location-current-name');
                        locationElements.forEach(el => {
                            if (el) el.textContent = city.name;
                        });
                        
                        // 获取并显示该城市的天气
                        await initRealWeatherData(city.name);
                        
                        // 提示用户
                        setTimeout(() => {
                            alert(`已自动定位到: ${city.name}`);
                        }, 500);
                    } else {
                        console.error('无法根据坐标获取城市信息:', data);
                        alert('无法获取您的城市信息，将显示默认城市天气');
                        refreshWeatherData(false);
                    }
                } catch (error) {
                    console.error('根据坐标获取城市失败:', error);
                    // 清除状态提示
                    if (document.body.contains(statusInfo)) {
                        document.body.removeChild(statusInfo);
                    }
                    alert('获取位置信息失败，将显示默认城市天气');
                    refreshWeatherData(false);
                }
            },
            // 错误回调
            (error) => {
                console.error('获取位置失败:', error);
                // 清除状态提示
                if (document.body.contains(statusInfo)) {
                    document.body.removeChild(statusInfo);
                }
                
                let errorMessage;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = '您拒绝了位置访问请求，将显示默认城市天气';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = '位置信息不可用，将显示默认城市天气';
                        break;
                    case error.TIMEOUT:
                        errorMessage = '获取位置超时，将显示默认城市天气';
                        break;
                    default:
                        errorMessage = '获取位置发生未知错误，将显示默认城市天气';
                }
                
                alert(errorMessage);
                refreshWeatherData(false);
            },
            // 选项
            {
                enableHighAccuracy: true,  // 高精度
                timeout: 10000,            // 超时时间：10秒
                maximumAge: 600000         // 缓存时间：10分钟
            }
        );
    } else {
        // 浏览器不支持地理位置API
        console.error('浏览器不支持地理位置API');
        alert('您的浏览器不支持位置服务，将显示默认城市天气');
        refreshWeatherData(false);
    }
}

/**
 * 初始化分享天气功能
 */
function initShareWeather() {
    // 获取分享按钮
    const shareItem = document.querySelector('.more-item:nth-child(5)');
    
    if (shareItem) {
        shareItem.addEventListener('click', function() {
            // 获取当前天气数据
            const currentWeather = window.weatherData.current;
            
            // 格式化分享内容
            const shareText = `
【小树天气】${currentWeather.location}实时天气
🌡️ 温度：${currentWeather.temperature}°C
🌤️ 天气：${currentWeather.weatherDesc}
💨 风向：${currentWeather.windDirection} ${currentWeather.windSpeed}
💧 湿度：${currentWeather.humidity}%
⏱️ 更新：${currentWeather.updateTime}

今日天气预报：
最高 ${window.weatherData.forecast.daily[0].high}°C
最低 ${window.weatherData.forecast.daily[0].low}°C

来自小树天气APP的分享
`;
            
            // 在移动设备上使用原生分享API
            if (navigator.share) {
                navigator.share({
                    title: '小树天气分享',
                    text: shareText,
                })
                .catch(error => {
                    console.error('分享失败:', error);
                    fallbackShare(shareText);
                });
            } else {
                // 回退方案：复制到剪贴板
                fallbackShare(shareText);
            }
        });
    }
}

/**
 * 分享回退方案：复制到剪贴板
 * @param {string} text 要分享的文本
 */
function fallbackShare(text) {
    // 创建一个临时textarea元素
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    
    try {
        // 选择文本并复制
        textarea.select();
        const successful = document.execCommand('copy');
        
        if (successful) {
            alert('天气信息已复制到剪贴板，可粘贴分享给好友！');
        } else {
            alert('复制失败，请手动分享天气信息。');
        }
    } catch (err) {
        console.error('分享失败:', err);
        alert('无法分享天气信息，请稍后再试。');
    } finally {
        // 移除临时元素
        document.body.removeChild(textarea);
    }
} 