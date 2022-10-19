<template>
  <div class="pagination">
    <button>上一页</button>
    <button v-show="StartAndEnd.start > 1">1</button>
    <button v-show="StartAndEnd.end > continues">···</button>

    <button v-for="(page, index) in pageMidRange" :key="index">{{ page }}</button>

    <button v-show="StartAndEnd.end < totalPages">···</button>
    <button v-show="StartAndEnd.end < totalPages">{{ totalPages }}</button>
    <button>下一页</button>
    <button style="margin-left: 30px">共 {{ totalNum }} 条</button>
    {{ StartAndEnd }}
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'continues', 'totalNum'],
  computed: {
    totalPages() {
      //向上取整
      return Math.ceil(this.totalNum / this.pageSize);
    },
    StartAndEnd() {
      //初始化起始页码
      let start = 0, end = 0;
      let {pageNo, continues, totalPages} = this;
      console.log(continues);
      if (totalPages < continues) {
        start = 1;
        end = totalPages;
      } else {
        //向下取整，即只保留整数部分
        start = pageNo - Math.floor(continues / 2);
        console.log(continues);
        end = pageNo + Math.floor(continues / 2);
        if (start < 1) start = 1;
        if (end > totalPages) end = totalPages;
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
      color: #fff;
    }
  }
}
</style>
