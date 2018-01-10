<template>
<div>
   <NavLeft class="fixeds fixeds1"></NavLeft>
      <div class="matter">
      <Head  class="fixeds fixeds2 headss"></Head>
        <div class="matter-all">
            <ul class="music-list">
                <li @click="getMusic()">所有歌单</li>
                <li @click="getMusic('华语')">华语</li>
                <li @click="getMusic('流行')">流行</li>
                <li @click="getMusic('摇滚')">摇滚</li>
                <li @click="getMusic('民谣')">民谣</li>
                <li @click="getMusic('电子')">电子</li>
                <li @click="getMusic('轻音乐')">轻音乐</li>
                <li @click="getMusic('影视原声')">影视原声</li>
                <li @click="getMusic('ACG')">ACG</li>
            </ul>
            <div class="music-n music-n2">
                <ul>
                    <li class="col-md-3 col-sm-4 col-xs-6" :key="index" v-for ="(item,index) in List">
                        <router-link :to="{path:'/songmenu',name:'songmenu',params:{id:item.id,name:item.name,pic:item.coverImgUrl}}">
                            <div><img  alt="" v-lazy="item.coverImgUrl"><span class="playCount"><i class="iconfont icon-icons64x6459"></i><span v-if="item.playCount>10000">{{parseInt(item.playCount/10000)+"万"}}</span><span v-else="">{{parseInt(item.playCount)}}</span></span></div><span>{{item.name}}</span>
                        </router-link>
                    </li>
                    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="true" infinite-scroll-distance="10">
                            ...
                    </div>
                </ul>
            </div>
            <div style="height:280px;"></div>
        </div>
      </div>
       <Audio class="audios" :Open="Open" :AllMusicName="AllMusicName" :AllMusicPic="AllMusicPic" :Author="Author" :music="music"></Audio>
   </div>
</template>
<script>
    import axios from "axios";
    import Head from "@/components/Head";
    import NavLeft from "@/components/NavLeft";
    import Audio from "@/components/Audio";
    export default {
  // name: "app",
  components: {
    Head,
    NavLeft,
    Audio
  },
  data(){
      return{
        List:"", 
        page:8,
        listName:"",
      }
  },
  methods: {
    getMusic(listName) {
        if(listName==null){
            listName = ""
        }
        this.listName = listName;
      this.$http.get("/top/playlist/highquality?limit=" + this.page + "&cat="+listName).then(res => {
        // console.log(res.data.banners);
        this.List = res.data.playlists;
        console.log(res.data.playlists)
      });
    },
    loadMore: function() {
                // this.busy = true;
                console.log("到底了");
                console.log(this.listName);
                setTimeout(()=>{
                    this.page ++;
                    this.getMusic(this.listName);
                },1000)
            },
  },
  created(){
      this.getMusic()
  }
}
</script>
<style>
.music-n2{
    padding-top:50px;
}
.headss ul li:nth-child(1){
    color:black;
    padding-bottom:8px;
    border-bottom:none;
}
    header ul li:nth-child(2){
    color:#c62e2e;
    padding-bottom:8px;
    border-bottom:3px solid #c62e2e;
}
.music-list{
    padding-top:20px;
}
.music-list li{
    float:left;
    border-left:1px solid black;
    padding:0px 10px;
    color:rgba(78, 78, 78, 0.867);
}
.music-list li:hover{
    color:black;
}
.music-list li:nth-child(1){
    border-left:none;
}
</style>

