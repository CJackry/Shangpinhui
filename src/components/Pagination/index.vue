<template>
  <div class="pagination">
    <button :disabled="pageData.pageNo === 1">上一页</button>
    <button v-show="StartAndEnd.start > 1" @click="PageHandler(1)" :class="{active: pageData.pageNo === 1}">1</button>
    <button v-show="StartAndEnd.end > pageData.continues">···</button>

    <button v-for="(page, index) in pageMidRange" :key="index" @click="PageHandler(page)" :class="{active: pageData.pageNo === page}">{{ page }}</button>

    <button v-show="StartAndEnd.end < totalPages">···</button>
    <button v-show="StartAndEnd.end < totalPages" @click="PageHandler(totalPages)" :class="{active: pageData.pageNo === totalPages}">{{ totalPages }}</button>
    <button :disabled="pageData.pageNo === totalPages">下一页</button>
    <button style="margin-left: 30px">共 {{ pageData.total }} 条</button>
    {{ StartAndEnd }}
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageData'],
  computed: {
    totalPages() {
      //向上取整
      return Math.ceil(this.pageData.total / this.pageData.pageSize);
    },
    StartAndEnd() {
      //初始化起始页码
      let start = 0, end = 0;
      let {pageNo, continues} = this.pageData;
      let totalPages = this.totalPages;
      // console.log(continues);
      if (totalPages < continues) {
        start = 1;
        end = totalPages;
      } else {
        //向下取整，即只保留整数部分
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        if (start < 1) start = 1;
        if (end > totalPages) {
          end = totalPages;
        }
      }
      return {start, end};
    },
    pageMidRange() {
      let pages = [];
      let start = this.StartAndEnd.start, end = this.StartAndEnd.end;
      for (let i = start; i <= end; i++)
        pages.push(i);
      return pages;
    }
  },
  methods:{
    PageHandler(page){
      console.log("page", page);
      this.$emit("pageInfo", page);
    }
  }

}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      //color: #fff;
    }
  }
}
</style>
