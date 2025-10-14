from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify button hover effect
    page.goto("http://localhost:3000/en")
    page.wait_for_load_state('networkidle')
    page.hover("a:has-text('Book Visit')")
    page.screenshot(path="jules-scratch/verification/button_hover.png")

    # Verify card hover effect
    page.goto("http://localhost:3000/en/agendar-visita")
    page.wait_for_load_state('networkidle')
    print(page.content())
    page.hover("button:has-text('Residential Cleaning')")
    page.screenshot(path="jules-scratch/verification/card_hover.png")

    # Verify input focus effect
    page.get_by_role("button", name="Residential Cleaning").click()
    page.get_by_role("button", name="Next").click()
    page.wait_for_timeout(500)
    page.get_by_text("15").click() # Select a day
    page.get_by_text("10:00 AM").click() # Select a time
    page.get_by_role("button", name="Next").click()
    page.wait_for_timeout(500)
    page.focus("input[name='name']")
    page.screenshot(path="jules-scratch/verification/input_focus.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)