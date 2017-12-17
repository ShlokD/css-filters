const image = document.querySelector('#hero-image');
const filterSelector = document.querySelector('select');

let mouseDown = false;

let selectedFilter = {
  name: 'blur',
  normalizer: 0.2,
  unit: 'px'
};

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

const handleMouseMove = ev => {
  if (!mouseDown) return;
  
  let offsetX = 0;
  if (ev.type === "touchmove") {
    const rect = ev.target.getBoundingClientRect();
    offsetX = ev.targetTouches[0].pageX - rect.left;
  } else {
    offsetX = ev.offsetX;
  }
  
  const ratio = Math.round((offsetX / ev.target.width) * (100 * selectedFilter.normalizer));
  ev.target.style.filter = `${selectedFilter.name}(${ratio}${selectedFilter.unit})`;
}

image.addEventListener('mousedown', handleMousePress, { passive: true });
image.addEventListener('mouseup', handleMouseRelease, { passive: true });
image.addEventListener('mousemove', handleMouseMove, { passive: true });
image.addEventListener('touchstart', handleMousePress, { passive: true });
image.addEventListener('touchend', handleMouseRelease, { passive: true });
image.addEventListener('touchmove', handleMouseMove, { passive: true });
filterSelector.addEventListener('change', handleFilterChange);
