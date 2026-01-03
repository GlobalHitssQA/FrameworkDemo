package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator resultItems;
    private Locator prospectNameField;
    private Locator prospectEmailField;
    private Locator selectionProcessIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='prospect-results-list']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameField = page.locator("[data-testid='selected-prospect-name']");
        this.prospectEmailField = page.locator("[data-testid='selected-prospect-email']");
        this.selectionProcessIndicator = page.locator("[data-testid='agas-43-selection-flow']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/acticenter/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchField.isVisible() && searchButton.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areResultsDisplayed() {
        return resultsContainer.isVisible();
    }

    public int getResultsCount() {
        return resultItems.count();
    }

    public boolean allProspectsHaveEmailKey() {
        int count = resultItems.count();
        for (int i = 0; i < count; i++) {
            Locator emailLocator = resultItems.nth(i).locator("[data-testid='prospect-email']");
            if (!emailLocator.isVisible() || emailLocator.textContent().trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public void selectFirstProspectWithEmail() {
        int count = resultItems.count();
        for (int i = 0; i < count; i++) {
            Locator emailLocator = resultItems.nth(i).locator("[data-testid='prospect-email']");
            if (emailLocator.isVisible() && !emailLocator.textContent().trim().isEmpty()) {
                resultItems.nth(i).click();
                page.waitForTimeout(500);
                break;
            }
        }
    }

    public boolean isProspectNameDisplayed() {
        return prospectNameField.isVisible();
    }

    public boolean isProspectEmailDisplayed() {
        return prospectEmailField.isVisible();
    }

    public String getProspectName() {
        return prospectNameField.textContent().trim();
    }

    public String getProspectEmail() {
        return prospectEmailField.textContent().trim();
    }

    public boolean isSelectionProcessFlowVisible() {
        return selectionProcessIndicator.isVisible();
    }
}