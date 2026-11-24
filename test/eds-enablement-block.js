import decorate from '../blocks/eds-enablement-block/eds-enablement-block.js';

function check(condition, message) {
  if (!condition) throw new Error(message);
}

function fixture(markup) {
  const block = document.createElement('div');
  block.className = 'eds-enablement-block authored';
  block.innerHTML = markup;
  return block;
}

const cases = [
  {
    name: 'Preserves authored content and classifies image and text cells',
    run() {
      const block = fixture('<div class="authored-row"><div class="authored-image"><picture><img src="/image.jpg" alt="Practice image"></picture></div><div><h2>Practice</h2><p><a href="/learn">Learn more</a></p></div></div>');
      const row = block.firstElementChild;
      const cells = [...row.children];
      const content = cells.map((cell) => cell.innerHTML);
      decorate(block);
      check(block.classList.contains('session-two') && block.classList.contains('session-practice'), 'Required classes missing');
      check(block.classList.contains('authored') && row.classList.contains('authored-row'), 'Authored classes removed');
      check(cells[0].classList.contains('authored-image'), 'Authored image class removed');
      check(cells[0].classList.contains('eds-enablement-block-image'), 'Picture cell not classified');
      check(cells[1].classList.contains('eds-enablement-block-body'), 'Content cell not classified');
      check(cells.every((cell, index) => cell === row.children[index] && cell.innerHTML === content[index]), 'Authored nodes or content changed');
    },
  },
  {
    name: 'Handles empty blocks, empty rows, and a single content cell',
    run() {
      [fixture(''), fixture('<div></div>')].forEach(decorate);
      const block = fixture('<div><div><h2>Text only</h2></div></div>');
      decorate(block);
      check(block.querySelector('.eds-enablement-block-body h2').textContent === 'Text only', 'Single-cell content lost');
    },
  },
  {
    name: 'Keeps extra cells and image captions in author order',
    run() {
      const block = fixture('<div><div><img src="/image.jpg" alt="Practice"></div><div><img src="/image.jpg" alt="Practice"><p>Caption</p></div><div>Extra content</div><div></div></div>');
      decorate(block);
      const cells = [...block.firstElementChild.children];
      check(cells.length === 4, 'Extra cells removed');
      check(cells[0].classList.contains('eds-enablement-block-image'), 'Standalone image not classified');
      check(cells.slice(1).every((cell) => cell.classList.contains('eds-enablement-block-body')), 'Caption or empty cell misclassified');
      check(cells[2].textContent === 'Extra content', 'Extra content reordered');
    },
  },
];

const result = document.getElementById('test-result');
try {
  cases.forEach(({ run }) => run());
  document.querySelectorAll('main .eds-enablement-block').forEach(decorate);
  result.textContent = `${cases.length} checks passed. Resize the page and tab to the sample link to review layout and focus.`;
  result.dataset.status = 'passed';
} catch (error) {
  result.textContent = `Checks failed: ${error.message}`;
  result.dataset.status = 'failed';
  throw error;
}
