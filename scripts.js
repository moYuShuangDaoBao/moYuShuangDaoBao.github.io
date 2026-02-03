// scripts.js
async function setBingDailyBackground() {
    try {
      // 调用 Bing 每日壁纸官方接口（免费！）
      const response = await fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN');
      
      if (!response.ok) throw new Error('获取背景失败');
  
      const data = await response.json();
      const imageUrl = 'https://www.bing.com' + data.images[0].url;
  
      // 设置背景
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      
      console.log('背景已设置:', imageUrl);
    } catch (error) {
      console.warn('Bing 背景加载失败，使用默认渐变背景');
      document.body.style.background = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)';
    }
  }
  
  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setBingDailyBackground);
  } else {
    setBingDailyBackground();
  }
