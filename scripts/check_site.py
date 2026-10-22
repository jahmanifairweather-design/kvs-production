"""Check static routes, assets, booking fallbacks, and navigation. Standard library only."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json

ROOT = Path(__file__).resolve().parents[1]
BOOKING = 'https://kingvisualstudio.square.site'

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.links, self.ids, self.assets, self.booking = [], set(), [], []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate id: {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag in ('img', 'script'):
            self.assets.append(attrs.get('src', ''))
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.assets.append(attrs.get('href', ''))
        if 'data-consultation' in attrs:
            self.booking.append(attrs.get('href'))
        if tag == 'img':
            assert attrs.get('alt'), 'Portfolio image needs descriptive alt text'

pages = {p.name: Page(p.read_text()) for p in ROOT.glob('*.html')}
inbound = set()
for name, page in pages.items():
    for link in page.links + page.assets:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc:
            continue
        assert link and link != '#', f'{name}: empty destination'
        if parsed.path:
            dest = ROOT / parsed.path.lstrip('/')
            assert dest.is_file(), f'{name}: missing destination {link}'
            if dest.suffix == '.html':
                inbound.add(dest.name)
        if parsed.fragment:
            target = pages.get(parsed.path, page) if parsed.path else page
            assert parsed.fragment in target.ids, f'{name}: missing anchor {link}'
    assert all(url == BOOKING for url in page.booking), f'{name}: invalid consultation link'
    source = (ROOT / name).read_text()
    assert 'temporary placeholders' not in source and 'Use this page for' not in source
    if name != 'book.html':
        assert page.booking, f'{name}: no booking link'
        for route in ('weddings.html', 'events.html', 'portraits.html', 'video.html', 'reviews.html'):
            assert page.links.count(route) >= 2, f'{name}: desktop/mobile nav missing {route}'
assert set(pages) - {'index.html'} <= inbound, 'Orphaned HTML page'
redirects = json.loads((ROOT / 'vercel.json').read_text())['redirects']
assert {r['source'] for r in redirects} == {'/book', '/book.html'}
assert all(r['destination'] == BOOKING for r in redirects)
assert 'http-equiv="refresh"' in (ROOT / 'book.html').read_text()
print(f'PASS: {len(pages)} pages; local routes/assets/anchors, nav parity, booking fallbacks, and redirects')
