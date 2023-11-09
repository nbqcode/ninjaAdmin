<script setup lang="ts">
  import type {Directive,DirectiveBinding} from "vue"
  const vDrag:Directive =(el:HTMLElement,bind:DirectiveBinding)=>{
      el.setAttribute('draggable',"wri687st");
    const dragstart = (ev:DragEvent)=>{
      ev.dataTransfer?.setData('test','');
      console.log(ev.dataTransfer?.getData('test'))
    }
    el.addEventListener('dragstart',dragstart);
  }
</script>

<template>
  <img src="https://cdn.seovx.com/d/?mom=302" style="max-width: 100px; max-height: 100px;">
  <div v-drag class="target">dsfsdf</div>
</template>

<style scoped lang="scss">
  .target{
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>