import './App.css';
import Chart from "react-apexcharts";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const getData = async () => {
    const response = await axios.get("http://localhost:8080/data")
    const currentValue = response.data.map(item => [item.date, item.value])
    const errorFormatted = response.data.map(item => [item.date, item.error])
    return {
      currentValue, errorFormatted
    }
  }

  const setData = async () => {
    const { currentValue, errorFormatted } = await getData();
    setGrowingSeries([{
      name: 'Water Production',
      data: currentValue,
      type: 'line'
    }])
    setErrorSeries([{
      name: 'error',
      data: errorFormatted,
      type: 'bar'
    }])
  }

  useEffect(() => {
    setData()
  }, [])

  const [
    growingOptions, setGrowingOptions
  ] = useState({
    chart: {
      id: "growing",
      group: "rate"
    },
    xaxis: {
      type: 'datetime',
      dataLabels: {
        enabled: false
      }
    },
    yaxis: {
      title: {
        text: 'Sm³/d',
        style: {
          color: '#36577b'
        },
      },
      decimalsInFloat: '',
    },
    colors: ['#ffa500']
  });
  const [
    growingSeries, setGrowingSeries
  ] = useState([]);
  const [
    errorOptions, setErrorOptions
  ] = useState({
    chart: {
      id: "basic-bar",
      group: "rate",
    },
    xaxis: {
      type: 'datetime',

    },
    yaxis: {
      decimalsInFloat: '',
      dataLabels: {

      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#ff0000'],
  });
  const [
    errorSeries, setErrorSeries
  ] = useState([]);

  return (
    <>
      <div class="container">
        <header>
          <div class="left">
            <h1>Water Production - Rate</h1>
            <h2>Poor - Coverage 0.2</h2>
          </div>
          <div class="right">
            <h1>Well Name</h1>
          </div>
        </header>
        <div>
          <div class="box">
            <div class="box-header">
              <div>
                <p>(Prediction interval) <span>Ensemble</span></p>
                <ul class="interval">
                  <li class="item1">
                    <div></div><span>95%</span>
                  </li>
                  <li class="item2">
                    <div></div><span>50%</span>
                  </li>
                  <li class="item3">
                    <div></div><span>10%</span>
                  </li>
                </ul>
              </div>
              <div class="box-separator">
              </div>
              <div class="box-data">
                <div class="box-confidence">
                  <p>Observed data</p>
                  <span></span>
                  <strong>95 % confidence interval</strong>
                </div>
                <div class="box-mean">
                  <div class="line"></div>
                  <strong>Mean value</strong>
                </div>
              </div>
            </div>
            <Chart
              options={growingOptions}
              series={growingSeries}
              type="scatter"
              height="450"
            />
          </div>
          <div class="box">
            <Chart
              options={errorOptions}
              series={errorSeries}
              type="bar"
              height="200"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
