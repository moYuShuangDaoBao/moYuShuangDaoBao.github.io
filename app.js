// 全局函数
function openModal(type) {
    closeAllModals();
    
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // 加载内容
        switch(type) {
            case 'music': loadMusicPlayer(); break;
            case 'logs': loadLogs(); break;
            case 'weather': showWeather(); break;
            case 'news': showNews(); break;
            case 'quote': showQuote(); break;
        }
    }
}

function closeModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// 音乐播放器
let musicPlayer = {
    isPlaying: false,
    currentSong: 0,
    songs: [
        { title: "LAPLACE主题曲", artist: "明前奶绿", duration: "3:45" },
        { title: "静谧之夜", artist: "钢琴曲", duration: "4:20" },
        { title: "代码协奏曲", artist: "开发者", duration: "3:15" },
        { title: "雨声白噪音", artist: "专注音乐", duration: "5:30" }
    ]
};

function loadMusicPlayer() {
    const content = document.getElementById('music-content');
    const song = musicPlayer.songs[musicPlayer.currentSong];
    
    content.innerHTML = `
        <div class="music-player">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            
            <div class="progress-bar" onclick="updateProgress(event)">
                <div class="progress" id="music-progress"></div>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <span id="current-time">0:00</span>
                <span>${song.duration}</span>
            </div>
            
            <div class="player-controls">
                <button class="control-btn" onclick="prevSong()">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="control-btn play-btn" onclick="togglePlay()" id="play-btn">
                    <i class="fas fa-play" id="play-icon"></i>
                </button>
                <button class="control-btn" onclick="nextSong()">
                    <i class="fas fa-step-forward"></i>
                </button>
            </div>
            
            <div style="margin-top: 20px;">
                <h4>播放列表</h4>
                <div id="song-list" style="margin-top: 10px;"></div>
            </div>
        </div>
    `;
    
    renderPlaylist();
    if (musicPlayer.isPlaying) {
        startProgress();
    }
}

function togglePlay() {
    const btn = document.getElementById('play-btn');
    const icon = document.getElementById('play-icon');
    
    musicPlayer.isPlaying = !musicPlayer.isPlaying;
    
    if (musicPlayer.isPlaying) {
        icon.className = 'fas fa-pause';
        startProgress();
    } else {
        icon.className = 'fas fa-play';
        clearInterval(window.progressInterval);
    }
}

function startProgress() {
    clearInterval(window.progressInterval);
    
    let current = 0;
    const total = 220; // 总秒数
    
    window.progressInterval = setInterval(() => {
        if (!musicPlayer.isPlaying) return;
        
        current++;
        const percent = (current / total) * 100;
        document.getElementById('music-progress').style.width = `${percent}%`;
        
        // 更新时间
        const min = Math.floor(current / 60);
        const sec = current % 60;
        document.getElementById('current-time').textContent = 
            `${min}:${sec.toString().padStart(2, '0')}`;
        
        if (current >= total) {
            nextSong();
        }
    }, 1000);
}

function updateProgress(e) {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    
    document.getElementById('music-progress').style.width = `${percent}%`;
    
    // 更新时间（模拟）
    const total = 220;
    const current = Math.floor((percent / 100) * total);
    const min = Math.floor(current / 60);
    const sec = current % 60;
    document.getElementById('current-time').textContent = 
        `${min}:${sec.toString().padStart(2, '0')}`;
}

function prevSong() {
    musicPlayer.currentSong = musicPlayer.currentSong > 0 ? 
        musicPlayer.currentSong - 1 : musicPlayer.songs.length - 1;
    loadMusicPlayer();
}

function nextSong() {
    musicPlayer.currentSong = musicPlayer.currentSong < musicPlayer.songs.length - 1 ? 
        musicPlayer.currentSong + 1 : 0;
    loadMusicPlayer();
}

function renderPlaylist() {
    const list = document.getElementById('song-list');
    if (!list) return;
    
    list.innerHTML = musicPlayer.songs.map((song, index) => `
        <div class="song-item ${index === musicPlayer.currentSong ? 'active' : ''}" 
             onclick="selectSong(${index})">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <div>${song.title}</div>
                    <div style="font-size: 0.85rem; color: #aaa;">${song.artist}</div>
                </div>
                <div style="color: #aaa;">${song.duration}</div>
            </div>
        </div>
    `).join('');
}

function selectSong(index) {
    musicPlayer.currentSong = index;
    loadMusicPlayer();
    if (musicPlayer.isPlaying) {
        startProgress();
    }
}

// 日志系统
function loadLogs() {
    const logs = [
        { date: '2023-10-15', content: '重构了LAPLACE项目，采用更简洁的设计。' },
        { date: '2023-10-10', content: '集成了音乐播放器和日志功能。' },
        { date: '2023-10-05', content: '开始构建个人门户网站。' },
        { date: '2023-10-01', content: '项目启动，目标是打造简洁高效的个人空间。' }
    ];
    
    const content = document.getElementById('logs-content');
    content.innerHTML = `
        <div>
            ${logs.map(log => `
                <div class="log-item">
                    <div class="log-date">
                        <i class="far fa-calendar"></i> ${log.date}
                    </div>
                    <div>${log.content}</div>
                </div>
            `).join('')}
            
            <button onclick="addNewLog()" style="
                background: rgba(74, 222, 128, 0.1);
                color: var(--primary);
                border: 1px solid var(--primary);
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                width: 100%;
                margin-top: 20px;
            ">
                <i class="fas fa-plus"></i> 添加新日志
            </button>
        </div>
    `;
}

function addNewLog() {
    const title = prompt('请输入日志标题:');
    if (!title) return;
    
    const content = prompt('请输入日志内容:');
    if (!content) return;
    
    const today = new Date().toISOString().split('T')[0];
    alert(`已添加日志: ${title}\n\n日期: ${today}\n内容: ${content}`);
}

// 天气功能
function showWeather() {
    const weathers = ['☀️ 晴朗 22°C', '⛅ 多云 19°C', '🌧️ 小雨 17°C', '☁️ 阴天 20°C'];
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    
    alert(`当前天气:\n\n${randomWeather}\n\n湿度: 65%\n更新时间: ${new Date().toLocaleTimeString()}`);
    
    // 更新卡片显示
    document.getElementById('weather-text').textContent = randomWeather;
}

// 新闻功能
function showNews() {
    const news = [
        'AI技术新突破：GPT-5即将发布',
        '前端开发新趋势：WebAssembly应用增加',
        'JavaScript框架更新：React 19发布',
        '开源社区：GitHub Copilot用户突破百万'
    ];
    
    const randomNews = news[Math.floor(Math.random() * news.length)];
    alert(`最新新闻:\n\n${randomNews}`);
}

// 名言功能
function showQuote() {
    const quotes = [
        { text: "代码像诗一样，应该简洁而优雅。", author: "佚名" },
        { text: "编程不是关于打字，而是关于思考。", author: "匿名程序员" },
        { text: "最简单的方式往往是最有效的。", author: "奥卡姆剃刀原理" }
    ];
    
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(`"${quote.text}"\n\n— ${quote.author}`);
}

// 初始化时间显示
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = 
        now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
}

// 点击模态框外部关闭
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeAllModals();
    }
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    
    // 初始化天气显示
    showWeather();
    
    console.log('LAPLACE 应用已启动');
});