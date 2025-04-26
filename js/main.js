const app = document.getElementById('app');

const names = ['header','content','footer']

const initCount = () => {
  const countElements = document.querySelectorAll('.count');

  countElements.forEach(el => {
      const total = parseInt(el.getAttribute('total'));

      const diference = Math.abs(total - 500);

      const isDiference = total - diference 

      let count = 0;

      if(isDiference === 500) count = diference;
      
      const duration = 2000;

      const incrementTime = Math.ceil(duration / total);

      const interval = setInterval(() => {
          count++;
          el.textContent = count.toLocaleString('pt-BR').replace(/\./g, ','); ;

          if (count >= total) {
              clearInterval(interval);
          }
      }, incrementTime);
  });
};

const carregarComponentesSequencial = async (names) => {
  for (const component of names) {
    try {
      const response = await fetch(`./components/${component}/index.html`);

      const html = await response.text();

      const div = document.createElement('div');

      div.innerHTML = html;

      app.appendChild(div);

      // Carrega o CSS
      const link = document.createElement('link');

      link.rel = 'stylesheet';

      link.href = `./components/${component}/style.css`;

      link.type = 'text/css';
      
      document.head.appendChild(link);

    } catch (err) {
      console.error(`Erro ao carregar ${component}:`, err);
    }
  }

  initCount();
}

carregarComponentesSequencial(names);


