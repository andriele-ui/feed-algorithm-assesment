from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent
base_dir = root / "evals" / "c6bd9345a4a54f16ab368a71"

pages = [
    ("main", base_dir / "index.html"),
    ("v1", base_dir / "v1.html"),
    ("v2", base_dir / "v2.html"),
    ("v3", base_dir / "v3.html"),
    ("v4", base_dir / "v4.html"),
]

viewports = [
    {"width": 390, "height": 844, "name": "iPhone12"},
    {"width": 414, "height": 896, "name": "iPhoneXR"},
    {"width": 768, "height": 1024, "name": "tablet"},
]

screenshot_dir = root / "playwright-screenshots"
screenshot_dir.mkdir(exist_ok=True)

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True)
    for viewport in viewports:
        page = browser.new_page(viewport={"width": viewport["width"], "height": viewport["height"]})
        print(f"\n=== Viewport: {viewport['name']} ({viewport['width']}x{viewport['height']}) ===")
        for label, html_path in pages:
            url = html_path.resolve().as_uri()
            print(f"\nPage: {label} -> {url}")
            page.goto(url, wait_until="load")
            page.wait_for_timeout(400)
            filename = screenshot_dir / f"{label}-{viewport['name']}.png"
            page.screenshot(path=str(filename), full_page=True)
            summary = page.evaluate(
                "() => {"
                "  const body = document.body;"
                "  const html = document.documentElement;"
                "  const all = Array.from(document.querySelectorAll('*'));"
                "  const elementMax = all.reduce((max, el) => Math.max(max, el.scrollWidth), 0);"
                "  return {"
                "    innerWidth: window.innerWidth,"
                "    outerWidth: window.outerWidth,"
                "    scrollWidth: Math.max(body.scrollWidth, html.scrollWidth),"
                "    maxElementWidth: elementMax,"
                "    bodyPadding: getComputedStyle(body).padding,"
                "    htmlOverflowX: getComputedStyle(html).overflowX,"
                "    bodyOverflowX: getComputedStyle(body).overflowX"
                "  };"
                "}"
            )
            print("  innerWidth:", summary["innerWidth"], "scrollWidth:", summary["scrollWidth"], "maxElementWidth:", summary["maxElementWidth"])
            print("  body padding:", summary["bodyPadding"], "overflowX:", summary["htmlOverflowX"], summary["bodyOverflowX"])
            if summary["maxElementWidth"] > summary["innerWidth"]:
                print("  WARNING: element wider than viewport ->", summary["maxElementWidth"])
            else:
                print("  OK: no oversized elements detected")

            open_button = page.locator('.evaluation-mobile-open')
            if open_button.count() > 0:
                print("  mobile open button present")
                open_button.first.click()
                page.wait_for_timeout(300)
                overlay_visible = page.evaluate(
                    "() => !!document.querySelector('.evaluation-panel') && getComputedStyle(document.querySelector('.evaluation-panel')).opacity === '1'"
                )
                print("  evaluation panel visible after click:", overlay_visible)
                panel_filename = screenshot_dir / f"{label}-{viewport['name']}-panel.png"
                page.screenshot(path=str(panel_filename), full_page=True)
                page.keyboard.press("Escape")
                page.wait_for_timeout(200)
            else:
                print("  no mobile open button")
        page.close()
    browser.close()
print("\nPlaywright mobile regression test completed.")
