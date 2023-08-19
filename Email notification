function syaini(){
  var ssh = SpreadsheetApp.openById('15kQKo7Yu6_ML9dlHGA5jmxSZoXQFBvu5O56G9qlnO-s');
  var now = ssh.getRange('A2').getValue();
  var o_past = ssh.getRange('A5').getValue();
  var clear_count = ssh.getRange('B5').getValue();
  
  var shouldSendSlack = false; // Slackメッセージを送信するかどうかのフラグ
  for(let times = 0; times <= 2; times++){
    if(o_past == 0 && now == 1){
      var text = open_message();
      shouldSendSlack = true; // Slackメッセージを送信するフラグを立てる
      o_past = clear_count;
      console.log(o_past);
      break;
    }else{}
  }

  if (shouldSendSlack) {
    console.log(o_past);
    send_slack(text); // Slackメッセージを送信
  }
}

function Bay(){
  var ssh = SpreadsheetApp.openById('15kQKo7Yu6_ML9dlHGA5jmxSZoXQFBvu5O56G9qlnO-s');
  var now = ssh.getRange('A2').getValue();
  var c_past = ssh.getRange('A8').getValue();
  var clear_count = ssh.getRange('B5').getValue();
  
  var shouldSendSlack = false; // Slackメッセージを送信するかどうかのフラグ
for(let times = 0; times <= 1; times++){
    if(c_past == 1 && now == 0){
      var text = close_message();
      shouldSendSlack = true; // Slackメッセージを送信するフラグを立てる
      c_past = clear_count;
      console.log(c_past);
      break;
    }
  }
  if (shouldSendSlack) {
    console.log(c_past);
    send_slack(text); // Slackメッセージを送信
  }
}

function open_message() {
return  `シャイニー！`
} 

function close_message() {
return  `バ～イ`
} 


function send_slack(sendtext) {
  const webhook_url ="https://hooks.slack.com/services/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"//指定のチャンネルのWebHook_URL
  const headers = { "Content-type": "application/json" }
  var jsonData = {"icon": '',//好きなアイコン（基本名前と画像はIncoming Webhook側で設定）
                  "bot_name" : '',//アイコンの名前
                  "text" :`<@U05K1G2GFD2>現在の研究室は...`,//@メンション(ユーザーID)&メッセージ
  "attachments" : [
    {
     "text": sendtext,
     "color": "#3AA3E3",//マークダウンの色（カラーコード）
    }]
  };
  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(jsonData),//データの形式をJSONに変換する
    "muteHttpExceptions": true
    }
UrlFetchApp.fetch(webhook_url, options)//スラックに送る
}
