package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - Inferidos basados en mejores prácticas de Playwright
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator resultNames;
    private Locator resultEmails;
    private Locator scrollContainer;
    private Locator prospectDetailsContainer;
    private Locator prospectIdField;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos con selectores robustos
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.resultNames = page.locator("[data-testid='prospect-result-name']");
        this.resultEmails = page.locator("[data-testid='prospect-result-email']");
        this.scrollContainer = page.locator("[data-testid='results-scroll-container']");
        this.prospectDetailsContainer = page.locator("[data-testid='prospect-details-container']");
        this.prospectIdField = page.locator("[data-testid='prospect-unique-id']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://acticenter.actinver.com/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterProspectName(String prospectName) {
        searchField.clear();
        searchField.fill(prospectName);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public int getVisibleResultsCount() {
        int count = 0;
        for (int i = 0; i < searchResultItems.count(); i++) {
            if (searchResultItems.nth(i).isVisible()) {
                count++;
            }
        }
        return count;
    }

    public boolean areNamesHighlightedInBold() {
        if (resultNames.count() == 0) {
            return false;
        }
        
        Locator firstNameElement = resultNames.first();
        String fontWeight = firstNameElement.evaluate("el => window.getComputedStyle(el).fontWeight").toString();
        
        // Font-weight bold es típicamente 700 o mayor
        return Integer.parseInt(fontWeight) >= 700 || fontWeight.equals("bold");
    }

    public boolean areEmailAddressesVisible() {
        if (searchResultItems.count() == 0) {
            return false;
        }
        
        return resultEmails.count() > 0 && resultEmails.first().isVisible();
    }

    public boolean isScrollAvailable() {
        if (!scrollContainer.isVisible()) {
            return false;
        }
        
        // Verifica si el contenedor tiene scroll (scrollHeight > clientHeight)
        Boolean hasScroll = (Boolean) scrollContainer.evaluate(
            "el => el.scrollHeight > el.clientHeight"
        );
        return hasScroll;
    }

    public void selectProspectByIndex(int index) {
        if (index < searchResultItems.count()) {
            searchResultItems.nth(index).click();
            page.waitForTimeout(1500);
        }
    }

    public boolean isProspectDetailsPageVisible() {
        return prospectDetailsContainer.isVisible();
    }

    public String getLoadedProspectId() {
        if (prospectIdField.isVisible()) {
            return prospectIdField.textContent();
        }
        
        // Alternativa: extraer ID de la URL
        String currentUrl = page.url();
        if (currentUrl.contains("prospect-id=") || currentUrl.contains("/prospect/")) {
            return currentUrl;
        }
        
        return null;
    }
}