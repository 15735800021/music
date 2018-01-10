<template>
   <div>
       <div id="myCarousel" class="carousel slide">
    <!-- 轮播（Carousel）指标 -->
    <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" :key="index" v-if="index>0" :data-slide-to="index" v-for ="(item,index) in Banner" ></li>
    </ol>   
    <!-- 轮播（Carousel）项目 -->
    <div class="carousel-inner">
        
       <div class="item active">
            <img :src="Banner[0].pic" alt="First slide">
            <div class="carousel-caption"></div>
        </div> 
        <div class="item" :key="index" v-if="index>0" v-for ="(item,index) in Banner">
            <img :src="''+item.pic" alt="First slide">
            <div class="carousel-caption"></div>
        </div>
    </div>
    <!-- 轮播（Carousel）导航 -->
    <a class="carousel-control left" href="#myCarousel" 
        data-slide="prev">
    </a>
    <a class="carousel-control right" href="#myCarousel" 
        data-slide="next">
    </a>
</div>
  </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'app',
        data(){
            return{
                Banner:''
            }
        },
        methods:{
            getBanner(){
                axios.get('/banner')
                .then(res=>{
                    // console.log(res.data.banners);
                    this.Banner = res.data.banners;
                    console.log(this.Banner)
                })
            }
        },
        created(){
            this.getBanner();
        }
    }
</script>
<style>
#myCarousel{
    text-align: center;
    position: relative;
}
.carousel-indicators{
    position: absolute;
    margin-bottom:-10px;
}
.item img{
    width:100%;
    height:100%;
    object-fit: cover;
}
</style>

