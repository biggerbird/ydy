<template>
  <top-back></top-back>
  <div id="main" style="height:400px" v-if="show"></div>
  <table class="ui-table">
      <thead>
        <tr>
          <th>日期</th>
          <th>推广总人数</th>
          <th>推广人增量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in trends">
          <td>{{item.countdate}}</td>
          <td>{{item.numAgent}}</td>
          <td>{{item.addNumAgent}}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import Lib from 'assets/Lib.js'
import echarts from 'echarts'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import topBack from 'components/top-back'
export default {
  data() {
    return {trends:'',show:true}
  },
  components: {
    topBack
  },
  ready(){
    this.getdata();
  },
  methods: {
    getdata (){
      var myChart = echarts.init(document.getElementById('main'));
        // 显示标题，图例和空的坐标轴
        myChart.setOption({
            title: {
                text: '近10日推广总数量'
            },
            tooltip: {
                trigger: 'axis'
              },
            legend: {
                data:['个数']
            },
            xAxis: {
                data: []
            },
            yAxis : [
                     {
                         type : 'value',
                         axisLabel : {
                             formatter: '{value} 个'
                         }
                     }
                 ],
            series: [{
                name: '个数',
                type: 'line',
                data: []
            }]
        });
        
        myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
        
        var names=[];    //类别数组（实际用来盛放X轴坐标值）
        var nums=[];    //个数数组（实际用来盛放Y坐标值）
        
      this.$http.jsonp(Lib.C.Mpath+'trend/getData').then(function(result){
        this.trends = result.data;
        if (result.data.length != 0) {
               for(var i=0;i<result.data.length;i++){       
                  names.push(result.data[i].countdate);    //挨个取出类别并填入类别数组
                }
               for(var i=0;i<result.data.length;i++){       
                   nums.push(result.data[i].click);    //挨个取出个数并填入数组
                 }
               myChart.hideLoading();    //隐藏加载动画
               myChart.setOption({        //加载数据图表
                   xAxis: {
                       data: names
                   },
                   series: [{
                       // 根据名字对应到相应的系列
                       name: '个数',
                       data: nums
                   }]
               });
        }else{
          this.show = false;
        }
      },function(){
        myChart.hideLoading();
        Toast('请求出错');
      })
    }
  }
}
</script>

<style scoped>

</style>





