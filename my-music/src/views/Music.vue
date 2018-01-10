<template>
  <div>
   <NavLeft class="fixeds fixeds1"></NavLeft>
   <div class="matter">
     <Head  class="fixeds fixeds2 head-fixed"></Head>
     <div class="matter-all">
       <Banner/>
       <div>
      <p class="r-music"><i class="iconfont icon-rili"></i>推荐歌单<router-link to="/MusicList" tag="span">更多 ></router-link></p>
      <hr>
      <div class="music-n">
          <ul>
            
              <li class="col-md-3 col-sm-4 col-xs-6" :key="index" v-if="index<12" v-for ="(item,index) in Music">
                  <router-link :to="{path:'/songmenu',name:'songmenu',params:{id:item.id,name:item.name,pic:item.picUrl}}">
                    <div><img :src="item.picUrl" alt=""><span class="playCount"><i class="iconfont icon-icons64x6459"></i><span v-if="item.playCount>10000">{{parseInt(item.playCount/10000)+"万"}}</span><span v-else="">{{parseInt(item.playCount)}}</span></span></div><span>{{item.name}}</span>
                  </router-link>
              </li>
          </ul>
      </div>
      <div style="clear:both;"></div>
      <p class="r-music"><i class="iconfont icon-yinle2"></i>独家放送<span>更多 ></span></p>
      <hr>
      <div class="music-n">
          <ul>
              <li class="col-sm-4 col-xs-12" :key="index" v-for ="(item,index) in Exclusive">
                  <img :src="item.picUrl" alt=""><i class="iconfont icon-video_icon"></i><span>{{item.name}}</span>
              </li>
          </ul>
      </div>
      <div style="clear:both;"></div>
      <p class="r-music"><i class="iconfont icon-lineCD"></i>最新音乐<span>更多 ></span></p>
      <hr>
      <div>
        <ul id="list">
          <li class="col-sm-6 col-xs-12 new" :key="index" v-for ="(item,index) in New" @click="getOpen(item.id,item.name,item.song.album.blurPicUrl,item.song.artists[0].name)">
            <span v-if="index<9">{{"0"+(index+1)}}</span><span v-else-if="index=9">{{index+1}}</span><img :src="item.song.album.blurPicUrl" alt=""><br>
            <ol>
              <li>
                <b>{{item.name}}</b>
              </li>
              <li>
                <span>{{item.song.artists[0].name}}</span>
              </li>
            </ol>
             
          </li>
        </ul>
      </div>
      <div style="clear:both;padding-top:20px;"></div>
      <p class="r-music"><i class="iconfont icon-mv"></i>推荐MV<span>更多 ></span></p>
      <hr>
      <div class="music-n mv-n">
          <ul>
              <li class="col-sm-4 col-xs-12" :key="index" v-if="index<3" v-for ="(item,index) in MV">
                  <div><img :src="item.picUrl" alt=""><span class="playCount"><i class="iconfont icon-video_icon"></i><span>{{parseInt(item.playCount)}}</span></span></div><span>{{item.name}}</span><br><span>{{item.artistName}}</span>
              </li>
          </ul>
      </div>
      <div style="clear:both;"></div>
      <p class="r-music"><i class="iconfont icon-xinhao"></i>主播电台<span>更多 ></span></p>
      <div>
        <ul id="list" class="lists" style="background:red;">
          <li class="col-sm-6 col-xs-12 new" :key="index" v-for ="(item,index) in Anchor" @click="getOpen(item.program.mainSong.id,item.name,item.picUrl)">
            <img :src="item.picUrl" alt=""><br>
            <ol>
              <li>
                <b>{{item.name}}</b>
              </li>
              <li>
                <span>{{item.program.mainSong.artists[0].name}}</span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div style="clear:both; margin-bottom:20px;"></div>
  </div>
     </div>
   </div>
   <Audio class="audios" :Open="Open" :AllMusicName="name" :AllMusicPic="pic" :Author="Author" :music="music"></Audio>
  </div>
</template>
<script>
import axios from "axios";
import Head from "@/components/Head";
import NavLeft from "@/components/NavLeft";
import Banner from "@/components/Banner";
import Music from "@/components/Music";
import Audio from "@/components/Audio";
export default {
  // name: "app",
  components: {
    Head,
    NavLeft,
    Banner,
    Music,
    Audio
  },
  data() {
    return {
      Music: "",
      Exclusive: "",
      New: "",
      MV: "",
      Num: "",
      Anchor: "",
      Open: "",
      AllMusicName: "",
      AllMusicPic: "",
      music:[]
    };
  },
  methods: {
    getMusic() {
      this.$http.get("/personalized").then(res => {
        // console.log(res.data.banners);
        this.Music = res.data.result;
        // console.log(this.Music)
      });
    },
    getExclusive() {
      this.$http.get("/personalized/privatecontent").then(res => {
        // console.log(res.data.banners);
        this.Exclusive = res.data.result;
        // console.log(this.Exclusive)
      });
    },
    getNew() {
      this.$http.get("/personalized/newsong").then(res => {
        console.log(res.data.result);
        this.New = res.data.result;
      });
    },
    getMV() {
      this.$http.get("/personalized/mv").then(res => {
        this.MV = res.data.result;
      });
    },
    getAnchor() {
      this.$http.get("/personalized/djprogram").then(res => {
        this.Anchor = res.data.result;
        console.log(this.Anchor);
      });
    },
    getOpen(id, name, pic,author) {
      this.music=[];
      this.AllMusicPic=pic;
      this.AllMusicName=name;
      this.$http.get("/music/url?id=" + id).then(res => {
        // console.log(res.data.banners);
        this.Open = res.data.data;
        console.log(this.Open[0].id);
        for(var i=0;i<this.AllMusicName.length;i++){
                    this.music.push({
                    id: this.Open[i].id,
                    title: this.AllMusicName,
                    author: author,
                    url: this.Open[i].url,
                    pic: this.AllMusicPic,
                    lrc: 'loading'
                    })
                }
      });
      console.log(this.music);
    }
  },
  created() {
    this.getMusic();
    this.getExclusive();
    this.getNew();
    this.getMV();
    this.getAnchor();
    this.getOpen();
  }
};
</script>
<style>

</style>

