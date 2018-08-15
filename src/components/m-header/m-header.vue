<template>
  <div class="m-header">
    <h1 class="text">VMUSICJIN</h1>
    <router-link to="/user" class="mine" tag="div">
     <i class="iconfont icon-list"></i>
    </router-link>
    <router-link to="/search" class="search" tag="div">
      <i class="iconfont icon-search"></i>
    </router-link>
  </div>
</template>

<script>
// 空 js
export default {

}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable.scss";
// --------------------------------------
// 布局概况：
// 使用 position 的 relative 和 absolute
// 来控制左右布局和居中布局
// --------------------------------------
.m-header {
  position: relative;
  height: 44px;
  width: 100%;
  text-align: center;
  background: $color-theme;
  .text {
    line-height: 44px;
    font-weight: bold;
    color: $color-text-l;
    letter-spacing: 3px;// 设置字与字之间的距离
  }
  .mine {
    position: absolute;
    top: -1.5px;
    left: 0;
    .iconfont {
        display: block;
        padding: 11px;
        font-size: 22px;
        color: $color-theme-l;
    }
  }
  .search {
    position: absolute;
    top: 0;
    right: 2px;
    .iconfont {
        display: block;
        padding: 12px;
        font-size: 18px;
        color: $color-theme-l;
    }
  }
}
</style>
