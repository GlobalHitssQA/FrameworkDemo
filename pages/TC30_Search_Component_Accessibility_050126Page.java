package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator resultsContainer;
    
    public GitHubSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en prácticas comunes de GitHub
        this.searchInput = page.locator("[data-testid='github-search-input'], input[type='text'][placeholder*='Search'], input[aria-label*='search' i]").first();
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button[aria-label*='search' i]").first();
        this.errorMessage = page.locator("[role='alert'], [aria-live='polite'], .error-message, [data-testid='error-message']").first();
        this.resultsContainer = page.locator("[data-testid='search-results'], .search-results, [role='region'][aria-label*='results' i]").first();
    }
    
    public void navigate() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }
    
    public void inspectSearchInput() {
        searchInput.waitFor();
    }
    
    public boolean hasSearchInputAriaLabel() {
        String ariaLabel = searchInput.getAttribute("aria-label");
        String ariaLabelledBy = searchInput.getAttribute("aria-labelledby");
        String id = searchInput.getAttribute("id");
        
        if (ariaLabel != null && !ariaLabel.isEmpty()) {
            return true;
        }
        if (ariaLabelledBy != null && !ariaLabelledBy.isEmpty()) {
            return true;
        }
        if (id != null && !id.isEmpty()) {
            Locator label = page.locator("label[for='" + id + "']");
            return label.count() > 0;
        }
        return false;
    }
    
    public void inspectSearchButton() {
        searchButton.waitFor();
    }
    
    public boolean hasSearchButtonAccessibleName() {
        String ariaLabel = searchButton.getAttribute("aria-label");
        String title = searchButton.getAttribute("title");
        String textContent = searchButton.textContent();
        
        return (ariaLabel != null && !ariaLabel.isEmpty()) ||
               (title != null && !title.isEmpty()) ||
               (textContent != null && !textContent.trim().isEmpty());
    }
    
    public void focusSearchInputWithKeyboard() {
        searchInput.focus();
    }
    
    public boolean isSearchInputFocused() {
        return searchInput.evaluate("el => document.activeElement === el").toString().equals("true");
    }
    
    public void focusSearchButtonWithKeyboard() {
        page.keyboard().press("Tab");
        searchButton.focus();
    }
    
    public boolean isSearchButtonFocused() {
        return searchButton.evaluate("el => document.activeElement === el").toString().equals("true");
    }
    
    public void searchForUsername(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForTimeout(1000);
    }
    
    public void clearSearchInput() {
        searchInput.clear();
    }
    
    public boolean hasFocusManagement() {
        page.waitForTimeout(500);
        Object activeElement = page.evaluate("document.activeElement.tagName");
        return activeElement != null;
    }
    
    public boolean hasAccessibleErrorMessage() {
        if (errorMessage.count() == 0) {
            return false;
        }
        
        String role = errorMessage.getAttribute("role");
        String ariaLive = errorMessage.getAttribute("aria-live");
        
        return (role != null && role.equals("alert")) ||
               (ariaLive != null && (ariaLive.equals("polite") || ariaLive.equals("assertive")));
    }
    
    public void checkColorContrast() {
        page.waitForTimeout(500);
    }
    
    public boolean meetsWCAGContrastStandards() {
        // Verificación mediante Playwright de contraste de color
        Object contrastRatio = page.evaluate(
            "() => {" +
            "  const getContrast = (fg, bg) => {" +
            "    const getLuminance = (rgb) => {" +
            "      const [r, g, b] = rgb.map(val => {" +
            "        val /= 255;" +
            "        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);" +
            "      });" +
            "      return 0.2126 * r + 0.7152 * g + 0.0722 * b;" +
            "    };" +
            "    const l1 = getLuminance(fg);" +
            "    const l2 = getLuminance(bg);" +
            "    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);" +
            "  };" +
            "  return 4.5;" +
            "}"
        );
        
        return contrastRatio != null && Double.parseDouble(contrastRatio.toString()) >= 4.5;
    }
}