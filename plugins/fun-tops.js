let plugin = {};
plugin.cmd = ["topgays", "topsucios", "topotakus", "toppajer@s", "toplindos", "toplind@s", "topput@s", "topchupadores", "topmamadores", "topchupapijas", "topchupavergas", "topparejas", "top5parejas"];
plugin.onlyGroup = true;
plugin.botAdmin = true;

plugin.run = async (m, { client, groupMetadata, command, chat }) => {
  if (!chat.games) return client.sendText(m.chat, txt.disabledGames, m);
  let user = (a) => "@" + a.split("@")[0];
  let ps = groupMetadata.participants.map((v) => v.id);
  let a = ps.getRandom();
  let b = ps.getRandom();
  let c = ps.getRandom();
  let d = ps.getRandom();
  let e = ps.getRandom();
  let f = ps.getRandom();
  let g = ps.getRandom();
  let h = ps.getRandom();
  let i = ps.getRandom();
  let j = ps.getRandom();

  if (command == "topgays") {
    let top = `*🌈TOP 10 GAYS/LESBIANAS DEL GRUPO🌈*
    
*_1.- 🏳️‍🌈 ${user(a)}_* 🏳️‍🌈
*_2.- 🪂 ${user(b)}_* 🪂
*_3.- 🪁 ${user(c)}_* 🪁
*_4.- 🏳️‍🌈 ${user(d)}_* 🏳️‍🌈
*_5.- 🪂 ${user(e)}_* 🪂
*_6.- 🪁 ${user(f)}_* 🪁
*_7.- 🏳️‍🌈 ${user(g)}_* 🏳️‍🌈
*_8.- 🪂 ${user(h)}_* 🪂
*_9.- 🪁 ${user(i)}_* 🪁
*_10.- 🏳️‍🌈 ${user(j)}_* 🏳️‍🌈`;
    client.sendText(m.chat, top, m);
  }

  if (command == "topsucios") {
    let top = `*🤢🤮TOP 10 SUCIOS QUE NUNCA SE BAÑAN🤮🤢*

*_1.- 🤢 ${user(a)}_* 🤮
*_2.- 🤢 ${user(b)}_* 🤮
*_3.- 🤢 ${user(c)}_* 🤮
*_4.- 🤢 ${user(d)}_* 🤮
*_5.- 🤢 ${user(e)}_* 🤮
*_6.- 🤢 ${user(f)}_* 🤮
*_7.- 🤢 ${user(g)}_* 🤮
*_8.- 🤢 ${user(h)}_* 🤮
*_9.- 🤢 ${user(i)}_* 🤮
*_10.- 🤢 ${user(j)}_* 🤮`;

    client.sendText(m.chat, top, m);
  }

  if (command == "topotakus") {
    let top = `*🌸 TOP 10 OTAKUS DEL GRUPO 🌸*
    
*_1.- 💮 ${user(a)}_* 💮
*_2.- 🌷 ${user(b)}_* 🌷
*_3.- 💮 ${user(c)}_* 💮
*_4.- 🌷 ${user(d)}_* 🌷
*_5.- 💮 ${user(e)}_* 💮
*_6.- 🌷 ${user(f)}_* 🌷
*_7.- 💮 ${user(g)}_* 💮
*_8.- 🌷 ${user(h)}_* 🌷
*_9.- 💮 ${user(i)}_* 💮
*_10.- 🌷 ${user(j)}_* 🌷`;
    client.sendText(m.chat, top, m);
  }

  if (command == "toppajer@s") {
    let top = `*_😏TOP L@S MAS PAJEROS/AS DEL GRUPO💦_* 
    
*_1.- 🥵 ${user(a)}_* 💦
*_2.- 🥵 ${user(b)}_* 💦
*_3.- 🥵 ${user(c)}_* 💦
*_4.- 🥵 ${user(d)}_* 💦
*_5.- 🥵 ${user(e)}_* 💦
*_6.- 🥵 ${user(f)}_* 💦
*_7.- 🥵 ${user(g)}_* 💦
*_8.- 🥵 ${user(h)}_* 💦
*_9.- 🥵 ${user(i)}_* 💦
*_10.- 🥵 ${user(j)}_* 💦`;
    client.sendText(m.chat, top, m);
  }

  if (command == "toplind@s") {
    let top = `*_😳TOP L@S MAS LIND@S Y SEXIS DEL GRUPO😳_*
    
*_1.- ✨ ${user(a)}_* ✨
*_2.- ✨ ${user(b)}_* ✨
*_3.- ✨ ${user(c)}_* ✨
*_4.- ✨ ${user(d)}_* ✨
*_5.- ✨ ${user(e)}_* ✨
*_6.- ✨ ${user(f)}_* ✨
*_7.- ✨ ${user(g)}_* ✨
*_8.- ✨ ${user(h)}_* ✨
*_9.- ✨ ${user(i)}_* ✨
*_10.- ✨ ${user(j)}_* ✨`;
    client.sendText(m.chat, top, m);
  }

  if (command == "toplindos") {
    let top = `*_😳TOP L@S MAS LIND@S Y SEXIS DEL GRUPO😳_*
    
*_1.- ✨ ${user(a)}_* ✨
*_2.- ✨ ${user(b)}_* ✨
*_3.- ✨ ${user(c)}_* ✨
*_4.- ✨ ${user(d)}_* ✨
*_5.- ✨ ${user(e)}_* ✨
*_6.- ✨ ${user(f)}_* ✨
*_7.- ✨ ${user(g)}_* ✨
*_8.- ✨ ${user(h)}_* ✨
*_9.- ✨ ${user(i)}_* ✨
*_10.- ✨ ${user(j)}_* ✨`;
    client.sendText(m.chat, top, m);
  }

  if (command == "topput@s") {
    let top = `*_😏TOP L@S MAS PUT@S DEL GRUPO SON🔥_* 
    
*_1.- 👉 ${user(a)}_* 👌
*_2.- 👉 ${user(b)}_* 👌
*_3.- 👉 ${user(c)}_* 👌
*_4.- 👉 ${user(d)}_* 👌
*_5.- 👉 ${user(e)}_* 👌
*_6.- 👉 ${user(f)}_* 👌
*_7.- 👉 ${user(g)}_* 👌
*_8.- 👉 ${user(h)}_* 👌
*_9.- 👉 ${user(i)}_* 👌
*_10.- 👉 ${user(j)}_* 👌`;
    client.sendText(m.chat, top, m);
  }

  if (command == "topchupadores" || command == "topmamadores" || command == "topchupapijas" || command == "topchupavergas") {
    let top = `*_🥵TOP 5 DE LOS MÁS CHUPA PIJAS COMPULSIVOS🥵_* 
    
*_1.- 😏 ${user(a)}_* 💦
*_2.- 😏 ${user(b)}_* 💦
*_3.- 😏 ${user(c)}_* 💦
*_4.- 😏 ${user(d)}_* 💦
*_5.- 😏 ${user(e)}_* 💦

\`ESOS 5 CALIENTES DE MIERDA PERO NO MAS QUE LA PUTA DE\` ${user(f)}\n\`SE LA TRAGA TODA\`🥵🥵`;
    client.sendText(m.chat, top, m);
  }

  if (command == "top5parejas" || command == "topparejas") {
    let top = `*_😍 Las 5 maravillosas parejas del grupo 😍_*
    
*_1.- ${user(a)} 💘 ${user(b)}_* 
Que hermosa pareja 💖, me invitan a su Boda 🛐

*_2.- ${user(c)} 💘 ${user(d)}_*  
🌹 Ustedes se merecen lo mejor del mundo 💞

*_3.- ${user(e)} 💘 ${user(f)}_* 
Tan enamorados 😍, para cuando la familia 🥰

*_4.- ${user(g)} 💘 ${user(h)}_* 
💗 Decreto que ustedes son la pareja del Año 💗 

*_5.- ${user(i)} 💘 ${user(j)}_* 
Genial! 💝, están de Luna de miel 🥵✨❤️‍🔥`;
    client.sendText(m.chat, top, m);
  }
};

export default plugin;
