/* Tab "Văn bản": danh mục văn bản, bộ xem nguyên văn các điều đã nạp, tự động gắn liên kết trích dẫn trong các tab khác. */
(function(){
"use strict";
var T=window.VB_TEXT=window.VB_TEXT||{};
function hp(base){return function(a){return base+"dieu-"+a}}
var HP58="https://hethongphapluat.com/law-no-58-2024-qh15-dated-november-29-2024-on-public-investment/";
var HPXD="https://hethongphapluat.com/law-no-135-2025-qh15-dated-december-10-2025-on-construction/";
var HP85="https://hethongphapluat.com/nghi-dinh-85-2025-nd-cp-huong-dan-luat-dau-tu-cong/";
var HP254="https://hethongphapluat.com/decree-no-254-2025-nd-cp-dated-september-26-2025-on-management-disbursement-payment-and-statement-of-projects-using-public-investment-capital/";
var HP214="https://hethongphapluat.com/nghi-dinh-214-2025-nd-cp-huong-dan-luat-dau-thau-ve-lua-chon-nha-thau/";

function nd(n,y){return "(?:NĐ|Nghị định) "+n+"(?:\\/"+y+")?(?:\\/NĐ-CP)?(?![\\d\\/])"}
function tt(n,y,s){return "(?:TT|Thông tư) "+n+"(?:\\/"+y+")?(?:\\/"+s+")?(?![\\d\\/])"}

var LV={
  full:["Có nguyên văn các điều đã trích trong trang","ok"],
  art:["Đã đọc từng điều qua hethongphapluat.com","info"],
  repost:["Đọc qua trang đăng lại, nhiều trang bị cắt","warn"],
  news:["Chỉ có bài báo hoặc kết quả tìm kiếm","muted"],
  none:["Chưa đọc","muted"]
};

var DOCS=[
 {id:"l58",grp:"Luật",so:"58/2024/QH15",ten:"Luật Đầu tư công",ky:"29/11/2024",hl:"01/01/2025",tt:"Đang áp dụng; đã sửa đổi, bổ sung bởi Luật 90/2025/QH15 (Điều 7)",lvl:"art",doc:"Điều 8 đến 11, 18, 19, 46, 57 đọc từng khoản trên hethongphapluat.com. Các điều bị Luật 90/2025 sửa đã có nguyên văn phần sửa trong trang (xem Luật 90/2025 Điều 7). Một số điều khác theo bản tóm tắt trên caselaw.vn.",
  ext:[["thuvienphapluat.vn (có thể yêu cầu xác minh trình duyệt)","https://thuvienphapluat.vn/van-ban/dau-tu/Luat-Dau-tu-cong-2024-so-58-2024-QH15-621645.aspx"],["hethongphapluat.com (từng điều)",HP58+"dieu-1"],["caselaw.vn","https://caselaw.vn/van-ban-phap-luat/411499-luat-dau-tu-cong-so-58-2024-qh15-ngay-29-11-2024-cua-quoc-hoi"]],
  deep:hp(HP58),p:"Luật (?:Đầu tư công )?58\\/2024(?:\\/QH15)?|Luật Đầu tư công(?: 2024)?|Luật 58(?!\\d)",main:1},
 {id:"l90",grp:"Luật",so:"90/2025/QH15",ten:"Luật sửa đổi, bổ sung một số điều của Luật Đấu thầu, Luật Đầu tư theo phương thức đối tác công tư, Luật Hải quan, Luật Thuế giá trị gia tăng, Luật Thuế xuất khẩu, thuế nhập khẩu, Luật Đầu tư, Luật Đầu tư công, Luật Quản lý, sử dụng tài sản công",ky:"25/6/2025",hl:"01/7/2025",tt:"Kho regai ghi “hết hiệu lực một phần”",lvl:"full",doc:"Điều 7 (sửa Luật Đầu tư công) và Điều 9 có nguyên văn trong trang; Điều 1 đến 6, 8, 10 chưa nạp (xem liên kết toàn văn).",
  ext:[["hoatieu.vn","https://hoatieu.vn/phap-luat/luat-sua-doi-bo-sung-cac-luat-so-90-2025-qh15-234277"],["hhtip.hanoi.gov.vn","https://hhtip.hanoi.gov.vn:443/en/archives/view/luat-so-90-2025-qh15-120.html"]],
  p:"Luật 90\\/2025(?:\\/QH15)?",main:1},
 {id:"lxd",grp:"Luật",so:"135/2025/QH15",ten:"Luật Xây dựng",ky:"10/12/2025",hl:"01/7/2026 (một số điều từ 01/01/2026)",tt:"Đang áp dụng; thay Luật Xây dựng 50/2014/QH13",lvl:"art",doc:"Điều 24, 26, 27, 29, 30, 31, 42, 62, 88, 90, 95 đọc từng điều trên hethongphapluat.com.",
  ext:[["hethongphapluat.com (từng điều)",HPXD+"dieu-1"],["qlda.gxd.vn","https://qlda.gxd.vn/van-ban/luat/luat-xay-dung-135-2025.html"],["thuvienphapluat.vn (tiếng Anh)","https://thuvienphapluat.vn/van-ban/EN/Xay-dung-Do-thi/Law-135-2025-QH15-on-construction/689624/tieng-anh.aspx"]],
  deep:hp(HPXD),p:"Luật XD(?: 135\\/2025)?|Luật Xây dựng(?: 135\\/2025(?:\\/QH15)?| 2025)|Luật Xây dựng(?! 2014| 50)",main:1},
 {id:"ldt",grp:"Luật",so:"22/2023/QH15",ten:"Luật Đấu thầu",ky:"23/6/2023",hl:"01/01/2024",tt:"Đã sửa đổi bởi Luật 90/2025/QH15 (Điều 1)",lvl:"news",doc:"Chưa có trong kho regai và chưa đọc nguyên văn; chỉ được nhắc đến qua Nghị định 214/2025.",ext:[],p:"Luật Đấu thầu(?: 2023| 22\\/2023(?:\\/QH15)?)?",ref:1},
 {id:"l141",grp:"Luật",so:"141/2025/QH15",ten:"Luật sửa đổi Luật Quản lý nợ công",ky:"10/12/2025",hl:"01/01/2026",tt:"Không sửa phần đầu tư công của Luật 90/2025 (theo kết quả tìm kiếm)",lvl:"news",doc:"Chưa đọc toàn văn.",ext:[["thuvienphapluat.vn (toàn văn)","https://thuvienphapluat.vn/phap-luat-nha-dat/toan-van-luat-sua-doi-luat-quan-ly-no-cong-luat-so-1412025qh15-13291.html"]],p:"Luật 141\\/2025(?:\\/QH15)?",ref:1},
 {id:"l72",grp:"Luật",so:"72/2025/QH15",ten:"Luật Tổ chức chính quyền địa phương (sửa đổi)",ky:"2025",hl:"Cấp huyện chấm dứt từ 01/7/2025",tt:"Theo tin báo chí",lvl:"news",doc:"Chưa đọc nguyên văn.",ext:[],p:"Luật 72\\/2025(?:\\/QH15)?|Luật Tổ chức chính quyền địa phương",ref:1},
 {id:"lxd14",grp:"Luật",so:"50/2014/QH13",ten:"Luật Xây dựng 2014",ky:"2014",hl:"Đã được thay bởi Luật Xây dựng 135/2025/QH15",tt:"Hết hiệu lực từ 01/7/2026",lvl:"none",doc:"Được nhắc đến trong quy định chuyển tiếp.",ext:[],p:"Luật Xây dựng 2014|Luật Xây dựng 50\\/2014(?:\\/QH13)?|Luật 50\\/2014",ref:1},

 {id:"nd85",grp:"Nghị định",so:"85/2025/NĐ-CP",ten:"Quy định chi tiết thi hành một số điều của Luật Đầu tư công",ky:"08/4/2025",hl:"08/4/2025",tt:"Đang áp dụng; đã sửa đổi bởi Nghị định 275/2025/NĐ-CP",lvl:"art",doc:"Điều 10 đến 12, 14, 21, 22, 24, 43, 44, 47, 48, 50, 52, 56 đọc nội dung từng khoản trên hethongphapluat.com (bản gốc, trước sửa đổi). Phụ lục chưa đọc.",
  ext:[["hethongphapluat.com (từng điều)",HP85+"dieu-1"],["thuvienphapluat.vn","https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-85-2025-ND-CP-huong-dan-Luat-Dau-tu-cong-651162.aspx"],["vnuf.edu.vn (PDF nén)","https://vnuf.edu.vn/wp-content/uploads/2025/05/Nghi-dinh_85-2025-ND-CP.pdf"]],
  deep:hp(HP85),p:nd(85,"2025"),main:1},
 {id:"nd275",grp:"Nghị định",so:"275/2025/NĐ-CP",ten:"Sửa đổi, bổ sung một số điều của Nghị định 85/2025/NĐ-CP",ky:"18/10/2025",hl:"18/10/2025 (Điều 50 mới áp dụng từ kế hoạch năm 2026)",tt:"Đang áp dụng",lvl:"art",doc:"Nội dung từng khoản các mục sửa Điều 43, 44, 47, 50 đọc trên hethongphapluat.com.",
  ext:[["hethongphapluat.com","https://hethongphapluat.com/decree-no-275-2025-nd-cp-dated-october-18-2025-on-amendments-to-government-s-decree-no-85-2025-nd-cp-elaborating-law-on-public-investment.html"],["thuvienphapluat.vn","https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-275-2025-ND-CP-sua-doi-Nghi-dinh-85-2025-ND-CP-677980.aspx"]],
  p:nd(275,"2025"),main:1},
 {id:"nd254",grp:"Nghị định",so:"254/2025/NĐ-CP",ten:"Quy định về quản lý, thanh toán, quyết toán dự án sử dụng vốn đầu tư công",ky:"26/9/2025",hl:"26/9/2025",tt:"Kho regai ghi “hết hiệu lực một phần”, chưa xác định phần nào; thay Nghị định 99/2021/NĐ-CP",lvl:"full",doc:"Các Điều 4, 8, 9, 10, 12, 19, 20, 26, 28, 32, 33, 34, 36, 44, 45, 46, 47, 50, 52, 53, 54 có nguyên văn trong trang; các điều còn lại chỉ có tiêu đề.",
  ext:[["hethongphapluat.com (từng điều)",HP254+"dieu-1"]],deep:hp(HP254),p:nd(254,"2025"),main:1},
 {id:"nd214",grp:"Nghị định",so:"214/2025/NĐ-CP",ten:"Quy định chi tiết một số điều và biện pháp thi hành Luật Đấu thầu về lựa chọn nhà thầu",ky:"04/8/2025",hl:"04/8/2025",tt:"Kho regai ghi “hết hiệu lực một phần”; đã được sửa bởi Nghị định 349/2026/NĐ-CP (và theo văn bản hợp nhất còn Nghị định 165/2026, 170/2026, chưa xác minh)",lvl:"full",doc:"Các Điều 18, 61, 72, 78, 118, 119 có nguyên văn (bản gốc, chưa tính sửa đổi); các điều còn lại chỉ có tiêu đề.",
  ext:[["hethongphapluat.com (từng điều)",HP214+"dieu-1"]],deep:hp(HP214),p:nd(214,"2025"),main:1},
 {id:"nd349",grp:"Nghị định",so:"349/2026/NĐ-CP",ten:"Sửa đổi, bổ sung quy định về lựa chọn nhà thầu; giao nhiệm vụ, đặt hàng đấu thầu (sửa Nghị định 214/2025/NĐ-CP và 32/2019/NĐ-CP)",ky:"09/9/2026",hl:"09/9/2026",tt:"Theo bản tóm tắt",lvl:"news",doc:"Đọc qua bản tóm tắt trên hcc.nghean.gov.vn; chưa có toàn văn.",
  ext:[["dauthau.gxd.vn","https://dauthau.gxd.vn/van-ban/dau-thau/nghi-dinh-349-2026.html"],["hcc.nghean.gov.vn (tóm tắt)","https://hcc.nghean.gov.vn/tin-tong-hop/nghi-dinh-so-349-2026-nd-cp-sua-doi-quy-dinh-ve-lua-chon-nha-thau-giao-nhiem-vu-dat-hang-dau-thau-2798.html"]],p:nd(349,"2026"),main:1},
 {id:"nd217",grp:"Nghị định",so:"217/2026/NĐ-CP",ten:"Quy định chi tiết một số điều của Luật Xây dựng về quản lý hoạt động xây dựng",ky:"19/6/2026",hl:"01/7/2026",tt:"Đang áp dụng; thay Nghị định 175/2024/NĐ-CP",lvl:"repost",doc:"Đọc qua qlda.gxd.vn (trang dài bị cắt từng đoạn): Điều 6, 12 đến 16, 22, 25, 29 đến 37, 41, 50, 70 đến 76, phụ lục mẫu.",
  ext:[["qlda.gxd.vn","https://qlda.gxd.vn/van-ban/qlda/nghi-dinh-217-2026.html"],["cdn.haiphong.gov.vn (PDF)","https://cdn.haiphong.gov.vn/gov-hpg/6866/tintuc/2026/7/nghi-dinh-217_2026_nd-cp639189458744453590.pdf"]],p:nd(217,"2026"),main:1},
 {id:"nd206",grp:"Nghị định",so:"206/2026/NĐ-CP",ten:"Quy định chi tiết về quản lý chi phí đầu tư xây dựng",ky:"15/6/2026",hl:"01/7/2026",tt:"Đang áp dụng; thay Nghị định 10/2021/NĐ-CP",lvl:"repost",doc:"Đọc qua qlda.gxd.vn: Điều 6 đến 8, 16, 26, 36.",ext:[["qlda.gxd.vn","https://qlda.gxd.vn/van-ban/chi-phi/nghi-dinh-206-2026.html"]],p:nd(206,"2026"),main:1},
 {id:"nd207",grp:"Nghị định",so:"207/2026/NĐ-CP",ten:"Quy định chi tiết một số điều của Luật Xây dựng về quản lý chất lượng, thi công xây dựng và bảo trì công trình xây dựng",ky:"15/6/2026",hl:"01/7/2026",tt:"Đang áp dụng; thay Nghị định 06/2021/NĐ-CP",lvl:"repost",doc:"Đọc qua qlda.gxd.vn: Điều 21, 22, 28, 32, 33, 52, 53 và danh mục phụ lục.",ext:[["qlda.gxd.vn","https://qlda.gxd.vn/van-ban/chat-luong/nghi-dinh-207-2026.html"]],p:nd(207,"2026"),main:1},
 {id:"nd210",grp:"Nghị định",so:"210/2026/NĐ-CP",ten:"Quy định chi tiết một số điều của Luật Xây dựng về hợp đồng xây dựng",ky:"2026",hl:"01/7/2026",tt:"Đang áp dụng; thay Nghị định 37/2015/NĐ-CP và 50/2021/NĐ-CP",lvl:"repost",doc:"Đọc qua qlda.gxd.vn: Điều 4, 11 đến 13, 20 đến 31, 33; trang cắt ở khoảng Điều 34.",ext:[["qlda.gxd.vn","https://qlda.gxd.vn/van-ban/hop-dong/nghi-dinh-210-2026.html"]],p:nd(210,"2026"),main:1},
 {id:"nd212",grp:"Nghị định",so:"212/2026/NĐ-CP",ten:"Quy định về điều kiện năng lực hoạt động xây dựng; Hệ thống thông tin và Cơ sở dữ liệu quốc gia về hoạt động xây dựng",ky:"17/6/2026",hl:"01/7/2026",tt:"Đang áp dụng",lvl:"repost",doc:"Đọc qua qlda.gxd.vn: Điều 1 đến 49 (chứng chỉ hành nghề cá nhân, công khai năng lực tổ chức); Điều 50 đến 58 mới xem tóm tắt.",ext:[["qlda.gxd.vn","https://qlda.gxd.vn/van-ban/qlda/nghi-dinh-212-2026.html"]],p:nd(212,"2026"),main:1},
 {id:"vbhn36",grp:"Văn bản hợp nhất",so:"36/2026/VBHN-NĐ-BTC",ten:"Văn bản hợp nhất Nghị định 214/2025/NĐ-CP về lựa chọn nhà thầu",ky:"2026",hl:"",tt:"Chỉ đọc phần căn cứ và Điều 78 khoản 4",lvl:"repost",doc:"Đọc qua dauthau.gxd.vn: phần căn cứ ghi các nghị định sửa đổi; Điều 78 khoản 4.",ext:[["dauthau.gxd.vn","https://dauthau.gxd.vn/van-ban/dau-thau/vbhn-36-2026-lua-chon-nha-thau.html"]],p:"(?:văn bản hợp nhất |VBHN )?36\\/2026\\/VBHN-NĐ-BTC",ref:1},
 {id:"nd19",grp:"Nghị định",so:"19/2026/NĐ-CP",ten:"Thẩm định dự án quan trọng quốc gia và giám sát, đánh giá đầu tư",ky:"14/01/2026",hl:"",tt:"Chưa đọc",lvl:"news",doc:"Chỉ biết qua kết quả tìm kiếm và dẫn chiếu trong Thông tư 44/2026/TT-BTC.",ext:[],p:nd(19,"2026"),ref:1},
 {id:"nd165",grp:"Nghị định",so:"165/2026/NĐ-CP",ten:"Nghị định được văn bản hợp nhất 36/2026 ghi là sửa Nghị định 214/2025 (trích yếu trong văn bản hợp nhất nhắc Luật Phòng bệnh; số hiệu chưa xác minh)",ky:"15/5/2026",hl:"01/7/2026",tt:"Chưa xác minh",lvl:"none",doc:"Chưa đọc.",ext:[],p:nd(165,"2026"),ref:1},
 {id:"nd170",grp:"Nghị định",so:"170/2026/NĐ-CP",ten:"Nghị định được văn bản hợp nhất 36/2026 ghi là sửa Nghị định 214/2025 (trích yếu nhắc Luật thi hành án hình sự; số hiệu chưa xác minh)",ky:"15/5/2026",hl:"01/7/2026",tt:"Chưa xác minh",lvl:"none",doc:"Chưa đọc.",ext:[],p:nd(170,"2026"),ref:1},
 {id:"nd347",grp:"Nghị định",so:"347/2026/NĐ-CP",ten:"Nghị định ngày 08/9/2026; một tệp văn bản hợp nhất nhắc là sửa Nghị định 217/2026, nguồn khác ghi về phòng cháy chữa cháy",ky:"08/9/2026",hl:"",tt:"Chưa xác minh",lvl:"none",doc:"Chưa đọc.",ext:[],p:nd(347,"2026"),ref:1},
 {id:"nd274",grp:"Nghị định",so:"274/2026/NĐ-CP",ten:"Một nguồn ghi là căn cứ ban hành Thông tư 134/2026/TT-BTC (nguồn khác ghi Nghị định 349/2026)",ky:"",hl:"",tt:"Chưa xác minh",lvl:"none",doc:"Chưa đọc.",ext:[],p:nd(274,"2026"),ref:1},
 {id:"nd291",grp:"Nghị định",so:"291/2026/NĐ-CP",ten:"Sửa đổi quy định xử phạt vi phạm hành chính về thuế, hóa đơn (không liên quan đầu tư công)",ky:"21/7/2026",hl:"21/7/2026",tt:"Không liên quan",lvl:"news",doc:"Chỉ được nhắc để loại trừ.",ext:[],p:nd(291,"2026"),ref:1},
 {id:"nd175",grp:"Nghị định",so:"175/2024/NĐ-CP",ten:"Quản lý hoạt động xây dựng (đã được thay bởi Nghị định 217/2026/NĐ-CP)",ky:"30/12/2024",hl:"Hết hiệu lực từ 01/7/2026",tt:"Hết hiệu lực",lvl:"none",doc:"Được nhắc đến trong quy định chuyển tiếp.",ext:[],p:nd(175,"2024"),ref:1},
 {id:"nd99",grp:"Nghị định",so:"99/2021/NĐ-CP",ten:"Quản lý, thanh toán, quyết toán dự án sử dụng vốn đầu tư công (đã được thay bởi Nghị định 254/2025/NĐ-CP)",ky:"11/11/2021",hl:"",tt:"Hết hiệu lực, trừ trường hợp chuyển tiếp",lvl:"none",doc:"Được nhắc đến trong quy định chuyển tiếp.",ext:[],p:nd(99,"2021"),ref:1},
 {id:"nd10",grp:"Nghị định",so:"10/2021/NĐ-CP",ten:"Quản lý chi phí đầu tư xây dựng (đã được thay bởi Nghị định 206/2026/NĐ-CP)",ky:"09/02/2021",hl:"",tt:"Hết hiệu lực từ 01/7/2026",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:nd(10,"2021"),ref:1},
 {id:"nd06",grp:"Nghị định",so:"06/2021/NĐ-CP",ten:"Quản lý chất lượng, thi công, bảo trì công trình (đã được thay bởi Nghị định 207/2026/NĐ-CP)",ky:"",hl:"",tt:"Hết hiệu lực từ 01/7/2026",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:nd("06","2021"),ref:1},
 {id:"nd37",grp:"Nghị định",so:"37/2015/NĐ-CP",ten:"Hợp đồng xây dựng (đã được thay bởi Nghị định 210/2026/NĐ-CP)",ky:"",hl:"",tt:"Hết hiệu lực",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:nd(37,"2015"),ref:1},
 {id:"nd50",grp:"Nghị định",so:"50/2021/NĐ-CP",ten:"Sửa đổi Nghị định 37/2015/NĐ-CP (hợp đồng xây dựng)",ky:"",hl:"",tt:"Hết hiệu lực",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:nd(50,"2021"),ref:1},
 {id:"nd111",grp:"Nghị định",so:"111/2024/NĐ-CP",ten:"Nghị định về chứng chỉ hành nghề hoạt động xây dựng (hết hiệu lực khi Nghị định 212/2026/NĐ-CP có hiệu lực)",ky:"",hl:"",tt:"Hết hiệu lực từ 01/7/2026",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:nd(111,"2024"),ref:1},

 {id:"tt44",grp:"Thông tư",so:"44/2026/TT-BTC",ten:"Quy định về mẫu báo cáo giám sát, đánh giá đầu tư; chế độ báo cáo trực tuyến và quản lý vận hành hệ thống thông tin về giám sát, đánh giá đầu tư",ky:"2026",hl:"22/4/2026",tt:"Đang áp dụng; thay Thông tư 05/2023/TT-BKHĐT",lvl:"full",doc:"Điều 4 và 5 có nguyên văn trong trang (kho regai); các điều còn lại chỉ có tiêu đề.",ext:[],p:tt(44,"2026","TT-BTC"),main:1},
 {id:"tt91",grp:"Thông tư",so:"91/2025/TT-BTC",ten:"Hệ thống mẫu biểu sử dụng trong công tác quyết toán vốn đầu tư công",ky:"2025",hl:"26/9/2025",tt:"Đang áp dụng; thay Thông tư 96/2021/TT-BTC",lvl:"news",doc:"Danh mục 17 mẫu lấy từ bài tổng hợp trên luatvietnam.vn.",ext:[["luatvietnam.vn (danh sách 17 mẫu)","https://luatvietnam.vn/linh-vuc-khac/thong-tu-91-2025-tt-btc-danh-sach-17-bieu-mau-trong-cong-tac-quyet-toan-883-104477-article.html"],["qlda.gxd.vn (PDF)","https://qlda.gxd.vn/van-ban/hop-dong/thong-tu-91-2025-TT-BTC.html"]],p:tt(91,"2025","TT-BTC"),main:1},
 {id:"tt79",grp:"Thông tư",so:"79/2025/TT-BTC",ten:"Hướng dẫn cung cấp, đăng tải thông tin về đấu thầu và mẫu hồ sơ đấu thầu trên Hệ thống mạng đấu thầu quốc gia",ky:"04/8/2025",hl:"04/8/2025",tt:"Đang áp dụng; một số mẫu Chương VI được Thông tư 134/2026/TT-BTC sửa",lvl:"repost",doc:"Đọc danh mục mẫu qua dauthau.gxd.vn (trang cắt ở Điều 35).",ext:[["dauthau.gxd.vn","https://dauthau.gxd.vn/van-ban/dau-thau/thong-tu-79-2025-TT-BTC.html"],["luatvietnam.vn (tổng hợp mẫu)","https://luatvietnam.vn/bieu-mau/tong-hop-mau-ho-so-dau-thau-theo-thong-tu-79-2025-tt-btc-571-103415-article.html"]],p:tt(79,"2025","TT-BTC"),main:1},
 {id:"tt80",grp:"Thông tư",so:"80/2025/TT-BTC",ten:"Quy định chi tiết mẫu hồ sơ yêu cầu, báo cáo đánh giá, báo cáo thẩm định, kiểm tra, báo cáo tình hình thực hiện hoạt động đấu thầu",ky:"08/8/2025",hl:"",tt:"Được Thông tư 134/2026/TT-BTC thay thế từ 09/9/2026",lvl:"repost",doc:"Đọc danh mục mẫu qua dauthau.gxd.vn.",ext:[["dauthau.gxd.vn","https://dauthau.gxd.vn/van-ban/dau-thau/thong-tu-80-2025-TT-BTC.html"]],p:tt(80,"2025","TT-BTC"),main:1},
 {id:"tt134",grp:"Thông tư",so:"134/2026/TT-BTC",ten:"Thông tư về mẫu hồ sơ yêu cầu, báo cáo đánh giá, thẩm định đấu thầu (thay Thông tư 80/2025/TT-BTC; sửa một số mẫu của Thông tư 79/2025/TT-BTC)",ky:"09/9/2026",hl:"09/9/2026",tt:"Theo bài báo; căn cứ ban hành ghi khác nhau giữa các nguồn",lvl:"news",doc:"Chỉ có bài của dauthau.asia và baodauthau.vn.",ext:[["dauthau.asia","https://dauthau.asia/news/thong-tin-ho-tro/hot-thong-tu-134-2026-tt-btc-ban-hanh-thay-the-thong-tu-80-2025-tt-btc-2022.html"],["baodauthau.vn","https://baodauthau.vn/ban-hanh-thong-tu-1342026tt-btc-so-hoa-quy-trinh-thu-tuc-chi-dinh-thau-post207080.html"]],p:tt(134,"2026","TT-BTC"),main:1},
 {id:"tt70",grp:"Thông tư",so:"70/2024/TT-BTC",ten:"Thông tư của Bộ Tài chính có Mẫu 01/QĐ-QLDA và 02/QĐ-QLDA (dự toán thu, chi quản lý dự án)",ky:"01/10/2024",hl:"",tt:"Chỉ biết qua dẫn chiếu trong Nghị định 254/2025",lvl:"none",doc:"Chưa đọc.",ext:[],p:tt(70,"2024","TT-BTC"),ref:1},
 {id:"tt36x",grp:"Thông tư",so:"36/2026/TT-BXD",ten:"Hướng dẫn xác định và quản lý chi phí đầu tư xây dựng (theo kết quả tìm kiếm)",ky:"2026",hl:"01/7/2026",tt:"Chưa đọc",lvl:"news",doc:"Chỉ biết qua kết quả tìm kiếm.",ext:[],p:tt(36,"2026","TT-BXD"),ref:1},
 {id:"tt38x",grp:"Thông tư",so:"38/2026/TT-BXD",ten:"Thông tư có Phụ lục VIII về xác định chi phí quản lý dự án và tư vấn đầu tư xây dựng (ngày 26/6/2026, theo kết quả tìm kiếm)",ky:"26/6/2026",hl:"",tt:"Chưa đọc",lvl:"news",doc:"Chỉ biết qua kết quả tìm kiếm.",ext:[],p:tt(38,"2026","TT-BXD"),ref:1},
 {id:"tt32x",grp:"Thông tư",so:"32/2026/TT-BXD",ten:"Thông tư hướng dẫn Nghị định 207/2026/NĐ-CP (theo kết quả tìm kiếm)",ky:"2026",hl:"",tt:"Chưa đọc",lvl:"news",doc:"Chỉ biết qua kết quả tìm kiếm.",ext:[],p:tt(32,"2026","TT-BXD"),ref:1},
 {id:"tt96",grp:"Thông tư",so:"96/2021/TT-BTC",ten:"Hệ thống mẫu biểu quyết toán (đã được Thông tư 91/2025/TT-BTC thay)",ky:"11/11/2021",hl:"",tt:"Hết hiệu lực",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:tt(96,"2021","TT-BTC"),ref:1},
 {id:"tt05",grp:"Thông tư",so:"05/2023/TT-BKHĐT",ten:"Mẫu báo cáo giám sát, đánh giá đầu tư (đã được Thông tư 44/2026/TT-BTC thay)",ky:"2023",hl:"",tt:"Hết hiệu lực",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:tt("05","2023","TT-BKHĐT"),ref:1},
 {id:"tt09",grp:"Thông tư",so:"09/2021/TT-BKHĐT",ten:"Mẫu hồ sơ mời thầu (cũ, chỉ tham khảo)",ky:"2021",hl:"",tt:"Không còn là mẫu hiện hành",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:tt("09","2021","TT-BKHĐT"),ref:1},
 {id:"tt22",grp:"Thông tư",so:"22/2024/TT-BKHĐT",ten:"Mẫu hồ sơ đấu thầu qua mạng (cũ, đã hết hiệu lực khi Thông tư 79/2025/TT-BTC có hiệu lực)",ky:"2024",hl:"",tt:"Hết hiệu lực",lvl:"none",doc:"Chỉ được nhắc đến.",ext:[],p:tt(22,"2024","TT-BKHĐT"),ref:1},

 {id:"qd3321",grp:"Quyết định",so:"3321/QĐ-UBND",ten:"Quyết định của UBND TP.HCM về ủy quyền quyết định đầu tư dự án đầu tư công thuộc thẩm quyền Chủ tịch UBND Thành phố",ky:"26/12/2025",hl:"Ủy quyền đến hết 31/12/2026",tt:"Theo hai bài báo",lvl:"news",doc:"Chưa có văn bản gốc; nội dung lấy từ báo SGGP và Báo Đại biểu Nhân dân.",ext:[["sggp.org.vn (bài báo)","https://www.sggp.org.vn/tphcm-uy-quyen-quyet-dinh-dau-tu-nhieu-du-an-cong-post830757.html"],["daibieunhandan.vn (bài báo)","https://daibieunhandan.vn/chu-tich-tp-ho-chi-minh-uy-quyen-quyet-dinh-dau-tu-cong-du-an-nhom-b-c-10402071.html"]],p:"(?:QĐ|Quyết định) 3321(?:\\/QĐ-UBND)?(?!\\d)",main:1},
 {id:"qd1040",grp:"Quyết định",so:"1040/QĐ-BXD",ten:"Quyết định của Bộ Xây dựng công bố mẫu hợp đồng xây dựng (07 mẫu)",ky:"26/6/2026 (trang Bộ Xây dựng ghi 16/6/2026)",hl:"01/7/2026",tt:"Theo kết quả tìm kiếm",lvl:"news",doc:"Chưa mở bản gốc; danh mục 07 mẫu lấy từ kết quả tìm kiếm.",ext:[["qlda.gxd.vn","https://qlda.gxd.vn/van-ban/hop-dong/quyet-dinh-1040-qd-bxd.html"],["moc.gov.vn","https://moc.gov.vn/vn/tin-tuc/1177/95125/cong-bo-mau-hop-dong-xay-dung.aspx"]],p:"(?:QĐ|Quyết định) 1040(?:\\/QĐ-BXD)?(?!\\d)",main:1}
];
/* văn bản bổ sung (khảo sát, PCCC, môi trường) và chỉnh sửa thông tin các văn bản đã có */
var EXTRA=[
 {id:"lpccc",grp:"Luật",so:"55/2024/QH15",ten:"Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ",ky:"29/11/2024",hl:"01/7/2025",tt:"Đang áp dụng; đã được sửa đổi bởi Luật 118/2025/QH15 (theo văn bản hợp nhất 58/VBHN-VPQH)",ext:[],p:"Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ(?: 2024| 55\\/2024(?:\\/QH15)?)?|Luật PCCC(?:&CNCH| và CNCH)?(?: 2024| 55\\/2024(?:\\/QH15)?)?|Luật 55\\/2024(?:\\/QH15)?",main:1},
 {id:"vbhn58",grp:"Văn bản hợp nhất",so:"58/VBHN-VPQH",ten:"Văn bản hợp nhất Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ",ky:"23/3/2026",hl:"01/7/2025",tt:"Bản hợp nhất của Văn phòng Quốc hội (gồm sửa đổi bởi Luật 118/2025/QH15)",ext:[],p:"(?:văn bản hợp nhất |VBHN )?58\\/VBHN-VPQH",main:1},
 {id:"nd105",grp:"Nghị định",so:"105/2025/NĐ-CP",ten:"Quy định chi tiết một số điều và biện pháp thi hành Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ",ky:"15/5/2025",hl:"01/7/2025",tt:"Đang áp dụng; được sửa đổi, bổ sung bởi Nghị định 347/2026/NĐ-CP",ext:[],p:nd(105,"2025"),main:1},
 {id:"nd347x",grp:"Nghị định",so:"347/2026/NĐ-CP",ten:"",ky:"",hl:"",tt:"",ext:[],p:"(?!)",ref:1},
 {id:"nd50p",grp:"Nghị định",so:"50/2024/NĐ-CP",ten:"Sửa đổi, bổ sung một số điều của Nghị định 136/2020/NĐ-CP (hướng dẫn Luật Phòng cháy và chữa cháy 2001) và Nghị định 83/2017/NĐ-CP (cứu nạn, cứu hộ)",ky:"10/5/2024",hl:"",tt:"Văn bản thuộc giai đoạn Luật PCCC 2001; chỉ để tham khảo, cần đối chiếu hiệu lực sau khi Luật 55/2024 và Nghị định 105/2025 có hiệu lực",ext:[],p:nd(50,"2024"),ref:1},
 {id:"nd69",grp:"Nghị định",so:"69/2026/NĐ-CP",ten:"Sửa đổi, bổ sung một số điều của Nghị định 106/2025/NĐ-CP (xử phạt vi phạm hành chính trong lĩnh vực phòng cháy, chữa cháy và cứu nạn, cứu hộ)",ky:"06/3/2026",hl:"",tt:"Theo bản đăng lại của nguồn",ext:[],p:nd(69,"2026"),main:1},
 {id:"tt63",grp:"Thông tư",so:"63/2025/TT-BXD",ten:"Hướng dẫn Điều 23 của Nghị định 105/2025/NĐ-CP thuộc phạm vi quản lý nhà nước của Bộ Xây dựng",ky:"30/12/2025",hl:"16/02/2026",tt:"Đang áp dụng",ext:[],p:tt(63,"2025","TT-BXD"),main:1},
 {id:"tt06x",grp:"Thông tư",so:"06/2022/TT-BXD",ten:"Ban hành QCVN 06:2022/BXD Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình",ky:"30/11/2022",hl:"16/01/2023",tt:"Đã được sửa đổi 1:2023 (Thông tư 09/2023/TT-BXD)",ext:[],p:"QCVN 06:2022\\/BXD|(?:TT|Thông tư) 06\\/2022(?:\\/TT-BXD)?(?![\\d\\/])",main:1},
 {id:"tt09x",grp:"Thông tư",so:"09/2023/TT-BXD",ten:"Ban hành Sửa đổi 1:2023 QCVN 06:2022/BXD",ky:"16/10/2023",hl:"01/12/2023",tt:"Đang áp dụng cùng QCVN 06:2022/BXD",ext:[],p:tt("09","2023","TT-BXD")+"|Sửa đổi 1:2023 QCVN 06:2022\\/BXD",main:1},
 {id:"lbvmt",grp:"Luật",so:"72/2020/QH14",ten:"Luật Bảo vệ môi trường",ky:"17/11/2020",hl:"01/01/2022",tt:"Đang áp dụng; được sửa đổi, bổ sung bởi Luật 146/2025/QH15 (hiệu lực từ 01/01/2026)",ext:[],p:"Luật Bảo vệ môi trường(?: 2020| 72\\/2020(?:\\/QH14)?)?|Luật BVMT(?: 2020)?|Luật 72\\/2020(?:\\/QH14)?",main:1},
 {id:"l146",grp:"Luật",so:"146/2025/QH15",ten:"Luật sửa đổi, bổ sung một số điều của 15 luật trong lĩnh vực nông nghiệp và môi trường",ky:"2025",hl:"01/01/2026 (một số nội dung từ thời điểm khác)",tt:"Đang áp dụng; Điều 1 sửa đổi Luật Bảo vệ môi trường",ext:[],p:"Luật 146\\/2025(?:\\/QH15)?|Luật số 146\\/2025\\/QH15|Luật sửa đổi, bổ sung một số điều của 15 luật trong lĩnh vực nông nghiệp và môi trường",main:1},
 {id:"nd08",grp:"Nghị định",so:"08/2022/NĐ-CP",ten:"Quy định chi tiết một số điều của Luật Bảo vệ môi trường",ky:"10/01/2022",hl:"10/01/2022",tt:"Đang áp dụng; được sửa đổi, bổ sung bởi Nghị định 05/2025/NĐ-CP và Nghị định 48/2026/NĐ-CP",ext:[],p:nd("08","2022"),main:1},
 {id:"nd05m",grp:"Nghị định",so:"05/2025/NĐ-CP",ten:"Sửa đổi, bổ sung một số điều của Nghị định 08/2022/NĐ-CP",ky:"06/01/2025",hl:"06/01/2025",tt:"Đang áp dụng; một số nội dung được Nghị định 48/2026/NĐ-CP sửa tiếp",ext:[],p:nd("05","2025"),main:1},
 {id:"nd48",grp:"Nghị định",so:"48/2026/NĐ-CP",ten:"Sửa đổi, bổ sung một số điều của Nghị định 08/2022/NĐ-CP được sửa đổi, bổ sung bởi Nghị định 05/2025/NĐ-CP",ky:"29/01/2026",hl:"29/01/2026 (ngày ký)",tt:"Đang áp dụng",ext:[],p:nd(48,"2026"),main:1},
 {id:"tt02m",grp:"Thông tư",so:"02/2022/TT-BTNMT",ten:"Quy định chi tiết thi hành một số điều của Luật Bảo vệ môi trường",ky:"10/01/2022",hl:"",tt:"Đang áp dụng; được sửa đổi bởi Thông tư 07/2025/TT-BTNMT, 07/2025/TT-BNNMT và 09/2026/TT-BNNMT",ext:[],p:tt("02","2022","TT-BTNMT"),main:1},
 {id:"tt09m",grp:"Thông tư",so:"09/2026/TT-BNNMT",ten:"Sửa đổi, bổ sung một số điều của Thông tư 02/2022/TT-BTNMT",ky:"29/01/2026",hl:"29/01/2026",tt:"Đang áp dụng",ext:[],p:tt("09","2026","TT-BNNMT"),main:1},
 {id:"tt34x",grp:"Thông tư",so:"34/2026/TT-BXD",ten:"Quy định chi tiết về cấp công trình xây dựng phục vụ quản lý hoạt động xây dựng",ky:"25/6/2026",hl:"01/7/2026",tt:"Đang áp dụng",ext:[],p:tt(34,"2026","TT-BXD"),main:1},
 {id:"tt37x",grp:"Thông tư",so:"37/2026/TT-BXD",ten:"Hướng dẫn phương pháp xác định định mức dự toán và các chỉ tiêu kinh tế kỹ thuật",ky:"26/6/2026",hl:"01/7/2026",tt:"Đang áp dụng",ext:[],p:tt(37,"2026","TT-BXD"),main:1}
];
EXTRA=EXTRA.filter(function(d){return d.id!=="nd347x"});
EXTRA.forEach(function(d){d.lvl=d.lvl||"full";d.doc=d.doc||""});
DOCS=DOCS.concat(EXTRA);
var PATCH={
 nd347:{ten:"Sửa đổi, bổ sung một số điều của Nghị định 169/2025/NĐ-CP, Nghị định 105/2025/NĐ-CP (phòng cháy, chữa cháy) và một số nghị định khác",ky:"08/9/2026",tt:"Theo bản đăng lại của nguồn; xem điều khoản hiệu lực trong văn bản",main:1,ref:0},
 nd274:{ten:"Quy định chi tiết một số điều và biện pháp thi hành Luật Đấu thầu về lựa chọn nhà đầu tư thực hiện dự án đầu tư kinh doanh",tt:"Theo bản đăng lại của nguồn; trang từng ghi sai là căn cứ của Thông tư 134/2026/TT-BTC"},
 nd165:{ten:"Nghị định 165/2026/NĐ-CP ngày 15/5/2026 (được Nghị định 349/2026/NĐ-CP ghi là sửa Nghị định 214/2025/NĐ-CP)",tt:"Theo phần mở đầu của Nghị định 349/2026/NĐ-CP; chưa có toàn văn"},
 nd170:{ten:"Nghị định 170/2026/NĐ-CP ngày 15/5/2026 (được Nghị định 349/2026/NĐ-CP ghi là sửa Nghị định 214/2025/NĐ-CP)",tt:"Theo phần mở đầu của Nghị định 349/2026/NĐ-CP; chưa có toàn văn"},
 tt36x:{ten:"Hướng dẫn một số nội dung, phương pháp xác định và quản lý chi phí đầu tư xây dựng",ky:"26/6/2026",hl:"01/7/2026",tt:"Đang áp dụng",main:1,ref:0},
 tt32x:{ten:"Quy định chi tiết một số điều của Nghị định 207/2026/NĐ-CP (quản lý chất lượng, thi công và bảo trì công trình xây dựng)",ky:"22/6/2026",hl:"01/7/2026",tt:"Đang áp dụng",main:1,ref:0},
 qd1040:{ky:"26/6/2026",hl:"01/7/2026",tt:"Theo bản đăng lại của nguồn"},
 nd275:{lvl:"news",doc:"Chưa có toàn văn đáng tin cậy: chỉ có các đoạn trích trên trang thuviennhadat.vn và bài báo. Một đoạn trích cho biết khoản 3 Điều 15a (do Nghị định này bổ sung) đã bị bãi bỏ bởi Nghị định 119/2026/NĐ-CP (từ 01/01/2026) và Điều 4 Nghị định 85/2025 được Nghị định 224/2026/NĐ-CP sửa từ 01/7/2026; chưa kiểm chứng văn bản gốc."}
};
DOCS.forEach(function(d){var p=PATCH[d.id];if(p)for(var k in p)d[k]=p[k]});
var DMAP={};DOCS.forEach(function(d){DMAP[d.id]=d;d.re=new RegExp("^(?:"+d.p+")$")});

var L90MAP={"3":1,"4":2,"9":3,"17":4,"18":5,"19":6,"20":7,"22":8,"23":9,"25":10,"26":11,"28":12,"31":13,"36":14,"36a":15,"37":16,"38":17,"40":18,"41":19,"43":20,"45a":21,"46":22,"54":23,"56":24,"57":25,"58":26,"59":27,"65":28,"68":29,"69":30,"70":31,"71":32,"72":33,"83":34,"84":35,"85":36,"87":37,"89":38,"90":39,"95":40,"100":41};
var NOTES={};

/* ---------- chỉ mục trích dẫn ---------- */
var CITES={},DOCTABS={},DEBUG=[];
function addCite(doc,art,tab,src){
  (CITES[doc]=CITES[doc]||{});(CITES[doc][art]=CITES[doc][art]||{});CITES[doc][art][tab]=(CITES[doc][art][tab]||0)+1;
}
function addDocTab(doc,tab){(DOCTABS[doc]=DOCTABS[doc]||{});DOCTABS[doc][tab]=1}

/* ---------- đích liên kết ---------- */
function target(doc,art,k,p,sua){
  if(doc==="l58"&&L90MAP[art]&&(sua||!(T.l58&&T.l58.arts&&T.l58.arts[art])))return {href:"#vb/l90/d7.k"+L90MAP[art],title:"Luật 90/2025 Điều 7 khoản "+L90MAP[art]+" (sửa Điều "+art+" Luật 58/2024)"};
  var D=DMAP[doc];if(!D)return null;
  var lab=D.so+" Điều "+art+(k?" khoản "+k:"")+(p?" điểm "+p:"");
  if(T[doc]&&T[doc].arts&&T[doc].arts[art])return {href:"#vb/"+doc+"/d"+art+(k?".k"+k:"")+(p?"."+p:""),title:"Xem nguyên văn trong trang: "+lab};
  if(doc==="nd85"&&isLazy("nd85"))return {href:"#vb/nd275",title:"Điều "+art+" Nghị định 85/2025 do Nghị định 275/2025 bổ sung (chưa có toàn văn Nghị định 275 trong trang)"};
  if(D.deep&&!isLazy(doc))return {href:D.deep(art),ext:1,title:"Mở nguyên văn trên hethongphapluat.com: "+lab+(doc==="l58"?" (có thể là bản chưa sửa đổi)":"")};
  return {href:"#vb/"+doc,title:"Xem thẻ văn bản: "+D.so};
}

/* ---------- bộ gắn liên kết ---------- */
var ALL=DOCS.map(function(d){return "(?:"+d.p+")"}).join("|");
var LISTITEM="\\d+[a-z]?(?:\\.\\d+(?:\\.[a-zđ])?)?(?!\\s*(?:ngày|tháng|năm|tỷ|triệu|%|điểm|khoản|nội dung|mục|bước|lần|người|dòng|hạng|loại|giờ|mẫu))";
var MASTER=new RegExp("("+ALL+")|(?:(?:điểm ([a-zđ]) )?khoản (\\d+) Điều (\\d+[a-z]?))|(?:Điều (\\d+[a-z]?)(\\.\\d+(?:\\.[a-zđ])?)?(?: khoản (\\d+)(?: điểm ([a-zđ])(?![a-zđ]))?)?((?:(?:, | và | đến )"+LISTITEM+")*))","g");
var NEXTDOC=new RegExp("^\\s*(?:của\\s+|thuộc\\s+)?("+ALL+")");
function classify(s){for(var i=0;i<DOCS.length;i++){if(DOCS[i].re.test(s))return DOCS[i].id}return null}
function docIn(text){ /* tài liệu cuối cùng được nhắc trong đoạn text */
  var last=null,m;var re=new RegExp(ALL,"g");
  while((m=re.exec(text))){last=classify(m[0])||last}
  return last;
}
var SEC_DEFAULT={t2:"l58",t3:"l58",t4:"nd85",t5:"nd85",t6:"l58",t7:"nd254",t13:"nd254",t14:"lxd",t15:"nd214",t16:"lxd",t19:"lxd",t20:"nd105",t21:"lbvmt"};
var SKIP={A:1,BUTTON:1,SELECT:1,TEXTAREA:1,SCRIPT:1,STYLE:1,INPUT:1,OPTION:1};
function scopeEl(n){var e=n.parentNode;while(e&&e.nodeType===1){var t=e.tagName;if(t==="LI"||t==="TD"||t==="TH"||t==="P"||t==="H3"||t==="H2"||t==="SUMMARY"||(t==="SPAN"&&e.className==="src"))return e;e=e.parentNode}return null}
function inSkip(n){var e=n.parentNode;while(e&&e.nodeType===1){if(SKIP[e.tagName])return true;e=e.parentNode}return false}
function tableDoc(tb){
  if(tb._doc!==undefined)return tb._doc;
  var d=null;
  if(tb.tHead)d=docIn(tb.tHead.textContent);
  if(!d){var p=tb.parentNode;var prev=p&&p.previousElementSibling;var c=0;while(prev&&c<3){if(prev.tagName==="H3"||prev.tagName==="P"){d=docIn(prev.textContent);if(d)break}prev=prev.previousElementSibling;c++}}
  tb._doc=d;return d;
}
function headingDoc(el){
  var e=el;while(e&&!(e.tagName==="SECTION"))e=e.parentNode;
  return null;
}
function parseItem(s){var m=/^(\d+[a-z]?)(?:\.(\d+)(?:\.([a-zđ]))?)?$/.exec(s.trim());return m?{art:m[1],k:m[2]||"",p:m[3]||""}:null}

function mkA(txt,tg,tab){
  var a=document.createElement("a");a.textContent=txt;a.href=tg.href;a.className="cite";a.title=tg.title||"";
  if(tg.ext){a.target="_blank";a.rel="noopener";a.className+=" ext"}
  a.setAttribute("data-tab",tab);
  return a;
}

function linkSection(sec){
  var tab=sec.id,state=new Map(),rowState=new Map(),secDefault=SEC_DEFAULT[tab]||null,h3doc=null,count=0;
  var walker=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,null);
  var nodes=[];var n;while((n=walker.nextNode()))nodes.push(n);
  nodes.forEach(function(node){
    if(inSkip(node))return;
    var text=node.nodeValue;if(!/[A-Za-zĐđ0-9]/.test(text))return;
    var sc=scopeEl(node);var tr=null,tb=null,e=node.parentNode;
    while(e&&e!==sec){if(e.tagName==="TR")tr=tr||e;if(e.tagName==="TABLE"){tb=e;break}e=e.parentNode}
    if(sc&&sc.tagName==="H3"){var dd=docIn(sc.textContent);h3doc=dd||null}
    var cur=sc?state.get(sc):null;
    /* cột "Điều" chỉ chứa số */
    if(sc&&sc.tagName==="TD"&&tb&&tb.tHead){
      var hr=tb.tHead.rows[tb.tHead.rows.length-1];var th=hr&&hr.cells[sc.cellIndex];
      if(th&&/^Điều/.test(th.textContent.trim())&&/^[\d.,\sa-zđ]+$/.test(text.trim())&&sc.textContent.trim()===text.trim()){
        var d0=(tr&&rowState.get(tr))||tableDoc(tb);
        if(d0){
          var frag0=document.createDocumentFragment();var parts=text.split(/(,\s*)/);
          parts.forEach(function(pt){var it=/^\s*\d/.test(pt)?parseItem(pt):null;
            if(it){var tg=target(d0,it.art,it.k,it.p,false);if(tg){frag0.appendChild(mkA(pt.trim(),tg,tab));addCite(d0,it.art,tab);count++;DEBUG.push({tab:tab,t:pt.trim(),doc:d0,src:"cột Điều"});addDocTab(d0,tab);return}}
            frag0.appendChild(document.createTextNode(pt))});
          node.parentNode.replaceChild(frag0,node);return;
        }
      }
    }
    MASTER.lastIndex=0;var m,last=0,frag=null;
    while((m=MASTER.exec(text))){
      if(!m[0])break;
      if(!frag)frag=document.createDocumentFragment();
      if(m.index>last)frag.appendChild(document.createTextNode(text.slice(last,m.index)));
      var end=m.index+m[0].length;
      if(m[1]){ /* tên văn bản */
        var id=classify(m[1]);
        if(id){cur=id;if(sc)state.set(sc,id);if(tr)rowState.set(tr,id);addDocTab(id,tab);
          var D=DMAP[id];var a=document.createElement("a");a.textContent=m[1];a.href="#vb/"+id;a.className="cite doc";a.title="Xem văn bản: "+D.so+" "+D.ten.slice(0,90);a.setAttribute("data-tab",tab);frag.appendChild(a)}
        else frag.appendChild(document.createTextNode(m[1]));
      }else{
        var refs=[],txt=m[0],src="";
        var nd=NEXTDOC.exec(text.slice(end));
        var nextId=nd?classify(nd[1]):null;
        var dc=nextId||cur||(tr&&rowState.get(tr))||(tb&&tableDoc(tb))||h3doc||secDefault;
        src=nextId?"sau":cur?"cùng đoạn":(tr&&rowState.get(tr))?"cùng hàng":(tb&&tableDoc(tb))?"tiêu đề bảng":h3doc?"tiêu đề mục":"mặc định tab";
        var rest=text.slice(end);var sua=/^\s*[,(]?\s*(?:đã |được )?sửa/.test(rest);
        if(m[4]){ /* khoản ... Điều ... */
          refs.push({s:txt,art:m[4],k:m[3],p:m[2]||""});
        }else{
          var art=m[5],kp=m[6]||"",k=m[7]||"",p=m[8]||"";
          if(kp){var q=/^\.(\d+)(?:\.([a-zđ]))?$/.exec(kp);k=q[1];p=q[2]||""}
          var tail=m[9]||"";
          var headTxt=m[0].slice(0,m[0].length-tail.length);
          refs.push({s:headTxt,art:art,k:k,p:p,lead:true});
          if(tail){
            var toks=tail.split(/(, | và | đến )/);
            toks.forEach(function(tk){var it=parseItem(tk);if(it)refs.push({s:tk,art:it.art,k:it.k,p:it.p,sep:true});else if(tk)refs.push({raw:tk})});
          }
        }
        if(!dc){frag.appendChild(document.createTextNode(txt))}
        else{
          refs.forEach(function(r){
            if(r.raw){frag.appendChild(document.createTextNode(r.raw));return}
            var tg=target(dc,r.art,r.k,r.p,sua);
            if(!tg){frag.appendChild(document.createTextNode(r.s));return}
            frag.appendChild(mkA(r.s,tg,tab));count++;addCite(dc,r.art,tab);addDocTab(dc,tab);
            DEBUG.push({tab:tab,t:r.s,doc:dc,src:src,ctx:(sc?sc.textContent:text).replace(/\s+/g," ").slice(0,220)});
          });
        }
        if(m[4]&&dc){/* đã xử lý */}
      }
      last=end;
    }
    if(frag){if(last<text.length)frag.appendChild(document.createTextNode(text.slice(last)));node.parentNode.replaceChild(frag,node)}
  });
  return count;
}

/* ---------- giao diện tab Văn bản ---------- */
var sec=null,listEl=null,viewEl=null;
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
function embeddedCount(id){return T[id]&&T[id].arts?Object.keys(T[id].arts).length:0}
function isLazy(id){return !!(T[id]&&T[id].lazy)}
function bodyOf(doc,art){var t=T[doc];if(!t||!t.arts||!t.arts[art])return null;if(t.lazy)return t.full&&t.full[art]!=null?{b:t.full[art]}:null;return t.arts[art]}
function ensureLoaded(id,cb){
  var t=T[id];if(!t||!t.lazy||t.full){cb();return}
  (t.cb=t.cb||[]).push(cb);
  if(t.loading)return;t.loading=1;
  var s=document.createElement("script");s.src="vb-txt/"+id+".js";
  s.onerror=function(){t.loading=0;t.err=1;(t.cb||[]).forEach(function(f){f()});t.cb=[]};
  document.head.appendChild(s);
}
function artLabel(id,k){var t=T[id].titles||{};if(/^[1-9]/.test(k))return "Điều "+k+". "+(t[k]||"");return t[k]||k}
function orderOf(id){var t=T[id];if(t.order)return t.order;return Object.keys(t.arts).sort(function(a,b){return parseInt(a)-parseInt(b)||(a<b?-1:1)})}
function badge(d){var n=embeddedCount(d.id);var l=LV[d.lvl];var txt=l[0],cls=l[1];
  if(isLazy(d.id)){var np=orderOf(d.id).filter(function(k){return /^\d+[a-z]?$/.test(k)&&k!=="0"}).length;txt="Toàn văn trong trang: "+np+" điều"+(n-np-1>0?" + "+(n-np-1)+" phụ lục":"");cls="ok"}
  else if(n){txt="Nguyên văn "+n+" điều trong trang"}
  return el("span","bdg "+cls,txt)}
function tabsOf(id){var o=DOCTABS[id]||{};return Object.keys(o).map(function(t){return t}).sort(function(a,b){return +a.slice(1)-+b.slice(1)})}
function tabLabel(id){for(var i=0;i<window.TABS.length;i++)if(window.TABS[i].id===id)return window.TABS[i].name;return id}

function renderList(){
  listEl.hidden=false;viewEl.hidden=true;listEl.textContent="";
  var q=(document.getElementById("vbq").value||"").toLowerCase().trim();
  var gsel=document.getElementById("vbg").value;
  var groups=["Luật","Nghị định","Thông tư","Quyết định","Văn bản hợp nhất"];
  [["main","Văn bản được dùng làm căn cứ chính của trang"],["ref","Văn bản được nhắc đến (thay thế, chưa đọc, hoặc chưa xác minh)"]].forEach(function(blk){
    var h=el("h3",null,blk[1]);var box=el("div");var cnt=0;
    groups.forEach(function(g){
      if(gsel&&gsel!==g)return;
      var rows=DOCS.filter(function(d){return d.grp===g&&(blk[0]==="main"?d.main:!d.main)&&(!q||(d.so+" "+d.ten).toLowerCase().indexOf(q)>-1)});
      if(!rows.length)return;
      cnt+=rows.length;
      var tw=el("div","tw");var tb=el("table");
      var th=el("thead");var trh=el("tr");["Số hiệu","Tên văn bản","Ngày ký / hiệu lực","Tình trạng","Mức nguyên văn",""].forEach(function(x){trh.appendChild(el("th",null,x))});th.appendChild(trh);tb.appendChild(th);
      var tbd=el("tbody");
      rows.forEach(function(d){
        var tr=el("tr");
        var c1=el("td");var a=el("a","cite doc",d.so);a.href="#vb/"+d.id;c1.appendChild(a);c1.appendChild(el("div","note",g));tr.appendChild(c1);
        tr.appendChild(el("td",null,d.ten));
        tr.appendChild(el("td",null,(d.ky?"Ký: "+d.ky:"")+(d.hl?(d.ky?" · ":"")+"Hiệu lực: "+d.hl:"")));
        tr.appendChild(el("td",null,d.tt));
        var c5=el("td");c5.appendChild(badge(d));tr.appendChild(c5);
        var c6=el("td");var b=el("a","btn","Xem");b.href="#vb/"+d.id;c6.appendChild(b);tr.appendChild(c6);
        tbd.appendChild(tr);
      });
      tb.appendChild(tbd);tw.appendChild(tb);
      box.appendChild(el("h4",null,g+" ("+rows.length+")"));box.appendChild(tw);
    });
    if(cnt){listEl.appendChild(h);listEl.appendChild(box)}
  });
  if(!listEl.firstChild)listEl.appendChild(el("p","note","Không có văn bản khớp bộ lọc."));
}

function jump(anchor){
  var prev=sec.querySelectorAll(".hl-cite");[].forEach.call(prev,function(x){x.classList.remove("hl-cite")});
  var m=/^d(\d+[a-z]?|PL\d+)(?:\.k(\d+))?(?:\.([a-zđ]))?$/.exec(anchor||"");if(!m)return;
  var base="vb-"+currentDoc+"-d"+m[1],ids=[];
  if(m[2]&&m[3])ids.push(base+"-k"+m[2]+"-"+m[3]);
  if(m[2])ids.push(base+"-k"+m[2]);
  ids.push(base);
  for(var i=0;i<ids.length;i++){var e=document.getElementById(ids[i]);if(e){e.classList.add("hl-cite");e.scrollIntoView({block:"center",behavior:"smooth"});return}}
}
var currentDoc="";
var PTS="abcdđeghiklmnopqrstuvxy";
function renderBody(doc,art,data){
  var wrap=el("article","vbart");wrap.id="vb-"+doc+"-d"+art;
  var h=el("h4",null,artLabel(doc,art));wrap.appendChild(h);
  if(doc==="l58"&&L90MAP[art]){var wn=el("p","note");wn.appendChild(document.createTextNode("Lưu ý: đây là bản đăng lại của Luật 58/2024; Điều này đã được sửa đổi bởi "));var wa=el("a","cite","Luật 90/2025 Điều 7 khoản "+L90MAP[art]);wa.href="#vb/l90/d7.k"+L90MAP[art];wn.appendChild(wa);wn.appendChild(document.createTextNode(" (có hiệu lực từ 01/7/2025). Cần đọc cả hai."));wrap.appendChild(wn)}
  var lastK=0,lastP=-1,curK=0,used={};
  data.b.split("\n").forEach(function(line){
    var p=el("p","vbl",line);
    var m=/^\s*(\d+)\.\s/.exec(line),mp=/^\s*([a-zđ])\)\s/.exec(line);
    if(m&&+m[1]===lastK+1){lastK=+m[1];curK=lastK;lastP=-1;p.id=wrap.id+"-k"+curK;p.className+=" k"}
    else if(mp&&curK){var ix=PTS.indexOf(mp[1]);if(ix===lastP+1){lastP=ix;p.id=wrap.id+"-k"+curK+"-"+mp[1];p.className+=" pt"}}
    wrap.appendChild(p);
  });
  var nk=NOTES[doc+"/"+art];if(nk)wrap.appendChild(el("p","note","Ghi chú: "+nk));
  return wrap;
}
function renderLazy(box,id,anchor){
  var t=T[id],ord=orderOf(id),full=t.full;
  var am=/^d(\d+[a-z]?|PL\d+)/.exec(anchor||"");var cur=am&&t.arts[am[1]]?am[1]:null;
  box.appendChild(el("h4",null,"Mục lục ("+ord.length+" mục)"));
  /* tìm trong văn bản */
  var sw=el("div","vbtools");var qi=el("input");qi.type="search";qi.placeholder="Tìm trong toàn văn của văn bản này…";sw.appendChild(qi);box.appendChild(sw);
  var res=el("div");res.hidden=true;box.appendChild(res);
  var toc=el("div","toc");
  ord.forEach(function(k){var line=el("div","tocl has"+(k===cur?" cur":""));var a=el("a",null,artLabel(id,k));a.href="#vb/"+id+"/d"+k;line.appendChild(a);toc.appendChild(line)});
  box.appendChild(toc);
  if(t.note)box.appendChild(el("p","note",t.note));
  var show=el("div");box.appendChild(show);
  function strip(s){return s.toLowerCase()}
  qi.oninput=function(){
    var q=strip(qi.value.trim());res.textContent="";
    if(q.length<3){res.hidden=true;toc.hidden=false;return}
    toc.hidden=true;res.hidden=false;var n=0;
    ord.forEach(function(k){var tx=full[k],i=strip(tx).indexOf(q);if(i<0)return;n++;if(n>60)return;
      var d=el("div","tocl has");var a=el("a",null,artLabel(id,k));a.href="#vb/"+id+"/d"+k;d.appendChild(a);
      d.appendChild(el("div","note","…"+tx.slice(Math.max(0,i-60),i+120).replace(/\s+/g," ")+"…"));res.appendChild(d)});
    res.insertBefore(el("p","note",n+" mục chứa “"+qi.value.trim()+"”"+(n>60?" (hiện 60 mục đầu)":"")),res.firstChild);
  };
  function draw(){
    show.textContent="";
    if(cur){
      var i=ord.indexOf(cur);var nav=el("div","vbtools");
      if(i>0){var p=el("a","btn","← "+(/^[1-9]/.test(ord[i-1])?"Điều "+ord[i-1]:"Mục trước"));p.href="#vb/"+id+"/d"+ord[i-1];nav.appendChild(p)}
      if(i<ord.length-1){var n=el("a","btn",(/^[1-9]/.test(ord[i+1])?"Điều "+ord[i+1]:"Mục sau")+" →");n.href="#vb/"+id+"/d"+ord[i+1];nav.appendChild(n)}
      show.appendChild(nav);
      show.appendChild(renderBody(id,cur,{b:full[cur]}));
      show.appendChild(nav.cloneNode(true));
    }else{
      var b=el("a","btn","Hiện toàn bộ văn bản trên một trang ("+Math.round(ord.reduce(function(s,k){return s+full[k].length},0)/1000)+" nghìn ký tự)");b.href="javascript:void 0";
      b.onclick=function(e){e.preventDefault();b.textContent="Đang dựng…";setTimeout(function(){show.textContent="";var fr=document.createDocumentFragment();ord.forEach(function(k){fr.appendChild(renderBody(id,k,{b:full[k]}))});show.appendChild(fr)},30)};
      show.appendChild(b);
      show.appendChild(el("p","note","Bấm một mục trong mục lục để đọc từng điều, hoặc dùng ô tìm kiếm phía trên."));
    }
  }
  draw();
  box._redraw=function(a){var m=/^d(\d+[a-z]?|PL\d+)/.exec(a||"");cur=m&&t.arts[m[1]]?m[1]:null;draw();[].forEach.call(toc.children,function(c){c.classList.toggle("cur",!!cur&&c.firstChild.getAttribute("href")==="#vb/"+id+"/d"+cur)})};
}
function renderDoc(id,anchor){
  var D=DMAP[id];listEl.hidden=true;viewEl.hidden=false;viewEl.textContent="";
  if(!D){viewEl.appendChild(el("p",null,"Không tìm thấy văn bản."));return}
  currentDoc=id;
  var back=el("a","btn","← Danh sách văn bản");back.href="#tv";viewEl.appendChild(back);
  if(window.__from&&window.__from.tab&&window.__from.tab!=="tv"){var rb=el("a","btn","↩ Quay lại "+tabLabel(window.__from.tab));rb.href="#"+window.__from.tab;rb.style.marginLeft="8px";rb.onclick=function(){var y=window.__from.y;setTimeout(function(){window.scrollTo(0,y)},60)};viewEl.appendChild(rb)}
  viewEl.appendChild(el("h3",null,D.grp+" "+D.so));
  viewEl.appendChild(el("p","vbten",D.ten));
  var meta=el("div","tw");var tb=el("table");
  [["Ngày ký",D.ky||"chưa rõ"],["Hiệu lực",D.hl||"chưa rõ"],["Tình trạng",D.tt],["Nguyên văn trong trang",isLazy(D.id)?"Toàn văn "+orderOf(D.id).filter(function(k){return /^\d+[a-z]?$/.test(k)&&k!=="0"}).length+" điều"+(orderOf(D.id).some(function(k){return /^PL/.test(k)})?" và phụ lục":"")+", lấy từ bản đăng lại của "+T[D.id].src+" (bên thứ ba), chưa đối chiếu Công báo.":D.doc]].forEach(function(r){var tr=el("tr");tr.appendChild(el("th",null,r[0]));tr.appendChild(el("td",null,r[1]));tb.appendChild(tr)});
  meta.appendChild(tb);viewEl.appendChild(meta);
  var n=embeddedCount(id);
  var lk=el("div","vbext");lk.appendChild(el("b",null,isLazy(id)?"Đối chiếu với nguồn bên ngoài: ":"Toàn văn tại nguồn bên ngoài: "));
  var exts=(D.ext||[]).slice();
  if(isLazy(id)&&T[id].srcurl&&/^https?:/.test(T[id].srcurl))exts.unshift(["Nguồn của bản nhúng ("+T[id].src+")",T[id].srcurl]);
  if(exts.length){exts.forEach(function(x){var a=el("a","btn",x[0]);a.href=x[1];a.target="_blank";a.rel="noopener";lk.appendChild(a)})}
  else lk.appendChild(document.createTextNode(isLazy(id)?"bản nhúng lấy từ "+T[id].src:"chưa có đường dẫn toàn văn"));
  viewEl.appendChild(lk);
  viewEl.appendChild(el("p","note",isLazy(id)?"Toàn văn dưới đây được lấy từ trang đăng lại của bên thứ ba, không phải bản Công báo; cần đối chiếu bản chính thức trước khi trích dẫn trong văn bản gửi cơ quan nhà nước.":"Bộ xem trong trang chỉ chứa nguyên văn các điều đã đọc từ kho dữ liệu pháp luật; các nguồn bên ngoài là trang của bên thứ ba, cần đối chiếu Công báo trước khi trích dẫn."));
  /* điều đã dùng */
  var used=CITES[id]||{};var keys=Object.keys(used).sort(function(a,b){return parseInt(a)-parseInt(b)||(a<b?-1:1)});
  var tbs=tabsOf(id);
  viewEl.appendChild(el("h4",null,"Nơi văn bản này được dùng trong trang"));
  if(tbs.length){var p=el("p");tbs.forEach(function(t){var a=el("a","cite",tabLabel(t));a.href="#"+t;a.onclick=function(){window.__from=null};p.appendChild(a);p.appendChild(document.createTextNode("  "))});viewEl.appendChild(p)}
  else viewEl.appendChild(el("p","note","Chưa thấy tab nào trích dẫn trực tiếp."));
  if(keys.length){
    viewEl.appendChild(el("h4",null,"Các điều được trích dẫn ("+keys.length+")"));
    var chips=el("p","chips");
    keys.forEach(function(k){var tg=target(id,k,"","",false);var a=el("a","chip"+(tg&&tg.ext?" ext":""),"Điều "+k);a.href=tg?tg.href:"#vb/"+id;if(tg&&tg.ext){a.target="_blank";a.rel="noopener"}
      var tabsN=Object.keys(used[k]).map(function(t){return tabLabel(t)}).join(", ");a.title="Trích dẫn ở: "+tabsN;chips.appendChild(a)});
    viewEl.appendChild(chips);
  }
  /* nguyên văn */
  if(n&&isLazy(id)){
    var holder=el("div");holder.appendChild(el("p","note","Đang tải toàn văn…"));viewEl.appendChild(holder);
    ensureLoaded(id,function(){
      if(currentDoc!==id)return;holder.textContent="";
      if(!T[id].full){holder.appendChild(el("p","note","Không tải được tệp toàn văn (vb-txt/"+id+".js). Hãy dùng nguồn bên ngoài ở trên."));return}
      renderLazy(holder,id,anchor);
      if(anchor)setTimeout(function(){jump(anchor)},80);
    });
    window.scrollTo(0,0);return;
  }
  if(n){
    var titles=T[id].titles||{};var arts=T[id].arts;
    viewEl.appendChild(el("h4",null,"Mục lục ("+Object.keys(titles).length+" điều; "+n+" điều có nguyên văn trong trang)"));
    var toc=el("div","toc");
    Object.keys(titles).sort(function(a,b){return parseInt(a)-parseInt(b)||(a<b?-1:1)}).forEach(function(k){
      var has=!!arts[k];var line=el("div","tocl"+(has?" has":""));
      var a;
      if(has){a=el("a",null,"Điều "+k+". "+titles[k]);a.href="#vb/"+id+"/d"+k}
      else if(D.deep){a=el("a","ext","Điều "+k+". "+titles[k]);a.href=D.deep(k);a.target="_blank";a.rel="noopener"}
      else a=el("span",null,"Điều "+k+". "+titles[k]);
      line.appendChild(a);toc.appendChild(line);
    });
    viewEl.appendChild(toc);
    if(T[id].note)viewEl.appendChild(el("p","note",T[id].note));
    viewEl.appendChild(el("h4",null,"Nguyên văn các điều đã nạp"));
    Object.keys(arts).sort(function(a,b){return parseInt(a)-parseInt(b)||(a<b?-1:1)}).forEach(function(k){viewEl.appendChild(renderBody(id,k,arts[k]))});
  }
  window.scrollTo(0,0);
  if(anchor)setTimeout(function(){jump(anchor)},80);
}

function buildTab(){
  sec=document.getElementById("tv");
  sec.textContent="";
  sec.appendChild(el("h2",null,"Văn bản pháp luật được sử dụng"));
  sec.appendChild(el("p",null,"Danh sách luật, nghị định, thông tư, quyết định và văn bản hướng dẫn dùng trong trang này. Bấm vào số hiệu để xem toàn văn ngay trong trang (có mục lục và ô tìm kiếm trong văn bản), nơi trang trích dẫn và đường dẫn đối chiếu bên ngoài. Các trích dẫn ở những tab khác là liên kết, bấm vào để nhảy đến đúng điều, khoản trong nguyên văn."));
  var box=el("div","box warn");
  var nfull=DOCS.filter(function(d){return embeddedCount(d.id)>0}).length,nall=DOCS.length;
  box.innerHTML="⚠️ <b>Phạm vi “toàn văn”.</b> "+nfull+" trên "+nall+" văn bản có nội dung nhúng ngay trong trang, nên bấm vào trích dẫn là xem được nội dung tại chỗ, không phải sang trang ngoài. Nội dung lấy từ các trang đăng lại của bên thứ ba (qlda.gxd.vn, dauthau.gxd.vn, hethongphapluat.com), kho dữ liệu pháp luật và bản Công báo; <b>chưa phải bản chính thức</b>, cần đối chiếu Công báo trước khi trích dẫn trong văn bản gửi cơ quan nhà nước. Một số văn bản chỉ nhúng các điều liên quan (ghi rõ trên thẻ văn bản). "+(nall-nfull)+" văn bản còn lại (ví dụ Nghị định 275/2025, Nghị định 19/2026, Thông tư 134/2026, Quyết định 3321/QĐ-UBND) chưa tìm được toàn văn đủ tin cậy nên chỉ có thẻ văn bản và liên kết ngoài. Các nghị định gốc có thể đã bị sửa đổi sau thời điểm đăng; mỗi văn bản có dòng lưu ý nếu biết.";
  sec.appendChild(box);
  var tools=el("div","vbtools");
  var inp=el("input");inp.id="vbq";inp.placeholder="Tìm theo số hiệu hoặc tên văn bản…";inp.type="search";
  var sel=el("select");sel.id="vbg";[["","Tất cả loại"],["Luật","Luật"],["Nghị định","Nghị định"],["Thông tư","Thông tư"],["Quyết định","Quyết định"],["Văn bản hợp nhất","Văn bản hợp nhất"]].forEach(function(o){var op=el("option",null,o[1]);op.value=o[0];sel.appendChild(op)});
  inp.oninput=function(){location.hash.indexOf("#vb/")===0?(location.hash="#tv"):renderList()};sel.onchange=inp.oninput;
  tools.appendChild(inp);tools.appendChild(sel);sec.appendChild(tools);
  listEl=el("div");listEl.id="vblist";viewEl=el("div");viewEl.id="vbview";viewEl.hidden=true;
  sec.appendChild(listEl);sec.appendChild(viewEl);
}

/* ---------- định tuyến ---------- */
function route(){
  var h=(location.hash||"").replace(/^#/,"");
  if(h.indexOf("vb/")===0){
    var parts=h.split("/");window.show("tv",true);
    renderDoc(parts[1],parts[2]||"");return;
  }
  var id=h||"tv";
  var ok=window.TABS.some(function(t){return t.id===id});
  window.show(ok?id:"tv",true);
  if((ok?id:"tv")==="tv"){renderList();window.scrollTo(0,0)}
}

function init(){
  buildTab();
  var total=0;
  [].forEach.call(document.querySelectorAll("section.tab"),function(s){if(s.id!=="tv")total+=linkSection(s)});
  window.VB={docs:DOCS,cites:CITES,debug:DEBUG,total:total,target:target};
  document.addEventListener("click",function(ev){
    var a=ev.target.closest&&ev.target.closest("a.cite");
    if(a&&a.getAttribute("href")&&a.getAttribute("href").indexOf("#vb/")===0){
      var cur=document.querySelector("section.tab.on");
      if(cur&&cur.id!=="tv")window.__from={tab:cur.id,y:window.scrollY};
    }
  });
  window.addEventListener("hashchange",route);
  route();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
