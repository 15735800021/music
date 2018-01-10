<template>
  <div>
  <a-player
    ref="aplayer"
    :narrow="narrow"
    :autoplay="autoplay"
    :showlrc="showlrc"
    :mutex="mutex"
    :fold="fold"
    :speed="speed"
    :theme="theme"
    :mode="mode"
    :preload="preload"
    :listmaxheight="listmaxheight"
    :music="music"
    @play="getLyricAsync"
    class=""
  ></a-player>
</div>
</template>
<script>
import Vue from 'vue'
import APlayer from 'vue-aplayer-plugin'
import 'vue-aplayer-plugin/dist/APlayer.min.css'
import axios from "axios";

Vue.use(APlayer)
export default {
  name: '#app',
  props:['Open','AllMusicName','AllMusicPic','Author','music'],
  data(){
    return{
      aplayer: null,
      narrow: false,
      autoplay: true,
      showlrc: true,
      mutex: false,
      fold: false,
      speed: 1,
      theme: '#ad7a86',
      mode: 'circulation',
      preload: 'metadata',
      listmaxheight: '200px',
      remove:true
    }
  },
  mounted () {
    this.aplayer = this.$refs.aplayer;
    //  this.getPlay();
  },
  methods: {
    // getLyricAsync () {
    //   setTimeout(() => this.music[0].lrc = '[by:Raidou]\n[by:raidou]\n[ti:本色]\n[ar:泠鸢yousa]\n[re:lrc-maker (https://weirongxu.github.io/lrc-maker/)]\n[ve:0.1.0]\n[length:05:14]\n[00:00.00] 作曲 : HTT\n[00:01.00] 作词 : 左耳以东\n[00:39.97]天生妩媚风流俏模样\n[00:43.72]偏嫁五尺短儿郎\n[00:46.48]谷树皮 三寸丁\n[00:47.98]夜夜空对 枉自结愁肠\n[00:52.73]生就娉婷袅娜好身段\n[00:55.97]若为娼 无妨\n[00:58.72]冠花街 压群芳\n[01:00.98]身无所拘 心无疆\n[01:42.98][03:41.34]娇莺应和啼婉转\n[01:45.48][03:44.02]金莲颤 青葱缠 享合欢\n[01:51.47][03:49.77]盈盈露滴湿牡丹\n[01:57.26][03:55.52]翩翩粉蝶暗偷香\n[02:03.51][04:01.52]倒浇红烛夜行船\n[02:06.76][04:05.27]鱼水同欢赴巫山\n[02:09.76][04:08.02]长睫倦 媚骨软 再贪欢\n[02:15.76][03:25.34][04:15.40][00:35.47][01:26.72]\n[02:39.19]鸿儒白丁正襟议伦常\n[02:42.19]酒阑横卧温柔乡\n[02:44.94]赏郑声 话高唐\n[02:46.94]男儿本色 矫饰冀流芳\n[02:50.69]未将妇德女戒正眼望\n[02:54.44]有缘人 放浪\n[02:57.19]千夫指 又何干？\n[02:59.19]休要辜负 好皮囊\n[03:02.69][01:04.23]斜阳含羞越花窗\n[03:05.69][01:06.98]浮云带怯偷眼望\n[03:08.69][01:09.98]美人微醺衣半敞\n[03:14.19][01:16.23]青丝半绾慵倚床\n[03:17.44][01:18.97]星眸初泛潋滟光\n[03:20.19][01:21.98]檀口轻启吐兰芳\n[03:26.09][01:27.23]金风玉露相逢晚\n[03:31.84][01:33.48]银盘斜偎乌云漫\n[03:37.84][01:39.47]轻拢慢捻挑抹忙\n[04:42.54]帐暖良宵短\n[04:45.79]天色忽已晚\n[04:48.99]忙着罗袜重整装\n[04:53.24]倚门回首 带笑含情央\n', 2000)
    // }
    // getPlay(){
    //    console.log(this.Open[0][0].id);
    //   console.log(this.AllMusicName);
    //   console.log(this.AllMusicPic);
    //   console.log(this.Author);
    //   for(var i=0;i<this.AllMusicName.length;i++){
    //     this.music.push({
    //       id: this.Open[i][0].id,
    //       title: this.AllMusicName[i],
    //       author: this.Author[i],
    //       url: this.Open[i][0].url,
    //       pic: this.AllMusicPic[i],
    //       lrc: 'loading'
    //     })
    //   }
    //   console.log(this.music);
    // },
    // created(){
    //   this.getPlay();
    // }
  }
  // getOpen(message1,message2,message3) {
  //   console.log(message1);
  //     for(var i=0;i<message1.length;i++){
  //       this.music.push({id:message1[i]});
  //       axios.get("/music/url?id=" + id[i]).then(res => {
  //       // console.log(res.data.banners);
  //       this.Open.push(res.data.data);
        
  //     });
  //     console.log(this.Open);
  //     }
      
  //   }
  // methods: {
  //   getLyricAsync () {
  //     setTimeout(() => this.music[0].lrc = '[by:Raidou]\n[by:raidou]\n[ti:本色]\n[ar:泠鸢yousa]\n[re:lrc-maker (https://weirongxu.github.io/lrc-maker/)]\n[ve:0.1.0]\n[length:05:14]\n[00:00.00] 作曲 : HTT\n[00:01.00] 作词 : 左耳以东\n[00:39.97]天生妩媚风流俏模样\n[00:43.72]偏嫁五尺短儿郎\n[00:46.48]谷树皮 三寸丁\n[00:47.98]夜夜空对 枉自结愁肠\n[00:52.73]生就娉婷袅娜好身段\n[00:55.97]若为娼 无妨\n[00:58.72]冠花街 压群芳\n[01:00.98]身无所拘 心无疆\n[01:42.98][03:41.34]娇莺应和啼婉转\n[01:45.48][03:44.02]金莲颤 青葱缠 享合欢\n[01:51.47][03:49.77]盈盈露滴湿牡丹\n[01:57.26][03:55.52]翩翩粉蝶暗偷香\n[02:03.51][04:01.52]倒浇红烛夜行船\n[02:06.76][04:05.27]鱼水同欢赴巫山\n[02:09.76][04:08.02]长睫倦 媚骨软 再贪欢\n[02:15.76][03:25.34][04:15.40][00:35.47][01:26.72]\n[02:39.19]鸿儒白丁正襟议伦常\n[02:42.19]酒阑横卧温柔乡\n[02:44.94]赏郑声 话高唐\n[02:46.94]男儿本色 矫饰冀流芳\n[02:50.69]未将妇德女戒正眼望\n[02:54.44]有缘人 放浪\n[02:57.19]千夫指 又何干？\n[02:59.19]休要辜负 好皮囊\n[03:02.69][01:04.23]斜阳含羞越花窗\n[03:05.69][01:06.98]浮云带怯偷眼望\n[03:08.69][01:09.98]美人微醺衣半敞\n[03:14.19][01:16.23]青丝半绾慵倚床\n[03:17.44][01:18.97]星眸初泛潋滟光\n[03:20.19][01:21.98]檀口轻启吐兰芳\n[03:26.09][01:27.23]金风玉露相逢晚\n[03:31.84][01:33.48]银盘斜偎乌云漫\n[03:37.84][01:39.47]轻拢慢捻挑抹忙\n[04:42.54]帐暖良宵短\n[04:45.79]天色忽已晚\n[04:48.99]忙着罗袜重整装\n[04:53.24]倚门回首 带笑含情央\n', 2000)
  //   }
  // }
};
    
// export default {
  // name: "app",
  // props:['message1','message2','message3'],
  // data() {
  //   return {
//       Open: "",
//       name: "",
//       pic: "",
  //   };
  // },
  // methods: {
//     // getOpen(id,name,pic) {
//     //   this.pic = pic;
//     //   this.name = name;
//     //   axios.get("/music/url?id=" + id).then(res => {
//     //     // console.log(res.data.banners);
//     //     this.Open = res.data.data;
//     //     console.log(this.Open);
//     //   });
//     // }
  //   get(){
  //       console.log(message1);
  //   }
  // },
  // created() {
//     // this.getOpen();
    // this.get();
//   }
// };
</script>
<style>

</style>