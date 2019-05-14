for(let i = 0; i < 1000; i++) {
    const Mtop = Math.floor((Math.random() * i * 10) + 1);
    const Mleft = Math.floor((Math.random() * i * 10) + 1);
    
    $('#stars').append('<div class="star" style="top: '+ Mtop +'px; left: '+ Mleft +'px"></div>');
  }