(async () => {
  const res = await fetch('/search.json');
  const data = await res.json();
  const idx = lunr(function () {
    this.ref('url');
    this.field('title');
    this.field('tags');
    this.field('os');
    this.field('license');
    this.field('text');
    data.forEach(doc => this.add(doc), this);
  });

  const $q = document.getElementById('q');
  const $out = document.getElementById('result');

  function render(list) {
    if (!list.length) { $out.innerHTML = '<p>没有匹配结果。</p>'; return; }
    $out.innerHTML = '<ul>' + list.map(doc => {
      const d = data.find(x => x.url === doc.ref);
      const tags = (d.tags || []).join(', ');
      const os = (d.os || []).join('/');
      return `<li><a href="${d.url}">${d.title}</a> <small>${os ? '['+os+'] ' : ''}${tags ? '· '+tags : ''}</small></li>`;
    }).join('') + '</ul>';
  }

  $q.addEventListener('input', () => {
    const q = $q.value.trim();
    if (!q) { $out.innerHTML = ''; return; }
    try { render(idx.search(q)); } catch { $out.innerHTML = '<p>输入太短或查询无效。</p>'; }
  });
})();
