
/* ===== اللغة / Language ===== */
let LANG='ar';try{LANG=localStorage.getItem('lang')==='en'?'en':'ar'}catch(e){}
/* ===== الإعدادات ===== */
const CFG={sound:true,vib:true,q:'high',anim:'full'};
try{Object.assign(CFG,JSON.parse(localStorage.getItem('cfg')||'{}'))}catch(e){}
try{document.documentElement.setAttribute('data-theme',localStorage.getItem('theme')==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}
const STK={oops:{c:0,b:0},gw:{c:0,b:0}};
try{const x=JSON.parse(localStorage.getItem('streak')||'{}');['oops','gw'].forEach(k=>{if(x[k])Object.assign(STK[k],{c:+x[k].c||0,b:+x[k].b||0})})}catch(e){}
function stkRec(k,win){const s=STK[k],prev=s.c;if(win){s.c++;if(s.c>s.b)s.b=s.c}else s.c=0;try{localStorage.setItem('streak',JSON.stringify(STK))}catch(e){}return{c:s.c,b:s.b,prev,win}}
const stkBadge=k=>`<div class="stk">🔥 سلسلة الانتصارات ضد الكمبيوتر: <b>${STK[k].c}</b> · الأفضل: <b>${STK[k].b}</b></div>`;
const stkMsg=r=>r.win?`🔥 ${r.c} انتصارات متتالية`:(r.prev>0?`انقطعت السلسلة (كانت ${r.prev})`:'ابدأ سلسلة جديدة');
const cfgSave=()=>{try{localStorage.setItem('cfg',JSON.stringify(CFG))}catch(e){}};
function applyCfg(){const c=document.documentElement.classList;if(!c)return;c.toggle('q-low',CFG.q==='low');c.toggle('q-mid',CFG.q==='mid');c.toggle('a-off',CFG.anim==='off');c.toggle('a-lite',CFG.anim==='lite')}
const SOCIAL={tiktok:'https://www.tiktok.com/@imposter_squad?_r=1&_t=ZS-9BdGWYalzMn',facebook:'https://www.facebook.com/share/1HZ45QFBfY/'};
const vib=p=>{if(CFG.vib&&typeof navigator!=='undefined'&&navigator.vibrate)try{navigator.vibrate(p)}catch(e){}};
const EN={
'في دورك اسحب كارت، وبعدين اضغط على البيدق المضيء اللي عايز تحرّكه. لو فيه حركة واحدة بس بتتنفذ لوحدها.':'On your turn draw a card, then tap the glowing pawn you want to move. If only one move is possible it plays by itself.',
'اختار شخصية، واسأل أسئلة عن شخصية خصمك، وشيل الوجوه اللي مش مطابقة. أول واحد يخمّن شخصية خصمه يكسب!':"Pick a character, ask about your opponent's character, and flip away the faces that don't match. First to guess it wins!",
'اسحب كروت وحرّك بيادقك حول اللوحة. رجّع بيادق الخصوم للبيت، وأول واحد يوصّل كل بيادقه للقلعة يفوز!':"Draw cards and move your pawns around the board. Send opponents' pawns home. First to get every pawn into the castle wins!",
'الزحاليق: لو وقفت على أول زحليقة لونها مش لونك بتنزلق لآخرها، وأي بيدق عليها بيرجع للبيت':"Slides: land on the first tile of a slide that isn't your color and you slide to its end; any pawn on it goes home",
'بدّل مكان بيدقك مع بيدق لخصم على المسار':"Swap your pawn's place with an opponent's pawn on the track",
'اختار بيدقًا لخصم على المسار وارجّعه للبيت':"Pick an opponent's pawn on the track and send it home",
'لو وقفت على بيدق لخصم بيرجع للبيت. مينفعش تقف على بيدقك، وبيادق الممر والقلعة آمنة.':"Landing on an opponent's pawn sends it home. You can't land on your own pawn, and pawns in the lane and castle are safe.",
'البيدق يلف لفة واحدة حول اللوحة، وبعدها يدخل ممر قلعته الملون':'A pawn goes one lap around the board, then enters its colored castle lane',
'ثم القلعة. لازم توصل القلعة بالعدد المظبوط.':'then the castle. You must reach the castle with the exact count.',
'استعمل الإجابات عشان تشيل الشخصيات اللي مش مطابقة.':"Use the answers to remove characters that don't match.",
'تقدّم للأمام، أو أخرج بيدقًا من البيت لخانة الخروج':'Move forward, or bring a pawn out of home to the start tile',
'بدّل مكان بيدقك مع بيدق لخصم، الاتنين على المسار':"Swap your pawn with an opponent's pawn, both on the track",
'لو مفيش حركة ممكنة بالكارت، الدور بيعدّي تلقائي.':'If no move is possible with the card, the turn passes automatically.',
'أول واحد يوصّل بيادقه الثلاثة للقلعة يفوز.':'First to bring all three pawns to the castle wins.',
'اسأل أسئلة عشان تعرف مواصفات شخصية خصمك.':"Ask questions to learn your opponent's character traits.",
'اضغط على الشخصية اللي تظن إنها شخصية خصمك':"Tap the character you think is your opponent's",
'أعطِ الموبايل له، وما حدش يبص على الشاشة':"Hand the phone over and don't peek at the screen",
'اختار نوع أو أكتر، أو عشوائي لكل الأنواع':'Pick one or more types, or Random for all types',
'أول واحد يخمّن شخصية خصمه يكسب اللعبة.':"First to guess the opponent's character wins.",
'تقدّم بأي بيدق على المسار أو في الممر':'Move any pawn on the track or in the lane',
'اسأل سؤال عشان تعرف مواصفات شخصية خصمك':"Ask a question to learn your opponent's traits",
'لو مقفول: الامبوستر بيشوف':'If off: the imposter sees',
'اضغط على القنبلة لتمريرها للي بعدك':'Tap the bomb to pass it on',
'اللاعب التاني يبعد عينه عن الشاشة':'The other player looks away',
'اتكشف بالتصويت':'Caught by the vote','نجا من التصويت':'Survived the vote',
'تلعبوا بالتناوب مع عقارب الساعة.':'Take turns clockwise.',
'رجّع بيدق لخصم من المسار للبيت':"Send an opponent's pawn from the track home",
'لا توجد حركة متاحة بهذا الكارت':'No move available with this card',
'اختار شخصيتك في بداية اللعبة.':'Choose your character at the start of the game.',
'اضغط على الكروت في المنتصف':'Tap the cards in the middle',
'أو أخرج بيدقًا من البيت':'or bring a pawn out of home',
'ارجع للخلف ببيدق على المسار':'Move back with a pawn on the track',
'للخلف ببيدق على المسار':'back with a pawn on the track',
'مش من البيت ولا الممر':'not from home or the lane',
'الامبوستر ياخد كلمة مختلفة':'The imposter gets a different word',
'الامبوستر نجا من التصويت':'The imposter survived the vote',
'كام كمبيوتر ضدك؟':'How many computers?','كام لاعب؟':'How many players?',
'اذكر لاعب في الدوري الإيطالي':'Name a Serie A player','اذكر نادي في الدوري الإسباني':'Name a La Liga club','اذكر دولة فازت بكأس العالم':'Name a World Cup winner','اذكر نادي في الدوري المصري':'Name an Egyptian league club','اذكر ماركة مشروبات غازية':'Name a soft drink brand','اذكر أكلة بتتعمل بالأرز':'Name a dish made with rice','اذكر فيلم له أجزاء كتير':'Name a movie with many sequels','اذكر لاعب في ريال مدريد':'Name a Real Madrid player','اذكر فيلم كوميدي مصري':'Name an Egyptian comedy','اذكر مطعم وجبات سريعة':'Name a fast food restaurant','اذكر فيلم لأحمد حلمي':'Name an Ahmed Helmy movie','اذكر لاعب بيلبس رقم':'Name a player who wears number','اذكر فيلم أنيميشن':'Name an animated movie','اذكر فيلم رومانسي':'Name a romantic movie','اذكر لاعب برازيلي':'Name a Brazilian player','اذكر مسلسل رمضاني':'Name a Ramadan series','اذكر نادي إنجليزي':'Name an English club','اذكر أكلة بتتشوى':'Name a grilled dish','اذكر شخصية كرتون':'Name a cartoon character','اذكر ممثل أمريكي':'Name an American actor','اذكر ممثلة مصرية':'Name an Egyptian actress','اذكر أكلة مصرية':'Name an Egyptian dish','اذكر فاكهة صيفي':'Name a summer fruit','اذكر مخرج مشهور':'Name a famous director','اذكر مدرب مشهور':'Name a famous coach','اذكر ملعب مشهور':'Name a famous stadium','اذكر نوع حلويات':'Name a type of dessert','اذكر نوع مكرونة':'Name a type of pasta','اذكر أكلة شارع':'Name a street food','اذكر حارس مرمى':'Name a goalkeeper','اذكر خضار ورقي':'Name a leafy vegetable','اذكر فيلم أكشن':'Name an action movie','اذكر لاعب مصري':'Name an Egyptian player','اذكر فيلم رعب':'Name a horror movie','اذكر نوع جبنة':'Name a type of cheese','اذكر نوع عصير':'Name a type of juice',
'لاعب جديد':'New player','تعديل الاسم':'Edit name','الامبوستر يختار الكلمة':'The imposter picks the word','محتاج لاعبين على الأقل':'Need at least two players','لاعبين على الأقل':'players at least','محتاج':'Need',
'الكمبيوتر':'Computer','كمبيوتر':'Computer','الامبوستر عرف الكلمة':'The imposter got the word','الامبوستر مخمّنش صح':'The imposter guessed wrong','كلمة الامبوستر كانت:':"The imposter's word was:",'اختار أنواع الأسئلة':'Choose question types','أعطِ الموبايل للاعب':'Hand the phone to player','صعبة، غيّر السؤال':'Too hard, change it','وأرجع بيدقًا للبيت':'and sent a pawn home','اكتب الاسم الأول':'Enter a name first','حركة واحدة متاحة':'only one move available','الكمبيوتر بيفكر…':'The computer is thinking…','بيادق في «البيت»':'pawns in "Home"','ودخل ممر القلعة':'and entered the castle lane','أعطِ الهاتف إلى':'Hand the phone to','ابدأ بسحب كارت':'Start by drawing a card','الاسم ده موجود':'Name already exists','إخفاء والتالي':'Hide & next','اختار شخصيتك':'Choose your character','القطرة الملونة':'the colored drop','الصوت: شغال':'Sound: on','الصوت: مقفول':'Sound: off','القنبلة فرقعت!':'The bomb exploded!','الكمبيوتر سأل:':'The computer asked:','رجوع للرئيسية':'Back to home','سحبت':'drew','سحب':'drew','اختار شخصيتك!':'Choose your character!','تأكيد التخمين':'Confirm guess','تبديل':'Swap','ضربة':'Hit','عدد اللاعبين':'Number of players','إعادة اللعب':'Play again','ابدأ اللعبة':'Start game','الامبوستر هو':'The imposter is','تغيير الفئة':'Change category','خانة واحدة':'1 tile','خانتين':'2 tiles','خانات':'tiles','خانة':'tiles','خمّن الشخصية':'Guess Who','دورك':'Your turn','دور':'Turn:','شاكك في مين؟':'Who do you suspect?','وبدّل المكان':'and swapped places','إنهاء الدور':'End turn','اختار الفئة':'Choose a category','اعرض كلمتي':'Show my word','الدور على':'Turn:','اللي اتخمّن':'Guessed','كسبت':'won','كسب':'won','ونزل زحليقة':'and took a slide','ووصل القلعة':'and reached the castle','اسم اللاعب':'Player name','الإعدادات':'Settings','العب تاني':'Play again','تخمّن إنها':'Guess it is','خانات آمنة':'safe tiles','خصمك اختار':'Opponent chose','سوبر ماركت':'Supermarket','فزت':'won','فاز':'won','كرة القدم':'Football','كل الأنواع':'all types','لاعب جديد':'New player','التصويت ·':'Voting ·','بأي بيدق':'with any pawn','تخمين غلط':'wrong guess','حتى بيدقك':'even yours','دور جديد':'New round','أنت برّه':'You are out','السعودية':'Saudi Arabia','القائمة':'Menu','اللاعبين':'Players','تخمين صح':'correct guess','كيف تلعب':'How to play','لكل لاعب':'Each player has','أفلام':'Movies','أكلات':'Food','إسبانيا':'Spain','إيطاليا':'Italy','الأحمر':'Red','الأخضر':'Green','الأزرق':'Blue','الأصفر':'Yellow','التالي':'Next','العب ضد':'Play vs','القنبلة':'Bomb','الكلمة:':'Word:','تقدّم':'Move','حيوانات':'Animals','عشوائي':'Random','لاعبين':'players','للخلف':'Back','أمريكا':'USA','ارجع':'Move back','السؤال':'Question','الفئة:':'Category:','الكروت':'Cards','اللاعب':'Player','النقاط':'Points','تعديل':'Edit','عشوائي':'Random','لاعب':'Player','مستشفى':'Hospital','موسيقي':'Musician','أماكن':'Places','أنت':'You','إغلاق':'Close','إلغاء':'Cancel','الصين':'China','العب':'Play','الهند':'India','بيتزا':'Pizza','تأكيد':'Confirm','تمام!':'Done!','تمام':'OK','جاهز':'Ready','خسران':'loses','خمّنت':'You guessed','دلفين':'Dolphin','زرافة':'Giraffe','سوريا':'Syria','شخصية':'character','فرنسا':'France','كافيه':'Cafe','محامي':'Lawyer','مدرسة':'School','مهندس':'Engineer','ميكس':'Mix','نودلز':'Noodles','وظائف':'Jobs','أيوه':'Yes','اسأل':'Ask','برجر':'Burger','حصان':'Horse','حفظ':'Save','خروج':'Exit','خمّن':'Guess','رجوع':'Back','سوشي':'Sushi','شاطئ':'Beach','شرطي':'Police officer','صديق':'a friend','طباخ':'Chef','طبيب':'Doctor','طيار':'Pilot','فندق':'Hotel','كشري':'Koshary','لوحة':'board','مدرس':'Teacher','مطار':'Airport','أسد':'Lion','أكل':'Food','بن':'Ben','تم':'Done','حذف':'Delete','خطأ':'Wrong','دول':'Countries','فيل':'Elephant','قطة':'Cat','كلب':'Dog','مصر':'Egypt','مول':'Mall','نمر':'Tiger','لا':'No','من':'of','اضغط عشان تبدأ':'Tap to start','في':'in',
'ليلى':'Layla','تامر':'Tamer','سارة':'Sara','منى':'Mona','حسن':'Hassan','روز':'Rose','جاك':'Jack','ليا':'Lia','رامي':'Rami','آية':'Aya','بيلا':'Bella','صوفيا':'Sophia','جون':'John','هدى':'Huda','ثيو':'Theo','آني':'Annie','بول':'Paul','أوليفيا':'Olivia','كلوي':'Chloe','نورا':'Nora','جيمس':'James','بيل':'Bill','جوليا':'Julia','ناعومي':'Naomi','ريان':'Ryan','داود':'David','ميلا':'Mila','يوسف':'Youssef','عمر':'Omar',
'لون البشرة':'Skin tone','الجنس':'Gender','لون العين':'Eye color','إكسسوارات':'Accessories','طول الشعر':'Hair length','لون الشعر':'Hair color','اللحية':'Facial hair','فاتح':'Light','وسط':'Medium','غامق':'Dark','ولد':'Boy','بنت':'Girl','بني':'Brown','أزرق':'Blue','أخضر':'Green','نظارة':'Glasses','قبعة':'Hat','حلق':'Earrings','لا يوجد':'None','أصلع':'Bald','قصير':'Short','طويل':'Long','أسود':'Black','أشقر':'Blonde','أحمر':'Red','رمادي':'Gray','شنب':'Mustache','لحية':'Beard',
'اختار':'Choose','اختار شخصيتك:':'Choose your character:','اسأل أسئلة':'Ask questions','كام':'How many','تحتاج':'Need','على الأقل':'at least','ضدك':'against you','اللي':'that','الشخصية':'character','أنت +':'You +','خصمك':'opponent','الدور':'turn','الدور على:':'Turn:','دور ':'Turn:'
};
Object.assign(EN,{'ورجع للبيت 🏠':'and went back home 🏠','ولو عدّى البداية بيرجع للبيت':'if it passes the start it goes back home','الوضع الداكن':'Dark mode','سأل:':'asked:','المستوى':'Level','اختار المستوى':'Choose level','عادي':'Normal','صعب':'Hard','اكستريم':'Extreme','دور الكمبيوتر':"Computer's turn",'الكمبيوتر بيفكر…':'Computer is thinking…','الكمبيوتر بيخمّن…':'Computer is guessing…','الكمبيوتر بيسأل:':'Computer asks:','الكمبيوتر بيشيل الشخصيات المستبعدة…':'Computer is eliminating characters…','الكمبيوتر خلّص دوره':'Computer finished its turn'});
delete EN['دور '];delete EN['الدور على:'];delete EN['اختار شخصيتك:'];
Object.assign(EN,{'الجودة (الدقة)':'Quality (Resolution)','الحركة (الفريمات)':'Motion (Frames)','الصوت':'Sound','الاهتزاز':'Vibration','شغال':'On','مقفول':'Off','عالية':'High','متوسطة':'Medium','منخفضة':'Low','كاملة · 60':'Full · 60','خفيفة · 30':'Light · 30','بدون':'None','الاهتزاز بيشتغل على الموبايلات اللي بتدعمه بس. الجودة المنخفضة والحركة الخفيفة بيوفّروا البطارية ويخلّوا اللعب أسلس على الأجهزة الضعيفة.':'Vibration only works on phones that support it. Low quality and light motion save battery and run smoother on weak devices.'});
Object.assign(EN,{'تابعنا':'Follow us','تيك توك':'TikTok','فيسبوك':'Facebook'});
Object.assign(EN,{'سلسلة الانتصارات ضد الكمبيوتر':'Win streak vs Computer','الأفضل':'Best','انتصارات متتالية':'wins in a row','انقطعت السلسلة':'Streak broken','ابدأ سلسلة جديدة':'Start a new streak'});
Object.assign(EN,{'اختار الوضع':'Choose mode','المراحل':'Levels','مرحلة':'levels','كلاسيك':'Classic','المرحلة':'Level','زعيم المرحلة':'Boss level','زعيم':'Boss','خلّص المرحلة عشان تفتح اللي بعدها':'Beat a level to unlock the next one','مبتدئ':'Beginner','متوسط':'Intermediate','محترف':'Pro','خبير':'Expert','أسطورة':'Legend','الزعيم بيبدأ بميزة':'The boss starts with an advantage','الكمبيوتر بيبدأ بميزة':'The computer starts with an advantage','شخصيات مستبعدة من البداية':'characters already ruled out','الزعيم ما بيغلطش وبيخمّن أول ما يتأكد':'The boss never slips up and guesses as soon as it is sure','ابدأ':'Start','المرحلة التالية':'Next level','حاول تاني':'Try again','هزمت الزعيم!':'You beat the boss!','خلصت كل المراحل!':'You beat all the levels!','فتحت المرحلة':'You unlocked level','خلصت':'completed'});
const trRe=new RegExp('(?<![\\u0621-\\u063A\\u0641-\\u0652\\u0671-\\u06D3])('+Object.keys(EN).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![\\u0621-\\u063A\\u0641-\\u0652\\u0671-\\u06D3])','g');
const trT=t=>LANG==='en'?t.replace(trRe,m=>EN[m]).replace(/،/g,',').replace(/؟/g,'?'):t;
const pn=s=>'\u0001'+esc(s)+'\u0002';
const trP=t=>t.split(/(\u0001[^\u0002]*\u0002)/).map(x=>x[0]==='\u0001'?x:trT(x)).join('');
const TRH=h=>{h=TRH0(h);return h.replace(/[\u0001\u0002]/g,'')};
const TRH0=h=>LANG==='en'?('>'+h+'<').replace(/>([^<>]+)</g,(m,t)=>'>'+trP(t)+'<').replace(/(placeholder|aria-label)=(["'])(.*?)\2/g,(m,a,q,v)=>a+'='+q+trT(v)+q).slice(1,-1).replace(/text-align:right/g,'text-align:left'):h;
function applyDir(){const d=LANG==='en'?'ltr':'rtl';document.documentElement.setAttribute('dir',d);document.documentElement.setAttribute('lang',LANG);if(typeof app!=='undefined')app.setAttribute('dir',d)}
function togTheme(){const d=document.documentElement,c=d.getAttribute('data-theme')||(window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');const n=c==='dark'?'light':'dark';d.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}}
function setLang(l){LANG=l;try{localStorage.setItem('lang',l)}catch(e){}applyDir();toHome()}

const WORDS={"وظائف":["طبيب","مهندس","مدرس","طيار","موسيقي","محامي","شرطي","طباخ"],"حيوانات":["أسد","فيل","قطة","كلب","نمر","زرافة","حصان","دلفين"],"أماكن":["كافيه","فندق","مول","سوبر ماركت","مطار","مستشفى","شاطئ","مدرسة"],"دول":["مصر","السعودية","سوريا","إيطاليا","فرنسا","إسبانيا","الصين","الهند","أمريكا"],"أكل":["كشري","بيتزا","سوشي","نودلز","برجر"]};
const MIX='ميكس',MIN=3;
const S={cat:MIX,players:[],scores:{},oddDiff:false};let G={};
const app=document.getElementById('app'),$=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd=n=>Math.floor(Math.random()*n),pick=a=>a[rnd(a.length)];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const V=h=>{const up=V.h?'':`<button class='up' onclick='toHome()' aria-label='رجوع للرئيسية'>${LANG==='en'?'←':'→'}</button>`;V.h=0;applyDir();app.innerHTML=TRH(up+h);window.scrollTo(0,0)};
const btn=(t,fn,c='')=>`<button class="b ${c}" onclick="${fn}">${t}</button>`;
const back=(t,fn)=>`<button class="t" onclick="${fn}">${t}</button>`;

const DET='<svg xmlns="http://www.w3.org/2000/svg" viewBox="220 270 700 754"><path d="M230 1024 L250 790 Q262 690 380 668 L644 668 Q762 690 774 790 L794 1024 Z" fill="#C99A5B"/><polygon points="380,668 470,668 512,800 430,880" fill="#A97E45"/><polygon points="644,668 554,668 512,800 594,880" fill="#A97E45"/><polygon points="458,668 566,668 512,790" fill="#F4F4F8"/><polygon points="500,730 524,730 534,820 512,848 490,820" fill="#D8432B"/><rect x="470" y="600" width="84" height="80" fill="#E8B88A"/><ellipse cx="512" cy="520" rx="118" ry="132" fill="#F1C9A0"/><ellipse cx="394" cy="525" rx="16" ry="28" fill="#E8B88A"/><ellipse cx="630" cy="525" rx="16" ry="28" fill="#E8B88A"/><ellipse cx="512" cy="440" rx="228" ry="50" fill="#14182E"/><path d="M384 440 Q384 290 512 284 Q640 290 640 440 Z" fill="#14182E"/><rect x="384" y="388" width="256" height="40" fill="#D8432B"/><path d="M440 492 q30 -22 62 -4 M522 488 q32 -18 62 4" stroke="#3B2A1E" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cx="470" cy="525" rx="13" ry="16" fill="#1F2A5A"/><ellipse cx="554" cy="525" rx="13" ry="16" fill="#1F2A5A"/><path d="M512 535 q-16 36 4 46" stroke="#D9A57B" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M450 598 q62 -42 124 0 q-30 -16 -62 -6 q-32 -10 -62 6z" fill="#3B2A1E"/><path d="M480 628 q32 14 64 0" stroke="#9B5B43" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M730 800 L842 742" stroke="#C99A5B" stroke-width="96" stroke-linecap="round"/><path d="M836 664 L900 740" stroke="#7A4A28" stroke-width="38" stroke-linecap="round"/><circle cx="872" cy="740" r="42" fill="#F1C9A0"/><circle cx="750" cy="560" r="150" fill="#9AD1FF" fill-opacity=".38"/><circle cx="750" cy="560" r="150" fill="none" stroke="#E8B04A" stroke-width="26"/><path d="M660 500 q30 -60 100 -66" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" opacity=".75"/></svg>';
function appSet(){
  const cur=k=>k==='sound'||k==='vib'?(CFG[k]?'on':'off'):CFG[k];
  const row=(l,k,o)=>`<div class="srow"><b>${l}</b><div class="wrap">${o.map(([v,t])=>`<button class="chip2 ${cur(k)===v?'on':''}" data-k="${k}" data-v="${v}" onclick="cfgSet(this.dataset.k,this.dataset.v)">${t}</button>`).join('')}</div></div>`;
  V(`<h1>⚙️ الإعدادات</h1>`+row('الصوت','sound',[['on','شغال'],['off','مقفول']])+row('الاهتزاز','vib',[['on','شغال'],['off','مقفول']])+row('الجودة (الدقة)','q',[['high','عالية'],['mid','متوسطة'],['low','منخفضة']])+row('الحركة (الفريمات)','anim',[['full','كاملة · 60'],['lite','خفيفة · 30'],['off','بدون']])+`<p class="m s">الاهتزاز بيشتغل على الموبايلات اللي بتدعمه بس. الجودة المنخفضة والحركة الخفيفة بيوفّروا البطارية ويخلّوا اللعب أسلس على الأجهزة الضعيفة.</p>
  <p class="m">تابعنا</p>
  <div class="soc"><a href="${SOCIAL.tiktok}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="15" fill="#111"/><path transform="translate(3 3) scale(.9)" d="M16.5 3c.3 2.3 1.7 3.8 4 4v3.2c-1.5 0-2.9-.5-4-1.3v6.1c0 3-2.4 5.5-5.5 5.5S5.5 18 5.5 15s2.4-5.5 5.5-5.5c.3 0 .6 0 .9.1v3.3c-.3-.1-.6-.2-.9-.2-1.2 0-2.2 1-2.2 2.3s1 2.3 2.2 2.3 2.3-1 2.3-2.3V3h3.2z" fill="#fff"/></svg>تيك توك</a><a href="${SOCIAL.facebook}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="15" fill="#1877F2"/><path d="M16.6 24v-8h2.7l.4-3.2h-3.1v-2c0-.9.3-1.5 1.600-1.500h1.700V6.400c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.500-4 4.100v2.400H10.800V16h2.700v8z" fill="#fff"/></svg>فيسبوك</a></div>`);
}
function cfgSet(k,v){
  if(k==='sound'||k==='vib')CFG[k]=v==='on';else CFG[k]=v;
  cfgSave();applyCfg();
  if(k==='sound'&&CFG.sound)obeep(520);if(k==='vib'&&CFG.vib)vib(60);
  appSet();
}
document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('button');if(b){vib(8);obeep(480,.04)}});
function home(){V.h=1;V(`<div class="lang"><button class="chip2" onclick="appSet()" aria-label="الإعدادات">⚙️</button><div class="lg" dir="${LANG==='en'?'ltr':'rtl'}"><button class="chip2 ${LANG==='ar'?'on':''}" onclick="setLang('ar')">العربية</button><button class="chip2 ${LANG==='en'?'on':''}" onclick="setLang('en')">English</button><button class="chip2" onclick="togTheme()" aria-label="الوضع الداكن">🌓</button></div></div><div class="games"><button class="home" onclick="S.mode='imp';cats()"><div class="em">${DET}</div><h1>Imposter Squad</h1></button><div class="g2"><button class="home" onclick="bombOpen()"><div class="em">${BOOMART}</div><h1>القنبلة</h1></button><button class="home" onclick="guessHome()"><div class="em">${GUESSART}</div><h1>خمّن الشخصية</h1></button><button class="home" onclick="oopsHome()"><div class="em">${OOPSART}</div><h1 dir="ltr">Oops!</h1></button></div></div>`)}

function cats(){
  const c=[MIX,...Object.keys(WORDS)].map(x=>btn(x,`setCat(this.dataset.c)" data-c="${x}`)).join('');
  V(`<h1>اختار الفئة</h1><div class="wrap">${c}</div>${back('رجوع','home()')}`);
}
function setCat(c){S.cat=c;players()}

function players(err=''){
  const rows=S.players.map((p,i)=>`<div class="row"><b>${pn(p)}</b><span><button class="t" onclick="nameForm(${i})">تعديل</button><button class="t" onclick="del(${i})">حذف</button></span></div>`).join('');
  V(`<h1>اللاعبين</h1><p class="m">الفئة: ${S.cat}</p>${rows}${btn('+ لاعب جديد','nameForm(-1)','g')}${err?`<p class="e">${err}</p>`:''}
  <label class="sw"><input type="checkbox" ${S.oddDiff?'checked':''} onchange="S.oddDiff=this.checked"> الامبوستر ياخد كلمة مختلفة</label>
  <p class="m s">لو مقفول: الامبوستر بيشوف «أنت برّه»</p>
  ${S.players.length>=MIN?btn('العب','start()','bl'):`<p class="m">محتاج ${MIN} لاعبين على الأقل</p>`}${back('تغيير الفئة','cats()')}`);
}
function nameForm(i,err=''){
  V(`<h1>${i<0?'لاعب جديد':'تعديل الاسم'}</h1><input type="text" id="nm" maxlength="20" placeholder="اسم اللاعب" value="${i<0?'':esc(S.players[i])}">${err?`<p class="e">${err}</p>`:''}${btn('حفظ',`saveName(${i})`,'g')}${back('رجوع','goBack()')}`);
  const f=$('#nm');f.focus();f.onkeydown=e=>{if(e.key==='Enter')saveName(i)};
}
function saveName(i){
  const n=$('#nm').value.trim();
  if(!n)return nameForm(i,'اكتب الاسم الأول');
  if(S.players.some((p,j)=>p===n&&j!==i))return nameForm(i,'الاسم ده موجود');
  if(i<0){S.players.push(n);S.scores[n]=S.scores[n]||0}
  else{const o=S.players[i];S.players[i]=n;if(o!==n){S.scores[n]=S.scores[o]||0;delete S.scores[o]}}
  goBack();
}
function del(i){delete S.scores[S.players[i]];S.players.splice(i,1);goBack()}

function start(){
  if(S.players.length<MIN)return players();
  const P=[...S.players],cat=S.cat===MIX?pick(Object.keys(WORDS)):S.cat;
  const pool=shuf(WORDS[cat]),main=pool[0],same=pool.slice(1);
  const other=Object.entries(WORDS).filter(([c])=>c!==cat).flatMap(([,w])=>w);
  const options=shuf([main,...shuf(same).slice(0,4),...shuf(other).slice(0,5)]);
  G={P,odd:rnd(P.length),main,oddWord:S.oddDiff?pick(same):null,cat,options,order:shuf(P),votes:P.map(()=>0)};
  deal(0,false);
}
function deal(c,rev){
  const n=G.P.length,h=`<p class="m">اللاعب ${c+1} من ${n}</p>`;
  if(!rev)return V(h+`<p>أعطِ الهاتف إلى</p><h1 class="big">${pn(G.P[c])}</h1>`+btn('اعرض كلمتي',`deal(${c},true)`,'bl'));
  const odd=c===G.odd,w=odd?G.oddWord:G.main,imp=odd&&!w;
  V(h+`<h2>${pn(G.P[c])}</h2><div class="card ${imp?'r':''}">${imp?'أنت برّه 🕵️':esc(w)}</div>`+btn('إخفاء والتالي',c+1<n?`deal(${c+1},false)`:'ask(0)','bl'));
}
function ask(s){
  const o=G.order,n=o.length;
  V(`<p class="m">السؤال ${s+1} من ${n}</p><div class="chip" style="background:var(--red)">${pn(o[s])}</div><p class="m">اسأل</p><p style="color:var(--red);font-size:24px">▼</p><div class="chip" style="background:var(--navy)">${pn(o[(s+1)%n])}</div>`+btn('التالي',s+1<n?`ask(${s+1})`:'vote(0)','bl'));
}
function vote(v){
  const b=G.P.map((p,j)=>j===v?'':btn(pn(p),`cast(${v},${j})`)).join('');
  V(`<p class="m">التصويت · ${v+1} من ${G.P.length}</p><p>أعطِ الهاتف إلى</p><h1>${pn(G.P[v])}</h1><h2 style="color:var(--red)">شاكك في مين؟</h2><div class="wrap">${b}</div>`);
}
function cast(v,j){G.votes[j]++;v+1<G.P.length?vote(v+1):imp()}
const caught=()=>{const m=Math.max(...G.votes),t=G.votes.map((c,i)=>c===m?i:-1).filter(i=>i>=0);return t.length===1&&t[0]===G.odd};
function imp(){
  const c=caught();
  V(`<p class="m">الامبوستر هو</p><h1 class="big" style="color:var(--red)">${pn(G.P[G.odd])}</h1><b>${c?'اتكشف بالتصويت':'نجا من التصويت'}</b>`+btn('التالي',c?'guess()':'fin(null)','bl'));
}
function guess(){
  V(`<h2>الامبوستر يختار الكلمة</h2><div class="wrap">${G.options.map((w,i)=>btn(esc(w),`fin(G.options[${i}]===G.main)`)).join('')}</div>`);
}
function fin(r){
  const odd=G.P[G.odd],c=caught(),win=!c||r===true;
  if(win)S.scores[odd]=(S.scores[odd]||0)+2;
  else G.P.forEach(p=>{if(p!==odd)S.scores[p]=(S.scores[p]||0)+1});
  const [msg,col]=r===null?['الامبوستر نجا من التصويت','red']:r?['الامبوستر عرف الكلمة ✔','red']:['خطأ ✘ الامبوستر مخمّنش صح','green'];
  scores(msg,col);
}
function scores(msg,col){
  const rows=[...S.players].sort((a,b)=>(S.scores[b]||0)-(S.scores[a]||0)).map(p=>`<div class="sc"><span>${pn(p)}</span><span>${S.scores[p]||0}</span></div>`).join('');
  V(`<h1 style="color:var(--${col})">${msg}</h1><p>الكلمة: <b>${esc(G.main)}</b> · الفئة: ${G.cat}</p>${G.oddWord?`<p class="m">كلمة الامبوستر كانت: ${esc(G.oddWord)}</p>`:''}<p class="m">النقاط</p>${rows}<div class="wrap">${btn('دور جديد','start()','bl')}${btn('تعديل','players()')}</div>`);
}
/* ===== لعبة القنبلة ===== */
const star=(cx,cy,ro,ri,n,rot=0)=>Array.from({length:n*2},(_,i)=>{const r=i%2?ri:ro,a=Math.PI*i/n+rot;return (cx+r*Math.cos(a)).toFixed(0)+','+(cy+r*Math.sin(a)).toFixed(0)}).join(' ');
const burst=(cx,cy,s)=>`<polygon points='${star(cx,cy,s,s*.62,12)}' fill='#D8432B'/><polygon points='${star(cx,cy,s*.8,s*.5,12,.15)}' fill='#F5A623'/><polygon points='${star(cx,cy,s*.58,s*.36,12,.05)}' fill='#FFE066'/>`;
const PPL=['#2E9E4F','#2F6FDE','#F5A623','#9B59D0','#16B0A5'].map((c,i)=>{const x=50+i*75;return `<g><path d='M${x-22} 290 v-18 q0-24 22-24 q22 0 22 24 v18z' fill='${c}'/><circle cx='${x}' cy='245' r='19' fill='#FFD9B0'/><circle cx='${x-7}' cy='242' r='2.6' fill='#1F2A5A'/><circle cx='${x+7}' cy='242' r='2.6' fill='#1F2A5A'/><ellipse cx='${x}' cy='252' rx='4' ry='5' fill='#1F2A5A'/></g>`}).join('');
const BOOMART=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 290'>${burst(200,112,105)}<circle cx='200' cy='124' r='42' fill='#0E1226'/><rect x='186' y='74' width='28' height='20' rx='5' fill='#0E1226'/><path d='M206 76 q20 -28 46 -22' stroke='#E8DCC0' stroke-width='6' fill='none' stroke-linecap='round'/>${PPL}</svg>`;
const BOMBIC=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 220'><circle cx='100' cy='130' r='70' fill='#1F2A5A' stroke='#6B7391' stroke-width='4'/><circle cx='78' cy='108' r='16' fill='#fff' opacity='.2'/><rect x='82' y='50' width='36' height='24' rx='6' fill='#1F2A5A' stroke='#6B7391' stroke-width='4'/><path d='M104 50 q22 -34 52 -28' stroke='#B9A77F' stroke-width='7' fill='none' stroke-linecap='round'/><polygon points='${star(158,22,20,8,6)}' fill='#F5A623'/></svg>`;
const BOOMBIG=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'>${burst(120,120,115)}</svg>`;
const QS={
'أكلات':['اذكر أكلة مصرية','اذكر نوع حلويات','اذكر أكلة بتتعمل بالأرز','اذكر ماركة مشروبات غازية','اذكر نوع جبنة','اذكر أكلة شارع','اذكر خضار ورقي','اذكر فاكهة صيفي','اذكر مطعم وجبات سريعة','اذكر أكلة بتتشوى','اذكر نوع مكرونة','اذكر نوع عصير'],
'أفلام':['اذكر فيلم أكشن','اذكر فيلم كوميدي مصري','اذكر ممثل أمريكي','اذكر فيلم أنيميشن','اذكر فيلم رعب','اذكر فيلم لأحمد حلمي','اذكر فيلم رومانسي','اذكر مسلسل رمضاني','اذكر ممثلة مصرية','اذكر فيلم له أجزاء كتير','اذكر شخصية كرتون','اذكر مخرج مشهور'],
'كرة القدم':['اذكر لاعب في ريال مدريد','اذكر نادي إنجليزي','اذكر لاعب مصري','اذكر دولة فازت بكأس العالم','اذكر ملعب مشهور','اذكر مدرب مشهور','اذكر نادي في الدوري الإسباني','اذكر لاعب برازيلي','اذكر حارس مرمى','اذكر نادي في الدوري المصري','اذكر لاعب في الدوري الإيطالي','اذكر لاعب بيلبس رقم 10']};
const BT=['كرة القدم','أفلام','أكلات','عشوائي'];
const B={types:new Set(['عشوائي'])};let BG={};
const goBack=()=>S.mode==='bomb'?bombSetup():players();
const qpool=()=>B.types.has('عشوائي')?Object.values(QS).flat():[...B.types].flatMap(t=>QS[t]);
function newQ(){const p=qpool().filter(q=>!BG.used.has(q));if(!p.length)BG.used.clear();const q=pick(p.length?p:qpool());BG.used.add(q);return q}
function bombOpen(){S.mode='bomb';bombSetup()}
function bombSetup(){
  const rows=S.players.map((p,i)=>`<div class='row'><b>${pn(p)}</b><span><button class='t' onclick='nameForm(${i})'>تعديل</button><button class='t' onclick='del(${i})'>حذف</button></span></div>`).join('');
  const sel=B.types.has('عشوائي')?'عشوائي (كل الأنواع)':[...B.types].join('، ');
  V(`<button class='b dots' onclick='B.pre=false;bombTypes()'><i>•••</i>اختار أنواع الأسئلة</button><p class='m'>${sel}</p><h1>القنبلة</h1><p class='m'>اللاعبين</p>${rows}${btn('+ لاعب جديد','nameForm(-1)','g')}${S.players.length>=2?btn('ابدأ اللعبة','bombPre()','bl'):`<p class='m'>محتاج لاعبين على الأقل</p>`}${back('رجوع','home()')}`);
}
function bombTypes(){
  const c=BT.map(t=>`<button class='chip2 ${B.types.has(t)?'on':''}' data-t='${t}' onclick='togType(this.dataset.t)'>${t}</button>`).join('');
  V(`<h2>اختار أنواع الأسئلة</h2><p class='m'>اختار نوع أو أكتر، أو عشوائي لكل الأنواع</p><div class='wrap'>${c}</div>${btn('تم',B.pre?'bombStart()':'bombSetup()','g')}`);
}
function togType(t){
  if(t==='عشوائي')B.types=new Set(['عشوائي']);
  else{B.types.delete('عشوائي');B.types.has(t)?B.types.delete(t):B.types.add(t);if(!B.types.size)B.types=new Set(['عشوائي'])}
  bombTypes();
}
function bombPre(){B.pre=true;bombTypes()}
function bombStart(){
  B.pre=false;clearTimeout(BG.t);
  const P=[...S.players];
  BG={P,cur:rnd(P.length),used:new Set(),over:false,end:Date.now()+(40+rnd(81))*1000};
  BG.q=newQ();BG.t=setTimeout(boom,BG.end-Date.now());
  bombShow();
}
function bombShow(){
  V(`<p class='m'>الدور على</p><h1 class='big'>${pn(BG.P[BG.cur])}</h1><div class='qcard'>${esc(BG.q)}</div><div class='bomb' role='button' tabindex='0' onclick='bombNext()' style='cursor:pointer'>${BOMBIC}</div><p class='m s'>اضغط على القنبلة لتمريرها للي بعدك</p>${btn('صعبة، غيّر السؤال','bombChange()')}`);
}
function bombNext(){if(Date.now()>=BG.end)return boom();BG.cur=(BG.cur+1)%BG.P.length;BG.q=newQ();obeep(600,.05);vib(15);bombShow()}
function bombChange(){if(Date.now()>=BG.end)return boom();BG.q=newQ();bombShow()}
function boom(){
  if(BG.over)return;BG.over=true;clearTimeout(BG.t);obeep(120,.5);vib([250,80,250]);
  V(`<div class='boomfig'>${BOOMBIG}</div><h1>القنبلة فرقعت!</h1><h2 style='color:var(--red)'>${pn(BG.P[BG.cur])} خسران</h2><div class='wrap'>${btn('إعادة اللعب','bombStart()','bl')}${btn('خروج','bombExit()')}</div>`);
}
function toHome(){clearTimeout(BG.t);clearOT();guessClear();O=null;S.mode=null;home()}
function bombExit(){clearTimeout(BG.t);S.mode=null;home()}
/* ===== خمّن الشخصية (Guess Who) ===== */
const GWSK=['#F6CBA3','#B97A4B','#6E4026'],GWEY={br:'#6B3E1F',bl:'#2F8DE4',gr:'#3FAE49'},GWHC={blk:'#1E1A1A',brn:'#5A3720',bld:'#F2C94C',red:'#C4552B',gry:'#C9CCD6'};
const GWSH=['#E4503A','#2F8DE4','#3FAE49','#F2A918','#8B5CF6','#16B0A5'],GWBG=['#FDE3D2','#D7ECFB','#E2F4D8','#FFF1C9','#E9DEFB'],GWHT=['#2F8DE4','#E4503A','#3FAE49','#8B5CF6','#F2A918'];
/* الاسم، النوع، البشرة، لون الشعر، الشكل، نظارة، قبعة، ذقن، شنب، حلق */
const GWR=[
['ليلى','f',1,'brn','long',0,0,0,0,1],['تامر','m',0,'blk','short',1,0,0,1,0],['سارة','f',0,'blk','long',1,0,0,0,0],['منى','f',2,'blk','curly',0,0,0,0,1],
['حسن','m',3,'blk','short',0,0,1,0,0],['روز','f',0,'gry','bun',1,0,0,0,0],['جاك','m',0,'bld','short',0,1,0,0,0],['ليا','f',1,'red','long',0,0,0,0,0],
['رامي','m',1,'brn','short',0,1,0,0,0],['آية','f',2,'blk','bun',0,0,0,0,1],['بيلا','f',0,'red','curly',0,0,0,0,0],['صوفيا','f',0,'bld','long',0,0,0,0,1],
['جون','m',2,'none','bald',1,0,1,1,0],['هدى','f',1,'gry','long',1,0,0,0,0],['ثيو','m',0,'bld','short',1,0,0,0,0],['آني','f',0,'red','long',0,0,0,0,0],
['بول','m',1,'red','short',0,0,1,0,0],['أوليفيا','f',3,'bld','curly',0,0,0,0,1],['كلوي','f',1,'brn','bun',0,0,0,0,0],['نورا','f',2,'brn','short',0,1,0,0,0],
['جيمس','m',0,'blk','short',1,1,0,0,0],['بيل','m',0,'bld','short',0,0,0,1,0],['جوليا','f',2,'gry','curly',0,0,0,0,1],['ناعومي','f',0,'blk','long',0,0,0,0,0],
['ريان','m',0,'none','bald',1,0,0,1,0],['داود','m',3,'blk','curly',0,0,1,0,0],['ميلا','f',1,'bld','short',1,0,0,0,1],['يوسف','m',2,'gry','short',0,1,1,0,0],
['بن','m',2,'none','bald',1,0,0,1,0],['عمر','m',3,'none','bald',0,0,1,0,0]
].map((r,i)=>({n:r[0],g:r[1],sk:[0,0,1,2][r[2]],ey:['br','bl','gr'][(i*7+(i>>1))%3],hc:r[3],st:r[4],gl:r[5],ht:r[6],bd:r[7],mu:r[8],ea:r[9]})).filter((_,i)=>![3,10,12,15,18,21,22,23,26,28].includes(i));
const gwLen=c=>c.st==='bald'?'bald':(c.st==='long'||c.st==='bun')?'long':'short';
const GWC=[
 {id:'sk',l:'لون البشرة',o:[['0','فاتح'],['1','وسط'],['2','غامق']],f:(c,k)=>String(c.sk)===k},
 {id:'g',l:'الجنس',o:[['m','ولد'],['f','بنت']],f:(c,k)=>c.g===k},
 {id:'ey',l:'لون العين',o:[['br','بني'],['bl','أزرق'],['gr','أخضر']],f:(c,k)=>c.ey===k},
 {id:'ac',l:'إكسسوارات',o:[['gl','نظارة'],['ht','قبعة'],['ea','حلق'],['no','لا يوجد']],f:(c,k)=>k==='no'?!(c.gl||c.ht||c.ea):!!c[k]},
 {id:'hl',l:'طول الشعر',o:[['bald','أصلع'],['short','قصير'],['long','طويل']],f:(c,k)=>gwLen(c)===k},
 {id:'hc',l:'لون الشعر',o:[['blk','أسود'],['brn','بني'],['bld','أشقر'],['red','أحمر'],['gry','رمادي']],f:(c,k)=>c.hc===k},
 {id:'bd',l:'اللحية',o:[['no','لا يوجد'],['mu','شنب'],['bd','لحية']],f:(c,k)=>k==='no'?!(c.bd||c.mu):k==='mu'?(!!c.mu&&!c.bd):!!c.bd}
];
const GWQ=GWC.flatMap(x=>x.o.map(([k,t])=>[x.id+'.'+k,x.l+': '+t+'؟',c=>x.f(c,k)]));
const GWI=GWQ.map(q=>q[0]);
const GWREDC={};
const gwRed=id=>GWREDC[id]||(GWREDC[id]=new Set(GWQ.filter(b=>b[0]!==id&&(()=>{const a=GWQ[GWI.indexOf(id)][2];return GWR.every(c=>a(c)===b[2](c))||GWR.every(c=>a(c)!==b[2](c))})()).map(b=>b[0])));
const gwUsed=(t,id)=>GW.asked[t].has(id);
const gwAv=i=>{
  const c=GWR[i%GWR.length],sk=GWSK[c.sk],hc=GWHC[c.hc]||'#3B2A22',sh=GWSH[i%6],hat=GWHT[i%5];
  let s=`<rect width='60' height='64' fill='${GWBG[i%5]}'/>`;
  if(c.st==='long')s+=`<path d='M15 30Q13 9 30 9Q47 9 45 30L47 58L13 58Z' fill='${hc}'/>`;
  s+=`<path d='M8 64Q9 48 30 47Q51 48 52 64Z' fill='${sh}'/><rect x='26' y='40' width='8' height='9' fill='${sk}'/><circle cx='17' cy='31' r='3' fill='${sk}'/><circle cx='43' cy='31' r='3' fill='${sk}'/><ellipse cx='30' cy='30' rx='13' ry='15' fill='${sk}'/>`;
  if(c.st==='curly')s+=[[19,17],[25,12],[32,11],[39,14],[43,21],[17,24]].map(p=>`<circle cx='${p[0]}' cy='${p[1]}' r='6.5' fill='${hc}'/>`).join('');
  else if(c.st!=='bald'){
    s+=`<path d='M16.5 29Q15 10 30 10Q45 10 43.5 29Q41 20 30 19Q19 20 16.5 29Z' fill='${hc}'/>`;
    if(c.st==='bun')s+=`<circle cx='30' cy='8' r='5' fill='${hc}'/>`;
  }
  if(c.bd)s+=`<path d='M17 34Q18 51 30 51Q42 51 43 34Q38 43 30 43Q22 43 17 34Z' fill='${hc}'/>`;
  const ec=GWEY[c.ey];s+=`<ellipse cx='24' cy='30' rx='3.2' ry='2.6' fill='#fff'/><ellipse cx='36' cy='30' rx='3.2' ry='2.6' fill='#fff'/><circle cx='24' cy='30' r='2' fill='${ec}'/><circle cx='36' cy='30' r='2' fill='${ec}'/><circle cx='24' cy='30' r='.9' fill='#111'/><circle cx='36' cy='30' r='.9' fill='#111'/><path d='M25 38Q30 42 35 38' stroke='#8A4B3A' stroke-width='1.8' fill='none' stroke-linecap='round'/>`;
  if(c.mu)s+=`<path d='M22 37Q30 33 38 37Q30 40 22 37Z' fill='${hc}'/>`;
  if(c.gl)s+=`<g fill='none' stroke='#1F2A5A' stroke-width='1.4'><circle cx='24' cy='30' r='5'/><circle cx='36' cy='30' r='5'/><path d='M29 30h2'/></g>`;
  if(c.ea)s+=`<circle cx='16' cy='37' r='1.9' fill='#F2C94C'/><circle cx='44' cy='37' r='1.9' fill='#F2C94C'/>`;
  if(c.ht)s+=`<path d='M15 22Q15 7 30 7Q45 7 45 22Z' fill='${hat}'/><rect x='11' y='21' width='38' height='4.5' rx='2.2' fill='${hat}' stroke='#000' stroke-opacity='.18'/>`;
  return `<svg viewBox='0 0 60 64' preserveAspectRatio='xMidYMid slice'>${s}</svg>`;
};
const GUESSART=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 180'><defs><linearGradient id='gq' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#9B6BFF'/><stop offset='1' stop-color='#5B2FD0'/></linearGradient></defs><rect width='300' height='180' rx='22' fill='url(#gq)'/>${[0,1,2,3,4].map(k=>[[9,1,2,3,4],[7,12,16,20,25]][0][k]).map((i,k)=>`<svg x='${22+k*50}' y='24' width='44' height='47' viewBox='0 0 60 64'>${gwAv(i).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`).join('')}${[5,10,14,18,19].map((i,k)=>`<svg x='${22+k*50}' y='78' width='44' height='47' viewBox='0 0 60 64'>${gwAv(i).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`).join('')}<text x='150' y='160' font-size='24' font-weight='800' fill='#fff' text-anchor='middle'>?</text></svg>`;

let GW={c:0};
function guessClear(){clearTimeout(GW.c)}
const gwNm=p=>GW.bot?(p===0?'أنت':'الكمبيوتر'):'لاعب '+(p+1);
const gwTile=(i,mini)=>`<button class='gwt' id='gw${mini?'m':''}${i}' ${mini?'':`onclick='gwTap(${i})'`} aria-label='${esc(GWR[i].n)}'><div class='in'><div class='f'>${gwAv(i)}<span>${esc(GWR[i].n)}</span></div><div class='b'>?</div></div></button>`;
const gwGrid=(id,cls)=>`<div class='gwg ${cls||''}' id='${id}'>${GWR.map((_,i)=>gwTile(i,cls==='mini')).join('')}</div>`;

function guessHome(){
  guessClear();GW={c:0};V.h=1;
  const d=i=>`<span class='dc ${['a','b','c'][i[0]]}' style='overflow:hidden;opacity:.55'>${gwAv(i[1])}</span>`;
  V(`<div class='ohd' style='background:radial-gradient(circle at 80% 0,#B99BFF 0,transparent 55%),linear-gradient(160deg,#8B5CF6,#4F2FC4)'>${d([0,3])}${d([1,7])}${d([2,13])}<div style='display:flex;justify-content:flex-end;position:relative'></div><div class='otitle' style='font-size:40px;-webkit-text-stroke:6px #2A1670;direction:rtl'>خمّن الشخصية</div></div>
  <div class='pnl' style='margin-top:-46px;padding:18px 14px;position:relative'>
    <p style='font-size:16px;line-height:1.7;font-weight:800'>اختار شخصية، واسأل أسئلة عن شخصية خصمك، وشيل الوجوه اللي مش مطابقة. أول واحد يخمّن شخصية خصمه يكسب!</p>
    ${stkBadge('gw')}
    <button class='ob gr' onclick='gwHow(0)'><i>▶</i><span><b>كيف تلعب</b></span></button>
    <button class='ob' onclick='gwStart(false)'><i>${ICP}</i><span><small>العب ضد</small><b>صديق</b></span></button>
    <button class='ob' onclick='gwMode()'><i>${ICR}</i><span><small>العب ضد</small><b>الكمبيوتر</b></span></button>
  </div>
  <button class='b' style='background:#DF8D72;color:#fff;box-shadow:0 4px 0 #B96B52' onclick='toHome()'>رجوع</button>`);
}

/* --- كيف تلعب: 4 شرائح --- */
function gwHow(k){
  const box=(q,a)=>`<div class='gwqb'>${q}<b class='${a?'y':'n'}'>${a?'أيوه ✔':'لا ✘'}</b></div>`;
  const off=idx=>{setTimeout(()=>idx.forEach(i=>{const e=document.getElementById('gwm'+i);e&&e.classList.add('off')}),30)};
  const S=[
    {a:()=>gwGrid('gwmg','mini')+`<p style='font-weight:800;margin-top:6px'>اختار شخصيتك!</p>`,t:'اختار شخصيتك في بداية اللعبة.'},
    {a:()=>gwGrid('gwmg','mini')+box('طول الشعر: أصلع؟',false),t:'اسأل أسئلة عشان تعرف مواصفات شخصية خصمك.'},
    {a:()=>{off(GWR.map((c,i)=>gwLen(c)==='bald'?i:-1).filter(i=>i>=0));return gwGrid('gwmg','mini')+box('طول الشعر: أصلع؟',false)},t:'استعمل الإجابات عشان تشيل الشخصيات اللي مش مطابقة.'},
    {a:()=>`<div class='gwgs'><div><small>خمّنت</small><div class='gwt big'><div class='f'>${gwAv(11)}<span>${GWR[11].n}</span></div></div></div><div><small>خصمك اختار</small><div class='gwt big'><div class='b' style='transform:none;position:absolute;inset:0;border-radius:10px;background:#3FA9F5'>?</div></div></div></div>`,t:'أول واحد يخمّن شخصية خصمه يكسب اللعبة.'}
  ][k];
  V.h=1;
  V(`<h2>كيف تلعب</h2><div class='pnl' style='padding:12px'><div class='gwhow'>${S.a()}</div><p style='font-weight:800;font-size:18px;line-height:1.6'>${S.t}</p></div><div class='dotsr'>${[0,1,2,3].map(i=>`<i class='${i===k?'on':''}'></i>`).join('')}</div><div class='wrap'>${k>0?`<button class='b' onclick='gwHow(${k-1})'>${LANG==='en'?'←':'→'}</button>`:''}${btn('تمام','guessHome()','g')}${k<3?`<button class='b' onclick='gwHow(${k+1})'>${LANG==='en'?'→':'←'}</button>`:''}</div>`);
}

/* --- الحالة --- */
function gwLevel(){
  V.h=1;
  const o=[['normal','عادي','😊'],['hard','صعب','😠'],['extreme','اكستريم','💀']].map(([k,n,e])=>`<button class='ob' onclick="gwStart(true,'${k}')"><i>${e}</i><span><small>المستوى</small><b>${n}</b></span></button>`).join('');
  V(`<h2>اختار المستوى</h2><div class='pnl'>${o}</div><button class='t' onclick='gwMode()'>رجوع</button>`);
}

/* --- وضع الكمبيوتر: مراحل / كلاسيك --- */
let GWP=1;try{GWP=Math.max(1,Math.min(51,parseInt(localStorage.getItem('gwprog'),10)||1))}catch(e){}
function gwMode(){
  guessClear();V.h=1;
  V(`<h2>اختار الوضع</h2><div class='pnl'>
    <button class='ob' onclick='gwLevels()'><i>🏆</i><span><small>50 مرحلة</small><b>المراحل</b></span></button>
    <button class='ob' onclick='gwLevel()'><i>🎯</i><span><small>عادي · صعب · اكستريم</small><b>كلاسيك</b></span></button>
  </div><button class='t' onclick='guessHome()'>رجوع</button>`);
}
/* إعدادات صعوبة كل مرحلة: كل ما الرقم يزيد الكمبيوتر بيبقى أذكى، والزعيم (10/20/30/40/50) أقوى من اللي قبله بكتير */
function gwCfg(L){
  const boss=L%10===0,H={10:2,20:3,30:5,40:7,50:9};
  if(boss)return{boss:true,pRand:0,pForget:0,noise:.01,mm:true,fast:true,risky:true,head:H[L]};
  return{boss:false,
    pRand:Math.max(0,.75*(1-L/35)),        // بيسأل أسئلة عشوائية
    pForget:Math.max(0,.5*(1-L/25)),       // بينسى يشيل بعض الشخصيات
    noise:Math.max(.01,3*(1-L/45)),        // عشوائية اختيار السؤال
    mm:L>=26,                              // أذكى سؤال دايمًا
    fast:L>=15,                            // بيخمّن فورًا أول ما يتأكد
    risky:L>=30,                           // بيجازف لما يتبقى اتنين
    head:L>=25?Math.floor((L-15)/10):0};    // شخصيات مستبعدة من البداية
}
let GWS=[];
function gwSecret(){const n=Date.now();GWS=GWS.filter(t=>n-t<3000);GWS.push(n);if(GWS.length>=7){GWS=[];try{if(GWP>=51){GWP=parseInt(localStorage.getItem('gwreal'),10)||1;localStorage.removeItem('gwreal')}else{localStorage.setItem('gwreal',String(GWP));GWP=51}localStorage.setItem('gwprog',String(GWP))}catch(e){GWP=GWP>=51?1:51}vib([40,40,40]);gwLevels()}}
function gwLevels(){
  guessClear();V.h=1;
  const t=[...Array(50)].map((_,i)=>{const L=i+1,b=L%10===0,lk=L>GWP,dn=L<GWP;
    return `<button class='lv ${b?'boss':''} ${lk?'lock':dn?'done':'cur'}' ${lk?'disabled':''} onclick='gwLvIntro(${L})' aria-label='المرحلة ${L}'><span>${b?'👑':''}${L}</span><small>${lk?'🔒':dn?'✔':'&nbsp;'}</small></button>`}).join('');
  V(`<h2 onclick='gwSecret()' style='user-select:none;-webkit-tap-highlight-color:transparent'>المراحل</h2><p class='m s'>خلّص المرحلة عشان تفتح اللي بعدها · 👑 زعيم</p><div class='lvg'>${t}</div><button class='t' onclick='gwMode()'>رجوع</button>`);
}
function gwLvIntro(L){
  guessClear();V.h=1;
  const C=gwCfg(L),b=C.boss,k=Math.ceil(L/10),nm=['مبتدئ','متوسط','محترف','خبير','أسطورة'][k-1];
  const perk=C.head?`<p style='font-weight:800'>${b?'الزعيم بيبدأ بميزة':'الكمبيوتر بيبدأ بميزة'}: ${C.head} شخصيات مستبعدة من البداية</p>`:'';
  const bl=b?`<p class='m'>الزعيم ما بيغلطش وبيخمّن أول ما يتأكد</p>`:'';
  V(`<div class='og' style='--oc:${b?'#D8432B':'#2F6FDE'};color:#fff;padding:22px 12px'><h1 class='big'>${b?'👑':'🎯'}</h1><h2>${b?'زعيم المرحلة':'المرحلة'} ${L}</h2><p style='font-size:22px;letter-spacing:3px'>${'★'.repeat(k)+'☆'.repeat(5-k)}</p><p>${nm}</p></div>${perk}${bl}<div class='wrap'>${btn('ابدأ',`gwStart(true,'level',${L})`,'g')}${btn('رجوع','gwLevels()')}</div>`);
}
function gwLvDone(win){
  const L=GW.L;let h;
  if(win){
    const fresh=L+1>GWP;
    if(fresh){GWP=Math.min(51,L+1);try{localStorage.setItem('gwprog',String(GWP))}catch(e){}}
    h=(L%10===0?'👑 هزمت الزعيم! ':'')+(L===50?'🏆 خلصت كل المراحل!':fresh?'🔓 فتحت المرحلة '+(L+1):'المرحلة '+L+' خلصت ✔');
  }else h='المرحلة '+L+' — حاول تاني';
  return `<p style='font-weight:800;margin-top:6px'>${h}</p>`;
}
function gwLvBtns(win){
  const L=GW.L;
  return (win?(L<50?btn('المرحلة التالية',`gwLvIntro(${L+1})`,'g'):''):btn('حاول تاني',`gwLvIntro(${L})`,'bl'))+btn('المراحل','gwLevels()');
}
function gwStart(bot,lv,L){
  guessClear();
  GW={bot,L:L||0,lv:lv||'normal',hist:[],cat:null,p:[null,null],el:[new Set(),new Set()],asked:[new Set(),new Set()],qa:[null,null],t:0,mode:'pick',pick:null,did:false,conf:null,sheet:false,cand:GWR.map((_,i)=>i),botMsg:null,c:0};
  gwPick(0);
}
function gwPick(p){
  GW.t=p;GW.mode='pick';GW.pick=null;V.h=1;
  V(`<div class='gwb'><div class='gwh'><b>${bot0()?'اختار شخصيتك':esc(gwNm(p))+': اختار شخصيتك'}</b><button class='xb' onclick='guessHome()'>خروج</button></div>${GW.bot||p===0?'':''}<p class='m' style='color:inherit;opacity:.85'>${GW.bot?'':'اللاعب التاني يبعد عينه عن الشاشة'}</p>${gwGrid('gwgrid')}<div class='wrap' id='gwbar'><button class='b g' id='gwok' disabled onclick='gwOk()'>تأكيد</button></div></div>`);
}
const bot0=()=>GW.bot;
function gwOk(){
  if(GW.pick===null)return;
  GW.p[GW.t]=GW.pick;
  if(GW.bot){GW.p[1]=(GW.pick+1+Math.floor(Math.random()*(GWR.length-1)))%GWR.length;GW.t=0;
    if(GW.L){const k=gwCfg(GW.L).head,pool=GWR.map((_,i)=>i).filter(i=>i!==GW.pick).sort(()=>Math.random()-.5).slice(0,k);GW.cand=GWR.map((_,i)=>i).filter(i=>!pool.includes(i))}
    return gwTurnStart(0)}
  if(GW.t===0){V.h=1;GW.mode='hand';V(`<h2>تمام!</h2><p>أعطِ الموبايل للاعب 2</p>${btn('جاهز','gwPick(1)','bl')}`)}
  else gwHand(0);
}
function gwHand(t){
  V.h=1;GW.mode='hand';
  V(`<p class='m'>الدور على</p><h1 class='big'>${esc(gwNm(t))}</h1><p>أعطِ الموبايل له، وما حدش يبص على الشاشة</p>${btn('جاهز',`gwTurnStart(${t})`,'bl')}`);
}
function gwTurnStart(t){GW.t=t;GW.did=false;GW.mode='elim';GW.conf=null;GW.sheet=false;gwTurn()}

function gwTurn(){
  V.h=1;const t=GW.t,me=GW.p[t],col=t===0?'#C98A6B':'#6B8FC9';
  V(`<div class='gwb' style='background:${col}'><div class='gwh'><b>${GW.bot?'دورك':'دور '+esc(gwNm(t))}</b><span class='gwme'><span class='gwmf'>${gwAv(me)}</span>${esc(GWR[me].n)}</span><button class='xb' onclick='guessHome()'>خروج</button></div><div id='gwq'></div>${gwGrid('gwgrid')}<div id='gwsheet'></div><div class='wrap' id='gwbar'></div></div>`);
  GW.el[t].forEach(i=>{const e=document.getElementById('gw'+i);e&&e.classList.add('off')});
  gwUp();
}
function gwUp(){
  const t=GW.t,q=GW.qa[t],bq=document.getElementById('gwq');if(!bq)return;
  let h='';
  if(GW.botMsg)h+=`<div class='gwqb' style='background:#FFF4D6'>${GW.bot?'الكمبيوتر':esc(gwNm(GW.botMsg.f))} سأل: ${esc(GW.botMsg.q)}<b class='${GW.botMsg.a?'y':'n'}'>${GW.botMsg.a?'أيوه ✔':'لا ✘'}</b></div>`;
  if(q)h+=`<div class='gwqb'>${esc(q.q)}<b class='${q.a?'y':'n'}'>${q.a?'أيوه ✔':'لا ✘'}</b></div>`;
  else if(GW.mode==='guess')h+=`<div class='gwqb'>اضغط على الشخصية اللي تظن إنها شخصية خصمك</div>`;
  else h+=`<div class='gwqb'>اسأل سؤال عشان تعرف مواصفات شخصية خصمك</div>`;
  bq.innerHTML=TRH(h);
  const sh=document.getElementById('gwsheet');
  sh.innerHTML=TRH(GW.sheet?`<div class='gwsh'><div class='wrap'>${GWC.map(x=>`<button class='chip2 ${GW.cat===x.id?'on':''}' data-c='${x.id}' onclick='GW.cat=this.dataset.c;gwUp()'>${x.l}</button>`).join('')}</div>${GW.cat?`<div class='wrap'>${GWC.find(x=>x.id===GW.cat).o.map(([k,t])=>{const id=GW.cat+'.'+k,u=gwUsed(GW.t,id);return `<button class='b ${u?'':'bl'}' ${u?'disabled':''} data-i='${id}' onclick='gwAsk(this.dataset.i)'>${t}</button>`}).join('')}</div>`:''}<button class='t' onclick='GW.sheet=false;gwUp()'>إغلاق</button></div>`:'');
  const bar=document.getElementById('gwbar');
  if(GW.conf!==null)bar.innerHTML=TRH(`<p style='width:100%;font-weight:800'>تخمّن إنها ${esc(GWR[GW.conf].n)}؟</p><button class='b g' onclick='gwGuess()'>تأكيد التخمين</button><button class='b' onclick='GW.conf=null;gwUp()'>إلغاء</button>`);
  else if(GW.sheet)bar.innerHTML='';
  else bar.innerHTML=TRH(`<button class='b bl' ${GW.did?'disabled':''} onclick='GW.sheet=true;GW.cat=null;gwUp()'>اسأل ❓</button><button class='b ${GW.mode==='guess'?'g':''}' onclick='GW.mode=GW.mode===\"guess\"?\"elim\":\"guess\";gwUp()'>خمّن 🎯</button><button class='b' ${GW.did?'':'disabled'} onclick='gwEnd()'>إنهاء الدور ✔</button>`);
  document.querySelectorAll('#gwgrid .gwt').forEach(e=>e.classList.toggle('gs',GW.mode==='guess'));
}
function gwAsk(id){
  const t=GW.t,x=GWQ[GWI.indexOf(id)];if(!x||GW.did||gwUsed(t,id))return;
  const a=x[2](GWR[GW.p[1-t]]);
  GW.asked[t].add(id);GW.hist.push([x,a,t]);GW.qa[t]={q:x[1],a};GW.did=true;GW.sheet=false;GW.botMsg=null;
  if(GW.mode==='guess')GW.mode='elim';
  gwUp();gwPop(x[1],a);
}
function gwPop(q,a){
  window.scrollTo(0,0);
  const e=document.querySelector('#gwq .gwqb');
  if(e&&e.animate)e.animate([{transform:'scale(1.07)',filter:'brightness(1.15)'},{transform:'scale(1)',filter:'none'}],{duration:650,easing:'ease-out'});
}
function gwPopOld(q,a){
  const d=document.createElement('div');
  d.style.cssText='position:fixed;top:calc(env(safe-area-inset-top,0px) + 8px);left:0;right:0;z-index:50;display:flex;justify-content:center;padding:0 12px;pointer-events:none';
  d.innerHTML=TRH(`<div class='gwqb' style='width:100%;max-width:360px;padding:10px 16px;border-radius:16px;font-size:15px;gap:2px;box-shadow:0 6px 20px rgba(0,0,0,.35)'>${esc(q)}<b class='${a?'y':'n'}' style='font-size:24px'>${a?'أيوه ✔':'لا ✘'}</b></div>`);
  const k=()=>d.remove();d.onclick=k;setTimeout(k,2200);document.body.appendChild(d);
}
function gwTap(i){
  if(GW.mode==='pick'){
    GW.pick=i;document.querySelectorAll('#gwgrid .gwt').forEach((e,k)=>e.classList.toggle('sel',k===i));
    const b=document.getElementById('gwok');if(b)b.disabled=false;return;
  }
  if(GW.mode==='guess'){GW.conf=i;GW.sheet=false;return gwUp()}
  if(GW.mode==='elim'){
    const s=GW.el[GW.t],e=document.getElementById('gw'+i);
    if(s.has(i)){s.delete(i);e.classList.remove('off')}else{s.add(i);e.classList.add('off')}
  }
}
function gwGuess(){
  const t=GW.t,g=GW.conf;
  const ok=g===GW.p[1-t];
  gwOver(ok?t:1-t,g,t);
}
function gwEnd(){
  if(!GW.did)return;
  if(GW.bot){GW.t=1;gwBot()}else{const m=GW.qa[GW.t];GW.botMsg=m?{q:m.q,a:m.a,f:GW.t}:null;GW.qa[GW.t]=null;gwHand(1-GW.t)}
}
function gwBot(){
  V.h=1;GW.mode='botturn';
  const cand=GW.cand,keepOff=GWR.map((_,i)=>i).filter(i=>!cand.includes(i));
  V(`<div class='gwb' style='background:#6B8FC9'><div class='gwh'><b>🤖 دور الكمبيوتر</b><button class='xb' onclick='guessHome()'>خروج</button></div><div class='gwqb' id='gwbs'></div>${gwGrid('gwgrid')}<div class='wrap' id='gwbar'></div></div>`);
  keepOff.forEach(i=>{const e=document.getElementById('gw'+i);e&&e.classList.add('off')});
  const st=h=>{const e=document.getElementById('gwbs');if(e)e.innerHTML=TRH(h)};
  const wait=(f,ms)=>{GW.c=setTimeout(f,ms)};
  const guess=g=>{
    st('الكمبيوتر بيخمّن… 🎯');
    const e=document.getElementById('gw'+g);e&&e.classList.add('sel');
    wait(()=>gwOver(1,g,1),1600);
  };
  st('الكمبيوتر بيفكر… 🤔');
  wait(()=>{
    const lv=GW.lv,tg=GWR[GW.p[0]],C=GW.L?gwCfg(GW.L):null;
    if(cand.length===1)return guess(cand[0]);
    if(C&&C.risky&&cand.length===2&&GW.hist.filter(h=>h[2]===0).length>=4)return guess(cand[Math.floor(Math.random()*2)]);
    let best=null,bs=1e9;const valid=[];
    GWQ.forEach(x=>{
      if(gwUsed(1,x[0]))return;
      const n=cand.filter(i=>x[2](GWR[i])).length;
      if(n===0||n===cand.length)return;
      valid.push(x);
      let sc;
      if(C?C.mm:lv==='extreme')sc=Math.max(n,cand.length-n)+Math.random()*.01;
      else sc=Math.abs(2*n-cand.length)+Math.random()*(C?C.noise:(lv==='hard'?1.2:3));
      if(sc<bs){bs=sc;best=x}
    });
    if(valid.length&&Math.random()<(C?C.pRand:(lv==='normal'?.35:0)))best=valid[Math.floor(Math.random()*valid.length)];
    if(!best)return guess(cand[Math.floor(Math.random()*cand.length)]);
    const step=Math.round(Math.min(330,Math.max(150,3300/Math.max(1,cand.length-0)))),a=best[2](tg),keep0=cand.filter(i=>best[2](GWR[i])===a),out0=cand.filter(i=>!keep0.includes(i)),out=C&&C.pForget?out0.filter(()=>Math.random()>=C.pForget):out0,keep=cand.filter(i=>!out.includes(i));
    GW.asked[1].add(best[0]);
    st(`الكمبيوتر بيسأل:<span>${esc(best[1])}</span><b class='${a?'y':'n'}'>${a?'أيوه ✔':'لا ✘'}</b>`);
    wait(()=>{
      st(`${esc(best[1])}<b class='${a?'y':'n'}'>${a?'أيوه ✔':'لا ✘'}</b><span style='font-size:12px;font-weight:500'>الكمبيوتر بيشيل الشخصيات المستبعدة…</span>`);
      out.forEach((i,k)=>setTimeout(()=>{const e=document.getElementById('gw'+i);e&&e.classList.add('off')},500+k*step));
      wait(()=>{
        GW.cand=keep;GW.botMsg={q:best[1],a};
        if(C&&C.fast&&keep.length===1)return guess(keep[0]);
        st(`${esc(best[1])}<b class='${a?'y':'n'}'>${a?'أيوه ✔':'لا ✘'}</b><span style='font-size:12px;font-weight:500'>الكمبيوتر خلّص دوره</span>`);
        const bar=document.getElementById('gwbar');
        if(bar)bar.innerHTML=TRH(`<button class='b g' onclick='gwBotDone()'>دورك</button>`);
      },900+out.length*step);
    },800);
  },1500);
}
function gwBotDone(){GW.qa[0]=null;gwTurnStart(0)}
function gwOver(w,g,gt){
  obeep(880,.3);guessClear();V.h=1;GW.mode='over';const sr=GW.bot&&!GW.L?stkRec('gw',w===0):null,lvr=GW.L?gwLvDone(w===0):'';
  const real=GW.p[1-gt],ok=g===real;
  V(`<div class='og' style='--oc:#8B5CF6;color:#fff;padding:22px 12px'><h1 class='big bn'>🏆</h1><h2>${esc(gwNm(w))} ${GW.bot&&w===0?'كسبت':'كسب'}!</h2><p style='font-size:14px'>${esc(gwNm(gt))} خمّن ${esc(GWR[g].n)} — ${ok?'تخمين صح ✔':'تخمين غلط ✘'}</p>${sr?`<p style='font-weight:800;margin-top:6px'>${stkMsg(sr)}</p>`:''}${lvr}</div><div class='gwgs'><div><small>اللي اتخمّن</small><div class='gwt big'><div class='f'>${gwAv(g)}<span>${esc(GWR[g].n)}</span></div></div></div><div><small>شخصية ${esc(gwNm(1-gt))}</small><div class='gwt big'><div class='f'>${gwAv(real)}<span>${esc(GWR[real].n)}</span></div></div></div></div><div class='wrap'>${GW.L?gwLvBtns(w===0):btn('العب تاني',`gwStart(${GW.bot},'${GW.lv}')`,'bl')+btn('القائمة','toHome()')}</div>`);
}
/* ===== Oops! ===== */
const OOPSART=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 180' direction='ltr' style='direction:ltr'><defs><linearGradient id='oa' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#FFB547'/><stop offset='1' stop-color='#F2711C'/></linearGradient></defs><rect width='300' height='180' rx='22' fill='url(#oa)'/><g transform='rotate(-10 62 92)'><rect x='30' y='30' width='64' height='92' rx='9' fill='#000' fill-opacity='.2'/><rect x='30' y='26' width='64' height='92' rx='9' fill='#fff'/><text x='62' y='82' font-size='32' font-weight='800' fill='#E4503A' text-anchor='middle'>+12</text></g><g transform='rotate(10 238 92)'><rect x='206' y='34' width='64' height='92' rx='9' fill='#000' fill-opacity='.2'/><rect x='206' y='30' width='64' height='92' rx='9' fill='#fff'/><text x='238' y='86' font-size='30' font-weight='800' fill='#2F8DE4' text-anchor='middle'>-4</text></g><text x='150' y='160' font-size='40' font-weight='800' fill='#fff' stroke='#7A3A0A' stroke-width='6' paint-order='stroke' stroke-linejoin='round' text-anchor='middle'>OOPS!</text></svg>`;

/* --- اللوحة ---
   لوحة مربعة، مسار حلقي من 44 خانة (12 خانة في كل ضلع) والحركة مع عقارب الساعة.
   أضلاع اللوحة: 0 فوق (أزرق) | 1 يمين (أخضر) | 2 تحت (أحمر) | 3 شمال (أصفر).
   لكل لاعب 3 بيادق. تقدّم البيدق p:
     -1      = في البيت
     0..42   = على المسار (0 = خانة الخروج، ونهاية المسار 42 = مدخل ممر القلعة)
     43..45  = ممر القلعة (آمن، 3 خانات)
     46      = القلعة (الوصول لها لازم يكون بالعدد المظبوط)
   الزحاليق: في كل ضلع زحليقتين (خانات 1→4 و7→10). لو وقفت على أول زحليقة لونها مش لونك
   بتنزلق لآخرها وبترجّع أي بيدق عليها للبيت (حتى بيادقك). */
const SC=['#2F8DE4','#3FAE49','#E4503A','#F2A918'],SN=['الأزرق','الأخضر','الأحمر','الأصفر'];
const NPAWN=3,TR=44,LAST=42,LANE0=43,CAST=46,CS=28;
const ORDER={2:[2,0],3:[2,3,0],4:[2,3,0,1]};
let O=null,OAC=null,OTM=[];
const OFAST=()=>CFG.anim==='off'||!!(typeof window!=='undefined'&&window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches);
const D=ms=>OFAST()?Math.round(ms*.35):CFG.anim==='lite'?Math.round(ms*.65):ms;
const mix=(a,b,t)=>{const h=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16)),A=h(a),B=h(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const RR=(x,y,w,h,rx,f,ex='')=>`<rect x='${(x-w/2).toFixed(1)}' y='${(y-h/2).toFixed(1)}' width='${w}' height='${h}' rx='${rx}' fill='${f}' ${ex}/>`;

/* هندسة: نقطة (u,v) في إطار الضلع s. u = ترتيب الخانة على الضلع، v = العمق للداخل */
function pt(s,u,v){let x=(u-5.5)*CS,y=(v-5.5)*CS;for(let k=0;k<s;k++){const t=x;x=-y;y=t}return[170+x,170+y]}
const cellPt=g=>pt(Math.floor(g/11)%4,g%11,0);
const gOf=(q,p)=>(11*O.S[q]+4+p)%TR;
const baseOf=q=>11*O.S[q]+4;
const pOf=(q,g)=>(g-baseOf(q)+TR*2)%TR;
const HSLOT=[[3.55,2.15],[4.45,2.15],[4,2.95]],CSLOT=[[1.6,4.35],[2.4,4.35],[2,5.05]];
function posOf(q,p,i){
  const s=O.S[q];
  if(p<0)return pt(s,HSLOT[i][0],HSLOT[i][1]);
  if(p<=LAST)return cellPt(gOf(q,p));
  if(p<CAST)return pt(s,2,1+(p-LANE0));
  return pt(s,CSLOT[i][0],CSLOT[i][1]);
}

/* --- الكروت --- */
const odeck=()=>shuf([1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,5,5,12,12,'b1','b1','b2','b2','s','s','s','o','o','o']);
const isNum=c=>typeof c==='number';
const kh=n=>n===1?'خانة واحدة':n===2?'خانتين':n<=10?n+' خانات':n+' خانة';
const cname=c=>isNum(c)?'+'+c:c==='b1'?'-1':c==='b2'?'-2':c==='s'?'SWAP':'OOPS!';
const cdesc=c=>isNum(c)?'تقدّم '+kh(c)+' بأي بيدق أو أخرج بيدقًا من البيت':c[0]==='b'?'ارجع '+kh(+c[1])+' للخلف ببيدق على المسار':c==='s'?'بدّل مكان بيدقك مع بيدق لخصم على المسار':'اختار بيدقًا لخصم على المسار وارجّعه للبيت';
const ccol=c=>isNum(c)?'#3FAE49':c[0]==='b'?'#E4503A':c==='s'?'#8B5CF6':'#F28B1F';
const botP=q=>O.bot&&q>0;
const oname=q=>O.bot?(q===0?'أنت':(O.n===2?'الكمبيوتر':'كمبيوتر '+q)):'لاعب '+(q+1);
const otitle=q=>O.bot&&q===0?'دورك':'دور '+oname(q);

function clearOT(){OTM.forEach(clearTimeout);OTM=[]}
function oLater(fn,ms){const me=O;OTM.push(setTimeout(()=>{if(O&&O===me)fn()},ms))}
function obeep(f,d=.12){if(f<=200&&d>.2)vib(70);else if(f>=880&&d>.15)vib([40,40,40]);if(!CFG.sound)return;try{OAC=OAC||new(window.AudioContext||window.webkitAudioContext)();const o=OAC.createOscillator(),g=OAC.createGain();o.frequency.value=f;g.gain.value=.05;o.connect(g);g.connect(OAC.destination);o.start();o.stop(OAC.currentTime+d)}catch(e){}}

/* --- أيقونات --- */
const ICP=`<svg viewBox='0 0 40 40' width='34' height='34'><circle cx='20' cy='12' r='8' fill='#fff'/><path d='M5 38c0-10 6-15 15-15s15 5 15 15z' fill='#fff'/></svg>`;
const ICR=`<svg viewBox='0 0 40 40' width='34' height='34'><rect x='6' y='13' width='28' height='22' rx='7' fill='#fff'/><circle cx='20' cy='6' r='3' fill='#fff'/><rect x='19' y='7' width='2' height='7' fill='#fff'/><circle cx='14' cy='24' r='3.6' fill='#2F8DE4'/><circle cx='26' cy='24' r='3.6' fill='#2F8DE4'/><rect x='15' y='30' width='10' height='2.5' rx='1.2' fill='#2F8DE4'/><rect x='2' y='20' width='4' height='9' rx='2' fill='#fff'/><rect x='34' y='20' width='4' height='9' rx='2' fill='#fff'/></svg>`;

/* --- الشاشات: البداية / عدد اللاعبين / الشرح / الإعدادات --- */
function oopsHome(){
  clearOT();O=null;V.h=1;
  V(`<div class='ohd'><span class='dc a'>+12</span><span class='dc b'>SWAP</span><span class='dc c'>-4</span><div style='display:flex;justify-content:flex-end;position:relative'><button class='ib' onclick='oopsSet()' aria-label='الإعدادات'>⚙️</button></div><div class='otitle'>OOPS!</div></div>
  <div class='pnl' style='margin-top:-46px;padding:18px 14px;position:relative'>
    <p style='font-size:16px;line-height:1.7;font-weight:800'>اسحب كروت وحرّك بيادقك حول اللوحة. رجّع بيادق الخصوم للبيت، وأول واحد يوصّل كل بيادقه للقلعة يفوز!</p>
    ${stkBadge('oops')}
    <button class='ob gr' onclick='oopsHow()'><i>▶</i><span><b>كيف تلعب</b></span></button>
    <button class='ob' onclick='oopsSetup(false)'><i>${ICP}</i><span><small>العب ضد</small><b>صديق</b></span></button>
    <button class='ob' onclick='oopsLevel()'><i>${ICR}</i><span><small>العب ضد</small><b>الكمبيوتر</b></span></button>
  </div>
  <button class='b' style='background:#DF8D72;color:#fff;box-shadow:0 4px 0 #B96B52' onclick='toHome()'>رجوع</button>`);
}
function oopsLevel(){
  V.h=1;
  const o=[['normal','عادي','😊'],['hard','صعب','😠'],['extreme','اكستريم','💀']].map(([k,n,e])=>`<button class='ob' onclick="oopsSetup(true,'${k}')"><i>${e}</i><span><small>المستوى</small><b>${n}</b></span></button>`).join('');
  V(`<h2>اختار المستوى</h2><div class='pnl'>${o}</div><button class='t' onclick='oopsHome()'>رجوع</button>`);
}
function oopsSetup(bot,lv){
  V.h=1;
  const o=[2,3,4].map(n=>`<button class='ob' onclick="oopsStart(${bot},${n},'${lv||''}')"><i>${n}</i><span><small>${bot?'أنت +':'عدد اللاعبين'}</small><b>${bot?(n-1)+' كمبيوتر':n+' لاعبين'}</b></span></button>`).join('');
  V(`<h2>${bot?'كام كمبيوتر ضدك؟':'كام لاعب؟'}</h2><div class='pnl'>${o}</div><button class='t' onclick='oopsHome()'>رجوع</button>`);
}
function oopsHow(){
  const r=(a,b)=>`<div style='background:var(--surf);border-radius:12px;padding:8px 12px;font-size:14px;margin-top:6px'><b>${a}</b> — ${b}</div>`;
  V(`<h2>كيف تلعب</h2><div style='text-align:right;line-height:1.8;font-size:15px;width:100%'>
<p>• لكل لاعب 3 بيادق في «البيت» (القطرة الملونة). تلعبوا بالتناوب مع عقارب الساعة.</p>
<p>• في دورك اسحب كارت، وبعدين اضغط على البيدق المضيء اللي عايز تحرّكه. لو فيه حركة واحدة بس بتتنفذ لوحدها.</p>
<p>• البيدق يلف لفة واحدة حول اللوحة، وبعدها يدخل ممر قلعته الملون (3 خانات آمنة) ثم القلعة. لازم توصل القلعة بالعدد المظبوط.</p>
<p>• لو وقفت على بيدق لخصم بيرجع للبيت. مينفعش تقف على بيدقك، وبيادق الممر والقلعة آمنة.</p>
<p>• الزحاليق: لو وقفت على أول زحليقة لونها مش لونك بتنزلق لآخرها، وأي بيدق عليها بيرجع للبيت (حتى بيدقك).</p>
<p>• لو مفيش حركة ممكنة بالكارت، الدور بيعدّي تلقائي.</p>
<p>• أول واحد يوصّل بيادقه الثلاثة للقلعة يفوز.</p>
<h2 style='margin-top:10px'>الكروت</h2>
${r('+1 +2 +3 +4 +5 +12','تقدّم للأمام، أو أخرج بيدقًا من البيت لخانة الخروج')}
${r('-1 -2','ارجع للخلف ببيدق على المسار (مش من البيت ولا الممر) — ولو عدّى البداية بيرجع للبيت')}
${r('SWAP','بدّل مكان بيدقك مع بيدق لخصم، الاتنين على المسار')}
${r('OOPS!','رجّع بيدق لخصم من المسار للبيت')}
</div>${back('رجوع','oopsHome()')}`);
}
function oopsSet(){
  V(`<h2>الإعدادات</h2>${btn(CFG.sound?'🔊 الصوت: شغال':'🔇 الصوت: مقفول','oSndSet()')}${back('رجوع','oopsHome()')}`);
}
function oSndSet(){CFG.sound=!CFG.sound;cfgSave();obeep(520);oopsSet()}

/* --- الحالة: DRAW -> SELECT -> ANIM -> NEXT -> OVER --- */
function oopsStart(bot,n,lv){
  clearOT();
  const S=ORDER[n];
  O={bot,n,lv:bot?(lv||'normal'):'',S,p:S.map(()=>Array(NPAWN).fill(-1)),t:0,deck:odeck(),card:null,mv:[],sel:null,st:'DRAW',msg:'ابدأ بسحب كارت',last:[],dkey:null,cardNew:false};
  oFrame();oUpdate();
}

/* خطة الهبوط على خانة مسار: بيادق مرتجعة + زحليقة */
function plan(t,i,np){
  const g=gOf(t,np),s=Math.floor(g/11),u=g%11,bumps=[];
  const hit=gg=>O.p.forEach((P,q)=>P.forEach((p,j)=>{if(p>=0&&p<=LAST&&gOf(q,p)===gg&&!(q===t&&j===i))bumps.push([q,j])}));
  hit(g);
  if((u===1||u===7)&&s!==O.S[t]){for(let d=1;d<=3;d++)hit((g+d)%TR);return{np:np+3,bumps,slide:true}}
  return{np,bumps,slide:false};
}

/* الحركات القانونية فقط للكارت المسحوب */
function omoves(t,c){
  const P=O.p[t],m=[];
  const ownAt=(i,np)=>np>=0&&np<CAST&&P.some((x,k)=>k!==i&&x===np);
  if(isNum(c)||c[0]==='b'){
    const n=isNum(c)?c:-(+c[1]);
    P.forEach((p,i)=>{
      if(p===CAST)return;
      if(p<0){
        if(n>0&&P.indexOf(-1)===i&&!ownAt(i,0))m.push(Object.assign({k:'mv',i},plan(t,i,0)));
        return;
      }
      const np=n<0?Math.max(-1,p+n):p+n;
      if(n>0){if(np>CAST||ownAt(i,np))return}
      else{if(p>LAST||ownAt(i,np))return}
      if(np>LAST||np<0)m.push({k:'mv',i,np,bumps:[],slide:false});
      else m.push(Object.assign({k:'mv',i},plan(t,i,np)));
    });
  }else if(c==='s'){
    P.forEach((p,i)=>{
      if(p<0||p>LAST)return;const g1=gOf(t,p);
      O.p.forEach((E,q)=>{if(q===t)return;E.forEach((e,j)=>{
        if(e<0||e>LAST)return;
        const a=pOf(t,gOf(q,e)),b=pOf(q,g1);
        if(a<=LAST&&b<=LAST)m.push({k:'sw',i,q,j,a,b});
      })});
    });
  }else{
    O.p.forEach((E,q)=>{if(q===t)return;E.forEach((e,j)=>{if(e>=0&&e<=LAST)m.push({k:'oo',q,j})})});
  }
  return m;
}

function oDraw(){
  if(!O||O.st!=='DRAW')return;
  if(!O.deck.length)O.deck=odeck();
  O.card=O.deck.pop();O.sel=null;O.last=[];O.cardNew=true;
  O.mv=omoves(O.t,O.card);
  obeep(520);
  const who=oname(O.t),sh=O.bot&&O.t===0?' سحبت ':' سحب ';
  if(!O.mv.length){
    O.st='ANIM';O.msg=who+sh+cname(O.card)+' — لا توجد حركة متاحة بهذا الكارت';
    oUpdate();oLater(oNext,D(1700));return;
  }
  O.st='SELECT';O.msg=who+sh+cname(O.card);
  if(botP(O.t)){oUpdate();oLater(()=>oApply(obot(O.mv)),D(1200))}
  else if(O.mv.length===1){O.msg+=' — حركة واحدة متاحة';oUpdate();oLater(()=>oApply(O.mv[0]),D(1000))}
  else oUpdate();
}
function oTapDeck(){if(O&&O.st==='DRAW'&&!botP(O.t))oDraw()}

function oNext(){
  O.t=(O.t+1)%O.S.length;O.card=null;O.mv=[];O.sel=null;O.last=[];O.st='DRAW';
  O.msg='الدور على '+oname(O.t);
  oUpdate();
  if(botP(O.t))oLater(oDraw,D(900));
}

/* --- الحركة (أنيميشن): ننفّذ المنطق فورًا ثم نعرض الحركة خطوة خطوة --- */
const PW=(q,i)=>document.getElementById('pw-'+q+'-'+i);
function oSnap(){
  O.p.forEach((P,q)=>P.forEach((p,i)=>{
    const e=PW(q,i);if(!e)return;const[x,y]=posOf(q,p,i);
    e.style.transitionDuration='0s';e.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
    e.getBoundingClientRect();e.style.transitionDuration='';
  }));
}
function oFront(q,i){const e=PW(q,i);if(e&&e.parentNode){e.parentNode.appendChild(e);e.getBoundingClientRect()}}
function oGo(q,i,p,ms,hop){
  const e=PW(q,i);if(!e)return;const[x,y]=posOf(q,p,i),m=D(ms);
  e.style.transitionDuration=m+'ms';e.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
  if(hop){e.style.setProperty('--hd',m+'ms');e.classList.remove('hop');e.getBoundingClientRect();e.classList.add('hop')}
}
function oFx(q,i,cls){const e=PW(q,i);if(!e)return;e.classList.remove(cls);e.getBoundingClientRect();e.classList.add(cls)}
function oBurst(x,y,c,big){
  const g=document.getElementById('ofx');if(!g||OFAST())return;
  const ns='http://www.w3.org/2000/svg',n=big===2?14:9,R=big===2?36:24,mk=()=>document.createElementNS(ns,'circle');
  const ring=mk();ring.setAttribute('cx',x);ring.setAttribute('cy',y);ring.setAttribute('r',8);ring.setAttribute('fill','none');ring.setAttribute('stroke',c);ring.setAttribute('stroke-width',3);
  ring.style.transformBox='fill-box';ring.style.transformOrigin='center';g.appendChild(ring);
  ring.animate([{transform:'scale(.4)',opacity:1},{transform:`scale(${big===2?4:3})`,opacity:0}],{duration:500,easing:'ease-out'}).onfinish=()=>ring.remove();
  for(let k=0;k<n;k++){
    const a=Math.PI*2*k/n+Math.random()*.4,e=mk();
    e.setAttribute('cx',x);e.setAttribute('cy',y);e.setAttribute('r',big===2?3.4:2.8);e.setAttribute('fill',k%2?c:'#fff');g.appendChild(e);
    e.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*R}px,${Math.sin(a)*R}px) scale(.2)`,opacity:0}],{duration:650,easing:'ease-out'}).onfinish=()=>e.remove();
  }
}
function oSeq(steps,done){
  let k=0;
  const run=()=>{if(k>=steps.length)return done();const[f,ms]=steps[k++];f();oLater(run,D(ms))};
  run();
}

function oApply(mv){
  if(!O||O.st!=='SELECT')return;
  const t=O.t,P=O.p[t];let s='',last=[];const steps=[];
  if(mv.k==='mv'){
    const old=P[mv.i],pre=mv.slide?mv.np-3:mv.np;
    steps.push([()=>oFront(t,mv.i),30]);
    if(old<0)steps.push([()=>oGo(t,mv.i,pre,420,true),460]);
    else{
      const dir=pre>=old?1:-1,n=Math.abs(pre-old),ms=n>6?120:200;
      for(let pp=old+dir;pp!==pre+dir;pp+=dir){const x=pp;steps.push([()=>{oGo(t,mv.i,x,ms,true);obeep(420+x%7*20,.05)},ms+20])}
    }
    if(mv.slide)steps.push([()=>oGo(t,mv.i,mv.np,480,false),560]);
    P[mv.i]=mv.np;last=[[t,mv.i]];
    const bp=mv.bumps.map(([q,j])=>posOf(q,O.p[q][j],j));mv.bumps.forEach(([q,j])=>{O.p[q][j]=-1});
    if(mv.bumps.length){
      steps.push([()=>{mv.bumps.forEach(([q,j])=>{oFront(q,j);oFx(q,j,'shake')});bp.forEach(([x,y])=>oBurst(x,y,'#FF7A2F',1))},320]);
      steps.push([()=>mv.bumps.forEach(([q,j])=>oGo(q,j,-1,520,false)),580]);
    }
    if(mv.bumps.some(b=>b[0]!==t)){s+=' وأرجع بيدقًا للبيت 💥';obeep(200,.25)}else obeep(660);
    if(mv.slide)s+=' ونزل زحليقة 🛝';
    if(mv.np>=CAST){s=' ووصل القلعة 🏰';obeep(880,.2);steps.push([()=>{oFx(t,mv.i,'pop');const pc=posOf(t,CAST,mv.i);oBurst(pc[0],pc[1],'#FFD54A',2)},480])}
    else if(mv.np>=LANE0)s+=' ودخل ممر القلعة';
    else if(mv.np<0)s+=' ورجع للبيت 🏠';
  }else if(mv.k==='sw'){
    steps.push([()=>{oFront(t,mv.i);oFront(mv.q,mv.j)},30]);
    steps.push([()=>{oGo(t,mv.i,mv.a,650,true);oGo(mv.q,mv.j,mv.b,650,true)},720]);
    P[mv.i]=mv.a;O.p[mv.q][mv.j]=mv.b;
    last=[[t,mv.i],[mv.q,mv.j]];s=' وبدّل المكان 🔄';obeep(740);
  }else{
    const bp2=posOf(mv.q,O.p[mv.q][mv.j],mv.j);steps.push([()=>{oFront(mv.q,mv.j);oFx(mv.q,mv.j,'shake');oBurst(bp2[0],bp2[1],'#FF7A2F',1)},320]);
    steps.push([()=>oGo(mv.q,mv.j,-1,520,false),580]);
    O.p[mv.q][mv.j]=-1;last=[[mv.q,mv.j]];s=' وأرجع بيدقًا للبيت 💥';obeep(200,.25);
  }
  O.last=last;O.mv=[];O.sel=null;O.st='ANIM';
  O.msg=oname(t)+': '+cname(O.card)+s;
  oUpdate();
  oSeq(steps,()=>{
    oSnap();oUpdate();
    if(P.every(x=>x===CAST)){O.st='OVER';oLater(()=>oWin(t),500)}
    else oLater(oNext,D(500));
  });
}

/* اختيار البيدق بالضغط عليه (بيشتغل بس في حالة SELECT ودور لاعب بشري) */
function oClick(q,i){
  if(!O||O.st!=='SELECT'||botP(O.t))return false;
  const t=O.t,c=O.card,m=O.mv;
  if(c==='o')return q!==t&&m.some(x=>x.q===q&&x.j===i);
  if(c==='s'){if(q===t)return m.some(x=>x.i===i);return O.sel!==null&&m.some(x=>x.i===O.sel&&x.q===q&&x.j===i)}
  return q===t&&m.some(x=>x.i===i);
}
function oTap(q,i){
  if(!oClick(q,i))return;
  const t=O.t,c=O.card,m=O.mv;
  if(c==='o')return oApply(m.find(x=>x.q===q&&x.j===i));
  if(c==='s'){
    if(q===t){O.sel=O.sel===i?null:i;return oUpdate()}
    return oApply(m.find(x=>x.i===O.sel&&x.q===q&&x.j===i));
  }
  oApply(m.find(x=>x.i===i));
}

/* ذكاء الكمبيوتر: يختار من الحركات القانونية فقط بترتيب أولويات */
function oafter(m,t){
  const p=O.p.map(P=>P.slice());
  if(m.k==='mv'){p[t][m.i]=m.np;m.bumps.forEach(([q,j])=>{p[q][j]=-1})}
  else if(m.k==='sw'){p[t][m.i]=m.a;p[m.q][m.j]=m.b}
  else p[m.q][m.j]=-1;
  return p;
}
const opv=x=>x<0?0:x>=CAST?60:x+6;
function oeval(p,t){
  let me=0,opp=0,dg=0,op=0;
  p.forEach((P,q)=>P.forEach(x=>{if(q===t)me+=opv(x);else opp+=opv(x)}));
  const gl=(q,x)=>(11*O.S[q]+4+x)%TR;
  p[t].forEach(x=>{
    if(x<0||x>LAST)return;const g=gl(t,x);let att=0;
    p.forEach((Q,q)=>{if(q===t)return;Q.forEach(y=>{
      if(y<0){if(x===0)att++}
      else if(y<=LAST){const d=(g-gl(q,y)+TR*2)%TR;if(d>=1&&d<=5)att++}
    })});
    dg+=att*opv(x)*.22;
  });
  p.forEach((Q,q)=>{if(q===t)return;Q.forEach(y=>{
    if(y<0||y>LAST)return;const g=gl(q,y);
    p[t].forEach(x=>{if(x<0||x>LAST)return;const d=(g-gl(t,x)+TR*2)%TR;if(d>=1&&d<=5)op+=opv(y)*.08})
  })});
  return me-opp/(p.length-1)-dg+op;
}
function obot(m){
  const t=O.t;
  if(O.lv==='extreme'){let b=m[0],bv=-1e18;m.forEach(x=>{const v=oeval(oafter(x,t),t)+Math.random()*.01;if(v>bv){bv=v;b=x}});return b}
  if(O.lv==='normal'&&Math.random()<.4)return m[Math.floor(Math.random()*m.length)];
  return m.reduce((a,b)=>oscore(b,t)>oscore(a,t)?b:a);
}
function obest(t,c){const m=omoves(t,c);return m.length?Math.max(...m.map(x=>oscore(x,t))):-1e9}
function oscore(x,t){
  const P=O.p[t];
  {
    if(x.k==='mv'){
      const nb=x.bumps.filter(b=>b[0]!==t).length,ob=x.bumps.length-nb;
      let s=P[x.i]<0?300:100+P[x.i];
      if(x.np<P[x.i])s-=250;
      s+=nb*400-ob*400;if(x.slide)s+=30;
      if(x.np>=LANE0)s=1000+x.np;
      return s;
    }
    if(x.k==='sw')return 500+(x.a-P[x.i])+(O.p[x.q][x.j]-x.b);
    return 700+O.p[x.q][x.j];
  }
}

function oWin(t){
  obeep(880,.3);V.h=1;const s=O.S[t],r=O.bot?stkRec('oops',t===0):null;
  V(`<div class='og' style='--oc:${SC[s]};color:${s===3?'#1F2A5A':'#fff'};padding:24px 12px'><h1 class='big bn'>🏆</h1><h2>${esc(oname(t))} ${O.bot&&t===0?'فزت':'فاز'}!</h2><p style='font-size:14px'>${esc(O.msg)}</p>${r?`<p style='font-weight:800;margin-top:6px'>${stkMsg(r)}</p>`:''}</div><div class='wrap'>${btn('العب تاني',`oopsStart(${O.bot},${O.n},'${O.lv}')`,'bl')}${btn('القائمة','oopsHome()')}</div>`);
}

/* --- رسم اللوحة الثابتة (مرة واحدة في اللعبة) --- */
function oStatic(){
  let d=`<defs><linearGradient id='gT' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#FFFFFF'/><stop offset='1' stop-color='#E3EBD8'/></linearGradient><linearGradient id='gPl' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#F6FAEF'/><stop offset='1' stop-color='#D2DFC3'/></linearGradient><linearGradient id='gIn' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#3F6A9E'/><stop offset='1' stop-color='#1E3558'/></linearGradient><pattern id='gPt' width='16' height='16' patternUnits='userSpaceOnUse'><circle cx='8' cy='8' r='1.3' fill='#fff' fill-opacity='.09'/></pattern><filter id='gSh' x='-40%' y='-40%' width='180%' height='180%'><feDropShadow dx='0' dy='1.5' stdDeviation='1.2' flood-opacity='.45'/></filter>`;
  for(let s=0;s<4;s++){const c=SC[s];d+=`<radialGradient id='pg${s}' cx='.35' cy='.3' r='.85'><stop offset='0' stop-color='${mix(c,'#ffffff',.6)}'/><stop offset='.5' stop-color='${c}'/><stop offset='1' stop-color='${mix(c,'#000000',.38)}'/></radialGradient><linearGradient id='cg${s}' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${mix(c,'#ffffff',.32)}'/><stop offset='1' stop-color='${mix(c,'#000000',.1)}'/></linearGradient>`}
  d+='</defs>';
  d+=`<rect x='2' y='2' width='336' height='336' rx='20' fill='url(#gPl)' stroke='#8FA47B' stroke-width='2.5'/><rect x='30' y='30' width='280' height='280' rx='12' fill='url(#gIn)' stroke='#1B1730' stroke-width='3'/><rect x='30' y='30' width='280' height='280' rx='12' fill='url(#gPt)'/>`;
  [0,90,180,270].forEach(a=>{d+=`<polygon points='170,104 155,126 185,126' fill='#000' fill-opacity='.22' transform='rotate(${a} 170 170)'/>`});
  for(let k=0;k<TR;k++){const[x,y]=cellPt(k);d+=RR(x,y+2,26,26,5,'#B2C1A2')+RR(x,y,26,26,5,'url(#gT)','stroke="#C6D2B9" stroke-width=".8"')}
  for(let s=0;s<4;s++)[[1,4],[7,10]].forEach(([a,b])=>{
    const p1=pt(s,a,0),p2=pt(s,b,0);
    d+=`<line x1='${p1[0].toFixed(1)}' y1='${p1[1].toFixed(1)}' x2='${p2[0].toFixed(1)}' y2='${p2[1].toFixed(1)}' stroke='${SC[s]}' stroke-opacity='.5' stroke-width='22' stroke-linecap='round'/><line x1='${p1[0].toFixed(1)}' y1='${p1[1].toFixed(1)}' x2='${p2[0].toFixed(1)}' y2='${p2[1].toFixed(1)}' stroke='#fff' stroke-opacity='.4' stroke-width='6' stroke-linecap='round'/>`;
    for(let u=a;u<b;u++){const[x,y]=pt(s,u,0);d+=`<g transform='translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${s*90})' opacity='${u===a?1:.6}'><polyline points='-3,-6 3,0 -3,6' fill='none' stroke='${mix(SC[s],'#000000',.15)}' stroke-width='3.6' stroke-linecap='round' stroke-linejoin='round'/></g>`}
    d+=`<circle cx='${p2[0].toFixed(1)}' cy='${p2[1].toFixed(1)}' r='9.5' fill='url(#cg${s})' stroke='#fff' stroke-width='2.5' filter='url(#gSh)'/>`;
  });
  for(let s=0;s<4;s++){
    const act=O.S.includes(s),c=SC[s];
    d+=`<g opacity='${act?1:.3}'>`;
    for(let k=0;k<3;k++){const[x,y]=pt(s,2,1+k);d+=RR(x,y+2,24,24,6,mix(c,'#000000',.32))+RR(x,y,24,24,6,`url(#cg${s})`)}
    const[cx,cy]=pt(s,2,1);
    d+=`<g transform='translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${s*90})'><polyline points='-5,-3 0,3 5,-3' fill='none' stroke='#fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></g>`;
    const[kx,ky]=pt(s,2,4.6);
    d+=`<circle cx='${kx.toFixed(1)}' cy='${(ky+2).toFixed(1)}' r='30' fill='#000' fill-opacity='.3'/><circle cx='${kx.toFixed(1)}' cy='${ky.toFixed(1)}' r='30' fill='${mix(c,'#000000',.3)}'/><circle cx='${kx.toFixed(1)}' cy='${ky.toFixed(1)}' r='26' fill='url(#cg${s})'/><circle cx='${kx.toFixed(1)}' cy='${ky.toFixed(1)}' r='20' fill='#000' fill-opacity='.14'/><polygon points='${star(kx,ky,17,7,5,-Math.PI/2)}' fill='#fff' filter='url(#gSh)'/>`;
    if(act){
      const[tx,ty]=pt(s,4,2.3),pp=[pt(s,4,.75),pt(s,3.15,1.85),pt(s,4.85,1.85)].map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
      const dk=mix(c,'#000000',.4);
      d+=`<circle cx='${tx.toFixed(1)}' cy='${ty.toFixed(1)}' r='34' fill='${dk}'/><circle cx='${tx.toFixed(1)}' cy='${ty.toFixed(1)}' r='31' fill='url(#cg${s})'/><circle cx='${tx.toFixed(1)}' cy='${(ty+1).toFixed(1)}' r='24' fill='#000' fill-opacity='.2'/>`;
    }
    d+='</g>';
  }
  return d;
}
function pawnEl(q,i){
  const s=O.S[q],c=SC[s];
  return `<g class='pw' id='pw-${q}-${i}' onclick='oTap(${q},${i})'><g class='pin'><circle class='pl' r='17' fill='none' stroke='#FFD54A' stroke-width='3.5' opacity='0'/><circle class='ph' r='16' fill='#fff' fill-opacity='.3' stroke='#1F2A5A' stroke-width='2.5' stroke-dasharray='5 4' opacity='0'/><ellipse cx='0' cy='8.5' rx='9.5' ry='4' fill='#000' fill-opacity='.4'/><circle class='pb' r='10.5' fill='url(#pg${s})' stroke='${mix(c,'#000000',.5)}' stroke-width='1.6'/><ellipse cx='-3.2' cy='-4.2' rx='4.2' ry='2.6' fill='#fff' fill-opacity='.65'/><text y='4' font-size='10' font-weight='800' fill='${s===3?'#4A3000':'#fff'}' text-anchor='middle' pointer-events='none'>${i+1}</text></g></g>`;
}
function deckSvg(clk){
  const c=O.card,st=clk?'stroke="#FFD54A" stroke-width="3.5"':'stroke="#fff" stroke-width="2.5"';
  let g=RR(172,176,48,66,8,'#000','fill-opacity="0.35"')+RR(173,173,48,66,8,'#8F79D8')+RR(171.5,171.5,48,66,8,'#A895EA');
  if(c===null){
    g+=`<g class='dback'>${RR(170,170,48,66,8,'#C9B8F5',st)}${RR(170,170,38,56,5,'none','stroke="#fff" stroke-opacity=".55" stroke-dasharray="4 3"')}<text x='170' y='174' font-size='13' font-weight='800' fill='#6B4FBF' text-anchor='middle' transform='rotate(-28 170 170)'>Oops!</text></g>`;
  }else{
    const nm=cname(c),col=ccol(c);
    g+=`<g class='dface'>${RR(170,170,48,66,8,'#fff',`stroke="${col}" stroke-width="3"`)}${RR(170,150,40,15,4,col)}<text x='170' y='${nm.length>3?178:181}' font-size='${nm.length>3?14:25}' font-weight='800' fill='#1F2A5A' text-anchor='middle'>${nm}</text><text x='170' y='154' font-size='9' font-weight='800' fill='#fff' text-anchor='middle'>${isNum(c)?'تقدّم':c[0]==='b'?'للخلف':c==='s'?'تبديل':'ضربة'}</text></g>`;
  }
  return g;
}

/* --- إطار اللعبة (يتبني مرة واحدة، والبيادق عناصر ثابتة بتتحرك بـ CSS) --- */
function oFrame(){
  V.h=1;
  const pawns=O.p.map((P,q)=>P.map((p,i)=>pawnEl(q,i)).join('')).join('');
  V(`<div class='og' id='og'><div class='ogh'><b id='otl'></b><button class='xb' onclick='oopsHome()'>خروج</button></div><svg id='osv' class='osv' viewBox='0 0 340 340' style='width:100%;height:auto;display:block' role='img' aria-label='لوحة Oops!'>${oStatic()}<g id='odeck' class='dk' onclick='oTapDeck()'></g><g id='oghost' pointer-events='none'></g><g id='opawns'>${pawns}</g><g id='ofx' pointer-events='none'></g></svg><p id='omsg' class='omsg'></p></div>`);
  oSnap();
}
function oUpdate(){
  const og=document.getElementById('og');if(!og)return;
  const t=O.t,s=O.S[t],bot=botP(t);
  og.style.setProperty('--oc',SC[s]);og.style.color=s===3?'#1F2A5A':'#fff';
  document.getElementById('otl').textContent=trT(otitle(t));
  O.p.forEach((P,q)=>P.forEach((p,i)=>{
    const e=PW(q,i);if(!e)return;
    e.classList.toggle('clk',oClick(q,i));
    e.classList.toggle('last',O.last.some(l=>l[0]===q&&l[1]===i));
    e.classList.toggle('sel',O.card==='s'&&O.sel===i&&q===t&&O.st==='SELECT');
  }));
  const gh=document.getElementById('oghost');
  if(gh){let h='';if(O.st==='SELECT'&&!bot&&O.card!=='s'&&O.card!=='o')O.mv.forEach(m=>{if(m.k!=='mv')return;const q=posOf(t,m.np,m.i);h+=`<circle class='gh' cx='${q[0].toFixed(1)}' cy='${q[1].toFixed(1)}' r='11' fill='#FFD54A' fill-opacity='.28' stroke='#FFD54A' stroke-width='2.5' stroke-dasharray='4 3'/>`});gh.innerHTML=h}
  const clk=O.st==='DRAW'&&!bot,key=(clk?1:0)+'|'+O.card+'|'+O.st;
  const dk=document.getElementById('odeck');
  if(dk&&O.dkey!==key){O.dkey=key;dk.innerHTML=TRH(deckSvg(clk));dk.setAttribute('class',clk?'dk clk':'dk')}
  const m=document.getElementById('omsg');if(m)m.textContent=trT(O.st==='DRAW'&&!bot&&O.card===null?'':O.msg);
}
function splash(){
  const d=document.createElement('div');d.id='splash';
  d.innerHTML=`<div class="sp-em">${DET}</div><div class="sp-t">Imposter Squad</div><div class="sp-d"><i></i><i></i><i></i></div>`;
  document.body.appendChild(d);
  let done=0;const k=()=>{if(done)return;done=1;d.classList.add('out');setTimeout(()=>d.remove(),550)};
  d.onclick=k;setTimeout(k,(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)?300:1900);
}
applyDir();applyCfg();home();splash();
