import { onMounted, ref } from "vue";
import { daisyUiColorHex, daisyUiColorRgba } from "../lib/colors.js";
export class PluginsFactory {
  static verticalIndicator = {
    id: "vertical-indicator",
    beforeDraw: function(chart, args, options) {
      if (chart.tooltip && chart.tooltip._active && chart.tooltip._active.length > 0) {
        let x = chart.tooltip.caretX;
        let yAxis = chart.scales.y;
        let ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = daisyUiColorRgba("--bc", 0.2);
        ctx.stroke();
        ctx.restore();
      }
    }
  };
}
export const useChart = ({
  decorator,
  plugins
}) => {
  const options = ref();
  onMounted(() => {
    options.value = buildOptions();
  });
  function buildOptions() {
    const fontColor = daisyUiColorHex("--bc");
    const fontFamily = window.getComputedStyle(document.body).getPropertyValue("font-family");
    var opt = {
      maintainAspectRatio: false,
      responsive: true,
      font: {
        family: fontFamily
      },
      interaction: {
        intersect: false,
        mode: "index"
      },
      datasets: {
        line: {
          pointStyle: "rectRounded"
        },
        bar: {
          pointStyle: "rectRounded"
        },
        doughnut: {
          borderWidth: 4,
          spacing: 16,
          borderColor: daisyUiColorRgba("--bc", 0.2),
          borderRadius: 8,
          pointStyle: "rectRounded"
        }
      },
      color: fontColor,
      animations: {
        x: {
          duration: 200
        }
      },
      animation: {
        duration: 400
      },
      transitions: {},
      plugins: {
        title: {
          display: false
        },
        subtitle: {
          display: false
        },
        legend: {
          align: "start",
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "rectRounded",
            color: fontColor
          }
        },
        colors: {
          enabled: true,
          forceOverride: false
        },
        tooltip: {
          bodyColor: fontColor,
          titleColor: fontColor,
          footerColor: fontColor,
          caretPadding: 8,
          footerFont: {
            family: fontFamily
          },
          usePointStyle: true,
          cornerRadius: 8,
          padding: 8,
          titleMarginBottom: 12,
          animation: {
            duration: 150,
            easing: "easeOutQuad"
          },
          bodyFont: {
            family: fontFamily
          },
          titleFont: {
            family: fontFamily
          },
          backgroundColor: daisyUiColorHex("--b1"),
          borderColor: daisyUiColorRgba("--bc", 0.2),
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { color: fontColor },
          border: {
            width: 1,
            color: daisyUiColorRgba("--bc", 0.2)
          },
          grid: {
            display: false,
            drawOnChartArea: false,
            color: daisyUiColorRgba("--bc", 0.2),
            lineWidth: 1,
            tickWidth: 1
          }
        },
        y: {
          border: {
            width: 1,
            color: daisyUiColorRgba("--bc", 0.2)
          },
          ticks: { color: fontColor },
          grid: {
            display: false,
            drawOnChartArea: false,
            color: daisyUiColorRgba("--bc", 0.2),
            lineWidth: 1,
            tickWidth: 1
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 8,
          hitRadius: 20
        },
        line: {
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 4,
          tension: 0.25
        },
        bar: {
          hoverBorderColor: fontColor,
          borderRadius: 8,
          borderWidth: 0
        }
      }
    };
    if (decorator) {
      decorator(opt);
    }
    return opt;
  }
  return { options, plugins };
};
