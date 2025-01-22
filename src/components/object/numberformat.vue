<template>
    <span>
      {{ formatPrice(value, decimal) }}
    </span>
  </template>
  
  <script>
  export default {
    props: ['value', 'decimal'],
    methods: {
      formatPrice(value, decimal) {
        // แปลง value เป็นตัวเลขและใช้ toFixed(decimal) เพื่อจัดรูปแบบ
        var num = parseFloat(value).toFixed(decimal);
        
        // แบ่งส่วนตัวเลขและทศนิยม
        var dcm = num.toString().split(".");
        
        // addเครื่องหมายคอมม่าในส่วนตัวเลข
        dcm[0] = dcm[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // รวมส่วนตัวเลขและทศนิยมbackเข้าด้วยกัน
        var formattedNumber = dcm.join(".");
        
        return formattedNumber;
      },
    }
  }
  </script>
  