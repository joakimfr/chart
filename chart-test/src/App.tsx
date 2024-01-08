import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './App.css'
import { useEffect, useRef } from 'react';
import { useState } from 'react';

interface VPNData {
  name: string;
  ratings: {
    overallRating: { rating: number; category: string };
    speedPerformance: { rating: number; category: string };
    privacySecurity: { rating: number; category: string };
    easeOfUse: { rating: number; category: string };
    serverLocation: { rating: number; category: string };
    customerSupport: { rating: number; category: string };
  };
}

function App() {

  const chartRef = useRef<HTMLCanvasElement | null>(null);
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: VPNData[] = [
    {
      name: 'ExpressVPN',
      ratings: {
        overallRating: {
          rating: 9.7,
          category: 'Overall Rating',
        },
        speedPerformance: {
          rating: 8.8,
          category: 'Speed Performance',
        },
        privacySecurity: {
          rating: 9.5,
          category: 'Privacy & Security',
        },
        easeOfUse: {
          rating: 8.9,
          category: 'Ease of Use',
        },
        serverLocation: {
          rating: 9.2,
          category: 'Server Location',
        },
        customerSupport: {
          rating: 9.1,
          category: 'Customer Support',
        },
      },
    },
    {
      name: 'CyberGhost',
      ratings: {
        overallRating: {
          rating: 9.6,
          category: 'Overall Rating',
        },
        speedPerformance: {
          rating: 8.7,
          category: 'Speed Performance',
        },
        privacySecurity: {
          rating: 9.0,
          category: 'Privacy & Security',
        },
        easeOfUse: {
          rating: 8.8,
          category: 'Ease of Use',
        },
        serverLocation: {
          rating: 8.8,
          category: 'Server Location',
        },
        customerSupport: {
          rating: 8.7,
          category: 'Customer Support',
        },
      },
    },
    {
      name: 'NordVPN',
      ratings: {
        overallRating: {
          rating: 9.48,
          category: 'Overall Rating',
        },
        speedPerformance: {
          rating: 9.1,
          category: 'Speed Performance',
        },
        privacySecurity: {
          rating: 9.4,
          category: 'Privacy & Security',
        },
        easeOfUse: {
          rating: 9.0,
          category: 'Ease of Use',
        },
        serverLocation: {
          rating: 9.3,
          category: 'Server Location',
        },
        customerSupport: {
          rating: 9.2,
          category: 'Customer Support',
        },
      },
    },
    {
      name: 'Surfshark',
      ratings: {
        overallRating: {
          rating: 9.7,
          category: 'Overall Rating',
        },
        speedPerformance: {
          rating: 8.8,
          category: 'Speed Performance',
        },
        privacySecurity: {
          rating: 9.0,
          category: 'Privacy & Security',
        },
        easeOfUse: {
          rating: 9.2,
          category: 'Ease of Use',
        },
        serverLocation: {
          rating: 8.9,
          category: 'Server Location',
        },
        customerSupport: {
          rating: 8.8,
          category: 'Customer Support',
        },
      },
    },
    {
      name: 'AtlasVPN',
      ratings: {
        overallRating: {
          rating: 9,
          category: 'Overall Rating',
        },
        speedPerformance: {
          rating: 9.3,
          category: 'Speed Performance',
        },
        privacySecurity: {
          rating: 9.7,
          category: 'Privacy & Security',
        },
        easeOfUse: {
          rating: 9.1,
          category: 'Ease of Use',
        },
        serverLocation: {
          rating: 9.6,
          category: 'Server Location',
        },
        customerSupport: {
          rating: 5,
          category: 'Customer Support',
        },
      },
    },
  ];

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('overallRating');
  console.log(selectedCategory)
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  
//console.log(data[0].overallRating.rating)
//console.log(data[0].ratings.overallRating.rating)
  
useEffect(() => {
  if (chartRef.current) {
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      Chart.getChart(chartRef.current)?.destroy();

      const gradientNormal = ctx.createLinearGradient(0, 0, 0, 300);
      gradientNormal.addColorStop(0, '#3D8A3D');
      gradientNormal.addColorStop(1, '#192E1A');

      const gradientHighlight = ctx.createLinearGradient(0, 0, 0, 300);
      gradientHighlight.addColorStop(0, '#4CAF50'); // Ljusare nyans än #3D8A3D
      gradientHighlight.addColorStop(1, '#214E2B'); // Ljusare nyans än #192E1A

      const minRating = Math.min(...data.map((vpn) => vpn.ratings[selectedCategory].rating));
      const maxRating = Math.max(...data.map((vpn) => vpn.ratings[selectedCategory].rating));

      let minTick = Math.floor(minRating) - 0.5;

      if (minTick > 8.6) {
        minTick = 8.6;
      }

      const maxTick = Math.ceil(maxRating);

      Chart.register(ChartDataLabels);


      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((vpn) => vpn.name),
          datasets: [
            {
              label: data[0].ratings[selectedCategory].category,
              data: data.map((vpn) => vpn.ratings[selectedCategory].rating),
              backgroundColor: data.map((vpn) => vpn.ratings[selectedCategory].rating === maxRating ? gradientHighlight : gradientNormal),
              barThickness: 150,
            },
          ],
        },
        options: {
          // animations: {
          //   borderWidth: {
          //     duration: 1000,
          //     easing: 'linear',
          //     from: 1,
          //     to: 5,
          //     loop: true
          //   }
          // },
          scales: {
            x: {
              grid: {
                display: false,
                color: 'rgba(255, 255, 255, 0.90)', // Färgen på x-axelns linjer
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.90)',
              },
            },
            y: {
              position: 'right',
              beginAtZero: false,
              min: minTick,
              max: maxTick,
              grid: {
                color: '#3B3B3B',
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.90)',
                stepSize: 0.1,
                precision: 1,
                maxTicksLimit: 4,
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
            datalabels: {
              display: true,
              color: (context) => {
                // Changing color on highest rating
                const dataIndex = context.dataIndex;
                const rating = data[dataIndex].ratings[selectedCategory].rating;
                return rating === maxRating ? 'white' : 'white';
              },
              anchor: 'end',
              align: 'end',
              formatter: (value) => value.toFixed(1),
            },
          },

          elements: {
            line: {
              borderColor: '#3B3B3B',
            },
          },
          
        },
      });
    }
  }
}, [data, selectedCategory]);

return (
  <main className='main'>
    <section className='chart'>
      <article className='rating'>
        <h2>Ratings Details</h2>
        <div className='names'>
          {Object.keys(data[0].ratings).map((category) => (
             <div
             key={category}
             onClick={() => handleCategoryClick(category)}
             className={`category-container ${selectedCategory === category ? 'selected' : ''}`}
           >
             {data[0].ratings[category].category}
           </div>
          ))}
        </div>
      </article>

      <div className='chart-container'>
        <canvas className='chart-canvas' ref={chartRef}></canvas>
      </div>
    </section>
  </main>
);
}

export default App;
