package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator validationError;
    private Locator dashboardTitle;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.validationError = page.locator("[data-testid='search-validation-error']");
        this.dashboardTitle = page.locator("[data-testid='advisor-dashboard-title']");
    }

    public void navigateToProspectSearch() {
        // Assuming the search field is visible on the dashboard
        dashboardTitle.waitFor();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public void typeInSearchField(String text) {
        prospectSearchField.fill(text);
    }

    public void clearSearchField() {
        prospectSearchField.clear();
    }

    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }

    public boolean isValidationErrorVisible() {
        try {
            return validationError.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public void clickSearchButton() {
        searchButton.click();
    }
}