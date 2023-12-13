import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import './App.css'
import { useEffect, useRef } from 'react';
import { useState } from 'react';

interface VPNData {
  name: string
  category: string
  overallRating: number
  speedPerformance: number
  privacySecurity: number
  easeOfUse: number
  serverLocation: number
  customerSupport: number
}

function App() {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const chartRef = useRef<HTMLCanvasElement | null>(null);
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: VPNData[] = [
    {
      name: 'ExpressVPN',
      overallRating: {
        rating: 9.68,
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
    {
      name: 'CyberGhost',
      overallRating: { 
        rating: 9.66, 
        category: 'Overall Rating' 
      },
      speedPerformance: { 
        rating: 8.7, 
        category: 'Speed Performance' 
      },
      privacySecurity: { 
        rating: 9.0, 
        category: 'Privacy & Security' 
      },
      easeOfUse: { 
        rating: 8.8, 
        category: 'Ease of Use' 
      },
      serverLocation: { 
        rating: 8.8, 
        category: 'Server Location' },
      customerSupport: { 
        rating: 8.7, 
        category: 'Customer Support' 
      },
    },
    {
      name: 'NordVPN',
      overallRating: { 
        rating: 9.48, category: 'Overall Rating' },
      speedPerformance: { 
        rating: 9.1, category: 'Speed Performance' },
      privacySecurity: { 
        rating: 9.4, category: 'Privacy & Security' },
      easeOfUse: { 
        rating: 9.0, category: 'Ease of Use' },
      serverLocation: { 
        rating: 9.3, category: 'Server Location' },
      customerSupport: { 
        rating: 9.2, category: 'Customer Support' },
    },
    {
      name: 'Surfshark',
      overallRating: { 
        rating: 9.16, 
        category: 'Overall Rating' 
      },
      speedPerformance: { 
        rating: 8.8, 
        category: 'Speed Performance' 
      },
      privacySecurity: { 
        rating: 9.0, 
        category: 'Privacy & Security' 
      },
      easeOfUse: { 
        rating: 9.2, 
        category: 'Ease of Use' 
      },
      serverLocation: { 
        rating: 8.9, 
        category: 'Server Location' 
      },
      customerSupport: { 
        rating: 8.8, 
        category: 'Customer Support' 
      },
    },
    {
      name: 'AtlasVPN',
      overallRating: { 
        rating: 9, 
        category: 'Overall Rating' 
      },
      speedPerformance: { 
        rating: 9.3, 
        category: 'Speed Performance' 
      },
      privacySecurity: { 
        rating: 9.7, 
        category: 'Privacy & Security' 
      },
      easeOfUse: { 
        rating: 9.1, 
        category: 'Ease of Use' 
      },
      serverLocation: { 
        rating: 9.6, 
        category: 'Server Location' 
      },
      customerSupport: { 
        rating: 9.4, 
        category: 'Customer Support' 
      },
    },
  ]

  useEffect(() => {
    // Skapa ett diagram när komponenten monteras
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Förstör det befintliga diagrammet om det finns
        Chart.getChart(chartRef.current)?.destroy();
  
        // Skapa en linjär gradient som bakgrundsfärg
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, '#3D8A3D'); // Startfärg
        gradient.addColorStop(1, '#192E1A'); // Slutfärg

  
        // Skapa det nya diagrammet med linjär gradient som bakgrundsfärg
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(vpn => vpn.name),
            datasets: [{
              label: selectedCategory || 'Overall Rating',
              data: data.map(vpn => selectedCategory ? vpn[selectedCategory].rating : vpn.overallRating),
              backgroundColor: gradient,
              barThickness: 160,
            }],
          },
          options: {
            scales: {
              x: {
                grid: {
                  display: false, // Dölj vertikala grid lines för x-axeln
                  //color: '#121212' // Problem med att få den första linjen från x-axeln att ändra färg.
                  color: '#3B3B3B',
                },
              },
          
              y: {
                position: 'right',
                beginAtZero: false, // Använd false för att börja vid 8.6
                min: 8.6,
                max: 9.8,
                grid: {
                  color: '#3B3B3B',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.90)',
                  stepSize: 0.4, // Stegstorlek mellan lägst och högst
                  callback: value => {
                    // Visa bara specifika värden
                    if (value === 8.6 || value === 9.0 || value === 9.4 || value === 9.8) {
                      return value;
                    }
                    return '';
                  },
                },
              },
            },
             plugins: { // Om man vill ändra med att styra vilken chart man vill se
              legend: {
                //display: false, // Dölj legenden om det behövs
                labels: {
               
                }
              },
             },
            elements: {
              line: {
                borderColor: '#3B3B3B', // Färgen på y-axlarna
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
            {Object.keys(data[0]).map((category) => (
              category !== 'name' &&
              <p key={category} onClick={() => handleCategoryClick(category)}>{category}</p>
            ))}
          </div>
      </article>

      <div className='chart-container'>
      <canvas className='chart-canvas' ref={chartRef}></canvas>
      </div>
      
    </section>
  </main>
  )
}

export default App
