<template>
  <router-view/>
</template>
<style lang="scss">
@import "//at.alicdn.com/t/c/font_3983075_kcv1ny4m1y.css";
[class*='lg-']{
  font-family: "iconfont";
  font-style: normal;
}
:root {
  --vxe-border-radius: 0 !important;
}

body {
  padding: 0;
  margin: 0;
}
.vxe-buttons--wrapper{
  padding-left: 1em;
}

.vxe-tools--operate {
  padding: 0 1em !important;
}

* ::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

/*滚动条的轨道*/
* ::-webkit-scrollbar-track {
  background-color: initial;
}

/*滚动条里面的小方块，能向上向下移动*/
* ::-webkit-scrollbar-thumb {
  background-color: #d7d4d4;
  border-radius: 2px;
}

* ::-webkit-scrollbar-thumb:hover {
  background-color: initial;
}

* ::-webkit-scrollbar-thumb:active {
  background-color: initial;
}

/*边角，即两个滚动条的交汇处*/
* ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}
</style>