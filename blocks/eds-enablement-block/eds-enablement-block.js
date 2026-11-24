export default function decorate(block) {
  block.classList.add('session-two', 'session-practice');

  [...block.children].forEach((row) => {
    row.classList.add('eds-enablement-block-row');
    [...row.children].forEach((cell) => {
      const imageOnly = cell.querySelector('picture, img') && !cell.textContent.trim();
      cell.classList.add(imageOnly ? 'eds-enablement-block-image' : 'eds-enablement-block-body');
    });
  });
}
