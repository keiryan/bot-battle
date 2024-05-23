<template>
    <div :class="loaderClass" :style="loaderStyle"></div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
    props: {
      size: {
        type: Number,
        default: 80,
      },
    },
    computed: {
      loaderClass() {
        return 'loader';
      },
      loaderStyle() {
        const size = `${this.size}px`;
        const borderSize = `${this.size / 8}px`;
        const radialSize = `${this.size / 4}px`;
        const blurSize = this.size / 20; // Adjust blur size proportionally
        return {
          width: size,
          height: size,
          border: `${borderSize} solid #000`,
          background: `
            radial-gradient(farthest-side, #fff 98%, #0000) 50%/${radialSize} ${radialSize},
            radial-gradient(farthest-side, #fff 98%, #0000) 50%/${radialSize} ${radialSize},
            radial-gradient(farthest-side, #fff 98%, #0000) 50%/${radialSize} ${radialSize},
            radial-gradient(farthest-side, #fff 98%, #0000) 50%/${radialSize} ${radialSize},
            radial-gradient(farthest-side, #fff 98%, #0000) 50%/${radialSize} ${radialSize},
            linear-gradient(#fff 0 0) 50%/100% ${borderSize},
            linear-gradient(#fff 0 0) 50%/${borderSize} 100%, #000
          `,
          filter: `blur(${blurSize}px) contrast(10)`,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .loader {
    aspect-ratio: 1;
    box-sizing: border-box;
    background-repeat: no-repeat;
    animation: l13 0.8s infinite;
  }
  
  @keyframes l13 {
    100% {
      background-position: 
        50% -20px, 
        -20px 50%, 
        60px 50%, 
        50% 60px, 
        50%, 
        50%, 
        50%;
    }
  }
  </style>