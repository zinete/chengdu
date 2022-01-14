<template>
  <div class="app">
    <div>
      <img :src="bg_img" alt="" class="bg_img" />
      <!-- title -->
      <div class="title_list_box">
        <div
          class="title_list img_zs2_body"
          v-for="(item, index) in videos"
          :key="item.id"
        >
          <div>
            <img
              src="../static/bg/yun.png"
              alt=""
              class="yun_bg"
              :style="index == 1 ? ' left: -50px' : 'right: -50px'"
            />
            <img
              :src="item.cityIcon"
              alt=""
              :style="index == 1 ? 'left: 0' : 'right: 0'"
              class="cityIcon"
            />
          </div>
          <div class="title_list_boder_l">
            <img
              :src="item.panda"
              alt=""
              class="top_icon"
              :style="index == 1 ? 'right: 0' : 'left: 0'"
            />

            <!--  yun-->

            <div class="title_icon_new">
              <!-- <img src="../static/bg/img_title_bg.png" alt="" /> -->

              <span class="title_icon_text_last">{{ $t(item.title) }}</span>
            </div>
            <div class="video_list">
              <div class="taiji_des_two">
                {{ $t(item.lang) }}
              </div>
              <div>
                <div class="items_boxs_top">
                  <video-player
                    @play="onPlayerPlay($event, index)"
                    class="video-player vjs-custom-skin vjs-big-play-centered"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions[index]"
                  ></video-player>
                </div>
              </div>
            </div>
            <!-- <img src="../static/imgs/img_zs2.png" alt="" class="img_zs2" />
            <img src="../static/imgs/img_zs3.png" alt="" class="img_zs3" /> -->
          </div>
        </div>
        <div class="buttom_img_view">
          <img src="../static/imgs/img_logo.png" alt="" class="buttom_logo" />
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.min.css";

import { videoPlayer } from "vue-video-player";
import getVideoInfo from "../data/getVideoInfo";
export default {
  components: {
    videoPlayer,
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  head() {
    return {
      title: this.$t("title"),
    };
  },
  data() {
    return {
      playerOptions: [],
      topvideosOptions: [],
      buttomvideosOptions: [],
      middlevideosOptions: [],
      bg_img: "",
      topvideos: [],
      middle: [],
      buttoms: [],
      videos: [],
    };
  },

  created() {
    let data = getVideoInfo.data.filter(
      (items) => items.lang === this.$i18n.locale
    );

    (this.bg_img = data[0].bg), (this.videos = data[0].video);
    this.initVideo();

    console.log(
      this.$i18n.locale,
      "=================当前语言==================="
    );
  },
  methods: {
    showLocales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.$i18n.locale
      );
    },
    onPlayerPlay(player, index) {
      var that = this.$refs.videoPlayer;
      for (let i = 0; i < that.length; i++) {
        if (i != index) that[i].player.pause();
      }
    },

    initVideo() {
      for (let i of this.videos) {
        let config = {
          playbackRates: [1.0, 2.0, 3.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: "none", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: "zh-CN",
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              type: "video/mp4",
              src: i.local, //url地址
            },
          ],
          poster: i.cover, //封面地址
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true, //全屏按钮
          },
        };
        this.playerOptions.push(config);
      }
    },
  },
};
</script>
<style>
@media only screen and (min-width: 1200px) {
  body {
    width: 40%;
    margin: 0 auto;
    background: #b73a0b;
    background-size: cover;
  }
  .title_icon_text_last {
    max-width: 100% !important;
  }
}

.app {
  background: url("/bg/bg_cover.png") repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.img_zs1_body {
  position: relative;
  margin-bottom: 180px !important;
}

.yun_bg {
  position: absolute;

  bottom: -200px;
  width: 300px;
  /* z-index: 9900; */
  /* z-index: -1;s */
}

.top_bar::after {
  content: "";
}

.cityIcon {
  width: 500px;

  position: absolute;
  top: -300px;

  z-index: 99000;
}
.top_icon {
  width: 140px;

  position: absolute;
  top: -175px;

  z-index: 99000;
}

.bg_img_box {
  z-index: 1000;
  width: 100%;
  left: 0px;
  justify-content: center;
  display: flex;
  right: 0px;
  /* top: 250px; */
  position: absolute;
}
.bg_img_title {
  width: 90%;
  height: 100%;
}
.img_zs2_body {
  position: relative;
}

.img_zs1 {
  width: 668px;
  height: 860px;
  position: absolute;
  left: -50px;
  bottom: -200px;
  z-index: -1;
}
.img_zs2 {
  width: 111px;
  height: 233px;
  position: absolute;
  left: -60px;
  top: -140px;
}
.img_zs3 {
  position: absolute;
  width: 400px;
  height: 660px;
  right: -50px;
  bottom: -210px;
  z-index: -1;
}
.bg_img {
  width: 100%;
  height: 100%;
}

.video_list_last {
  margin-top: 0px !important;
}

/* .title_list:first-child {
  margin-bottom: 0px !important;
} */

.top_bar_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 100px;
}
.top_bar_size {
  width: 20px;
  height: 100px;
  background: #c6432a;
  z-index: 999;
}
.title_list {
  position: relative;
  border-radius: 36px;
  background: #c6754b;
  border: 6px solid #f3e1b8;
  margin: 0px 30px;
  margin-top: 380px;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.title_list:first-child {
  margin-top: 240px;
}

.title_list_boder_l {
  margin: 10px;
  display: flex;
  justify-content: center;
  border-radius: 22px;
  border: 5px solid #f3e1b8;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: relative;
  background: url("/bg/box_bg.png") repeat;
}
.title_icon {
  width: 773px;
  height: 128px;
  position: absolute;
  top: -78px;
}

.title_icon_new {
  top: -112px;
  width: 100%;
  z-index: 888;
  left: 0px;
  right: 0px;
  height: 200px;
  position: absolute;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/bg/img_title_bg.png") no-repeat center;
  background-size: contain;
}
.title_icon_new img {
  width: 85%;
  height: 100%;
}

.title_icon_text {
  position: absolute;
  font-weight: 600;
  font-size: 42px;
  color: #c6432a;
  text-align: center;
  display: block;

  word-break: break-all;
}

.title_icon_text_last {
  position: absolute;
  font-weight: 600;
  font-size: 42px;
  color: #c6432a;
  text-align: center;
  display: block;

  width: 75%;
}
.taiji_des {
  margin-top: 60px;
  padding: 0px 10px;
}

.taiji_des_two {
  margin-top: 0px;
  padding: 0px 10px;
}
.taiji_des_two,
.taiji_des p {
  line-height: 63px;
  font-size: 40px;
  font-weight: normal;
  color: #c6432a;
  margin: 40px 32px;
  text-align: justify;
  text-indent: 60px;
  word-break: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.items_boxs_top {
  border-radius: 12px;
  transform: rotate(0deg);
  overflow: hidden;
  margin-bottom: 32px;
  margin-left: 48px;
  margin-right: 48px;
  margin-top: 20px;
}

.video_list {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 30px;
  margin-top: 100px;
}
.icon_size {
  margin: 0 120px;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
.icon_text {
  position: absolute;
  font-size: 38px;
  overflow: hidden;
  font-weight: 500;
  color: #ffffff;
  padding: 0px 20px;
  text-align: center;
}
.icon_size img {
  width: 100%;
}
.buttom_logo {
  width: 100%;
}
.buttom_img_view {
  font-size: 0;
  /* position: fixed;
  bottom: 0;
  left: 0;
  right: 0; */
}
/*播放按钮设置成宽高一致，圆形，居中*/
.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 1.5em;
  border-radius: 50%;
  height: 2em !important;
  line-height: 2em !important;
  margin-top: -1em !important;
  margin-left: -1em !important;
  width: 2em !important;
  outline: none;
}

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

/*control-bar布局时flex，通过order调整剩余时间的位置到进度条右边*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-remaining-time {
  order: 3 !important;
}

/*进度条背景轨道*/
.video-js .vjs-slider {
  border-radius: 1em;
}

/*进度条进度*/
.vjs-custom-skin > .video-js .vjs-play-progress,
.vjs-custom-skin > .video-js .vjs-volume-level {
  border-radius: 1em;
}

/*鼠标进入播放器后，播放按钮颜色会变*/
.video-js:hover .vjs-big-play-button,
.vjs-custom-skin > .video-js .vjs-big-play-button:active,
.vjs-custom-skin > .video-js .vjs-big-play-button:focus {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

/*control bar*/
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

/*点击按钮时不显示蓝色边框*/
.video-js .vjs-control-bar button {
  outline: none;
}
.video-js {
  background: #fff;
}
.vjs-poster {
  background-size: cover !important;
  background-repeat: inherit !important;
}
video {
  width: 100% !important;
  object-fit: fill;
}
</style>
