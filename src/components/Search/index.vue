<template>
  <div class="box">
    <form action="https://www.baidu.com/s" method="get"> <input class="input" type="text" name="wd" placeholder="搜索">
      <button type="submit" class="btn">搜索</button></form>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>
.box {
  width: 400px;
  margin: 0 auto;
  .input {
    width: 300px;
    height: 40px;
    padding-left: 10px;
    font-size: 16px;
    border-radius: 18px;
    border: none;
    margin-right: 10px;
  }
  .input:focus{
    border: none;
  }

  .btn {
    width: 80px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: rgb(0, 105, 224);
    color: #fff;
    font-size: 18px
  }
}
</style>