// 这里需要替换为你自己的Bing API密钥和端点
const bingApiKey = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN'
const bingEndpoint = 'https://api.bing.microsoft.com/v7.0/images/search';

async function setRandomBackgroundImage() {
    const query = "风景"; // 可以根据需要修改查询词
    const response = await fetch(`${bingEndpoint}?q=${encodeURIComponent(query)}&count=1`, {
        headers: {
            'Ocp-Apim-Subscription-Key': bingApiKey
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch image from Bing API");
        return;
    }

    const data = await response.json();
    if (data.value && data.value.length > 0) {
        document.body.style.backgroundImage = `url(${data.value[0].thumbnailUrl})`;
    }
}

setRandomBackgroundImage();