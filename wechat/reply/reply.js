const ejs = require('ejs');
const template = require('./template');

const required = (params, method) => {
    for(let key in params) {
        if (!params[key]) {
            throw new Error(`call Replay[${method}] error, ${key} is required`);
        }
    }
}
class Reply {
    static text({FromUserName, ToUserName, Content = ''}) {
        required({ FromUserName, ToUserName}, 'text');
        return ejs.render(template.text, {
            ToUserName,
            FromUserName,
            CreateTime: new Date(),
            Content
        });
    }
    static image({ FromUserName, ToUserName, MediaId }) {
        required({ FromUserName, ToUserName, MediaId}, 'image');
        return ejs.render(template.image, {
            ToUserName,
            FromUserName,
            CreateTime: new Date(),
            MediaId
        });
    }
    static voice({ FromUserName, ToUserName, MediaId }) {
        required({ FromUserName, ToUserName, MediaId }, 'voice');
        return ejs.render(template.voice, {
            ToUserName,
            FromUserName,
            CreateTime: new Date(),
            MediaId
        });
    }
    static video({ FromUserName, ToUserName, MediaId, Title = '', Description = '' }) {
        required({ FromUserName, ToUserName, MediaId }, 'video');
        return ejs.render(template.video, {
            ToUserName,
            FromUserName,
            CreateTime: new Date(),
            MediaId,
            Title,
            Description
        });
    }
    static music({ FromUserName, ToUserName, Title = '', Description = '', MusicUrl, HQMusicUrl = '', ThumbMediaId }) {
        required({ FromUserName, ToUserName, MusicUrl, ThumbMediaId }, 'music');
        return ejs.render(template.music, {
            ToUserName,
            FromUserName,
            CreateTime: new Date(),
            Title,
            Description,
            MusicUrl,
            HQMusicUrl,
            ThumbMediaId
        });
    }
    static news({ FromUserName, ToUserName, ArticleCount, Title, Description, PicUrl, Url }) {
        // 图文消息个数；当用户发送文本、图片、视频、图文、地理位置这五种消息时，开发者只能回复1条图文消息；其余场景最多可回复8条图文消息
        // 图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
        required({ FromUserName, ToUserName, ArticleCount, Title, Description, PicUrl, Url }, 'news');
        return ejs.render(template.music, {
            ToUserName,
            FromUserName,
            CreateTime: new Date(),
            ArticleCount,
            Title,
            Description,
            PicUrl,
            Url
        });
    }
}

module.exports = Reply;