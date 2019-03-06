const hereDoc = require('heredoc');

const str = hereDoc(function() {/*
  <xml>
    <ToUserName><![CDATA[<%= ToUserName %>]]></ToUserName>
    <FromUserName><![CDATA[<%= FromUserName %>]]></FromUserName>
    <CreateTime><%= CreateTime %></CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[<%= Content %>]]></Content>
  </xml>
*/});
module.exports = str;