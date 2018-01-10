<template>
  <div>
        <NavLeft class="fixeds fixeds1"></NavLeft>
      <div class="matter">
      <Head  class="fixeds fixeds2 headss"></Head>
     <div class="song-list">
        <img :src="pics" alt="" class="img-rounded">
        <div class="col-sm-6 col-xs-12">
            <h3>{{names}}</h3>
            <h4><img :src="List.creator.avatarUrl">{{List.creator.nickname}}</h4>
            <div>收藏({{List.subscribedCount}})</div>
            <div>评论({{List.commentCount}})</div>
            <div>分享({{List.shareCount}})</div>
            <div>下载全部</div>
            <div>···更多</div><br><br><br>
            <h6 class="hidden-xs">标签: &nbsp; {{List.tags}}</h6>
            <h6 class="hidden-xs">介绍: &nbsp; {{List.description}}</h6>
        </div>
        <h2 class="col-xs-12" @click="getAllMusic()"><i class="iconfont icon-bofang"></i>双击播放全部({{List.trackCount}})</h2>
        <ul>
            <li class="col-xs-12" :key="index" v-for ="(item,index) in List.tracks" @click="getOpen(item.id,item.name,item.al.picUrl,item.al.name)"> 
                <span class="col-sm-4 col-xs-6"><span v-if="index<9" class="col-xs-1">{{"0"+(index+1)}}</span><span v-else-if="index>=9" class="col-xs-1">{{index+1}}</span>{{item.name}}</span>
                <span class="col-sm-3 col-xs-6">{{item.ar[0].name}}</span>
                <span class="col-xs-3 hidden-xs">{{item.al.name}}</span>
                <!-- <span class="col-xs-2 hidden-xs">{{}}</span> -->
            </li>
        </ul>
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
        name: "app",
        components: {
            NavLeft,
            Audio,
            Head
        },
        data(){
            return{
                id:"",
                names:"",
                pics:"",
                List:"",
                Open:"",
                pic:"",
                AllMusic:[],
                ids:"",
                AllMusicName:[],
                AllMusicPic:[],
                Open:[],
                Author:[],
                music:[]
            }
        },
        methods: {
            getAll(){
                this.id = this.$route.params.id;
                this.names = this.$route.params.name;
                this.pics = this.$route.params.pic;
                console.log(this.$route.params);
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
            },
            getPlay(){
                console.log(this.Open[0][0].id);
                console.log(this.AllMusicName);
                console.log(this.AllMusicPic);
                console.log(this.Author);
                for(var i=0;i<this.AllMusicName.length;i++){
                    this.music.push({
                    id: this.Open[i][0].id,
                    title: this.AllMusicName[i],
                    author: this.Author[i],
                    url: this.Open[i][0].url,
                    pic: this.AllMusicPic[i],
                    lrc: 'loading'
                    })
                }
                console.log(this.music);
            },
            getAllMusic(){
                this.music=[];
                 this.AllMusicPic=[];
            this.AllMusicName=[];
            this.Author=[];
            this.Open=[];
                console.log(this.id);
                this.$http.get("/playlist/detail?id=" + this.id).then(res => {
                    console.log(res.data.playlist.tracks);
                    this.List = res.data.playlist;
                for(var i=0;i<this.List.trackIds.length;i++){
                    this.AllMusic.push(this.List.trackIds[i].id);
                    this.AllMusicName.push(this.List.tracks[i].name);
                    this.AllMusicPic.push(this.List.tracks[i].al.picUrl);
                    this.Author.push(this.List.tracks[i].ar[0].name);
                    this.$http.get("/music/url?id=" + this.List.trackIds[i].id).then(res => {
                        this.Open.push(res.data.data);
                    });  
                }
                this.getPlay()
                console.log(this.music);
                // console.log(this.AllMusicPic);
                // console.log(this.AllMusic);
                // console.log(this.AllMusicName);
                // console.log(this.AllMusicPic);
            });
            },
            // getOpen(message1) {
            //     // console.log(this.AllMusicName[0]);
            //     for(var i=0;i<message1.length;i++){
            //         // this.Open.push(this.AllMusicName[i]);
            //         // this.Open.push(this.AllMusicPic[i]);
            //     axios.get("/music/url?id=" + message1[i]).then(res => {
            //     this.Open.push(res.data.data);
            //     // console.log(this.AllMusicName[i]);
            //     });
            //     }
            //     // console.log(this.Open);
            // },
        },
        //     getOpen(id, name, pic) {
        //         this.ids = id;
        //         this.pic = pic;
        //         this.name = name;
        //         // console.log(this.AllMusic);
        //             axios.get("/music/url?id=" + id).then(res => {
        //             this.Open = res.data.data;
        //             })   
        //     }
        // },
        created(){
            this.getAll();
            this.getAllMusic();
            // this.getOpen(this.AllMusic); 
        }
    }
</script>
<style>
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
.audios {
  position: fixed;
  background:white;
  bottom:0;
  z-index: 9999;
  width: 100%;
}
.song-list{
    padding-top:90px;
    padding-left:50px;
}
.song-list>img{
    width:20%;
    min-width:200px;
    padding-right:20px;
    float:left;
}
.song-list div div{
     float:left;
     padding:5px;
     border:1px solid #ccc;
     margin-top:10px;
     margin-right:10px;
}
.song-list h4 i{
    font-size:25px;
    color:#c62e2e;
}
.song-list h2{
    font-size:20px;
}
.song-list h2 i{
    padding:0 10px;
    font-size:23px;
    color:#c62e2e;
}
.song-list h4>img{
    width:50px;
    padding-right:10px;
    border-radius:50%;
}
.song-list ul li:last-child{
   margin-bottom:90px;
}
.song-list ul > li{
    line-height:50px;
    height:50px;
}
.song-list ul > li:nth-child(odd) {
    background: #f4f4f6;
  }
  .song-list ul > li:hover{
      background:#f4f4f6;
  }
  .song-list ul > li span{
      color:rgb(155, 154, 154);
  }
  .song-list ul > li span:hover{
      color:gray;
  }
  .song-list ul > li span:nth-child(1){
      padding-left:0px;
      padding-right:30px;
      color:black;
  }
  .song-list h6{
      line-height:20px;
      font-size:16px;
  }
</style>

