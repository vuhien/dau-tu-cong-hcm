/* Xuất nội dung các tab: PDF (hộp thoại in), Word (.doc), Excel (.xls SpreadsheetML). Không dùng thư viện ngoài. */
(function(){
"use strict";
var CKROOTS=["ck","ck2","ck3"];
function roman(n){var r=[[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],s="";r.forEach(function(p){while(n>=p[0]){s+=p[1];n-=p[0]}});return s}
function shortId(id){return id==="tv"?"VB":roman(+id.slice(1))}
function tabName(id){for(var i=0;i<window.TABS.length;i++)if(window.TABS[i].id===id)return window.TABS[i].name;return id}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function clean(s){return String(s).replace(/\s+/g," ").trim()}
function stamp(){var d=new Date();function p(x){return (x<10?"0":"")+x}return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())}
function selected(){var o=[];[].forEach.call(document.querySelectorAll("#ex_tabs input:checked"),function(c){o.push(c.value)});
  return window.TABS.map(function(t){return t.id}).filter(function(id){return o.indexOf(id)>-1})}
function msg(t){var m=document.getElementById("ex_msg");if(m)m.textContent=t||""}
function dl(name,mime,content){
  var b=new Blob([content],{type:mime});var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;
  document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},800);
}

/* bảng danh mục văn bản (tab Văn bản) */
function docsTable(){
  var D=(window.VB&&window.VB.docs)||[];
  var h='<h2>Văn bản pháp luật được sử dụng</h2><table><thead><tr><th>Loại</th><th>Số hiệu</th><th>Tên văn bản</th><th>Ngày ký</th><th>Hiệu lực</th><th>Tình trạng</th><th>Đã đọc đến đâu</th></tr></thead><tbody>';
  D.forEach(function(d){h+="<tr><td>"+esc(d.grp)+"</td><td>"+esc(d.so)+"</td><td>"+esc(d.ten)+"</td><td>"+esc(d.ky||"")+"</td><td>"+esc(d.hl||"")+"</td><td>"+esc(d.tt)+"</td><td>"+esc(d.doc)+"</td></tr>"});
  return h+"</tbody></table>";
}

/* bản sao đã làm sạch của một tab */
function cleanClone(id){
  var holder=document.createElement("div");
  if(id==="tv"){holder.innerHTML=docsTable();return holder}
  var sec=document.getElementById(id).cloneNode(true);
  [].forEach.call(sec.querySelectorAll(".pending,.vbtools,.ckbar,script"),function(x){x.remove()});
  [].forEach.call(sec.querySelectorAll(".calc"),function(c){var p=document.createElement("p");p.className="note";var sm=c.querySelector("small");p.textContent="Công cụ tính trên trang web (không xuất). "+(sm?clean(sm.textContent):"");c.parentNode.replaceChild(p,c)});
  [].forEach.call(sec.querySelectorAll("select.st"),function(s){
    var v=s.value;var sp=document.createElement("b");sp.textContent=v==="1"?"[Đạt] ":v==="2"?"[Không áp dụng] ":"[Chưa] ";s.parentNode.replaceChild(sp,s)});
  [].forEach.call(sec.querySelectorAll("button,input,select,textarea"),function(x){x.remove()});
  [].forEach.call(sec.querySelectorAll("a"),function(a){
    var h=a.getAttribute("href")||"";
    if(h.indexOf("#")===0||!h){var s=document.createElement("span");s.innerHTML=a.innerHTML;a.parentNode.replaceChild(s,a)}
  });
  [].forEach.call(sec.querySelectorAll("details"),function(d){d.setAttribute("open","")});
  sec.removeAttribute("class");sec.removeAttribute("id");
  holder.appendChild(sec);return holder;
}

/* ---------- Word ---------- */
function exportWord(ids){
  var body="";
  ids.forEach(function(id,i){body+=(i?'<br clear="all" style="page-break-before:always">':"")+cleanClone(id).innerHTML});
  var html='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Quy trình Đầu tư công - TP.HCM</title><style>'+
   'body{font-family:"Times New Roman",serif;font-size:12pt;line-height:1.35}h2{font-size:16pt;color:#083a68}h3{font-size:13pt;color:#0b4f8a}h4{font-size:12pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #555;padding:3pt 5pt;vertical-align:top;font-size:10.5pt}th{background:#dde8f3}.note{font-size:10pt;color:#444}.box{border:1px solid #bbb;padding:4pt 8pt;margin:6pt 0}'+
   '</style></head><body><h1 style="font-size:18pt">Quy trình Đầu tư công - TP.HCM</h1><p>Công ty Cổ phần Tư vấn Giao thông Thành phố Hồ Chí Minh (TDC) · 0978 488 260 · vuvhien@gmail.com · tuvangiaothong.com</p><p class="note">Xuất ngày '+new Date().toLocaleDateString("vi-VN")+'. Các tab: '+esc(ids.map(tabName).join("; "))+'. Nội dung tổng hợp từ văn bản pháp luật; cần đối chiếu văn bản gốc trước khi trích dẫn.</p>'+body+'</body></html>';
  dl("Dau-tu-cong-TPHCM-"+stamp()+".doc","application/msword;charset=utf-8","﻿"+html);
}

/* ---------- Excel (SpreadsheetML 2003) ---------- */
function cell(v,style,num){
  var t=num?"Number":"String";
  return '<Cell'+(style?' ss:StyleID="'+style+'"':"")+'><Data ss:Type="'+t+'">'+esc(v)+'</Data></Cell>';
}
function row(cells){return "<Row>"+cells.join("")+"</Row>"}
var usedNames={};
function sheet(name,rows,widths){
  name=name.replace(/[\[\]:*?\/\\]/g," ").slice(0,28);var base=name,n=1;
  while(usedNames[name]){n++;name=base.slice(0,26)+" "+n}
  usedNames[name]=1;
  var cols=(widths||[]).map(function(w){return '<Column ss:Width="'+w+'"/>'}).join("");
  return '<Worksheet ss:Name="'+esc(name)+'"><Table>'+cols+rows.join("")+'</Table></Worksheet>';
}
function tableGrid(tb){
  var grid=[],occ=[];
  [].forEach.call(tb.rows,function(tr,r){
    grid[r]=grid[r]||[];occ[r]=occ[r]||{};var c=0;
    [].forEach.call(tr.cells,function(td){
      while(occ[r][c])c++;
      var rs=+td.getAttribute("rowspan")||1,cs=+td.getAttribute("colspan")||1,txt=clean(td.textContent);
      for(var i=0;i<rs;i++){for(var j=0;j<cs;j++){occ[r+i]=occ[r+i]||{};occ[r+i][c+j]=1;grid[r+i]=grid[r+i]||[];grid[r+i][c+j]=(i===0&&j===0)?txt:""}}
      c+=cs;
    });
  });
  return {grid:grid,head:tb.tHead?tb.tHead.rows.length:1};
}
function textRows(clone){
  var rows=[];
  var els=clone.querySelectorAll("h2,h3,h4,p,li,.box,summary");
  [].forEach.call(els,function(e){
    if(e.closest("table")||e.closest(".scorebox"))return;
    var bx=e.closest(".box");if(bx&&bx!==e)return;
    if(e.tagName==="P"&&e.closest("li"))return;
    if(e.tagName==="LI"&&e.closest("li")!==e&&e.parentNode.closest("li"))return;
    var t=clean(e.textContent);if(!t)return;
    var st=e.tagName==="H2"||e.tagName==="H3"||e.tagName==="H4"?"H":"W";
    rows.push(row([cell((e.tagName==="LI"?"- ":"")+t,st)]));
  });
  return rows;
}
function exportExcel(ids){
  usedNames={};
  var sheets=[];
  ids.forEach(function(id){
    var clone=cleanClone(id);var sid=shortId(id);
    var tr=textRows(clone);
    if(tr.length)sheets.push(sheet(sid+" Nội dung",tr,[640]));
    var k=0;
    [].forEach.call(clone.querySelectorAll("table"),function(tb){
      if(tb.closest(".scorebox"))return;
      k++;var g=tableGrid(tb);var rows=g.grid.map(function(r,i){return row(r.map(function(v){return cell(v==null?"":v,i<g.head?"H":"W")}))});
      var w=g.grid[0]?g.grid[0].map(function(){return 150}):[];
      sheets.push(sheet(sid+" Bảng "+k,rows,w));
    });
    CKROOTS.forEach(function(rid){
      var root=document.getElementById(rid);if(!root||!document.getElementById(id).contains(root)||!window.CKALL||!CKALL[rid])return;
      var C=CKALL[rid],r=C.res,rows=[];
      rows.push(row([cell("Điểm hoàn thành (thang 100)","H"),cell(r.score===null?"":(Math.round(r.score*10)/10),"W",r.score!==null),cell(ckRating(r.score),"W")]));
      rows.push(row([cell("Số mục đạt","H"),cell(r.done,"W",true)]));
      rows.push(row([cell("Số mục áp dụng","H"),cell(r.ap,"W",true)]));
      rows.push(row([cell("Số mục không áp dụng","H"),cell(r.na,"W",true)]));
      rows.push(row([cell("","W")]));
      rows.push(row([cell("Nhóm","H"),cell("Đạt","H"),cell("Áp dụng","H"),cell("Tổng","H"),cell("Điểm đạt","H"),cell("Điểm tối đa","H")]));
      r.groups.forEach(function(g){rows.push(row([cell(g.name,"W"),cell(g.done,"W",true),cell(g.ap,"W",true),cell(g.total,"W",true),cell(Math.round(g.pts*10)/10,"W",true),cell(Math.round(g.max*10)/10,"W",true)]))});
      rows.push(row([cell("","W")]));
      rows.push(row([cell("Nhóm","H"),cell("Nội dung kiểm tra","H"),cell("Căn cứ","H"),cell("Trạng thái","H")]));
      C.data.forEach(function(g,i){g[1].forEach(function(it,j){var v=C.st[i+"-"+j];rows.push(row([cell(g[0],"W"),cell(it[0],"W"),cell(it[1],"W"),cell(v===1?"Đạt":v===2?"Không áp dụng":"Chưa","W")]))})});
      sheets.push(sheet(sid+" Checklist "+rid.replace("ck","")||sid+" Checklist",rows,[170,520,220,100]));
    });
  });
  if(!sheets.length){msg("Chưa có nội dung để xuất.");return}
  var xml='<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'+
   '<Styles><Style ss:ID="Default"><Alignment ss:Vertical="Top"/></Style><Style ss:ID="H"><Font ss:Bold="1"/><Interior ss:Color="#DDE8F3" ss:Pattern="Solid"/><Alignment ss:Vertical="Top" ss:WrapText="1"/></Style><Style ss:ID="W"><Alignment ss:Vertical="Top" ss:WrapText="1"/></Style></Styles>'+
   sheets.join("")+'</Workbook>';
  dl("Dau-tu-cong-TPHCM-"+stamp()+".xls","application/vnd.ms-excel;charset=utf-8",xml);
}

/* ---------- PDF (in) ---------- */
function exportPdf(ids){
  var secs=ids.map(function(id){return document.getElementById(id)});
  var opened=[];
  secs.forEach(function(s){s.classList.add("pr");[].forEach.call(s.querySelectorAll("details"),function(d){if(!d.open){d.open=true;opened.push(d)}})});
  document.body.classList.add("prmode");
  var done=false;
  function restore(){if(done)return;done=true;document.body.classList.remove("prmode");secs.forEach(function(s){s.classList.remove("pr")});opened.forEach(function(d){d.open=false})}
  window.addEventListener("afterprint",restore,{once:true});
  setTimeout(function(){window.print();setTimeout(restore,1500)},60);
}

function init(){
  var b=document.getElementById("expbody");if(!b)return;
  b.innerHTML='<p class="note">Chọn tab cần xuất. <b>PDF</b>: mở hộp thoại in của trình duyệt, chọn “Lưu thành PDF”. <b>Word</b>: tải file .doc (mở bằng Word). <b>Excel</b>: tải file .xls, mỗi bảng là một trang tính; checklist có thêm trang tính kèm điểm.</p>'+
   '<div><button type="button" class="btn" id="ex_cur">Chỉ tab đang xem</button><button type="button" class="btn" id="ex_all">Chọn tất cả</button><button type="button" class="btn" id="ex_none">Bỏ chọn</button></div>'+
   '<div class="tabsel" id="ex_tabs"></div>'+
   '<div><button type="button" class="btn" id="ex_pdf">Xuất PDF</button><button type="button" class="btn" id="ex_doc">Xuất Word</button><button type="button" class="btn" id="ex_xls">Xuất Excel</button> <span id="ex_msg" class="note"></span></div>';
  var box=document.getElementById("ex_tabs");
  window.TABS.forEach(function(t){var l=document.createElement("label");var c=document.createElement("input");c.type="checkbox";c.value=t.id;l.appendChild(c);l.appendChild(document.createTextNode(" "+t.name));box.appendChild(l)});
  function current(){var s=document.querySelector("section.tab.on");return s?s.id:"tv"}
  function setAll(v){[].forEach.call(box.querySelectorAll("input"),function(c){c.checked=v})}
  function only(id){setAll(false);var c=box.querySelector('input[value="'+id+'"]');if(c)c.checked=true}
  document.getElementById("ex_cur").onclick=function(){only(current())};
  document.getElementById("ex_all").onclick=function(){setAll(true)};
  document.getElementById("ex_none").onclick=function(){setAll(false)};
  document.getElementById("exp").addEventListener("toggle",function(){if(this.open&&!selected().length)only(current())});
  function run(fn,label){return function(){var ids=selected();if(!ids.length){msg("Hãy chọn ít nhất một tab.");return}msg("Đang tạo "+label+"…");try{fn(ids);msg("Đã tạo "+label+" ("+ids.length+" tab).")}catch(e){msg("Lỗi khi tạo "+label+": "+e.message)}}}
  document.getElementById("ex_pdf").onclick=run(exportPdf,"PDF");
  document.getElementById("ex_doc").onclick=run(exportWord,"file Word");
  document.getElementById("ex_xls").onclick=run(exportExcel,"file Excel");
  window.EXPORT={word:function(ids){return buildWord(ids)},clone:cleanClone};
}
function buildWord(ids){var b="";ids.forEach(function(id){b+=cleanClone(id).innerHTML});return b}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
