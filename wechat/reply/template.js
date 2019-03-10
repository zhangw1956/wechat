const hereDoc = require('heredoc');

const start = hereDoc(function () {/*
  <xml>
    <ToUserName><![CDATA[<%= ToUserName %>]]></ToUserName>
    <FromUserName><![CDATA[<%= FromUserName %>]]></FromUserName>
    <CreateTime><%= CreateTime %></CreateTime>
*/});

const end = hereDoc(function () {/*
  </xml>
*/});

const _hereDoc = (fn) => (start + hereDoc(fn) + end);

const text = _hereDoc(function() {/*
  <MsgType><![CDATA[text]]></MsgType>
  <Content><![CDATA[<%= Content %>]]></Content>
*/});

const image = _hereDoc(function () {/*
  <MsgType><![CDATA[image]]></MsgType>
  <Image>
    <MediaId><![CDATA[<%= MediaId %>]]></MediaId>
  </Image>
*/});

const voice = _hereDoc(function () {/*
  <MsgType><![CDATA[voice]]></MsgType>
  <Voice>
    <MediaId><![CDATA[<%= MediaId %>]]></MediaId>
  </Voice>
*/});

const video = _hereDoc(function () {/*
  <MsgType><![CDATA[video]]></MsgType>
  <Video>
    <MediaId><![CDATA[<%= MediaId %>]]></MediaId>
    <Title><![CDATA[<%= Title %>]]></Title>
    <Description><![CDATA[<%= Description %>]]></Description>
  </Video>
*/});

const music = _hereDoc(function () {/*
  <MsgType><![CDATA[music]]></MsgType>
  <Music>
    <Title><![CDATA[<%= Title %>]]></Title>
    <Description><![CDATA[<%= Description %>]]></Description>
    <MusicUrl><![CDATA[<%= MusicUrl %>]]></MusicUrl>
    <HQMusicUrl><![CDATA[<%= HQMusicUrl %>]]></HQMusicUrl>
    <ThumbMediaId><![CDATA[<%= ThumbMediaId %>]]></ThumbMediaId>
  </Music>
*/});

const news = _hereDoc(function () {/*
  <MsgType><![CDATA[news]]></MsgType>
  <ArticleCount><%= ArticleCount %></ArticleCount>
  <Articles>
    <item>
      <Title><![CDATA[<%= Title %>]]></Title>
      <Description><![CDATA[<%= Description %>]]></Description>
      <PicUrl><![CDATA[<%= PicUrl %>]]></PicUrl>
      <Url><![CDATA[<%= Url %>]]></Url>
    </item>
  </Articles>
*/});

module.exports = {
  text,
  image,
  voice,
  video,
  music,
  news
};