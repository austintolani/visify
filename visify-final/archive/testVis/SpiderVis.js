//resource https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart

let self2 = this
self2.margin = {top: 10, right: 20, bottom: 30, left: 50};

var spiderVis = d3.select("#spiderVis");

//Gets access to the div element created for this chart from HTML
self2.svgBounds = spiderVis.node().getBoundingClientRect();
self2.svgWidth = (self.svgBounds.width - self.margin.left - self.margin.right)/2;
self2.svgHeight = 500;


//creates svg element within the div
self2.svg = spiderVis.append("svg")
    .attr("width",self.svgWidth)
    .attr("height",self.svgHeight)

const songData2 = JSON.parse(`[{"name":"Blueberry Eyes (feat. SUGA of BTS)","songLink":"https://open.spotify.com/track/6sI8Q7TTJeA9exw6hxEqq3","popularity":74,"audioPreview":"https://p.scdn.co/mp3-preview/ffd02afb29f103dd4010010a1521f83181c7fa93?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX","SUGA"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop"],"audioFeatures":{"acousticness":0.454,"danceability":0.746,"energy":0.611,"instrumentalness":0.000922,"liveness":0.133,"loudness":-7.034,"speechiness":0.101,"valence":0.411,"tempo":149.967}},{"name":"There Is A God","songLink":"https://open.spotify.com/track/7JVrd9JwGP7USfReyJjJ85","popularity":46,"audioPreview":"https://p.scdn.co/mp3-preview/13c79aff50e126371dba1184da55c2ae4778b902?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop"],"audioFeatures":{"acousticness":0.759,"danceability":0.459,"energy":0.404,"instrumentalness":0,"liveness":0.123,"loudness":-8.939,"speechiness":0.031,"valence":0.347,"tempo":98.267}},{"name":"Colour Vision","songLink":"https://open.spotify.com/track/7ABzpjFxlhc53f14QorJUL","popularity":48,"audioPreview":"https://p.scdn.co/mp3-preview/2973bc0a257cf09612b3dce43e35bb72a8371c60?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop"],"audioFeatures":{"acousticness":0.233,"danceability":0.505,"energy":0.529,"instrumentalness":0,"liveness":0.158,"loudness":-6.367,"speechiness":0.0484,"valence":0.231,"tempo":81.029}},{"name":"Where Am I At","songLink":"https://open.spotify.com/track/0aZAIRksvTw99b2fQ6w1VG","popularity":54,"audioPreview":"https://p.scdn.co/mp3-preview/73cc5fcbec7cb9d87b88ab1e61c393488ea850b7?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop"],"audioFeatures":{"acousticness":0.236,"danceability":0.418,"energy":0.693,"instrumentalness":0.00000175,"liveness":0.144,"loudness":-5.824,"speechiness":0.158,"valence":0.196,"tempo":172.604}},{"name":"Working For The Weekend (feat. bbno$)","songLink":"https://open.spotify.com/track/3KE5zPQhhWpxnxX3dgXh9g","popularity":55,"audioPreview":"https://p.scdn.co/mp3-preview/92616375bff5c62c5efd7ca4141374df280ddfde?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX","bbno$"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop","canadian hip hop","dark trap","meme rap","vapor trap"],"audioFeatures":{"acousticness":0.223,"danceability":0.858,"energy":0.568,"instrumentalness":0,"liveness":0.122,"loudness":-5.623,"speechiness":0.217,"valence":0.757,"tempo":101.02}},{"name":"SOS","songLink":"https://open.spotify.com/track/6rwBFh4K4QNrKj9rcE1SiJ","popularity":45,"audioPreview":"https://p.scdn.co/mp3-preview/2f5c377f6be96e9ca0972953697845d2de357b6f?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop"],"audioFeatures":{"acousticness":0.0768,"danceability":0.663,"energy":0.638,"instrumentalness":0.00168,"liveness":0.145,"loudness":-5.44,"speechiness":0.0559,"valence":0.309,"tempo":143.844}},{"name":"New Life","songLink":"https://open.spotify.com/track/7xxn5U1rO2yaNl5fdFvsvg","popularity":49,"audioPreview":"https://p.scdn.co/mp3-preview/3ebbd96e354936bc565ce71f8e2741118063838b?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop"],"audioFeatures":{"acousticness":0.105,"danceability":0.641,"energy":0.86,"instrumentalness":0,"liveness":0.106,"loudness":-3.206,"speechiness":0.0397,"valence":0.516,"tempo":155.15}},{"name":"Checklist (feat. Chromeo)","songLink":"https://open.spotify.com/track/1WATa6d8Zj84A2z1mMPck1","popularity":55,"audioPreview":"https://p.scdn.co/mp3-preview/a3f06e6d1e15d552af6806e8c69331f73fc1de1b?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX","Chromeo"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop","alternative dance","dance-punk","disco house","filter house","new rave","nu disco"],"audioFeatures":{"acousticness":0.0709,"danceability":0.792,"energy":0.792,"instrumentalness":0,"liveness":0.176,"loudness":-4.023,"speechiness":0.035,"valence":0.873,"tempo":123.056}},{"name":"Circles","songLink":"https://open.spotify.com/track/3mQEWuOg9UokMH32NVt5G4","popularity":48,"audioPreview":"https://p.scdn.co/mp3-preview/86f733880ae68e17d1f560e35162445ea22d94c2?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop"],"audioFeatures":{"acousticness":0.288,"danceability":0.757,"energy":0.642,"instrumentalness":0,"liveness":0.109,"loudness":-7.399,"speechiness":0.0597,"valence":0.574,"tempo":97}},{"name":"Missed Calls (feat. Hayley Kiyoko)","songLink":"https://open.spotify.com/track/6PHTT4XSp2Mqqr1C9dvbPP","popularity":49,"audioPreview":"https://p.scdn.co/mp3-preview/b8e728e825bc189d3ad9fa9cff877225fe84facf?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX","Hayley Kiyoko"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop","electropop","indie poptimism","pop dance"],"audioFeatures":{"acousticness":0.495,"danceability":0.686,"energy":0.422,"instrumentalness":0,"liveness":0.113,"loudness":-6.647,"speechiness":0.247,"valence":0.488,"tempo":145.942}},{"name":"Watermelon Sugar","songLink":"https://open.spotify.com/track/1e9oZCCiX42nJl0AcqriVo","popularity":82,"audioPreview":"https://p.scdn.co/mp3-preview/0c51b5f7ed852504844feebfb4f4b7f099452662?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Watermelon Sugar","artists":["Harry Styles"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2737cf2b9825bb43083d123ac22","genres":["pop","post-teen pop"],"audioFeatures":{"acousticness":0.122,"danceability":0.548,"energy":0.816,"instrumentalness":0,"liveness":0.335,"loudness":-4.209,"speechiness":0.0465,"valence":0.557,"tempo":95.39}},{"name":"Acid Dreams","songLink":"https://open.spotify.com/track/0bXgpmMQS7RfooveoLOUci","popularity":47,"audioPreview":"https://p.scdn.co/mp3-preview/ed6511024fe21f21f10d06168aea275ba9cb1fd9?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX","Felly"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop","underground hip hop"],"audioFeatures":{"acousticness":0.146,"danceability":0.818,"energy":0.509,"instrumentalness":0.0000549,"liveness":0.0978,"loudness":-4.15,"speechiness":0.0786,"valence":0.773,"tempo":100.009}},{"name":"Am I High Rn (feat. blackbear)","songLink":"https://open.spotify.com/track/1db6ixe9nX6cqt2V1DYZnW","popularity":66,"audioPreview":"https://p.scdn.co/mp3-preview/4350964e90c6f2005b442d5c5f324bb056e8aaff?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"A Letter To My Younger Self","artists":["Quinn XCII","blackbear"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273f83dbc7461aefc08696811c0","genres":["indie pop rap","pop","pop rap"],"audioFeatures":{"acousticness":0.513,"danceability":0.712,"energy":0.497,"instrumentalness":0.00000252,"liveness":0.303,"loudness":-7.943,"speechiness":0.0639,"valence":0.457,"tempo":93.953}},{"name":"Love Me Less (feat. Quinn XCII)","songLink":"https://open.spotify.com/track/78qFR4ah1s7wY3f6qdcnDL","popularity":47,"audioPreview":"https://p.scdn.co/mp3-preview/a7c5024370c799069b1fa16c2ba1da989af59a2c?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Colour Vision","artists":["MAX","Quinn XCII"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2734422aac0b636fc07c0f860c8","genres":["dance pop","pop","pop rap","post-teen pop","viral pop","indie pop rap"],"audioFeatures":{"acousticness":0.0836,"danceability":0.732,"energy":0.855,"instrumentalness":0,"liveness":0.331,"loudness":-2.2,"speechiness":0.0947,"valence":0.773,"tempo":145.036}},{"name":"Magic In The Hamptons (feat. Lil Yachty)","songLink":"https://open.spotify.com/track/2Yer0p7uB2lVBUAtANuuQp","popularity":80,"audioPreview":"https://p.scdn.co/mp3-preview/76293c68ae9504d51adc2ece5b763459f3e8ac45?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Magic In The Hamptons (feat. Lil Yachty)","artists":["Social House","Lil Yachty"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273013314e9861a2c4a796b2176","genres":["pop rap","atl hip hop","hip hop","melodic rap","rap","southern hip hop","trap","underground hip hop"],"audioFeatures":{"acousticness":0.66,"danceability":0.769,"energy":0.479,"instrumentalness":0,"liveness":0.0914,"loudness":-5.339,"speechiness":0.0385,"valence":0.803,"tempo":96.051}},{"name":"Rude","songLink":"https://open.spotify.com/track/6RtPijgfPKROxEzTHNRiDp","popularity":79,"audioPreview":"https://p.scdn.co/mp3-preview/c72b1ced01765ebb7cdc26c679a346bea13121d3?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Don't Kill the Magic","artists":["MAGIC!"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273604f8ac39f15d287e251f193","genres":["pop","reggae fusion"],"audioFeatures":{"acousticness":0.0423,"danceability":0.774,"energy":0.756,"instrumentalness":0,"liveness":0.305,"loudness":-4.995,"speechiness":0.0389,"valence":0.931,"tempo":144.032}},{"name":"Applesauce","songLink":"https://open.spotify.com/track/2BvR9hPsT7QoyiQBNuZYyW","popularity":57,"audioPreview":"https://p.scdn.co/mp3-preview/705c96ebca4e49333b54cde314c4de3766e3362b?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Applesauce","artists":["Sam.Sts"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273ef1758f4d18f4d8074952fc1","genres":["bedroom pop"],"audioFeatures":{"acousticness":0.41,"danceability":0.681,"energy":0.552,"instrumentalness":0,"liveness":0.207,"loudness":-8.913,"speechiness":0.156,"valence":0.876,"tempo":124.686}},{"name":"Kids","songLink":"https://open.spotify.com/track/1jJci4qxiYcOHhQR247rEU","popularity":78,"audioPreview":"https://p.scdn.co/mp3-preview/6a749da38e969dca948f36139f976b594db38f5d?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Oracular Spectacular","artists":["MGMT"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2738b32b139981e79f2ebe005eb","genres":["alternative dance","indie rock","indietronica","modern rock","rock"],"audioFeatures":{"acousticness":0.00076,"danceability":0.451,"energy":0.931,"instrumentalness":0.0049,"liveness":0.361,"loudness":-3.871,"speechiness":0.0719,"valence":0.172,"tempo":122.961}},{"name":"Lately","songLink":"https://open.spotify.com/track/5awvelCGpDQHwgZem0ira9","popularity":62,"audioPreview":"https://p.scdn.co/mp3-preview/c85029135dbffcb47a3a25468c67fba62517f631?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Lately","artists":["Forrest.","Biskwiq","Ryce"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273f4d3efb3636f1b5ec3ff9d1e","genres":["pop"],"audioFeatures":{"acousticness":0.213,"danceability":0.718,"energy":0.632,"instrumentalness":0.0000128,"liveness":0.283,"loudness":-4.011,"speechiness":0.145,"valence":0.859,"tempo":160.039}},{"name":"Little Things (with Quinn XCII & Chelsea Cutler)","songLink":"https://open.spotify.com/track/1OeEpViPwVi1FfdNkOoIci","popularity":65,"audioPreview":"https://p.scdn.co/mp3-preview/5911facd19301b09e8b0436efb58209d15213766?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Little Things (with Quinn XCII & Chelsea Cutler)","artists":["Louis The Child","Quinn XCII","Chelsea Cutler"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2733ca43d74ec6d0930e2170afc","genres":["indie pop rap","pop","pop rap","edm","electropop","pop dance","tropical house","indie pop","indie poptimism"],"audioFeatures":{"acousticness":0.191,"danceability":0.622,"energy":0.636,"instrumentalness":0,"liveness":0.0782,"loudness":-4.38,"speechiness":0.122,"valence":0.528,"tempo":82.962}},{"name":"Mariposa","songLink":"https://open.spotify.com/track/4ja2gzrNh9VNigzoXfmbwD","popularity":84,"audioPreview":"https://p.scdn.co/mp3-preview/626f2eb20b33206e8caeb46b42d00a31416a61b8?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Mariposa","artists":["Peach Tree Rascals"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273180bec60ad04205a903e4441","genres":["alternative r&b","pop"],"audioFeatures":{"acousticness":0.617,"danceability":0.676,"energy":0.525,"instrumentalness":0,"liveness":0.356,"loudness":-5.88,"speechiness":0.028,"valence":0.421,"tempo":112.011}},{"name":"Sick and Tired","songLink":"https://open.spotify.com/track/5eU0KDvZVfFl4ehleRwGGF","popularity":70,"audioPreview":"https://p.scdn.co/mp3-preview/88635f3263bcb4b54b13112ecfbba0be1455ed0f?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Sick and Tired","artists":["iann dior","Machine Gun Kelly","Travis Barker"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2735b33bdcd47416c53b2dba39f","genres":["melodic rap","pop rap","ohio hip hop","rap rock"],"audioFeatures":{"acousticness":0.151,"danceability":0.747,"energy":0.495,"instrumentalness":0,"liveness":0.146,"loudness":-8.584,"speechiness":0.0491,"valence":0.489,"tempo":145.095}},{"name":"Let's Fall in Love for the Night","songLink":"https://open.spotify.com/track/3n5te2xbUAPjzAnhLgA42z","popularity":72,"audioPreview":"https://p.scdn.co/mp3-preview/4bc2c64b190cc5b99b205c420f7b872629bdd8b3?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Blood Harmony (Deluxe)","artists":["FINNEAS"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273593e693d168c94f916a079b5","genres":["indie pop","la indie","pop"],"audioFeatures":{"acousticness":0.802,"danceability":0.737,"energy":0.408,"instrumentalness":0,"liveness":0.171,"loudness":-7.941,"speechiness":0.104,"valence":0.374,"tempo":127.918}},{"name":"Beachside","songLink":"https://open.spotify.com/track/7tld8T5xAPfOtMDYJ0GpdO","popularity":55,"audioPreview":"https://p.scdn.co/mp3-preview/fffea77456978eaad9f414258743b9ee523c7713?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Beachside","artists":["Bazanji","Jackson Breit"],"albumArt":"https://i.scdn.co/image/ab67616d0000b27398af4c88e0fa1861e97702f2","genres":["bass trap","deep underground hip hop","pop rap","la pop"],"audioFeatures":{"acousticness":0.0627,"danceability":0.711,"energy":0.69,"instrumentalness":0,"liveness":0.263,"loudness":-4.948,"speechiness":0.0579,"valence":0.194,"tempo":77.179}},{"name":"hot girl bummer","songLink":"https://open.spotify.com/track/7aiClxsDWFRQ0Kzk5KI5ku","popularity":55,"audioPreview":null,"albumName":"hot girl bummer","artists":["blackbear"],"albumArt":"https://i.scdn.co/image/ab67616d0000b27395e845fcceb1625ff6178411","genres":["pop","pop rap"],"audioFeatures":{"acousticness":0.128,"danceability":0.778,"energy":0.559,"instrumentalness":0,"liveness":0.399,"loudness":-7.109,"speechiness":0.0776,"valence":0.678,"tempo":129.989}},{"name":"One Night","songLink":"https://open.spotify.com/track/40yJGQyEaBbIkXpwMFkXip","popularity":68,"audioPreview":"https://p.scdn.co/mp3-preview/104d1fbbfc7e37e65589fed75ed22c42a0f772e7?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Lil Boat","artists":["Lil Yachty"],"albumArt":"https://i.scdn.co/image/ab67616d0000b27314d1a203158bed18a4ea7375","genres":["atl hip hop","hip hop","melodic rap","rap","southern hip hop","trap","underground hip hop"],"audioFeatures":{"acousticness":0.345,"danceability":0.764,"energy":0.475,"instrumentalness":0,"liveness":0.14,"loudness":-12.618,"speechiness":0.114,"valence":0.34,"tempo":129.974}},{"name":"pineapple pizza!","songLink":"https://open.spotify.com/track/2ZCeayho20yavRaeqWeQMh","popularity":42,"audioPreview":"https://p.scdn.co/mp3-preview/753a0e55432d00d10895b56c4e21a12bcf25b181?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"skeleton garden","artists":["ohsobrkn"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273893b8aa723a41f5e877e8355","genres":["emo rap","sad rap"],"audioFeatures":{"acousticness":0.15,"danceability":0.805,"energy":0.556,"instrumentalness":0,"liveness":0.619,"loudness":-8.701,"speechiness":0.382,"valence":0.739,"tempo":80.006}},{"name":"Sunny Side","songLink":"https://open.spotify.com/track/2fS36fnJg8lqq5u8jRKiMx","popularity":38,"audioPreview":"https://p.scdn.co/mp3-preview/07abd8cf068279a2154d5ba90a7be58047adb850?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Sunny Side","artists":["Jackson Breit"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2731ff602566abae81004d874ca","genres":["la pop"],"audioFeatures":{"acousticness":0.476,"danceability":0.686,"energy":0.792,"instrumentalness":0,"liveness":0.193,"loudness":-4.216,"speechiness":0.0683,"valence":0.839,"tempo":141.06}},{"name":"Dance, Baby!","songLink":"https://open.spotify.com/track/5EV4bGHxVN0kHpcAFvgnTt","popularity":71,"audioPreview":"https://p.scdn.co/mp3-preview/234c466be7601fbf6c65fa1f7d3ac5c1863e865e?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Roy Pablo","artists":["boy pablo"],"albumArt":"https://i.scdn.co/image/ab67616d0000b27339806e9326b2bdc50538e911","genres":["bedroom pop","bergen indie","indie pop","norwegian indie"],"audioFeatures":{"acousticness":0.037,"danceability":0.602,"energy":0.601,"instrumentalness":0.0046,"liveness":0.312,"loudness":-8.521,"speechiness":0.0411,"valence":0.856,"tempo":122.017}},{"name":"Sleep While I Drive (feat. Ashe)","songLink":"https://open.spotify.com/track/1g6v42WOMBWC8V9UpwciiH","popularity":54,"audioPreview":"https://p.scdn.co/mp3-preview/83fbb8f6bff1f9e6d144f12c0b29a92b159255c6?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"A Letter To My Younger Self","artists":["Quinn XCII","Ashe"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273f83dbc7461aefc08696811c0","genres":["indie pop rap","pop","pop rap","indie pop"],"audioFeatures":{"acousticness":0.00207,"danceability":0.716,"energy":0.768,"instrumentalness":0.00000728,"liveness":0.116,"loudness":-6.46,"speechiness":0.04,"valence":0.796,"tempo":127.927}},{"name":"Silence","songLink":"https://open.spotify.com/track/7vGuf3Y35N4wmASOKLUVVU","popularity":83,"audioPreview":"https://p.scdn.co/mp3-preview/d779881bd6bbcced00dbf7f5b87e3374bf7c058b?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Silence","artists":["Marshmello","Khalid"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273f33ba583059dc2f7d08bf2b8","genres":["brostep","edm","pop","pop dance","progressive electro house","alternative r&b"],"audioFeatures":{"acousticness":0.256,"danceability":0.52,"energy":0.761,"instrumentalness":0.00000496,"liveness":0.17,"loudness":-3.093,"speechiness":0.0853,"valence":0.286,"tempo":141.971}},{"name":"queen of broken hearts","songLink":"https://open.spotify.com/track/1YaLBadQjS701ZLZRGjPMX","popularity":47,"audioPreview":null,"albumName":"queen of broken hearts","artists":["blackbear"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273bbc7c84b3f30568c93648174","genres":["pop","pop rap"],"audioFeatures":{"acousticness":0.00644,"danceability":0.716,"energy":0.711,"instrumentalness":0,"liveness":0.0783,"loudness":-6.098,"speechiness":0.0769,"valence":0.827,"tempo":97.016}},{"name":"Coffee (feat. Marc E. Bassy)","songLink":"https://open.spotify.com/track/4CxmynXhw78QefruycvxG8","popularity":71,"audioPreview":"https://p.scdn.co/mp3-preview/5a2101969adeb008776ddfc7edf05ce5c6c72ebf?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"A Letter To My Younger Self","artists":["Quinn XCII","Marc E. Bassy"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273f83dbc7461aefc08696811c0","genres":["indie pop rap","pop","pop rap","rap"],"audioFeatures":{"acousticness":0.0803,"danceability":0.831,"energy":0.452,"instrumentalness":0,"liveness":0.359,"loudness":-5.111,"speechiness":0.047,"valence":0.534,"tempo":93.04}},{"name":"Can I Call You Tonight?","songLink":"https://open.spotify.com/track/64lsIF5pw0sJY0gV5kz0RN","popularity":82,"audioPreview":"https://p.scdn.co/mp3-preview/1df9f9b1d2fa409883d304d9fd3b8e45110e72fc?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Fuzzybrain","artists":["Dayglow"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273ccd63af052f7e438c05f6c94","genres":["austindie","indie pop","modern rock"],"audioFeatures":{"acousticness":0.132,"danceability":0.641,"energy":0.842,"instrumentalness":0.91,"liveness":0.419,"loudness":-7.27,"speechiness":0.0292,"valence":0.5,"tempo":129.98}},{"name":"Trojans","songLink":"https://open.spotify.com/track/0wDEiGfq4pw7FAkYKpkwMo","popularity":60,"audioPreview":"https://p.scdn.co/mp3-preview/c32031cdcf82cb7c9717893313f10fe207fe60cc?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"When It Was Now","artists":["Atlas Genius"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2739286c81f1b4370213015153e","genres":["indie pop","indie poptimism","indie rock","indietronica","modern alternative rock","modern rock","pop rock","shimmer pop"],"audioFeatures":{"acousticness":0.0113,"danceability":0.721,"energy":0.822,"instrumentalness":0.0000701,"liveness":0.0898,"loudness":-4.843,"speechiness":0.0391,"valence":0.536,"tempo":140.002}},{"name":"cheap sunglasses","songLink":"https://open.spotify.com/track/4E94u3v7VnEFZkaRIYtad7","popularity":59,"audioPreview":"https://p.scdn.co/mp3-preview/495c55d8e70fa636d24a207734b05a72f451181b?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"cheap sunglasses","artists":["John K"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273423b5f9bf6e35302c85c8874","genres":["electropop","pop","post-teen pop"],"audioFeatures":{"acousticness":0.239,"danceability":0.801,"energy":0.499,"instrumentalness":0,"liveness":0.189,"loudness":-5.89,"speechiness":0.0346,"valence":0.674,"tempo":99.018}},{"name":"Alright","songLink":"https://open.spotify.com/track/5xC8uOesnn0udeXAYlAnoY","popularity":73,"audioPreview":"https://p.scdn.co/mp3-preview/b8476ad1aa953668867aa8fadbfb2a9800ad017e?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"I Should Coco","artists":["Supergrass"],"albumArt":"https://i.scdn.co/image/ab67616d0000b2737d2fd2378160e40c96bc61ff","genres":["alternative rock","britpop","modern rock","oxford indie","pop rock","rock"],"audioFeatures":{"acousticness":0.000479,"danceability":0.467,"energy":0.958,"instrumentalness":0.199,"liveness":0.299,"loudness":-4.808,"speechiness":0.0775,"valence":0.701,"tempo":145.92}},{"name":"Break My Heart Again","songLink":"https://open.spotify.com/track/7gGBgh0bVxHPgZjA505bo9","popularity":71,"audioPreview":"https://p.scdn.co/mp3-preview/886ec8a57d6cac9902cf634ee84f4f575ab7afce?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Blood Harmony (Deluxe)","artists":["FINNEAS"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273593e693d168c94f916a079b5","genres":["indie pop","la indie","pop"],"audioFeatures":{"acousticness":0.907,"danceability":0.402,"energy":0.151,"instrumentalness":0,"liveness":0.0941,"loudness":-14.228,"speechiness":0.04,"valence":0.489,"tempo":144.069}},{"name":"Sour Patch Kids","songLink":"https://open.spotify.com/track/5DJNyvuMmZfsfvdTpMMmUq","popularity":71,"audioPreview":"https://p.scdn.co/mp3-preview/4cc2a549916e40f7552882f5c202eeae13d43054?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Lazy Fair","artists":["Bryce Vine"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273d67c496c586f830b6a73ea8c","genres":["pop","pop rap"],"audioFeatures":{"acousticness":0.0144,"danceability":0.523,"energy":0.783,"instrumentalness":0.0000171,"liveness":0.219,"loudness":-5.084,"speechiness":0.0545,"valence":0.581,"tempo":76.588}},{"name":"Sing in the Shower","songLink":"https://open.spotify.com/track/4mal3dKsaYVvMmxprcgdz9","popularity":35,"audioPreview":"https://p.scdn.co/mp3-preview/2a4b8675fa7b1264dee0ffe1b7e09cb0f2d08875?cid=eeaa0eff8e304f3ca5a53ab8a0fc1b77","albumName":"Sing in the Shower","artists":["Zak James"],"albumArt":"https://i.scdn.co/image/ab67616d0000b273712829ba43c6fea89e40d147","genres":[],"audioFeatures":{"acousticness":0.298,"danceability":0.913,"energy":0.639,"instrumentalness":0,"liveness":0.11,"loudness":-7.493,"speechiness":0.0553,"valence":0.52,"tempo":118.01}}]`)

var danceability = 0
var acousticness = 0
var energy = 0
var valence = 0
var tempo = 0
songData2.forEach(function(file){
    danceability += file.audioFeatures.danceability
    acousticness += file.audioFeatures.acousticness
    energy += file.audioFeatures.energy
    valence += file.audioFeatures.valence
    tempo += file.audioFeatures.tempo
})

let lengthScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, (self2.svgHeight - self2.margin.top - self2.margin.bottom)/2])
let tempoScale = d3.scaleLinear()
    .domain([0,200])
    .range([0,(self2.svgHeight - self2.margin.top - self2.margin.bottom)/2])
let radialScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,(self2.svgHeight - self2.margin.top - self2.margin.bottom)/2]);
let ticks = [20,40,60,80,100];

//middle of Spider Chart
let midPointX = (self2.svgWidth - self2.margin.right - self2.margin.left)/2 + self2.margin.right
let midPointY = (self2.svgHeight - self2.margin.top)/2 + self2.margin.top

//Finds length for average songs
let avgDanceability = lengthScale(danceability/songData2.length)
let avgAcousticness = lengthScale(acousticness/songData2.length)
let avgEnergy = lengthScale(energy/songData2.length)
let avgValence = lengthScale(valence/songData2.length)
let avgTempo = tempoScale(tempo/songData2.length)

let averages = [avgDanceability,avgAcousticness,avgEnergy,avgValence,avgTempo]
let featureNames = ["Danceability","Acousticness","Energy","Valence","Tempo"]
let longest = lengthScale(1)

var chartPoints = ["","","","",""]
var statsPoints = []
var statsPoly = ""
var linePoints = []

for(i = 0; i<5; i++){
    var angle = i*((2*Math.PI)/5) + Math.PI/2
    var totHeight =  midPointY - Math.sin(angle)*longest
    var totWidth = Math.cos(angle)*longest + midPointX
    var statsHeight = midPointY - Math.sin(angle)*averages[i]
    var statsWidth = Math.cos(angle)*averages[i] + midPointX
    linePoints.push({"x":totWidth, "y": totHeight})
    statsPoints.push({"x":statsWidth, "y": statsHeight})
    statsPoly += statsWidth + "," + statsHeight + " "

    for(j = 1; j<=5; j++){
        totHeight =  midPointY - Math.sin(angle)*(longest*(j/5))
        totWidth = Math.cos(angle)*(longest*(j/5)) + midPointX
        chartPoints[j-1] += totWidth + "," + totHeight + " "
    }

}


ticks.forEach(function(t,index){
        self2.svg.append("text")
            .attr("x", midPointX+5)
            .attr("y", midPointY - radialScale(t))
            .text(t.toString())
            .style("font-size", 12)
}
);


for(i = 0; i<5; i++){

    self2.svg.append("polygon")
        .attr("points", chartPoints[i])
        .attr("fill", "none")
        .attr("stroke", "gray")

    //draw axis line
    self2.svg.append("line")
        .attr("x1", midPointX)
        .attr("y1", midPointY)
        .attr("x2", linePoints[i].x)
        .attr("y2", linePoints[i].y)
        .attr("stroke","black");

    //draw axis label
    self2.svg.append("text")
        .attr("x", function(d){
            if(i == 0){
                return linePoints[i].x - 30
            }
            else if(i == 1){
                return linePoints[i].x - 90
            }
            else if(i == 2){
                return linePoints[i].x - 30
            }
            else if(i == 3){
                return linePoints[i].x - 30
            }
            else if(i == 4){
                return linePoints[i].x + 10
            }
            return linePoints[i].x
        } )
        .attr("y", function(d){
            if(i == 0){
                return linePoints[i].y - 13
            }
            else if(i == 2){
                return linePoints[i].y + 20
            }
            else if(i == 3){
                return linePoints[i].y + 20
            }
            return linePoints[i].y + 5
        })
        .text(featureNames[i]);
}

self2.svg.append("polygon")
    .attr("points", statsPoly)
    .attr("fill", "pink")
    .attr("stroke", "gray")
    .attr("opacity", 0.5)

self2.svg.selectAll("circle")
    .data(statsPoints)
    .enter()
    .append("circle")
    .attr("cx", function(d,i){
        return statsPoints[i].x
    })
    .attr("cy", function(d,i){
        return statsPoints[i].y
    })
    .attr("r", 3)
    .attr("fill", "green")
    .attr("stroke", "green")
















