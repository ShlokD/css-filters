const image = document.querySelector('#hero-image');
const filterSelector = document.querySelector('select');

let mouseDown = false;

let selectedFilter = {
  name: 'blur',
  normalizer: 0.2,
  unit: 'px'
};

const filterMap = {
  'blur': '0px',
  'grayscale': '0%',
  'brightness': '100%',
  'contrast': '100%',
  'hue-rotate': '0deg',
  'invert': '0%',
  'opacity': '100%',
  'saturate': '100%',
  'sepia': '0%'
}

const handleFilterChange = ev => {
  const options = ev.target.options;
  const selectedIndex = options.selectedIndex;
  const selectedOption = options[selectedIndex];
  const filterName = ev.target.value.toLowerCase();
  const filterNormalizer = parseFloat(selectedOption.dataset.normalizer);
  const filterUnit = selectedOption.dataset.unit;
  selectedFilter = {
    name: filterName,
    normalizer: filterNormalizer, 
    unit: filterUnit
  };
}

const handleMousePress = ev => {
  mouseDown = true;
}

const handleMouseRelease = ev => {
  mouseDown = false;
}

const getFilters = (selectedFilter, level) => {
  const ratio = Math.round( level * (100 * selectedFilter.normalizer));

  filterMap[selectedFilter.name] = `${ratio}${selectedFilter.unit}`;  

  let filterString = '';
  for (const filter in filterMap) {
    filterString +=`${filter}(${filterMap[filter]}) `;
  }
  return filterString;
}

const handleMouseMove = ev => {
  if (!mouseDown) return;
  
  let offsetX = 0;
  if (ev.type === "touchmove") {
    const rect = ev.target.getBoundingClientRect();
    offsetX = ev.targetTouches[0].pageX - rect.left;
  } else {
    offsetX = ev.offsetX;
  }

  const level = offsetX / ev.target.width;
  ev.target.style.filter = getFilters(selectedFilter, level);    
}

image.addEventListener('mousedown', handleMousePress, { passive: true });
image.addEventListener('mouseup', handleMouseRelease, { passive: true });
image.addEventListener('mousemove', handleMouseMove, { passive: true });
image.addEventListener('touchstart', handleMousePress, { passive: true });
image.addEventListener('touchend', handleMouseRelease, { passive: true });
image.addEventListener('touchmove', handleMouseMove, { passive: true });
filterSelector.addEventListener('change', handleFilterChange);



const onFileUpload = ev => {
  console.log(ev);
}