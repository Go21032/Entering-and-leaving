function doGet(e){
  var page=e.parameter["p"];

  if(page == "index" || page==null){
    var ssh = SpreadsheetApp.openById('15kQKo7Yu6_ML9dlHGA5jmxSZoXQFBvu5O56G9qlnO-s'); //スタンドアローン化したSpreadsheetに接続
    var num = ssh.getRange('A2').getValue(); //現在の入室人数を保存しているセル'A2'の値を取得
    var index = HtmlService.createTemplateFromFile("index"); //index.htmlをオブジェクト化し変数宣言
    index.num = num; // index変数にnumという変数を動的に渡せるように設定
    var output = index.evaluate()
    output.addMetaTag('viewport','width=device-width, initial-scale=1');//Webページをスマホで表示させる
    return output;
  }
  else if(page =="in"){
    const sheet = SpreadsheetApp.openById('15kQKo7Yu6_ML9dlHGA5jmxSZoXQFBvu5O56G9qlnO-s');//スタンドアローン化したSpreadsheetに接続
    value = sheet.getRange('A2').getValue();//現在の入室人数を保存しているセル'A2'の値を取得し，value変数に代入
    value = value + 1;//value変数に1を加算して，value変数を更新
    value = sheet.getRange('B2').setValue(value);//更新されたvalue変数をセル'B2'に代入し条件分岐で0以下にならないようにする（スプレッドシートで計算）
    var output = HtmlService.createTemplateFromFile("in").evaluate();
    output.addMetaTag('viewport','width=device-width, initial-scale=1');//Webページをスマホで表示させる
    var response = { text: e.parameter.text + '入室記録しました'};
    var name = e.parameter.text;
    enter(name);
    ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    return output;
}
  else if(page =="out"){
    const sheet = SpreadsheetApp.openById('15kQKo7Yu6_ML9dlHGA5jmxSZoXQFBvu5O56G9qlnO-s');//スタンドアローン化したSpreadsheetに接続
    value = sheet.getRange('A2').getValue();
    value = value - 1;//value変数に1を減算して，value変数を更新
    value = sheet.getRange('B2').setValue(value);//更新されたvalue変数をセル'B2'に代入し条件分岐で0以下にならないようにする（スプレッドシートで計算）    
    var output = HtmlService.createTemplateFromFile("out").evaluate();
    output.addMetaTag('viewport','width=device-width, initial-scale=1');
    var response = { text: e.parameter.text + '退出記録しました'};
    var name = e.parameter.text;
    leaving(name);
    ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    return output;
  }
  else{
    return HtmlService.createTemplateFromFile("error").evaluate();
  }
}

function doPost(e) {
 var response = { text: e.parameter.text + '入室しました'};
 var name = e.parameter.text;
 createEvent(name);
 return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

//スプレッドシートに入室ログを出力
function enter(name) {
  const id = '15kQKo7Yu6_ML9dlHGA5jmxSZoXQFBvu5O56G9qlnO-s';
  const spredsheet = SpreadsheetApp.openById(id);
  const sheet = spredsheet.getSheetByName('入退室ログ');
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1,2).setValue(name);
  var d = new Date(); 
  var y = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  var h = d.getHours();
  var min = d.getMinutes();
  var now = y + "/" + mon + "/" + day + "/"+h + ":" + min;
  sheet.getRange(lastRow + 1,2).setValue("入室");
  sheet.getRange(lastRow + 1,3).setValue(now);
}

//スプレッドシートに退出ログを出力
function leaving(name) {
  const id = '15kQKo7Yu6_ML9dlHGA5jmxSZoXQFBvu5O56G9qlnO-s';
  const spredsheet = SpreadsheetApp.openById(id);
  const sheet = spredsheet.getSheetByName('入退室ログ');
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1,2).setValue(name);
  var d = new Date(); 
  var y = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  var h = d.getHours();
  var min = d.getMinutes();
  var now = y + "/" + mon + "/" + day + "/"+h + ":" + min;
  sheet.getRange(lastRow + 1,2).setValue("退出");
  sheet.getRange(lastRow + 1,3).setValue(now);
}
