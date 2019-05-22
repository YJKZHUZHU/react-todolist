import React from 'react'
import axios from 'axios'
import {Button} from 'antd'
export default class ThreeLevelLinkage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectProvince: '',
      selectCity: '',
      selectCounty: '',
      selectProvinceName: [],
      selectCityName: [],
      selectCountyName: [],
      provinceInfo: [],
      cityInfo: [],
      countyInfo: [],
      isButton: true
    }
  }

  // 初始化数据
  componentDidMount() {
    this.getProvinceInfo()
  }

  // 获取省份数据
  getProvinceInfo() {
    axios.get('http://localhost:4000/district').then((res)=> {
      this.setState({
        provinceInfo: res.data
      })
    })
  }

  // 获取市区数据
  getCityInfo(ID) {
    axios.get('http://localhost:4000/district/' + ID,{ level: 1 }).then((res) => {
      console.log(res.data)
      this.setState({
        cityInfo: res.data
      })
    })
  }

  // 获取县数据
  getCountyInfo(ID) {
    axios.get('http://localhost:4000/district/' + ID, { level: 2 }).then((res) => {
      console.log(res.data)
      this.setState({
        countyInfo: res.data
      })
    })
  }

  selectProvince(e) {
    this.setState({
      selectProvince: e.target.value,
      isButton: true
    }, function() {
      this.getCityInfo(this.state.selectProvince)
    })
  }

  selectCity(e) {
    this.setState({
      selectCity: e.target.value,
      isButton: true
    }, function () {
        this.getCountyInfo(this.state.selectCity)
    })
  }

  selectCounty(e) {
    this.setState({
      selectCounty: e.target.value,
      isButton: false
    },function(){
       
    })
  }
  
  getThreeData() {
    this.setState({
      selectProvinceName: this.state.provinceInfo.filter(item => {
        return item.id === parseInt(this.state.selectProvince)
      }),
      selectCityName: this.state.cityInfo.filter(item => {
        return item.id === parseInt(this.state.selectCity)
      }),
      selectCountyName: this.state.countyInfo.filter(item => {
        return item.id === parseInt(this.state.selectCounty)
      }),
    },function(){
        alert(this.state.selectProvinceName[0].name + this.state.selectCityName[0].name + this.state.selectCountyName[0].name)
    })
    
  }

  render() {
    return (
      <section className='threeLevelLinkage'>
        <select value={this.state.selectProvince} onChange={(e) => this.selectProvince(e)}>
          <option value=''>请选择省份</option>
          {this.state.provinceInfo.map((item, index)=> {
            return <option value={item.id} key={item.order}>{item.name}</option>
          })}
        </select>
        <select value={this.state.selectCity} onChange={(e) => this.selectCity(e)}>
          <option value=''>请选择所在市</option>
          {this.state.cityInfo.map((item, index) => {
            return <option value={item.id} key={item.order}>{item.name}</option>
          })}
        </select>
        <select value={this.state.selectCounty} onChange={(e) => this.selectCounty(e)}>
          <option value=''>请选择所在县</option>
          {this.state.countyInfo.map((item, index) => {
            return <option value={item.id} key={item.order}>{item.name}</option>
          })}
        </select>
        <Button disabled={this.state.isButton} type="primary" className='threeLevelLinkageButton' onClick={()=> {this.getThreeData()}}>点击我获取数据</Button>
      </section>
    )
  }
}