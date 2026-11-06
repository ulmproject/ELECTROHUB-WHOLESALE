// দোকানের WhatsApp নম্বরটি country code-সহ লিখুন, + চিহ্ন ছাড়া। যেমন: 8801XXXXXXXXX
const WHATSAPP_NUMBER = "8801975805326";
const products = [
  {id:1,name:"Wireless Bluetooth Headphone",bn:"ওয়্যারলেস ব্লুটুথ হেডফোন",category:"audio",price:650,emoji:"🎧",badge:"জনপ্রিয়"},
  {id:2,name:"Portable Bluetooth Speaker",bn:"পোর্টেবল ব্লুটুথ স্পিকার",category:"audio",price:850,emoji:"🔊",badge:"বেস্ট সেলার"},
  {id:3,name:"Fast USB-C Charger",bn:"ফাস্ট USB-C চার্জার",category:"mobile",price:320,emoji:"🔌",badge:"নতুন"},
  {id:4,name:"Braided Type-C Cable",bn:"ব্রেইডেড টাইপ-C কেবল",category:"mobile",price:120,emoji:"〰️",badge:"ভ্যালু"},
  {id:5,name:"Smart Watch Series",bn:"স্মার্ট ওয়াচ",category:"smart",price:1250,emoji:"⌚",badge:"জনপ্রিয়"},
  {id:6,name:"LED Desk Lamp",bn:"LED ডেস্ক ল্যাম্প",category:"home",price:540,emoji:"💡",badge:""},
  {id:7,name:"Power Bank 10000mAh",bn:"১০,০০০mAh পাওয়ার ব্যাংক",category:"mobile",price:980,emoji:"🔋",badge:"স্টক"},
  {id:8,name:"Wireless Gaming Mouse",bn:"ওয়্যারলেস গেমিং মাউস",category:"home",price:490,emoji:"🖱️",badge:""},
  {id:9,name:"TWS Earbuds",bn:"TWS ইয়ারবাডস",category:"audio",price:720,emoji:"🎶",badge:"জনপ্রিয়"},
  {id:10,name:"Mini USB Fan",bn:"মিনি USB ফ্যান",category:"home",price:260,emoji:"🌀",badge:""},
  {id:11,name:"Smart Fitness Band",bn:"স্মার্ট ফিটনেস ব্যান্ড",category:"smart",price:790,emoji:"⌚",badge:""},
  {id:12,name:"Multiport USB Hub",bn:"মাল্টিপোর্ট USB হাব",category:"mobile",price:600,emoji:"🧩",badge:""}
];
let cart = [];
let activeCategory = "all";
const money = n => "৳" + Number(n).toLocaleString("bn-BD");
const grid = document.getElementById("productGrid");

function renderProducts(){
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  let list = products.filter(p => (activeCategory==="all" || p.category===activeCategory) && (p.name.toLowerCase().includes(q) || p.bn.includes(q)));
  const sort = document.getElementById("sortSelect").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  grid.innerHTML = list.length ? list.map(p=>`<article class="product-card"><div class="product-art">${p.badge?`<span class="product-badge">${p.badge}</span>`:""}<span class="product-emoji">${p.emoji}</span></div><div class="product-info"><small>${p.name}</small><h3>${p.bn}</h3><div class="price-row"><strong>${money(p.price)} <small>/ নমুনা</small></strong><button onclick="addToCart(${p.id})">+ কার্টে</button></div></div></article>`).join("") : "<p>কোনো পণ্য পাওয়া যায়নি।</p>";
}
function addToCart(id){const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});renderCart();openCart();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
  document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(z=>z.id===x.id);return `<div class="cart-item"><div class="mini-art">${p.emoji}</div><div><b>${p.bn}</b><small>${money(p.price)} × ${x.qty}</small></div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button>${x.qty}<button onclick="changeQty(${p.id},1)">+</button></div></div>`}).join(""):'<p class="empty-cart">আপনার কার্ট এখন খালি।</p>';
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function sendWhatsApp(message){if(!/^8801[0-9]{9}$/.test(WHATSAPP_NUMBER)){alert("WhatsApp নম্বরটি সঠিকভাবে সেট করা নেই।");return;}window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");}
document.querySelectorAll(".category-card").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".category-card").forEach(x=>x.classList.remove("active"));btn.classList.add("active");activeCategory=btn.dataset.category;renderProducts()}));
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("sortSelect").addEventListener("change",renderProducts);
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("whatsappOrder").addEventListener("click",()=>{if(!cart.length){alert("আপনার কার্টে পণ্য যোগ করুন।");return;}const lines=cart.map(x=>{const p=products.find(z=>z.id===x.id);return `${p.bn} (${p.name}) - ${x.qty}টি`});sendWhatsApp("আসসালামু আলাইকুম, আমি পাইকারি অর্ডার করতে চাই:\n"+lines.join("\n")+"\n\nঅনুগ্রহ করে পাইকারি মূল্য ও স্টক নিশ্চিত করবেন।");});
document.getElementById("quoteForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.target);sendWhatsApp(`নতুন কোটেশন অনুরোধ\nনাম: ${d.get("name")}\nফোন: ${d.get("phone")}\nবিস্তারিত: ${d.get("message")}`)});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
